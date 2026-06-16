import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { getJamSongBySlug } from "../../data/jamSongs";
import JamChartRenderer from "./JamChartRenderer";

const minScrollSpeed = 1;
const maxScrollSpeed = 25;

function getStorageKey(slug) {
  return `jam-scroll-speed-px:${slug}`;
}

function clampScrollSpeed(value, fallbackSpeed = minScrollSpeed) {
  if (!Number.isFinite(value)) {
    return fallbackSpeed;
  }

  return Math.min(Math.max(value, minScrollSpeed), maxScrollSpeed);
}

function readStoredSpeed(slug, fallbackSpeed) {
  if (typeof window === "undefined") {
    return fallbackSpeed;
  }

  const storedValue = Number(window.localStorage.getItem(getStorageKey(slug)));
  return clampScrollSpeed(storedValue || fallbackSpeed, fallbackSpeed);
}

function JamSongPage() {
  const { slug } = useParams();
  const song = getJamSongBySlug(slug);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pixelsPerSecond, setPixelsPerSecond] = useState(minScrollSpeed);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(null);
  const pendingScrollPixelsRef = useRef(0);

  useEffect(() => {
    if (!song) {
      return;
    }

    window.scrollTo({ top: 0 });
    setIsScrolling(false);
    setPixelsPerSecond(readStoredSpeed(song.slug, song.defaultScrollSpeed));
  }, [song]);

  useEffect(() => {
    if (!song) {
      return;
    }

    window.localStorage.setItem(getStorageKey(song.slug), String(pixelsPerSecond));
  }, [song, pixelsPerSecond]);

  useEffect(() => {
    if (!isScrolling || pixelsPerSecond <= 0) {
      return undefined;
    }

    function tick(timestamp) {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsedSeconds = Math.min((timestamp - lastFrameTimeRef.current) / 1000, 0.25);
      lastFrameTimeRef.current = timestamp;

      const documentElement = document.documentElement;
      const maxScrollY = documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= maxScrollY - 2) {
        setIsScrolling(false);
        return;
      }

      pendingScrollPixelsRef.current += pixelsPerSecond * elapsedSeconds;

      const scrollPixels = Math.trunc(pendingScrollPixelsRef.current);
      if (scrollPixels > 0) {
        pendingScrollPixelsRef.current -= scrollPixels;
        window.scrollBy({ top: scrollPixels, behavior: "auto" });
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    }

    lastFrameTimeRef.current = null;
    pendingScrollPixelsRef.current = 0;
    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastFrameTimeRef.current = null;
      pendingScrollPixelsRef.current = 0;
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
              {song.title} - {song.artist}
            </h1>
            <div className="jam-song-facts" aria-label="Song details">
              <span>
                <strong>{song.tuning}</strong>
                <small>Tuning</small>
              </span>
              {song.key && (
                <span>
                  <strong>{song.key}</strong>
                  <small>Key</small>
                </span>
              )}
              {song.capo && (
                <span>
                  <strong>{song.capo}</strong>
                  <small>Capo</small>
                </span>
              )}
              {song.tempo && (
                <span>
                  <strong>{song.tempo} BPM</strong>
                  <small>Tempo</small>
                </span>
              )}
              {song.timeSignature && (
                <span>
                  <strong>{song.timeSignature}</strong>
                  <small>Time</small>
                </span>
              )}
              {song.difficulty && (
                <span>
                  <strong>Difficulty {song.difficulty}/10</strong>
                  <small>Difficulty</small>
                </span>
              )}
              {song.chordNotation && (
                <span>
                  <strong>{song.chordNotation}</strong>
                  <small>Notation</small>
                </span>
              )}
              <span>
                <strong>Default scroll {song.defaultScrollSpeed}px/s</strong>
                <small>Auto-scroll</small>
              </span>
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
                Speed {pixelsPerSecond}px/s
              </label>
              <input
                id="jam-scroll-speed"
                type="range"
                min={minScrollSpeed}
                max={maxScrollSpeed}
                step="1"
                value={pixelsPerSecond}
                onChange={(event) =>
                  setPixelsPerSecond(
                    clampScrollSpeed(Number(event.target.value), song.defaultScrollSpeed)
                  )
                }
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
