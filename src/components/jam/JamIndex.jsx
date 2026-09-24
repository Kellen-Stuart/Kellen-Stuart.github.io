import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
import { getJamSongs, hasJamSongTab, jamTags } from "../../data/jamSongs";

import {
  getFilterOptions,
  getSongFilters,
  jamFilterGroups,
  matchesFilters,
  matchesSearch,
} from "../../data/jamSongFilters";

function FilterChip({
  filter,
  activeFilters,
  onToggle,
  card = false,
  remove = false,
}) {
  const groupLabel = jamFilterGroups.find(
    ({ id }) => id === filter.group,
  ).label;
  const isSelected = activeFilters.includes(filter.value);
  return (
    <button
      type="button"
      className={`${card ? "jam-song-tag" : "jam-filter-chip"} ${filter.className} ${isSelected ? "is-active" : ""}`}
      aria-pressed={remove ? undefined : isSelected}
      aria-label={`${remove ? "Remove filter" : "Filter by"} ${groupLabel}: ${filter.label}`}
      onClick={() => onToggle(filter.value)}
    >
      {isSelected && !remove && (
        <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
      )}
      <span>{filter.label}</span>
      {(remove ||
        (card && filter.value !== `practice:${jamTags.stageReady}`)) && (
        <small>{groupLabel}</small>
      )}
      {remove && <span aria-hidden="true">×</span>}
    </button>
  );
}

function FilterGroup({ group, activeFilters, onToggle }) {
  return (
    <fieldset className="jam-filter-group">
      <legend>{group.label}</legend>
      {group.id === "playedWith" ? (
        <p className="jam-filter-help">
          Show songs you've played with each selected person. Click a name again
          to remove it.
        </p>
      ) : (
        group.matchAll && (
          <p className="jam-filter-help">Matches every selected tag.</p>
        )
      )}
      <div className="jam-filter-row">
        {group.options.map((filter) => (
          <FilterChip
            key={filter.value}
            filter={filter}
            activeFilters={activeFilters}
            onToggle={onToggle}
          />
        ))}
      </div>
    </fieldset>
  );
}

function SongDetailList({
  label,
  filters,
  activeFilters,
  onToggle,
  stacked = false,
}) {
  if (filters.length === 0) return null;
  return (
    <div className="jam-song-detail-section">
      <p className="jam-song-details-label">{label}</p>
      <ul
        className={`jam-detail-list ${stacked ? "is-stacked" : ""}`}
        aria-label={label}
      >
        {filters.map((filter) => {
          const isSelected = activeFilters.includes(filter.value);
          return (
            <li key={filter.value}>
              <button
                type="button"
                className={`jam-detail-item ${isSelected ? "is-active" : ""}`}
                aria-label={`Filter by ${label}: ${filter.label}`}
                aria-pressed={isSelected}
                onClick={() => onToggle(filter.value)}
              >
                {isSelected && (
                  <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
                )}
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getSongFacts(song) {
  return [
    { label: song.capo },
    { label: song.tempo ? `${song.tempo} BPM` : null },
    { label: song.timeSignature },
    {
      label: song.difficulty ? `Difficulty ${song.difficulty}/10` : null,
      className: song.difficulty
        ? `is-difficulty difficulty-${song.difficulty}`
        : "",
    },
  ].filter((fact) => fact.label);
}

function JamIndex() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const songs = useMemo(() => getJamSongs(), []);
  const filterGroups = useMemo(() => getFilterOptions(songs), [songs]);
  const stageReadyFilter = filterGroups
    .find((group) => group.id === "practice")
    ?.options.find(
      (filter) => filter.value === `practice:${jamTags.stageReady}`,
    );
  const moreFilterGroups = filterGroups
    .filter((group) => group.advanced)
    .map((group) => ({
      ...group,
      options: group.options.filter((filter) => filter !== stageReadyFilter),
    }))
    .filter((group) => group.options.length > 0);
  const selectedFilters = filterGroups.flatMap((group) =>
    group.options.filter((filter) => activeFilters.includes(filter.value)),
  );
  const advancedFilterCount = moreFilterGroups
    .flatMap((group) => group.options)
    .filter((filter) => activeFilters.includes(filter.value)).length;
  const visibleSongs = useMemo(
    () =>
      songs.filter(
        (song) =>
          (!query.trim() || matchesSearch(song, query)) &&
          matchesFilters(song, activeFilters),
      ),
    [activeFilters, query, songs],
  );

  function toggleFilter(filterValue) {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filterValue)
        ? currentFilters.filter(
            (currentFilter) => currentFilter !== filterValue,
          )
        : [...currentFilters, filterValue],
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
                Songs we've played together. Find a familiar tune for this jam.
              </p>
            </div>
            <Link
              className="btn btn-outline-dark jam-print-link"
              to="/jam/print"
            >
              <FontAwesomeIcon
                widthAuto
                icon={faPrint}
                className="jam-button-icon"
                aria-hidden="true"
              />
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
              placeholder="Artist, song, person, genre, guitar tuning..."
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
            <p className="jam-filter-help">
              Pick people you've played with, then narrow the list. Genres and
              guitar tunings match any selected option in their group.
            </p>
            {filterGroups
              .filter((group) => !group.advanced)
              .map((group) => (
                <FilterGroup
                  key={group.id}
                  group={group}
                  activeFilters={activeFilters}
                  onToggle={toggleFilter}
                />
              ))}
            {stageReadyFilter && (
              <div className="jam-filter-row mb-3">
                <FilterChip
                  filter={stageReadyFilter}
                  activeFilters={activeFilters}
                  onToggle={toggleFilter}
                />
              </div>
            )}
            <details className="jam-more-filters">
              <summary>
                More filters
                {advancedFilterCount > 0
                  ? ` (${advancedFilterCount} selected)`
                  : ""}
              </summary>
              {moreFilterGroups.map((group) => (
                <FilterGroup
                  key={group.id}
                  group={group}
                  activeFilters={activeFilters}
                  onToggle={toggleFilter}
                />
              ))}
            </details>
            {selectedFilters.length > 0 && (
              <div className="jam-selected-filters">
                <p className="jam-control-label">Selected filters</p>
                <div className="jam-filter-row" aria-label="Selected filters">
                  {selectedFilters.map((filter) => (
                    <FilterChip
                      key={filter.value}
                      filter={filter}
                      activeFilters={activeFilters}
                      onToggle={toggleFilter}
                      remove
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          <p className="jam-result-count" aria-live="polite">
            {visibleSongs.length} of {songs.length} songs
          </p>

          <div className="row g-3">
            {visibleSongs.map((song) => {
              const songFacts = getSongFacts(song);
              const songFilters = getSongFilters(song);
              const stageReady = songFilters.find(
                (filter) => filter.value === `practice:${jamTags.stageReady}`,
              );

              return (
                <div className="col-md-6" key={song.slug}>
                  <article
                    className={`jam-song-card h-100 ${
                      hasJamSongTab(song) ? "is-tabbed" : "is-not-tabbed"
                    }`}
                  >
                    {stageReady && (
                      <div className="jam-song-card-status">
                        <FilterChip
                          filter={stageReady}
                          activeFilters={activeFilters}
                          onToggle={toggleFilter}
                          card
                        />
                      </div>
                    )}
                    <header className="jam-song-card-header">
                      {song.albumCover && (
                        <img
                          className="jam-album-cover"
                          src={song.albumCover}
                          alt={`${song.title} album cover`}
                          loading="lazy"
                        />
                      )}
                      <div className="jam-song-card-title">
                        <h2 className="jam-song-title">{song.title}</h2>
                        <p className="jam-song-artist">{song.artist}</p>
                      </div>
                    </header>

                    <div
                      className="jam-song-overview"
                      aria-label="Song overview"
                    >
                      {song.key && (
                        <span className="jam-song-info">
                          <small>Key</small>
                          <span>{song.key}</span>
                        </span>
                      )}
                      {song.tuning && (
                        <span className="jam-song-info">
                          <small>Guitar Tuning</small>
                          <span>{song.tuning}</span>
                        </span>
                      )}
                    </div>

                    <details className="jam-song-more">
                      <summary>More song details</summary>
                      {songFacts.length > 0 && (
                        <div
                          className="jam-song-fact-row"
                          aria-label="Song details"
                        >
                          {songFacts.map((fact) => (
                            <span className={fact.className} key={fact.label}>
                              {fact.label}
                            </span>
                          ))}
                        </div>
                      )}
                      <SongDetailList
                        label="Played with"
                        filters={songFilters.filter(
                          (filter) => filter.group === "playedWith",
                        )}
                        activeFilters={activeFilters}
                        onToggle={toggleFilter}
                      />
                      <SongDetailList
                        label="Genres"
                        filters={songFilters.filter(
                          (filter) => filter.group === "genres",
                        )}
                        activeFilters={activeFilters}
                        onToggle={toggleFilter}
                      />
                      <SongDetailList
                        label="Practice Notes"
                        filters={songFilters.filter(
                          (filter) =>
                            filter.group === "practice" && !filter.primary,
                        )}
                        activeFilters={activeFilters}
                        onToggle={toggleFilter}
                        stacked
                      />
                      <SongDetailList
                        label="Other Tags"
                        filters={songFilters.filter(
                          (filter) => filter.group === "tags",
                        )}
                        activeFilters={activeFilters}
                        onToggle={toggleFilter}
                      />
                      <p className="jam-song-info jam-song-yousician">
                        <small>Yousician</small>
                        <span
                          className={
                            song.hasYousician
                              ? "is-available"
                              : "is-unavailable"
                          }
                        >
                          {song.hasYousician ? "Available" : "Not Available"}
                        </span>
                      </p>
                    </details>

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
                        <span className="jam-no-tab-note">
                          No tab on site yet
                        </span>
                      )}
                    </footer>
                  </article>
                </div>
              );
            })}
          </div>

          {visibleSongs.length === 0 && (
            <div className="jam-empty-state">
              <p>
                No songs match. Try removing a filter or changing your search.
              </p>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clearFilters}
              >
                Clear filters and search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JamIndex;
