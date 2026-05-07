#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const imageExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".tif",
  ".tiff",
  ".webp",
]);
const audioExtensions = new Set([".flac"]);
const mediaExtensions = new Set([...imageExtensions, ...audioExtensions]);

function gitOutput(args, cwd) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "buffer",
    stdio: ["ignore", "pipe", "ignore"],
  });

  if (result.status === 0) return result.stdout;
  throw result.error || new Error(`git ${args.join(" ")} failed`);
}

function repoRoot() {
  try {
    return gitOutput(["rev-parse", "--show-toplevel"], process.cwd())
      .toString("utf8")
      .trim();
  } catch {
    return process.cwd();
  }
}

function trackedFiles(root) {
  const output = gitOutput(["ls-files", "-z"], root);

  return output
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .filter((file) => fs.existsSync(path.join(root, file)));
}

function untrackedFiles(root) {
  const output = gitOutput(["ls-files", "--others", "--exclude-standard", "-z"], root);

  return output
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .filter((file) => fs.existsSync(path.join(root, file)));
}

function defaultFiles(root) {
  return [...new Set([...trackedFiles(root), ...untrackedFiles(root)])];
}

function cliMediaFiles(root) {
  return process.argv
    .slice(2)
    .map((file) => path.relative(root, path.resolve(file)))
    .filter((file) => fs.existsSync(path.join(root, file)));
}

function readUInt32BE(buffer, offset) {
  return buffer.readUInt32BE(offset);
}

function readUInt32LE(buffer, offset) {
  return buffer.readUInt32LE(offset);
}

function ascii(buffer, maxLength = 80) {
  return buffer
    .subarray(0, maxLength)
    .toString("latin1")
    .replace(/[^\x20-\x7e]+/g, ".")
    .trim();
}

function addIssue(issues, file, message) {
  issues.push({ file, message });
}

function checkPng(buffer, file, issues) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(signature)) return false;

  const blockedChunks = new Set(["eXIf", "iCCP", "iDOT", "iTXt", "tEXt", "tIME", "zTXt"]);
  let offset = 8;

  while (offset + 12 <= buffer.length) {
    const length = readUInt32BE(buffer, offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("latin1");
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd + 4 > buffer.length) break;

    if (blockedChunks.has(type)) {
      let detail = type;
      if (["iTXt", "tEXt", "zTXt"].includes(type)) {
        const keyword = buffer.subarray(dataStart, dataEnd).toString("latin1").split("\0")[0];
        detail = `${type} ${keyword || "text metadata"}`;
      }
      addIssue(issues, file, `PNG metadata chunk found: ${detail}`);
    }

    offset = dataEnd + 4;
    if (type === "IEND") break;
  }

  return true;
}

function checkJpeg(buffer, file, issues) {
  if (buffer.length < 2 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return false;

  let offset = 2;
  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
    if (offset >= buffer.length) break;

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) break;
    if (offset + 2 > buffer.length) break;

    const length = buffer.readUInt16BE(offset);
    const dataStart = offset + 2;
    const dataEnd = offset + length;
    if (dataEnd > buffer.length) break;

    const payload = buffer.subarray(dataStart, dataEnd);
    if (marker === 0xe1) {
      addIssue(issues, file, `JPEG APP1 EXIF/XMP metadata found: ${ascii(payload)}`);
    } else if (marker === 0xe2 && payload.includes(Buffer.from("ICC_PROFILE", "latin1"))) {
      addIssue(issues, file, "JPEG APP2 ICC profile metadata found");
    } else if (marker === 0xed) {
      addIssue(issues, file, "JPEG APP13 Photoshop/IPTC metadata found");
    } else if (marker === 0xee) {
      addIssue(issues, file, "JPEG APP14 Adobe metadata found");
    } else if (marker === 0xfe) {
      addIssue(issues, file, `JPEG comment metadata found: ${ascii(payload)}`);
    }

    offset = dataEnd;
  }

  return true;
}

function checkWebp(buffer, file, issues) {
  if (
    buffer.length < 12 ||
    buffer.subarray(0, 4).toString("latin1") !== "RIFF" ||
    buffer.subarray(8, 12).toString("latin1") !== "WEBP"
  ) {
    return false;
  }

  const blockedChunks = new Set(["C2PA", "EXIF", "ICCP", "XMP "]);
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.subarray(offset, offset + 4).toString("latin1");
    const length = readUInt32LE(buffer, offset + 4);
    if (blockedChunks.has(type)) {
      addIssue(issues, file, `WebP metadata/provenance chunk found: ${type.trim()}`);
    }
    offset += 8 + length + (length % 2);
  }

  return true;
}

function checkSvg(buffer, file, issues) {
  const text = buffer.toString("utf8").trimStart();
  if (!text.startsWith("<")) return false;

  if (text.includes("<!--")) addIssue(issues, file, "SVG comment metadata found");
  if (/<metadata[\s>]/i.test(text)) addIssue(issues, file, "SVG <metadata> element found");
  if (/<rdf:|<dc:|<cc:/i.test(text)) addIssue(issues, file, "SVG RDF/DC/CC metadata found");

  return true;
}

function checkIco(buffer, file, issues) {
  if (
    buffer.length < 6 ||
    buffer.readUInt16LE(0) !== 0 ||
    buffer.readUInt16LE(2) !== 1
  ) {
    return false;
  }

  const count = buffer.readUInt16LE(4);
  for (let index = 0; index < count; index += 1) {
    const entryOffset = 6 + index * 16;
    if (entryOffset + 16 > buffer.length) break;

    const size = readUInt32LE(buffer, entryOffset + 8);
    const imageOffset = readUInt32LE(buffer, entryOffset + 12);
    if (imageOffset + size > buffer.length) continue;

    const image = buffer.subarray(imageOffset, imageOffset + size);
    checkPng(image, `${file} icon ${index + 1}`, issues);
  }

  return true;
}

function checkFlac(buffer, file, issues) {
  if (buffer.length < 4 || buffer.subarray(0, 4).toString("latin1") !== "fLaC") {
    return false;
  }

  const blockNames = new Map([
    [0, "STREAMINFO"],
    [1, "PADDING"],
    [2, "APPLICATION"],
    [3, "SEEKTABLE"],
    [4, "VORBIS_COMMENT"],
    [5, "CUESHEET"],
    [6, "PICTURE"],
  ]);
  let offset = 4;
  let isLast = false;

  while (!isLast && offset + 4 <= buffer.length) {
    const header = buffer[offset];
    isLast = Boolean(header & 0x80);
    const type = header & 0x7f;
    const length = buffer.readUIntBE(offset + 1, 3);
    const blockName = blockNames.get(type) || `UNKNOWN_${type}`;

    if (type !== 0 && type !== 1) {
      addIssue(issues, file, `FLAC metadata block found: ${blockName}`);
    }

    offset += 4 + length;
  }

  return true;
}

function checkLooseMetadataStrings(buffer, file, issues) {
  const haystack = buffer.toString("latin1");
  const blocked = ["C2PA", "Exif", "exif", "XMP", "xmp", "GPS", "gps", "IPTC"];
  for (const needle of blocked) {
    if (haystack.includes(needle)) {
      addIssue(issues, file, `Possible image metadata string found: ${needle}`);
      return;
    }
  }
}

function checkBuffer(buffer, file, issues, extension = path.extname(file).toLowerCase()) {
  if (checkPng(buffer, file, issues)) return;
  if (checkJpeg(buffer, file, issues)) return;
  if (checkWebp(buffer, file, issues)) return;
  if (checkIco(buffer, file, issues)) return;
  if (checkSvg(buffer, file, issues)) return;
  if (checkFlac(buffer, file, issues)) return;

  if ([".avif", ".gif", ".tif", ".tiff"].includes(extension)) {
    checkLooseMetadataStrings(buffer, file, issues);
  }
}

function checkFile(root, file, issues) {
  checkBuffer(fs.readFileSync(path.join(root, file)), file, issues);
}

function checkInlineDataImages(root, files, issues) {
  const dataImagePattern = /data:image\/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)/g;

  for (const file of files) {
    if (mediaExtensions.has(path.extname(file).toLowerCase())) continue;

    let text;
    try {
      text = fs.readFileSync(path.join(root, file), "utf8");
    } catch {
      continue;
    }

    for (const match of text.matchAll(dataImagePattern)) {
      const line = text.slice(0, match.index).split("\n").length;
      const imageType = match[1].toLowerCase();
      const extension = imageType === "jpeg" ? ".jpg" : `.${imageType}`;
      const label = `${file}:${line} inline image/${imageType}`;
      checkBuffer(Buffer.from(match[2], "base64"), label, issues, extension);
    }
  }
}

const root = repoRoot();
const scannedFiles = process.argv.length > 2 ? cliMediaFiles(root) : defaultFiles(root);
const mediaFiles = scannedFiles.filter((file) => mediaExtensions.has(path.extname(file).toLowerCase()));
const issues = [];

for (const file of mediaFiles) {
  checkFile(root, file, issues);
}
checkInlineDataImages(root, scannedFiles, issues);

if (issues.length > 0) {
  console.error("Media metadata check failed:");
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.message}`);
  }
  console.error(
    "\nStrip metadata before pushing. ImageMagick can usually clean images with `convert input -strip output`; FLAC files can be cleaned with `metaflac --dont-use-padding --remove-all file.flac`.",
  );
  process.exit(1);
}

console.log(
  `Media metadata check passed for ${mediaFiles.length} media file${mediaFiles.length === 1 ? "" : "s"}.`,
);
