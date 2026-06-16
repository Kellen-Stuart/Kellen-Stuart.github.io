import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { getJamSongs, hasJamSongTab } from "../../data/jamSongs";

const filterGroupOrder = new Map([
  ["Tuning", 0],
  ["Key", 1],
  ["Tag", 2],
  ["Status", 3],
]);

function getTabStatus(song) {
  return hasJamSongTab(song) ? "Tabbed" : "No tab yet";
}

function createSongFilter(label, group, className = "") {
  if (!label) {
    return null;
  }

  return {
    label,
    group,
    value: `${group}:${label}`,
    className,
  };
}

function getSongFilterTags(song) {
  const tabStatus = getTabStatus(song);

  return [
    createSongFilter(song.tuning, "Tuning", "is-tuning"),
    createSongFilter(song.key, "Key", "is-key"),
    ...(song.tags ?? []).map((tag) => createSongFilter(tag, "Tag")),
    createSongFilter(
      tabStatus,
      "Status",
      tabStatus === "Tabbed" ? "is-tabbed-status" : "is-missing-tab-status"
    ),
  ].filter(Boolean);
}

function getSongFacts(song) {
  return [
    { label: song.capo },
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
    ...getSongFilterTags(song).map((filter) => `${filter.label} ${filter.group}`),
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
  return activeFilters.every((filter) =>
    songFilters.some((songFilter) => songFilter.value === filter)
  );
}

function getFilterOptions(songs) {
  const filters = new Map();

  songs.forEach((song) => {
    getSongFilterTags(song).forEach((filter) => {
      filters.set(filter.value, filter);
    });
  });

  return [...filters.values()].sort((a, b) => {
    const groupSort =
      (filterGroupOrder.get(a.group) ?? 99) - (filterGroupOrder.get(b.group) ?? 99);

    if (groupSort !== 0) {
      return groupSort;
    }

    return a.label.localeCompare(b.label);
  });
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

  function toggleFilter(filterValue) {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filterValue)
        ? currentFilters.filter((currentFilter) => currentFilter !== filterValue)
        : [...currentFilters, filterValue]
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
            <div>
              <h1 className="mb-2">Jam</h1>
              <p className="text-muted mb-0">
                Live-use charts for song structure, chords, riffs, and rhythm cues.
              </p>
            </div>
            <Link className="btn btn-outline-dark jam-print-link" to="/jam/print">
              <FontAwesomeIcon icon={faPrint} className="jam-button-icon" aria-hidden="true" />
              <span>Print</span>
            </Link>
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
                    activeFilters.includes(filter.value) ? "is-active" : ""
                  }`}
                  aria-pressed={activeFilters.includes(filter.value)}
                  onClick={() => toggleFilter(filter.value)}
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
            {visibleSongs.map((song) => {
              const songFacts = getSongFacts(song);
              const songFilters = getSongFilterTags(song);

              return (
                <div className="col-md-6" key={song.slug}>
                  <article
                    className={`jam-song-card h-100 ${
                      hasJamSongTab(song) ? "is-tabbed" : "is-not-tabbed"
                    }`}
                  >
                    {song.albumCover && (
                      <img
                        className="jam-album-cover"
                        src={song.albumCover}
                        alt={`${song.title} album cover`}
                        loading="lazy"
                      />
                    )}

                    <header className="jam-song-card-header">
                      <h2 className="jam-song-title">{song.title}</h2>
                      <p className="jam-song-artist">{song.artist}</p>
                    </header>

                    {songFacts.length > 0 && (
                      <div className="jam-song-fact-row" aria-label="Song details">
                        {songFacts.map((fact) => (
                          <span className={fact.className} key={fact.label}>
                            {fact.label}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="jam-tag-row" aria-label="Song filters">
                      {songFilters.map((filter) => (
                        <button
                          type="button"
                          key={filter.value}
                          className={`jam-song-tag ${filter.className} ${
                            activeFilters.includes(filter.value) ? "is-active" : ""
                          }`}
                          aria-pressed={activeFilters.includes(filter.value)}
                          onClick={() => toggleFilter(filter.value)}
                        >
                          <span>{filter.label}</span>
                          <small>{filter.group}</small>
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
              );
            })}
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
