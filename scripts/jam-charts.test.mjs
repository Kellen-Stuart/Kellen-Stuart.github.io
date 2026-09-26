import assert from "node:assert/strict";
import test from "node:test";
import {
  getChordLayoutUnits,
  getChordWords,
  parseChordLine,
} from "../src/lib/jam/chordLyrics.js";
import { getRhythmChordRuns, strumPattern } from "../src/lib/jam/rhythm.js";
import { validateChart } from "../src/lib/jam/validateChart.js";
import { compileRhythmNotation } from "../src/lib/jam/rhythmNotation.js";
import {
  createCatalogSong,
  getJamSongs,
  hasJamSongTab,
} from "../src/data/jamSongs.js";

test("an existing catalog entry becomes charted through its chart property", () => {
  const metadata = {
    artist: "Test Artist",
    title: "Test Song",
    tuning: "E Standard",
    summary: "A jam cue",
  };
  const chart = {
    tempo: 90,
    timeSignature: "4/4",
    defaultScrollSpeed: 7,
    stringLabels: ["E", "A", "D", "G", "B", "e"],
    chords: { Am: { frets: ["x", 0, 2, 2, 1, 0], showAboveChart: true } },
    sections: [
      {
        id: "quick-chart",
        role: "quick",
        title: "Quick Chart",
        blocks: [{ type: "chordLyrics", lines: ["[Am] [G]"] }],
      },
    ],
  };
  const catalogOnly = createCatalogSong(metadata);
  const charted = createCatalogSong({ ...metadata, chart });
  assert.equal(hasJamSongTab(catalogOnly), false);
  assert.equal(hasJamSongTab(charted), true);
  assert.equal(charted.slug, catalogOnly.slug);
  for (const [key, value] of Object.entries(metadata))
    assert.deepEqual(charted[key], value);
  for (const [key, value] of Object.entries(chart))
    assert.deepEqual(charted[key], value);
  assert.deepEqual(validateChart(charted), []);
});

test("chord markers anchor to the exact next character, including mid-word", () => {
  assert.deepEqual(parseChordLine("Before [Am]sun[G]light fades"), {
    lyric: "Before sunlight fades",
    chords: [
      { name: "Am", offset: 7 },
      { name: "G", offset: 10 },
    ],
  });
  assert.deepEqual(getChordWords("Before [Am]sun[G]light fades"), [
    { lyric: "Before ", chords: [] },
    {
      lyric: "sunlight ",
      chords: [
        { name: "Am", prefix: "" },
        { name: "G", prefix: "sun" },
      ],
    },
    { lyric: "fades", chords: [] },
  ]);
});

test("playing cues stay with chord anchors and out of the lyrics", () => {
  assert.deepEqual(parseChordLine("A [G6/F#|arpeggiate]held word"), {
    lyric: "A held word",
    chords: [{ name: "G6/F#", offset: 2, annotation: "arpeggiate" }],
  });
  assert.deepEqual(getChordWords("sun[Am|let ring]light"), [
    {
      lyric: "sunlight",
      chords: [{ name: "Am", prefix: "sun", annotation: "let ring" }],
    },
  ]);
  assert.deepEqual(getChordWords("[Em] [Am|let ring]"), [
    { lyric: " ", chords: [{ name: "Em", prefix: "" }] },
    { lyric: "", chords: [{ name: "Am", prefix: "", annotation: "let ring" }] },
  ]);
  const song = structuredClone(
    getJamSongs().find((song) => song.slug === "the-cranberries-zombie"),
  );
  song.sections[0].blocks[0].lines.push("[G6/F#|arpeggiate]word");
  assert.deepEqual(validateChart(song), []);
  song.sections[0].blocks[0].lines.push("[Unknown|let ring]word");
  assert.ok(
    validateChart(song).some((error) =>
      error.includes("Unknown chord: Unknown"),
    ),
  );
});

test("annotated chords share a continuous lyric phrase without crossing another chord", () => {
  const line = "[G]they're [Am|arpeggiate]still singing, with their [C]band";
  const units = getChordLayoutUnits(line);
  assert.deepEqual(units, [
    { lyric: "they're ", chords: [{ name: "G", prefix: "" }] },
    {
      lyric: "still singing, with their ",
      chords: [{ name: "Am", prefix: "", annotation: "arpeggiate" }],
    },
    { lyric: "band", chords: [{ name: "C", prefix: "" }] },
  ]);
  assert.equal(
    units.map((unit) => unit.lyric).join(""),
    parseChordLine(line).lyric,
  );
  assert.deepEqual(getChordLayoutUnits("o[Am|arpeggiate]ver the hill"), [
    {
      lyric: "over the hill",
      chords: [{ name: "Am", prefix: "o", annotation: "arpeggiate" }],
    },
  ]);
  assert.deepEqual(
    getChordLayoutUnits("[Am|let ring] [G]"),
    getChordWords("[Am|let ring] [G]"),
  );
  assert.deepEqual(
    getChordLayoutUnits("[Am]A long unannotated phrase"),
    getChordWords("[Am]A long unannotated phrase"),
  );
});

test("lyric wrapping preserves whitespace, pickups, punctuation, and trailing chords", () => {
  for (const line of [
    "  Before [Am]sunlight,  [G]we sing! [C]",
    "[Em]One very long phrase with many words before [C]another chord",
    "[Am]sing[G]ing",
    "[Am][G]",
    "  [Am]  [G] ",
    "[Am]écho [G]🎸",
  ]) {
    assert.equal(
      getChordWords(line)
        .map((word) => word.lyric)
        .join(""),
      parseChordLine(line).lyric,
      line,
    );
    assert.deepEqual(
      getChordWords(line).flatMap((word) =>
        word.chords.map((chord) => chord.name),
      ),
      parseChordLine(line).chords.map((chord) => chord.name),
      line,
    );
  }
  const words = getChordWords("A [Am]very long phrase without another change");
  assert.ok(words.length > 5, "A phrase must wrap at individual words.");
  assert.deepEqual(getChordWords("[Am] [G]"), [
    { lyric: " ", chords: [{ name: "Am", prefix: "" }] },
    { lyric: "", chords: [{ name: "G", prefix: "" }] },
  ]);
});

test("written hyphens allow sung syllables to wrap without stacking every chord", () => {
  const words = getChordWords("[Am]Ooh-[G]ooh-[C]ooh");
  assert.deepEqual(
    words.map((word) => word.lyric),
    ["Ooh-", "ooh-", "ooh"],
  );
  assert.ok(words.every((word) => word.chords.length === 1));
  assert.equal(getChordWords("sun[G]light").length, 1);
});

test("patterns distinguish sustain, rest, muted attack, strokes, and accents", () => {
  const pattern = strumPattern("D-rx --U-", ["Am", "Am", "G"], {
    accents: [0, 6],
  });
  assert.equal(pattern.timeSignature, "2/4");
  assert.deepEqual(pattern.counts, ["1", "e", "&", "a", "2", "e", "&", "a"]);
  assert.deepEqual(pattern.events[1], { hold: true });
  assert.deepEqual(pattern.events[2], { rest: true });
  assert.deepEqual(pattern.events[3], { mute: true, chord: "Am" });
  assert.deepEqual(pattern.events[6], {
    stroke: "U",
    chord: "G",
    accent: true,
  });
});

test("invalid rhythms fail instead of silently shifting chords or subdivisions", () => {
  assert.throws(
    () => strumPattern("D--- DD-", ["Am", "G", "G"]),
    /equally sized/,
  );
  assert.throws(() => strumPattern("D?--", ["Am"]), /Unknown strum/);
  assert.throws(() => strumPattern("DU", ["Am"]), /2 chord IDs/);
  assert.throws(() => strumPattern("D-", ["Am", "G"]), /1 chord IDs/);
  assert.throws(
    () => strumPattern("D---", ["Am"], { accents: [1] }),
    /Accents/,
  );
  assert.throws(
    () => strumPattern("D---", ["Am"], { accents: [4] }),
    /Accents/,
  );
});

test("chord labels span holds and repeated strokes, ending at the next change", () => {
  const { events } = strumPattern("D--- D-D- ---- D-DU", [
    "F#",
    "F#",
    "F#7add11",
    "F#7add11",
    "F#7add11",
    "F#7add11",
  ]);
  assert.deepEqual(getRhythmChordRuns(events), [
    { chord: "F#", start: 0, length: 6 },
    { chord: "F#7add11", start: 6, length: 10 },
  ]);
});

test("all published charts have valid chords, anchors, roles, shapes, and rhythm grids", () => {
  for (const song of getJamSongs().filter(hasJamSongTab)) {
    assert.deepEqual(validateChart(song), [], song.slug);
  }
});

test("chart validation catches authoring mistakes with useful locations", () => {
  const song = structuredClone(
    getJamSongs().find((song) => song.slug === "alice-in-chains-rooster"),
  );
  song.sections[0].blocks[0].lines.push("[Unknown]word", "[Broken", {
    text: "Cue",
    href: "#missing",
  });
  song.sections[1].blocks[0].events.pop();
  song.chords.Bad = { frets: [0, 1] };
  const errors = validateChart(song).join("\n");
  assert.match(
    errors,
    /alice-in-chains-rooster: Quick Chart.*Unknown chord: Unknown/,
  );
  assert.match(errors, /Unmatched/);
  assert.match(errors, /Missing link target/);
  assert.match(errors, /Counts and events/);
  assert.match(errors, /Expected six frets/);
});

test("Rooster retains the existing attack positions while removing duplicate explanations", () => {
  const song = getJamSongs().find(
    (song) => song.slug === "alice-in-chains-rooster",
  );
  assert.deepEqual(
    song.sections.map((section) => section.role),
    ["quick", "reference"],
  );
  const patterns = song.sections[1].blocks;
  assert.equal(patterns.length, 5);
  assert.ok(patterns.every((block) => block.type === "strum"));
  const attacks = (block) =>
    block.events.flatMap((event, index) => (event.stroke ? [index] : []));
  assert.deepEqual(attacks(patterns[0]), [0, 4, 6, 12, 14, 15]);
  assert.deepEqual(attacks(patterns[3]), [0, 1, 3, 4, 5, 6, 14, 15]);
  assert.deepEqual(attacks(patterns[4]), [0, 3, 4, 5, 6, 10, 12, 14]);
  assert.ok(song.chords["F#7add11"].showAboveChart);
});

test("staff conversion ties syncopation across beats without adding strums or accents", () => {
  const pattern = strumPattern(
    "D--- D-D- ---- D-DU",
    ["Am", "Am", "C", "C", "C", "C"],
    { accents: [0, 12] },
  );
  const { notes } = compileRhythmNotation(pattern);
  assert.deepEqual(
    notes.map((note) => [note.start, note.ticks]),
    [
      [0, 4],
      [4, 2],
      [6, 2],
      [8, 4],
      [12, 2],
      [14, 1],
      [15, 1],
    ],
  );
  assert.equal(notes[3].tieFromPrevious, true);
  assert.equal(notes[3].attack, false);
  assert.equal(notes[3].stroke, undefined);
  assert.equal(notes[3].chord, undefined);
  assert.equal(notes[3].accent, undefined);
  assert.deepEqual(
    notes.filter((note) => note.accent).map((note) => note.start),
    [0, 12],
  );
});

test("notation preserves the timeline of every Rooster pattern", () => {
  const song = getJamSongs().find(
    (song) => song.slug === "alice-in-chains-rooster",
  );
  for (const block of song.sections[1].blocks) {
    const { beats, notes } = compileRhythmNotation(block);
    const ticksPerSlot = (beats * 4) / block.events.length;
    const originalAttacks = block.events.flatMap((event, index) =>
      event.hold || event.rest
        ? []
        : [
            {
              at: index * ticksPerSlot,
              chord: event.chord,
              stroke: event.stroke,
              accent: Boolean(event.accent),
            },
          ],
    );
    assert.deepEqual(
      notes
        .filter((note) => note.attack)
        .map((note) => ({
          at: note.start,
          chord: note.chord,
          stroke: note.stroke,
          accent: note.accent,
        })),
      originalAttacks,
      block.label,
    );
    assert.equal(
      notes.reduce((total, note) => total + note.ticks, 0),
      beats * 4,
      block.label,
    );
    assert.ok(
      notes.every(
        (note) =>
          Math.floor(note.start / 4) ===
          Math.floor((note.start + note.ticks - 1) / 4),
      ),
      "No unsplit note may hide a beat boundary.",
    );
  }
});

test("staff conversion preserves dotted eighths, rests, and muted noteheads", () => {
  const { notes } = compileRhythmNotation(
    strumPattern("D--U rrrr x---", ["Am", "C", "G"]),
  );
  assert.deepEqual(
    notes.map((note) => [note.duration, note.dots, note.rest, note.mute]),
    [
      ["8", 1, false, false],
      ["16", 0, false, false],
      ["q", 0, true, false],
      ["q", 0, false, true],
    ],
  );
  assert.ok(notes.every((note) => !note.tieFromPrevious));
  const silent = compileRhythmNotation(strumPattern("rrrr rrrr", []));
  assert.ok(
    silent.notes.every(
      (note) => note.rest && !note.attack && !note.tieFromPrevious,
    ),
  );
});

test("quarter and eighth input grids retain their durations", () => {
  assert.deepEqual(
    compileRhythmNotation(strumPattern("D D D", ["A", "A", "A"])).notes.map(
      (note) => note.duration,
    ),
    ["q", "q", "q"],
  );
  assert.deepEqual(
    compileRhythmNotation(
      strumPattern("DU DU", ["A", "A", "A", "A"]),
    ).notes.map((note) => note.duration),
    ["8", "8", "8", "8"],
  );
});

test("staff conversion rejects ambiguous or malformed input instead of inventing timing", () => {
  assert.throws(
    () => compileRhythmNotation(strumPattern("----", [])),
    /unanchored sustain/,
  );
  const pattern = strumPattern("D---", ["Am"]);
  assert.throws(
    () => compileRhythmNotation({ ...pattern, timeSignature: "6/8" }),
    /quarter-note meter/,
  );
  assert.throws(
    () => compileRhythmNotation({ ...pattern, counts: ["1"] }),
    /matching count/,
  );
  assert.throws(
    () => compileRhythmNotation({ ...pattern, counts: ["1", "a", "e", "&"] }),
    /Count labels/,
  );
  assert.throws(
    () =>
      compileRhythmNotation({
        ...pattern,
        events: [{ rest: true, stroke: "D" }, ...pattern.events.slice(1)],
      }),
    /cannot also contain an attack/,
  );
});
