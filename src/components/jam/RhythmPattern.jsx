import React, { useState } from "react";
import { getRhythmChordRuns } from "../../lib/jam/rhythm.js";
import ChordToken from "./ChordToken";
import RhythmStaff from "./RhythmStaff";

function Stroke({ event }) {
  if (event.hold) return <span aria-label="Sustain; no new stroke">—</span>;
  if (event.rest) return <span aria-label="Rest">R</span>;
  if (event.mute) return <span aria-label="Muted attack">×</span>;
  if (event.stroke !== "D" && event.stroke !== "U")
    return <span>{event.label ?? "Hit"}</span>;
  return (
    <svg
      className="jam-strum-symbol"
      viewBox="0 0 24 24"
      role="img"
      aria-label={event.stroke === "D" ? "Downstroke" : "Upstroke"}
    >
      <path
        d={
          event.stroke === "D"
            ? "M5 19 V5 H19 V19 M5 7 H19"
            : "M5 5 L12 19 L19 5"
        }
      />
    </svg>
  );
}

function RhythmCountGrid({ block, chordShapes }) {
  const chordRuns = getRhythmChordRuns(block.events);
  return (
    <div
      className="jam-strum-scroll"
      role="region"
      aria-label={`${block.label} count grid`}
      tabIndex={0}
    >
      <div
        className="jam-strum-grid"
        style={{
          gridTemplateColumns: `repeat(${block.counts.length}, minmax(2.2rem, 1fr))`,
        }}
      >
        {chordRuns.map((run) => (
          <span
            className="jam-strum-chord"
            key={run.start}
            style={{
              gridRow: 1,
              gridColumn: `${run.start + 1} / span ${run.length}`,
            }}
          >
            {block.chordLabels?.[run.chord] ??
              chordShapes?.[run.chord]?.label ??
              run.chord}
          </span>
        ))}
        {block.counts.map((count, index) => (
          <span
            className={`jam-strum-count ${/^\d+$/.test(count) ? "is-beat" : ""}`}
            key={`count-${index}`}
            style={{ gridRow: 2, gridColumn: index + 1 }}
          >
            {count}
          </span>
        ))}
        {block.events.map((event, index) => (
          <span
            className={`jam-strum-hit ${/^\d+$/.test(block.counts[index]) ? "is-beat" : ""}`}
            key={`hit-${index}`}
            style={{ gridRow: 3, gridColumn: index + 1 }}
          >
            <span
              className="jam-strum-accent"
              aria-label={event.accent ? "Accent" : undefined}
            >
              {event.accent ? ">" : "\u00a0"}
            </span>
            <Stroke event={event} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RhythmPattern({ block, chordShapes, stringLabels }) {
  const [view, setView] = useState("staff");
  const grid = <RhythmCountGrid block={block} chordShapes={chordShapes} />;
  return (
    <div className="jam-chart-block jam-rhythm-block" id={block.id}>
      <div className="jam-block-heading">
        <h3>{block.label}</h3>
        <div className="jam-rhythm-view-options">
          {block.timeSignature && <span>{block.timeSignature}</span>}
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label={`Rhythm display for ${block.label}`}
          >
            {[
              ["staff", "Staff"],
              ["grid", "Count grid"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`btn ${view === value ? "btn-dark" : "btn-outline-dark"}`}
                aria-pressed={view === value}
                onClick={() => setView(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {view === "staff" ? (
        <RhythmStaff block={block} chordShapes={chordShapes} fallback={grid} />
      ) : (
        grid
      )}
      {block.chordLabels && (
        <div className="jam-strum-chord-key">
          {Object.entries(block.chordLabels).map(([chord, label]) => (
            <span key={chord}>
              {label} ={" "}
              <ChordToken
                chordName={chord}
                chordShapes={chordShapes}
                stringLabels={stringLabels}
              />
            </span>
          ))}
        </div>
      )}
      {block.note && <p className="jam-rhythm-note">{block.note}</p>}
    </div>
  );
}
