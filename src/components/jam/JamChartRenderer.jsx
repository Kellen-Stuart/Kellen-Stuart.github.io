import React from "react";
import ChordToken from "./ChordToken";

function parseChordLine(line) {
  const parts = [];
  const chordPattern = /\[([^\]]+)\]/g;
  let currentChord = null;
  let lastIndex = 0;
  let match;

  while ((match = chordPattern.exec(line)) !== null) {
    if (match.index > lastIndex || currentChord) {
      parts.push({
        chordName: currentChord,
        lyric: line.slice(lastIndex, match.index),
      });
    }

    currentChord = match[1];
    lastIndex = chordPattern.lastIndex;
  }

  if (lastIndex < line.length || currentChord) {
    parts.push({
      chordName: currentChord,
      lyric: line.slice(lastIndex),
    });
  }

  return parts.length > 0 ? parts : [{ chordName: null, lyric: line }];
}

function ChordLyricsLine({ line, chordShapes, stringLabels }) {
  if (typeof line === "object" && line.href) {
    return (
      <div className="jam-chord-lyric-line is-cue-link">
        <a href={line.href}>{line.text}</a>
      </div>
    );
  }

  if (typeof line === "object") {
    return <div className="jam-chord-lyric-line is-plain-cue">{line.text}</div>;
  }

  const parsedLine = parseChordLine(line);
  const hasChord = parsedLine.some((part) => part.chordName);

  if (!hasChord) {
    return (
      <div
        className={`jam-chord-lyric-line ${
          line.trim() ? "is-section-label" : "is-spacer"
        }`}
      >
        {line}
      </div>
    );
  }

  return (
    <div className="jam-chord-lyric-line">
      {parsedLine.map((part, index) => (
        <span className="jam-chord-lyric-cell" key={`${part.chordName ?? "lyric"}-${index}`}>
          <span className="jam-chord-slot">
            {part.chordName && (
              <ChordToken
                chordName={part.chordName}
                chordShapes={chordShapes}
                stringLabels={stringLabels}
              />
            )}
          </span>
          <span className="jam-lyric-text">{part.lyric || " "}</span>
        </span>
      ))}
    </div>
  );
}

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

function RhythmEvent({ event }) {
  const label = event.hold ? "-" : event.rest ? "rest" : event.stroke ?? event.label ?? "hit";

  return (
    <div
      className={[
        "jam-rhythm-event",
        event.hold ? "is-held" : "",
        event.rest ? "is-rest" : "",
        event.mute ? "is-muted" : "",
        event.accent ? "is-accented" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="jam-rhythm-chord-label">{event.chord}</span>
      <span className="jam-rhythm-accent">{event.accent ? ">" : ""}</span>
      <span className="jam-rhythm-notehead">
        {event.hold ? "-" : event.rest ? "R" : event.mute ? "x" : ""}
      </span>
      {!event.rest && !event.hold && <span className="jam-rhythm-stem" aria-hidden="true" />}
      <span className="jam-rhythm-event-label">{label}</span>
    </div>
  );
}

function CompactStrumGrid({ block }) {
  const columns = {
    gridTemplateColumns: `repeat(${block.counts.length}, minmax(1.85rem, 1fr))`,
  };

  return (
    <div className="jam-compact-strum" aria-label={`${block.label} compact notation`}>
      {block.pattern && (
        <div className="jam-compact-pattern">
          <span>Pattern</span>
          <code>{block.pattern}</code>
        </div>
      )}
      <div className="jam-compact-strum-grid" style={columns}>
        {block.counts.map((count, index) => (
          <span
            className={`jam-compact-count ${index === block.counts.length - 1 ? "is-last" : ""}`}
            key={`compact-count-${count}-${index}`}
          >
            {count}
          </span>
        ))}
        {block.events.map((event, index) => (
          <span
            className={[
              "jam-compact-hit",
              event.hold ? "is-held" : "",
              event.rest ? "is-rest" : "",
              event.accent ? "is-accented" : "",
              index === block.events.length - 1 ? "is-last" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={`compact-hit-${index}`}
          >
            {event.hold || event.rest ? "-" : event.stroke ?? "x"}
          </span>
        ))}
        {block.events.map((event, index) => (
          <span
            className={`jam-compact-chord ${index === block.events.length - 1 ? "is-last" : ""}`}
            key={`compact-chord-${index}`}
          >
            {event.chord || " "}
          </span>
        ))}
      </div>
    </div>
  );
}

function RhythmBlock({ block }) {
  const columns = {
    gridTemplateColumns: `repeat(${block.counts.length}, minmax(2.25rem, 1fr))`,
  };

  return (
    <div className="jam-chart-block jam-rhythm-block" id={block.id}>
      <div className="jam-block-heading">
        <h3>{block.label}</h3>
        <div className="jam-block-meta">
          <span>{block.type === "strum" ? "strum pattern" : "rhythm"}</span>
        </div>
      </div>
      {block.compact && <CompactStrumGrid block={block} />}
      <div className="jam-rhythm-grid" style={columns}>
        {block.events.map((event, index) => (
          <RhythmEvent key={`${block.counts[index]}-${index}`} event={event} />
        ))}
        {block.counts.map((count, index) => (
          <span className="jam-rhythm-count" key={`${count}-${index}`}>
            {count}
          </span>
        ))}
      </div>
      {block.note && <p className="jam-rhythm-note">{block.note}</p>}
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
          <div className="jam-rhythmic-measure-wrap" key={`measure-${measureIndex}`}>
            <span className="jam-rhythmic-measure-label">Bar {measureIndex + 1}</span>
            <div className="jam-rhythmic-measure" style={columns}>
              {block.counts.map((count, index) => (
                <span className="jam-rhythmic-count" key={`${count}-${measureIndex}-${index}`}>
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
                  <span className="jam-rhythmic-lyric">{cell.lyric || " "}</span>
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
          <div className="jam-bar-map-row" role="row" key={`${row.bars}-${row.lyric ?? row.cue}`}>
            <span className="jam-bar-map-bars" role="cell">
              {row.bars}
            </span>
            <span className="jam-bar-map-chords" role="cell">
              {row.chords}
            </span>
            <span className="jam-bar-map-cue" role="cell">
              {row.lyric && <span className="jam-bar-map-lyric">{row.lyric}</span>}
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
      return <RhythmBlock block={block} />;
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

function JamChartRenderer({ sections, chordShapes, stringLabels }) {
  return (
    <div className="jam-chart">
      {sections.map((section) => (
        <section
          className={`jam-song-section ${section.dividerAfter ? "has-after-divider" : ""}`}
          key={section.title}
        >
          <header className="jam-section-header">
            <h2>{section.title}</h2>
            {section.cue && <p>{section.cue}</p>}
          </header>
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
