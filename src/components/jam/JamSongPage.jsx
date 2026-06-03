import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJamSongBySlug } from "../../data/jamSongs";
import JamChartRenderer from "./JamChartRenderer";

const minSpeedMultiplier = 0.25;
const maxSpeedMultiplier = 2.5;

function getStorageKey(slug) {
  return `jam-scroll-speed:${slug}`;
}

function clampSpeed(value) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(Math.max(value, minSpeedMultiplier), maxSpeedMultiplier);
}

function readStoredSpeed(slug) {
  if (typeof window === "undefined") {
    return 1;
  }

  const storedValue = Number(window.localStorage.getItem(getStorageKey(slug)));
  return clampSpeed(storedValue || 1);
}

function JamSongPage() {
  const { slug } = useParams();
  const song = getJamSongBySlug(slug);
  const [isScrolling, setIsScrolling] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(null);

  const pixelsPerSecond = useMemo(() => {
    if (!song) {
      return 0;
    }

    return Math.round(song.defaultScrollSpeed * speedMultiplier);
  }, [song, speedMultiplier]);

  useEffect(() => {
    if (!song) {
      return;
    }

    window.scrollTo({ top: 0 });
    setIsScrolling(false);
    setSpeedMultiplier(readStoredSpeed(song.slug));
  }, [song]);

  useEffect(() => {
    if (!song) {
      return;
    }

    window.localStorage.setItem(getStorageKey(song.slug), String(speedMultiplier));
  }, [song, speedMultiplier]);

  useEffect(() => {
    if (!isScrolling || pixelsPerSecond <= 0) {
      return undefined;
    }

    function tick(timestamp) {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsedSeconds = (timestamp - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = timestamp;

      const documentElement = document.documentElement;
      const maxScrollY = documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= maxScrollY - 2) {
        setIsScrolling(false);
        return;
      }

      window.scrollBy({ top: pixelsPerSecond * elapsedSeconds, behavior: "auto" });
      animationFrameRef.current = window.requestAnimationFrame(tick);
    }

    lastFrameTimeRef.current = null;
    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastFrameTimeRef.current = null;
    };
  }, [isScrolling, pixelsPerSecond]);

  if (!song) {
    return (
      <div className="container mt-4 mb-5 jam-page">
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-10 col-md-11 col-sm-12 col-12">
            <h1>Jam chart not found</h1>
            <p>The requested song chart does not exist.</p>
            <Link to="/jam" className="link">
              Back to Jam
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5 jam-page jam-song-page">
      <div className="row justify-content-center">
        <div className="col-xl-9 col-lg-10 col-md-11 col-sm-12 col-12">
          <header className="jam-song-header">
            <p className="jam-back-link mb-2">
              <Link to="/jam" className="link">
                Back to Jam
              </Link>
            </p>
            <h1>
              {song.artist} - {song.title} - {song.tuning} - {song.key}
            </h1>
            <div className="jam-song-facts" aria-label="Song details">
              <span>{song.tempo} BPM</span>
              <span>{song.timeSignature}</span>
              {song.chordNotation && <span>{song.chordNotation}</span>}
              <span>Default scroll {song.defaultScrollSpeed}px/s</span>
            </div>
          </header>

          <section className="jam-scroll-controls" aria-label="Auto-scroll controls">
            <div>
              <p className="jam-control-label mb-1">Auto-scroll</p>
              <button
                type="button"
                className={`btn ${isScrolling ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => setIsScrolling((current) => !current)}
              >
                {isScrolling ? "Pause" : "Start"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setIsScrolling(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Reset
              </button>
            </div>

            <div className="jam-speed-control">
              <label htmlFor="jam-scroll-speed">
                Speed {speedMultiplier.toFixed(2)}x ({pixelsPerSecond}px/s)
              </label>
              <input
                id="jam-scroll-speed"
                type="range"
                min={minSpeedMultiplier}
                max={maxSpeedMultiplier}
                step="0.05"
                value={speedMultiplier}
                onChange={(event) => setSpeedMultiplier(clampSpeed(Number(event.target.value)))}
              />
            </div>
          </section>

          <JamChartRenderer
            sections={song.sections}
            chordShapes={song.chords}
            stringLabels={song.stringLabels}
          />
        </div>
      </div>
    </div>
  );
}

export default JamSongPage;
