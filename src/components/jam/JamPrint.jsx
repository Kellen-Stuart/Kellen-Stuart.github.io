import React, { useMemo } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
import { getJamSongs, jamTags } from "../../data/jamSongs";

function groupSongsForPrint(songs) {
  const sortedSongs = [...songs].sort(
    (first, second) =>
      first.artist.localeCompare(second.artist) ||
      first.title.localeCompare(second.title),
  );
  const artists = new Map();
  for (const song of sortedSongs) {
    if (!artists.has(song.artist)) {
      artists.set(song.artist, { artist: song.artist, songs: [] });
    }
    artists.get(song.artist).songs.push(song);
  }
  return [...artists.values()];
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
          <FontAwesomeIcon
            widthAuto
            icon={faArrowLeft}
            className="jam-button-icon"
            aria-hidden="true"
          />
          <span>Jam</span>
        </Link>
        <button
          type="button"
          className="btn btn-dark jam-print-action"
          onClick={printPage}
        >
          <FontAwesomeIcon
            widthAuto
            icon={faPrint}
            className="jam-button-icon"
            aria-hidden="true"
          />
          <span>Print</span>
        </button>
      </div>

      <section className="jam-print-sheet" aria-label="Known songs printout">
        <header className="jam-print-title">
          <h1>Known Songs</h1>
          <p>{songs.length} songs</p>
        </header>

        <p className="jam-print-legend">
          <span aria-hidden="true">🎸</span> Guitar tuning
          {" · "}
          <span aria-hidden="true">♫</span> Musical key
          {" · "}
          <span aria-hidden="true">🤘</span> Ready to rock
        </p>

        <div className="jam-print-artist-grid">
          {groupedSongs.map((artistGroup) => (
            <section className="jam-print-artist" key={artistGroup.artist}>
              <h2>{artistGroup.artist}</h2>
              <ul className="jam-print-song-list">
                {artistGroup.songs.map((song) => (
                  <li className="jam-print-song" key={song.slug}>
                    <span className="jam-print-song-title">{song.title}</span>
                    <span className="jam-print-song-meta">
                      {" - "}
                      <span aria-hidden="true">🎸</span>
                      <span className="visually-hidden">
                        Guitar tuning:
                      </span>{" "}
                      {song.tuning || "Tuning TBD"}
                    </span>
                    <span className="jam-print-song-meta">
                      {" - "}
                      <span aria-hidden="true">♫</span>
                      <span className="visually-hidden">Musical key:</span>{" "}
                      {song.key || "Key TBD"}
                    </span>
                    {song.tags?.includes(jamTags.stageReady) && (
                      <>
                        {" "}
                        <span
                          className="jam-print-stage-ready"
                          role="img"
                          aria-label="Ready to rock (Stage Ready)"
                        >
                          🤘
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

export default JamPrint;
