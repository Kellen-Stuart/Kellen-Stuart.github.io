import { getChordShape } from "../../data/guitarChords.js";
import { parseChordLine } from "./chordLyrics.js";
import { compileRhythmNotation } from "./rhythmNotation.js";

// Authoring checks, run by test:jam. Errors point to the song and section.
export function validateChart(song) {
  const errors = [];
  const fail = (location, message) =>
    errors.push(`${song.slug}: ${location}: ${message}`);
  const sections = song.sections ?? [];
  if (sections.filter((section) => section.role === "quick").length !== 1) {
    fail("sections", "Expected exactly one quick chart.");
  }
  const ids = new Set();
  for (const item of sections.flatMap((section) => [
    section,
    ...section.blocks,
  ])) {
    if (!item.id) continue;
    if (ids.has(item.id)) fail(item.id, "Duplicate anchor ID.");
    ids.add(item.id);
  }
  const checkChord = (name, location) => {
    if (!getChordShape(name, song.chords))
      fail(location, `Unknown chord: ${name}`);
  };
  for (const [name, shape] of Object.entries(song.chords ?? {})) {
    if (
      !Array.isArray(shape.frets) ||
      shape.frets.length !== 6 ||
      shape.frets.some(
        (fret) => fret !== "x" && (!Number.isInteger(fret) || fret < 0),
      )
    ) {
      fail(name, "Expected six frets, each a nonnegative integer or x.");
    }
    if (shape.fingers && shape.fingers.length !== 6)
      fail(name, "Expected six finger entries.");
  }
  for (const section of sections) {
    if (!["quick", "reference"].includes(section.role))
      fail(section.title, "Set role to quick or reference.");
    for (const [index, block] of section.blocks.entries()) {
      const location = `${section.title}, ${block.label ?? `block ${index + 1}`}`;
      if (block.type === "chordLyrics") {
        for (const line of block.lines) {
          if (typeof line === "string") {
            const { lyric, chords } = parseChordLine(line);
            if (/[\[\]]/.test(lyric))
              fail(location, "Unmatched or empty chord brackets.");
            chords.forEach((chord) => checkChord(chord.name, location));
          } else if (
            line.href?.startsWith("#") &&
            !ids.has(line.href.slice(1))
          ) {
            fail(location, `Missing link target: ${line.href}`);
          }
        }
      }
      if (block.type === "strum" || block.type === "rhythm") {
        try {
          compileRhythmNotation(block);
        } catch (error) {
          fail(location, error.message);
        }
        if (
          !block.counts?.length ||
          block.counts.length !== block.events?.length
        ) {
          fail(
            location,
            "Counts and events must have the same nonzero length.",
          );
        }
        for (const event of block.events ?? []) {
          if (event.chord) checkChord(event.chord, location);
          if (
            event.hold &&
            (event.rest || event.stroke || event.mute || event.accent)
          ) {
            fail(location, "A sustain cannot also be a rest or attack.");
          }
        }
      }
    }
  }
  return errors;
}
