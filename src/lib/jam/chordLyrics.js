// A bracket anchors a chord to the character immediately after it, including
// inside a word. Offsets refer to the lyric with bracket markers removed.
// An optional | separates a chord ID from a playing cue: [Am|let ring].
export function parseChordLine(line) {
  const chords = [];
  let lyric = "";
  let cursor = 0;
  for (const match of line.matchAll(/\[([^\]]+)\]/g)) {
    lyric += line.slice(cursor, match.index);
    const [name, ...cueParts] = match[1].split("|");
    const annotation = cueParts.join("|").trim();
    chords.push({
      name: name.trim(),
      offset: lyric.length,
      ...(annotation ? { annotation } : {}),
    });
    cursor = match.index + match[0].length;
  }
  lyric += line.slice(cursor);
  return { lyric, chords };
}

// Wrap at spaces or written hyphens, never between a chord and its lyric.
// Keep exact whitespace. Chord-only progressions need separate wrap units.
export function getChordWords(line) {
  const { lyric, chords } = parseChordLine(line);
  if (!lyric.trim() && chords.length) {
    const leading = chords[0].offset
      ? [{ lyric: lyric.slice(0, chords[0].offset), chords: [] }]
      : [];
    return [
      ...leading,
      ...chords.map((chord, index) => ({
        lyric: lyric.slice(chord.offset, chords[index + 1]?.offset),
        chords: [
          {
            name: chord.name,
            prefix: "",
            ...(chord.annotation ? { annotation: chord.annotation } : {}),
          },
        ],
      })),
    ];
  }
  const words = [...lyric.matchAll(/[^\s-]+-*\s*|-+\s*|\s+/g)].map((match) => ({
    lyric: match[0],
    start: match.index,
    chords: [],
  }));
  for (const chord of chords) {
    let word = words.find(
      ({ start, lyric: text }) =>
        chord.offset >= start && chord.offset < start + text.length,
    );
    if (!word) {
      word = { lyric: "", start: chord.offset, chords: [] };
      words.push(word);
    }
    word.chords.push({
      name: chord.name,
      prefix: lyric.slice(word.start, chord.offset),
      ...(chord.annotation ? { annotation: chord.annotation } : {}),
    });
  }
  return words.map(({ lyric: text, chords: anchors }) => ({
    lyric: text,
    chords: anchors,
  }));
}

// Let a chord cue share the width of its following lyric phrase instead of
// widening just its first word. Stop before the next chord anchor. The renderer
// allows these phrases to wrap internally, so they still fit narrow screens.
export function getChordLayoutUnits(line) {
  const units = [];
  for (const word of getChordWords(line)) {
    const previous = units.at(-1);
    if (
      !word.chords.length &&
      previous?.chords.some((chord) => chord.annotation)
    ) {
      previous.lyric += word.lyric;
    } else {
      units.push({ ...word });
    }
  }
  return units;
}
