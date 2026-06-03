import React, { useState } from "react";
import { getChordShape } from "../../data/guitarChords";
import ChordDiagram from "./ChordDiagram";

function getLookupName(chordName) {
  return chordName.split(":")[0].split("@")[0];
}

function ChordToken({ chordName, chordShapes, stringLabels }) {
  const [isPinned, setIsPinned] = useState(false);
  const lookupName = getLookupName(chordName);
  const shape = getChordShape(lookupName, chordShapes);

  return (
    <span className={`jam-chord-token-wrap ${isPinned ? "is-pinned" : ""}`}>
      <button
        type="button"
        className="jam-chord-token"
        aria-label={`Show ${chordName} chord diagram`}
        aria-expanded={isPinned}
        onClick={() => setIsPinned((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsPinned(false);
          }
        }}
      >
        {chordName}
      </button>
      <span className="jam-chord-popover" role="tooltip">
        <ChordDiagram name={chordName} shape={shape} stringLabels={stringLabels} />
      </span>
    </span>
  );
}

export default ChordToken;
