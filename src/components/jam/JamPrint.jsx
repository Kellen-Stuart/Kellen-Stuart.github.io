import React, { useMemo } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
import { getJamSongs, hasJamSongTab } from "../../data/jamSongs";

const keyTbdLabel = "Key TBD";

const rootSortOrder = new Map([
  ["C", 0],
  ["C#", 1],
  ["Db", 1],
  ["D", 2],
  ["D#", 3],
  ["Eb", 3],
  ["E", 4],
  ["F", 5],
  ["F#", 6],
  ["Gb", 6],
  ["G", 7],
  ["G#", 8],
  ["Ab", 8],
  ["A", 9],
  ["A#", 10],
  ["Bb", 10],
  ["B", 11],
]);

function normalizeRoot(root) {
  return `${root.charAt(0).toUpperCase()}${root.slice(1)}`;
}

function getKeySortParts(key) {
  if (!key || key === keyTbdLabel) {
    return [99, 99, keyTbdLabel];
  }

  const match = key.match(/^([A-G](?:#|b)?)(?:\s+(major|minor))?/i);

  if (!match) {
    return [98, 98, key.toLowerCase()];
  }

  const root = normalizeRoot(match[1]);
  const mode = (match[2] ?? "").toLowerCase();
  const modeSort = mode === "major" ? 0 : mode === "minor" ? 1 : 2;

  return [rootSortOrder.get(root) ?? 98, modeSort, key.toLowerCase()];
}

function compareKeyLabels(firstKey, secondKey) {
  const firstParts = getKeySortParts(firstKey);
  const secondParts = getKeySortParts(secondKey);

  for (let index = 0; index < firstParts.length; index += 1) {
    if (firstParts[index] < secondParts[index]) {
      return -1;
    }

    if (firstParts[index] > secondParts[index]) {
      return 1;
    }
  }

  return 0;
}

function groupSongsForPrint(songs) {
  const sortedSongs = [...songs].sort(
    (firstSong, secondSong) =>
      compareKeyLabels(firstSong.key || keyTbdLabel, secondSong.key || keyTbdLabel) ||
      firstSong.artist.localeCompare(secondSong.artist) ||
      firstSong.title.localeCompare(secondSong.title)
  );

  const keyGroups = new Map();

  sortedSongs.forEach((song) => {
    const keyLabel = song.key || keyTbdLabel;

    if (!keyGroups.has(keyLabel)) {
      keyGroups.set(keyLabel, {
        key: keyLabel,
        songCount: 0,
        artists: new Map(),
      });
    }

    const keyGroup = keyGroups.get(keyLabel);
    keyGroup.songCount += 1;

    if (!keyGroup.artists.has(song.artist)) {
      keyGroup.artists.set(song.artist, {
        artist: song.artist,
        songs: [],
      });
    }

    keyGroup.artists.get(song.artist).songs.push(song);
  });

  return [...keyGroups.values()].map((group) => ({
    ...group,
    artists: [...group.artists.values()],
  }));
}

function getSongPrintMeta(song) {
  return [song.tuning, song.capo, hasJamSongTab(song) ? "Tabbed" : null].filter(Boolean).join(" / ");
}

function JamPrint() {
  const songs = useMemo(() => getJamSongs(), []);
  const groupedSongs = useMemo(() => groupSongsForPrint(songs), [songs]);

  function printPage() {
    window.print();
  }

  return (
    <main className="jam-print-page">
      <div className="jam-print-toolbar print-hide">
        <Link className="btn btn-outline-dark" to="/jam">
          <FontAwesomeIcon icon={faArrowLeft} className="jam-button-icon" aria-hidden="true" />
          <span>Jam</span>
        </Link>
        <button type="button" className="btn btn-dark jam-print-action" onClick={printPage}>
          <FontAwesomeIcon icon={faPrint} className="jam-button-icon" aria-hidden="true" />
          <span>Print</span>
        </button>
      </div>

      <section className="jam-print-sheet" aria-label="Known songs printout">
        <header className="jam-print-title">
          <h1>Known Songs</h1>
          <p>{songs.length} songs</p>
        </header>

        <div className="jam-print-key-grid">
          {groupedSongs.map((keyGroup) => (
            <section className="jam-print-key-section" key={keyGroup.key}>
              <h2>
                <span>{keyGroup.key}</span>
                <small>{keyGroup.songCount}</small>
              </h2>

              {keyGroup.artists.map((artistGroup) => (
                <div className="jam-print-artist" key={`${keyGroup.key}-${artistGroup.artist}`}>
                  <h3>{artistGroup.artist}</h3>
                  <ol className="jam-print-song-list">
                    {artistGroup.songs.map((song) => (
                      <li className="jam-print-song" key={song.slug}>
                        <span className="jam-print-song-title">{song.title}</span>
                        <span className="jam-print-song-meta">{getSongPrintMeta(song)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

export default JamPrint;
