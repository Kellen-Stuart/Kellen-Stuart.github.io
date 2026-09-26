import React, { useEffect, useRef, useState } from "react";

export default function RhythmStaff({ block, chordShapes, fallback }) {
  const containerRef = useRef(null);
  const scoreRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    let observer;
    let lastWidth;
    const score = scoreRef.current;
    setStatus("loading");
    async function load() {
      try {
        const renderer = await import("../../lib/jam/renderRhythmStaff.js");
        await renderer.prepareRhythmFonts();
        if (cancelled) return;
        const draw = () => {
          if (cancelled) return;
          const width = Math.floor(containerRef.current.clientWidth);
          if (width === lastWidth) return;
          try {
            renderer.renderRhythmStaff(score, block, chordShapes, width);
            lastWidth = width;
            setStatus("ready");
          } catch {
            score.replaceChildren();
            setStatus("error");
            observer?.disconnect();
          }
        };
        observer = new ResizeObserver(draw);
        observer.observe(containerRef.current);
        draw();
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
      observer?.disconnect();
      score.replaceChildren();
    };
  }, [block, chordShapes]);

  return (
    <div ref={containerRef} className="jam-rhythm-staff">
      {status === "loading" && <p role="status">Loading notation…</p>}
      <div
        className="jam-staff-scroll"
        hidden={status === "error"}
        role="region"
        aria-label={`${block.label} staff notation`}
        tabIndex={0}
      >
        <div ref={scoreRef} />
      </div>
      {status === "error" && (
        <>
          <p role="status">
            Staff notation is unavailable. The count grid is shown below.
          </p>
          {fallback}
        </>
      )}
    </div>
  );
}
