import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getJamSongs } from "../../data/jamSongs";

function matchesSearch(song, query) {
  const haystack = [
    song.artist,
    song.title,
    song.tuning,
    song.key,
    song.tempo,
    song.timeSignature,
    ...(song.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

function JamIndex() {
  const [query, setQuery] = useState("");
  const songs = useMemo(() => getJamSongs(), []);
  const visibleSongs = useMemo(
    () => songs.filter((song) => !query.trim() || matchesSearch(song, query)),
    [query, songs]
  );

  return (
    <div className="container mt-4 mb-5 jam-page">
      <div className="row justify-content-center">
        <div className="col-xl-9 col-lg-10 col-md-11 col-sm-12 col-12">
          <header className="jam-index-header mb-4">
            <h1 className="mb-2">Jam</h1>
            <p className="text-muted mb-0">
              Live-use charts for song structure, chords, riffs, and rhythm cues.
            </p>
          </header>

          <div className="jam-search mb-4">
            <label htmlFor="jam-search-input">Search songs</label>
            <input
              id="jam-search-input"
              type="search"
              className="form-control"
              value={query}
              placeholder="Artist, song, key, tuning, tag..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="row g-3">
            {visibleSongs.map((song) => (
              <div className="col-md-6" key={song.slug}>
                <article className="jam-song-card h-100">
                  <p className="jam-song-meta mb-2">
                    {song.artist} | {song.tuning} | {song.key} | {song.tempo} BPM
                  </p>
                  <h2 className="h5 mb-2">{song.title}</h2>
                  <p className="mb-3">{song.summary}</p>
                  <div className="jam-tag-row" aria-label="Song tags">
                    {song.tags?.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link
                    className="link stretched-link jam-open-link"
                    to={`/jam/${song.slug}`}
                    aria-label={`Open chart: ${song.artist} - ${song.title}`}
                  >
                    Open chart
                  </Link>
                </article>
              </div>
            ))}
          </div>

          {visibleSongs.length === 0 && (
            <p className="jam-empty-state">No jam charts match that search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JamIndex;
