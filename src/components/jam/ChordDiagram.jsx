import React from "react";

const defaultStringLabels = ["E", "A", "D", "G", "B", "e"];

function getStringX(index) {
  return 20 + index * 22;
}

function getStringIndex(stringNumber) {
  return 6 - stringNumber;
}

function getAutoBaseFret(frets) {
  const frettedNotes = frets.filter((fret) => Number.isFinite(fret) && fret > 0);

  if (frettedNotes.length === 0) {
    return 1;
  }

  const lowestFret = Math.min(...frettedNotes);
  return lowestFret <= 1 ? 1 : lowestFret;
}

function ChordDiagram({ name, shape, stringLabels = defaultStringLabels }) {
  if (!shape) {
    return (
      <div className="jam-chord-diagram jam-chord-diagram-missing">
        <strong>{name}</strong>
        <span>No diagram yet</span>
      </div>
    );
  }

  const baseFret = shape.baseFret ?? getAutoBaseFret(shape.frets);
  const fretCount = Math.max(4, Math.max(...shape.frets.filter(Number.isFinite)));
  const visibleFrets = Math.min(Math.max(fretCount - baseFret + 1, 4), 6);
  const topY = 34;
  const fretGap = 23;
  const bottomY = topY + visibleFrets * fretGap;

  return (
    <div className="jam-chord-diagram" aria-label={`${name} chord diagram`}>
      <strong className="jam-chord-diagram-title">{name}</strong>
      <svg viewBox="0 0 150 170" role="img" aria-hidden="true">
        {baseFret > 1 && (
          <text x="4" y={topY + fretGap * 0.65} className="jam-chord-base-fret">
            {baseFret}fr
          </text>
        )}

        {shape.frets.map((fret, index) => {
          const x = getStringX(index);
          return (
            <text
              key={`marker-${index}`}
              x={x}
              y="22"
              textAnchor="middle"
              className="jam-chord-string-marker"
            >
              {fret === "x" ? "x" : fret === 0 ? "o" : ""}
            </text>
          );
        })}

        {Array.from({ length: 6 }).map((_, index) => (
          <line
            key={`string-${index}`}
            x1={getStringX(index)}
            y1={topY}
            x2={getStringX(index)}
            y2={bottomY}
            className="jam-chord-string"
          />
        ))}

        {Array.from({ length: visibleFrets + 1 }).map((_, index) => (
          <line
            key={`fret-${index}`}
            x1={getStringX(0)}
            y1={topY + index * fretGap}
            x2={getStringX(5)}
            y2={topY + index * fretGap}
            className={index === 0 && baseFret === 1 ? "jam-chord-nut" : "jam-chord-fret"}
          />
        ))}

        {shape.barre && (
          <rect
            x={Math.min(
              getStringX(getStringIndex(shape.barre.fromString)),
              getStringX(getStringIndex(shape.barre.toString))
            ) - 7}
            y={topY + (shape.barre.fret - baseFret + 0.5) * fretGap - 7}
            width={
              Math.abs(
                getStringX(getStringIndex(shape.barre.fromString)) -
                  getStringX(getStringIndex(shape.barre.toString))
              ) + 14
            }
            height="14"
            rx="7"
            className="jam-chord-dot"
          />
        )}

        {shape.frets.map((fret, index) => {
          if (typeof fret !== "number" || fret === 0) {
            return null;
          }

          const x = getStringX(index);
          const y = topY + (fret - baseFret + 0.5) * fretGap;
          const finger = shape.fingers?.[index];

          return (
            <g key={`finger-${index}`}>
              <circle cx={x} cy={y} r="8" className="jam-chord-dot" />
              {finger && (
                <text x={x} y={y + 4} textAnchor="middle" className="jam-chord-finger">
                  {finger}
                </text>
              )}
            </g>
          );
        })}

        {stringLabels.map((label, index) => (
          <text
            key={`string-label-${index}`}
            x={getStringX(index)}
            y="162"
            textAnchor="middle"
            className="jam-chord-string-label"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default ChordDiagram;
