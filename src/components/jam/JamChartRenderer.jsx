import React from "react";
import ChordToken from "./ChordToken";
import ChordLyricsLine from "./ChordLyricsLine";
import RhythmPattern from "./RhythmPattern";

function ChordLyricsBlock({ block, chordShapes, stringLabels }) {
  return (
    <div className="jam-chart-block jam-chord-lyrics-block">
      {block.lines.map((line, index) => (
        <ChordLyricsLine
          key={`${typeof line === "string" ? line : line.text}-${index}`}
          line={line}
          chordShapes={chordShapes}
          stringLabels={stringLabels}
        />
      ))}
    </div>
  );
}

function TabBlock({ block }) {
  return (
    <div className="jam-chart-block jam-tab-block">
      <div className="jam-block-heading">
        <h3>{block.label}</h3>
        <div className="jam-block-meta">
          {block.timeSignature && <span>{block.timeSignature}</span>}
          {block.feel && <span>{block.feel}</span>}
        </div>
      </div>
      <pre className="jam-tab-lines">{block.lines.join("\n")}</pre>
      {block.rhythm && <pre className="jam-tab-rhythm">{block.rhythm}</pre>}
      {block.notes?.length > 0 && (
        <ul className="jam-block-notes">
          {block.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RhythmicLyricsBlock({ block, chordShapes, stringLabels }) {
  const columns = {
    gridTemplateColumns: `repeat(${block.counts.length}, minmax(3.2rem, 1fr))`,
  };

  return (
    <div className="jam-chart-block jam-rhythmic-lyrics-block">
      <div className="jam-block-heading">
        <h3>{block.label}</h3>
        <div className="jam-block-meta">
          <span>beat grid</span>
        </div>
      </div>
      <div className="jam-rhythmic-measures">
        {block.measures.map((measure, measureIndex) => (
          <div
            className="jam-rhythmic-measure-wrap"
            key={`measure-${measureIndex}`}
          >
            <span className="jam-rhythmic-measure-label">
              Bar {measureIndex + 1}
            </span>
            <div className="jam-rhythmic-measure" style={columns}>
              {block.counts.map((count, index) => (
                <span
                  className="jam-rhythmic-count"
                  key={`${count}-${measureIndex}-${index}`}
                >
                  {count}
                </span>
              ))}
              {measure.map((cell, index) => (
                <span
                  className={`jam-rhythmic-cell ${cell.chord ? "has-chord" : ""}`}
                  key={`cell-${measureIndex}-${index}`}
                >
                  <span className="jam-rhythmic-chord">
                    {cell.chord && (
                      <ChordToken
                        chordName={cell.chord}
                        chordShapes={chordShapes}
                        stringLabels={stringLabels}
                      />
                    )}
                  </span>
                  <span className="jam-rhythmic-lyric">
                    {cell.lyric || " "}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {block.note && <p className="jam-rhythm-note">{block.note}</p>}
    </div>
  );
}

function BarMapBlock({ block }) {
  return (
    <div className="jam-chart-block jam-bar-map-block">
      <div className="jam-block-heading">
        <h3>{block.label}</h3>
        <div className="jam-block-meta">
          <span>bar map</span>
        </div>
      </div>
      <div className="jam-bar-map-table" role="table" aria-label={block.label}>
        <div className="jam-bar-map-row jam-bar-map-head" role="row">
          <span role="columnheader">Bars</span>
          <span role="columnheader">Chords</span>
          <span role="columnheader">Cue</span>
        </div>
        {block.rows.map((row) => (
          <div
            className="jam-bar-map-row"
            role="row"
            key={`${row.bars}-${row.lyric ?? row.cue}`}
          >
            <span className="jam-bar-map-bars" role="cell">
              {row.bars}
            </span>
            <span className="jam-bar-map-chords" role="cell">
              {row.chords}
            </span>
            <span className="jam-bar-map-cue" role="cell">
              {row.lyric && (
                <span className="jam-bar-map-lyric">{row.lyric}</span>
              )}
              {row.cue && <span className="jam-bar-map-note">{row.cue}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StructureBlock({ block }) {
  return (
    <div className="jam-chart-block jam-structure-block">
      <ol>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

function renderBlock(block, chordShapes, stringLabels) {
  switch (block.type) {
    case "chordLyrics":
      return (
        <ChordLyricsBlock
          block={block}
          chordShapes={chordShapes}
          stringLabels={stringLabels}
        />
      );
    case "tab":
      return <TabBlock block={block} />;
    case "rhythm":
    case "strum":
      return (
        <RhythmPattern
          block={block}
          chordShapes={chordShapes}
          stringLabels={stringLabels}
        />
      );
    case "rhythmicLyrics":
      return (
        <RhythmicLyricsBlock
          block={block}
          chordShapes={chordShapes}
          stringLabels={stringLabels}
        />
      );
    case "barMap":
      return <BarMapBlock block={block} />;
    case "structure":
      return <StructureBlock block={block} />;
    default:
      return null;
  }
}

function JamChartRenderer({
  sections,
  chordShapes,
  stringLabels,
  quickChartRef,
}) {
  return (
    <div className="jam-chart">
      {sections.map((section) => (
        <section
          className={`jam-song-section ${section.role === "reference" ? "jam-reference-section" : ""}`}
          id={section.id}
          ref={section.role === "quick" ? quickChartRef : undefined}
          key={section.id ?? section.title}
        >
          <header className="jam-section-header">
            <h2>{section.title}</h2>
            {section.cue && <p>{section.cue}</p>}
          </header>
          {section.blocks.some(
            (block) => block.type === "strum" || block.type === "rhythm",
          ) && (
            <p className="jam-strum-legend">
              Strums: ⊓ down · V up · &gt; accent · — sustain · R rest · × muted
              attack
            </p>
          )}
          {section.blocks.map((block, index) => (
            <React.Fragment key={`${section.title}-${block.type}-${index}`}>
              {renderBlock(block, chordShapes, stringLabels)}
            </React.Fragment>
          ))}
        </section>
      ))}
    </div>
  );
}

export default JamChartRenderer;
