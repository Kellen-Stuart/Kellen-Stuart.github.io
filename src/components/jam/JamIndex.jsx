import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { getJamSongs, hasJamSongTab } from "../../data/jamSongs";

function getTabStatus(song) {
  return hasJamSongTab(song) ? "Tabbed" : "No tab yet";
}

function getSongFilterTags(song) {
  return [
    song.guitarKey,
    ...(song.tags ?? []),
    getTabStatus(song),
  ].filter(Boolean);
}

function getSongFacts(song) {
  return [
    { label: song.tuning },
    { label: song.capo },
    { label: song.key },
    { label: song.tempo ? `${song.tempo} BPM` : null },
    { label: song.timeSignature },
    {
      label: song.difficulty ? `Difficulty ${song.difficulty}/10` : null,
      className: song.difficulty ? `is-difficulty difficulty-${song.difficulty}` : "",
    },
  ].filter((fact) => fact.label);
}

function matchesSearch(song, query) {
  const haystack = [
    song.artist,
    song.title,
    song.summary,
    song.tuning,
    song.guitarKey,
    song.key,
    song.tempo,
    song.timeSignature,
    song.capo,
    song.difficulty ? `difficulty ${song.difficulty}/10` : null,
    getTabStatus(song),
    ...(song.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

function matchesFilters(song, activeFilters) {
  if (activeFilters.length === 0) {
    return true;
  }

  const songFilters = getSongFilterTags(song);
  return activeFilters.every((filter) => songFilters.includes(filter));
}

function getFilterOptions(songs) {
  const keyFilters = new Set();
  const tagFilters = new Set();
  const statusFilters = new Set();

  songs.forEach((song) => {
    if (song.guitarKey) {
      keyFilters.add(song.guitarKey);
    }

    (song.tags ?? []).forEach((tag) => tagFilters.add(tag));
    statusFilters.add(getTabStatus(song));
  });

  return [
    ...[...keyFilters].sort().map((label) => ({ label, group: "Key" })),
    ...[...tagFilters].sort().map((label) => ({ label, group: "Tag" })),
    ...[...statusFilters].sort().map((label) => ({ label, group: "Status" })),
  ];
}

function JamIndex() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const songs = useMemo(() => getJamSongs(), []);
  const filterOptions = useMemo(() => getFilterOptions(songs), [songs]);
  const visibleSongs = useMemo(
    () =>
      songs.filter(
        (song) =>
          (!query.trim() || matchesSearch(song, query)) &&
          matchesFilters(song, activeFilters)
      ),
    [activeFilters, query, songs]
  );

  function toggleFilter(filter) {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filter)
        ? currentFilters.filter((currentFilter) => currentFilter !== filter)
        : [...currentFilters, filter]
    );
  }

  function clearFilters() {
    setActiveFilters([]);
    setQuery("");
  }

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

          <section className="jam-filter-panel mb-4" aria-label="Jam filters">
            <div className="jam-filter-heading">
              <p className="jam-control-label mb-0">Filters</p>
              {(activeFilters.length > 0 || query.trim()) && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={clearFilters}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="jam-filter-row">
              {filterOptions.map((filter) => (
                <button
                  type="button"
                  key={`${filter.group}-${filter.label}`}
                  className={`jam-filter-chip ${
                    activeFilters.includes(filter.label) ? "is-active" : ""
                  }`}
                  aria-pressed={activeFilters.includes(filter.label)}
                  onClick={() => toggleFilter(filter.label)}
                >
                  <span>{filter.label}</span>
                  <small>{filter.group}</small>
                </button>
              ))}
            </div>
          </section>

          <p className="jam-result-count" aria-live="polite">
            {visibleSongs.length} of {songs.length} songs
          </p>

          <div className="row g-3">
            {visibleSongs.map((song) => (
              <div className="col-md-6" key={song.slug}>
                <article
                  className={`jam-song-card h-100 ${
                    hasJamSongTab(song) ? "is-tabbed" : "is-not-tabbed"
                  }`}
                >
                  <header className="jam-song-card-header">
                    <h2 className="jam-song-title">{song.title}</h2>
                    <p className="jam-song-artist">{song.artist}</p>
                  </header>

                  <p className="jam-song-summary">{song.summary}</p>

                  <div className="jam-song-fact-row" aria-label="Song details">
                    {getSongFacts(song).map((fact) => (
                      <span className={fact.className} key={fact.label}>
                        {fact.label}
                      </span>
                    ))}
                  </div>

                  <div className="jam-tag-row" aria-label="Song filters">
                    {getSongFilterTags(song).map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={`jam-song-tag ${
                          activeFilters.includes(tag) ? "is-active" : ""
                        } ${tag === "Tabbed" ? "is-tabbed-status" : ""} ${
                          tag === "No tab yet" ? "is-missing-tab-status" : ""
                        }`}
                        aria-pressed={activeFilters.includes(tag)}
                        onClick={() => toggleFilter(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <footer className="jam-song-card-footer">
                    {hasJamSongTab(song) ? (
                      <Link
                        className="link jam-open-link"
                        to={`/jam/${song.slug}`}
                        aria-label={`Open tab: ${song.title} - ${song.artist}`}
                      >
                        Open tab
                      </Link>
                    ) : (
                      <span className="jam-no-tab-note">No tab on site yet</span>
                    )}
                  </footer>
                </article>
              </div>
            ))}
          </div>

          {visibleSongs.length === 0 && (
            <p className="jam-empty-state">No songs match that search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JamIndex;
