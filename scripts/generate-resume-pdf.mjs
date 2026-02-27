import { access } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const distIndexPath = path.join(distDir, "index.html");
const outputPath = path.join(distDir, "Kellen-Stuart-Resume.pdf");
const host = "127.0.0.1";
const port = Number.parseInt(process.env.RESUME_PDF_PORT ?? "4173", 10);
const baseUrl = `http://${host}:${port}`;
const targetUrl = `${baseUrl}/print-resume?mode=pdf`;

async function waitForServerReady(timeoutMs = 30000) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(baseUrl, { method: "GET" });
      if (response.ok || response.status < 500) {
        return;
      }
    } catch (error) {
      lastError = error;
    }

    await delay(300);
  }

  throw new Error(
    `Timed out waiting for preview server at ${baseUrl}${
      lastError ? ` (${lastError.message})` : ""
    }`
  );
}

function startPreviewServer() {
  return spawn(
    "npx",
    [
      "vite",
      "preview",
      "--host",
      host,
      "--port",
      String(port),
      "--strictPort",
      "--outDir",
      "dist",
    ],
    {
      cwd: projectRoot,
      stdio: "inherit",
      env: {
        ...process.env,
        BROWSER: "none",
      },
    }
  );
}

function stopPreviewServer(serverProcess) {
  if (!serverProcess || serverProcess.exitCode !== null) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    serverProcess.once("exit", () => resolve());
    serverProcess.kill("SIGTERM");
  });
}

async function ensureBuildExists() {
  try {
    await access(distIndexPath);
  } catch {
    throw new Error(
      "Missing dist build output. Run `npm run build` before `npm run generate:resume-pdf`."
    );
  }
}

async function generatePdf() {
  await ensureBuildExists();
  const previewServer = startPreviewServer();

  try {
    await waitForServerReady();

    const browser = await chromium.launch({
      headless: true,
    });

    try {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 1800 },
      });
      const page = await context.newPage();

      await page.goto(targetUrl, {
        waitUntil: "networkidle",
      });

      await page.evaluate(async () => {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      });

      await page.emulateMedia({ media: "print" });

      await page.pdf({
        path: outputPath,
        format: "Letter",
        printBackground: true,
        displayHeaderFooter: false,
        margin: {
          top: "0.5in",
          right: "0.5in",
          bottom: "0.5in",
          left: "0.5in",
        },
      });
    } finally {
      await browser.close();
    }
  } finally {
    await stopPreviewServer(previewServer);
  }
}

function formatErrorMessage(error) {
  const message = error?.message ?? String(error);

  if (message.includes("Executable doesn't exist")) {
    return `${message}\nHint: run \`npx playwright install chromium\``;
  }

  if (message.includes("error while loading shared libraries")) {
    return `${message}\nHint: on Linux run \`npx playwright install --with-deps chromium\``;
  }

  return message;
}

generatePdf()
  .then(() => {
    process.stdout.write(`Generated ${outputPath}\n`);
  })
  .catch((error) => {
    process.stderr.write(
      `Failed to generate resume PDF: ${formatErrorMessage(error)}\n`
    );
    process.exitCode = 1;
  });
