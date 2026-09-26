import React from "react";
import {
  getChordLayoutUnits,
  parseChordLine,
} from "../../lib/jam/chordLyrics.js";
import ChordToken from "./ChordToken";

export default function ChordLyricsLine({ line, chordShapes, stringLabels }) {
  if (typeof line === "object") {
    return (
      <div
        className={`jam-chord-lyric-line ${line.href ? "is-cue-link" : "is-plain-cue"}`}
      >
        {line.href ? <a href={line.href}>{line.text}</a> : line.text}
      </div>
    );
  }

  const { chords, lyric } = parseChordLine(line);
  if (!chords.length) {
    return (
      <div
        className={`jam-chord-lyric-line ${line.trim() ? "is-section-label" : "is-spacer"}`}
      >
        {line}
      </div>
    );
  }

  const words = getChordLayoutUnits(line);
  const chordRows = Math.max(1, ...words.map((word) => word.chords.length));
  return (
    <div
      className={`jam-chord-lyric-line ${lyric.trim() ? "" : "is-chords-only"}`}
      style={{ "--chord-rows": chordRows }}
    >
      {words.map((word, index) => (
        <span
          className={`jam-chord-word ${word.chords.some((chord) => chord.annotation) ? "has-annotation" : ""}`}
          key={index}
        >
          {word.chords.map((chord, chordIndex) => (
            <span
              className="jam-chord-word-slot"
              key={chordIndex}
              style={{ gridRow: chordIndex + 1 }}
            >
              {/* The prefix uses the lyric's font metrics, so even a mid-word
                  change aligns without inserting space into the word. */}
              <span className="jam-chord-prefix" aria-hidden="true">
                {chord.prefix}
              </span>
              <ChordToken
                chordName={chord.name}
                chordShapes={chordShapes}
                stringLabels={stringLabels}
              />
              {chord.annotation && (
                <span className="jam-chord-annotation">
                  {" "}
                  ({chord.annotation})
                </span>
              )}
            </span>
          ))}
          <span className="jam-lyric-text" style={{ gridRow: chordRows + 1 }}>
            {word.lyric || "\u00a0"}
          </span>
        </span>
      ))}
    </div>
  );
}
