export const guitarChordShapes = {
  A: {
    frets: ["x", 0, 2, 2, 2, 0],
    fingers: ["", "", 1, 2, 3, ""],
  },
  Am: {
    frets: ["x", 0, 2, 2, 1, 0],
    fingers: ["", "", 2, 3, 1, ""],
  },
  C: {
    frets: ["x", 3, 2, 0, 1, 0],
    fingers: ["", 3, 2, "", 1, ""],
  },
  D: {
    frets: ["x", "x", 0, 2, 3, 2],
    fingers: ["", "", "", 1, 3, 2],
  },
  Em: {
    frets: [0, 2, 2, 0, 0, 0],
    fingers: ["", 2, 3, "", "", ""],
  },
  E7: {
    frets: [0, 2, 0, 1, 0, 0],
    fingers: ["", 2, "", 1, "", ""],
  },
  F: {
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: { fret: 1, fromString: 6, toString: 1 },
  },
  G: {
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [3, 2, "", "", "", 4],
  },
};

export function getChordShape(chordName, overrides = {}) {
  return overrides[chordName] ?? guitarChordShapes[chordName] ?? null;
}
