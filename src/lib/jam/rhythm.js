/**
 * Each space-separated group is one quarter-note beat. D/U = strokes,
 * - = sustain (no new attack), r = rest, x = muted attack. Chords correspond
 * to attacks only; accents are zero-based subdivision indexes.
 */
export function strumPattern(pattern, chords, { accents = [] } = {}) {
  const beats = pattern.trim().split(/\s+/);
  const subdivisions = beats[0].length;
  if (
    ![1, 2, 4].includes(subdivisions) ||
    beats.some((beat) => beat.length !== subdivisions)
  ) {
    throw new Error(
      "Use equally sized beat groups of 1, 2, or 4 subdivisions.",
    );
  }
  const symbols = beats.join("");
  if (/[^DUrx-]/.test(symbols))
    throw new Error("Unknown strum symbol. Use D, U, -, r, or x.");
  const attackCount = [...symbols].filter((symbol) =>
    "DUx".includes(symbol),
  ).length;
  if (chords.length !== attackCount || chords.some((chord) => !chord)) {
    throw new Error(`Expected ${attackCount} chord IDs for the strum attacks.`);
  }
  if (
    accents.some(
      (index) =>
        !Number.isInteger(index) || !"DUx".includes(symbols[index] ?? "?"),
    )
  ) {
    throw new Error("Accents must refer to an attack's subdivision index.");
  }
  const suffixes = { 1: [], 2: ["&"], 4: ["e", "&", "a"] };
  let chordIndex = 0;
  return {
    timeSignature: `${beats.length}/4`,
    counts: beats.flatMap((_, index) => [
      String(index + 1),
      ...suffixes[subdivisions],
    ]),
    events: [...symbols].map((symbol, index) => {
      if (symbol === "-") return { hold: true };
      if (symbol === "r") return { rest: true };
      return {
        ...(symbol === "x" ? { mute: true } : { stroke: symbol }),
        chord: chords[chordIndex++],
        ...(accents.includes(index) ? { accent: true } : {}),
      };
    }),
  };
}

// A chord label spans the subdivisions until the next chord change. This
// leaves room for long names without repeating them on every downstroke.
export function getRhythmChordRuns(events) {
  const runs = [];
  events.forEach((event, index) => {
    if (event.chord && event.chord !== runs.at(-1)?.chord) {
      runs.push({ chord: event.chord, start: index });
    }
  });
  return runs.map((run, index) => ({
    ...run,
    length: (runs[index + 1]?.start ?? events.length) - run.start,
  }));
}
