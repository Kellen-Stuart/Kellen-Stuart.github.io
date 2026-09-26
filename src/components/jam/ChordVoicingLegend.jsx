import React from "react";
import ChordDiagram from "./ChordDiagram";

export default function ChordVoicingLegend({ song }) {
  const voicings = Object.entries(song.chords ?? {}).filter(
    ([, shape]) => shape.showAboveChart,
  );
  if (!voicings.length) return null;
  return (
    <section className="jam-voicing-legend" aria-label="Voicings to remember">
      <h2>Voicings to remember</h2>
      <div className="jam-voicing-diagrams">
        {voicings.map(([name, shape]) => (
          <div className="jam-voicing-item" key={name}>
            <ChordDiagram
              name={shape.label ?? name}
              shape={shape}
              stringLabels={song.stringLabels}
            />
            {shape.note && <p>{shape.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
