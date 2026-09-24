import assert from "node:assert/strict";
import test from "node:test";
import {
  getJamSongs,
  jamGenres,
  jamMusicians,
  jamTags,
  musicians,
} from "../src/data/jamSongs.js";
import {
  getFilterOptions,
  getSongFilters,
  matchesFilters,
  matchesSearch,
} from "../src/data/jamSongFilters.js";

const song = {
  title: "A Familiar Tune",
  artist: "Jam Friends",
  tuning: "E standard",
  key: "A minor",
  playedWith: [musicians.kaylee, musicians.casey],
  genres: ["punk"],
  hasYousician: true,
  tags: [
    jamTags.stageReady,
    jamTags.needsWork,
    jamTags.soloNotLearned,
    jamTags.acoustic,
  ],
};

test("each selected person narrows the list to songs played with all of them", () => {
  assert.equal(matchesFilters(song, []), true);
  assert.equal(matchesFilters(song, ["playedWith:kaylee"]), true);
  assert.equal(matchesFilters(song, ["playedWith:casey"]), true);
  assert.equal(
    matchesFilters(song, ["playedWith:kaylee", "playedWith:casey"]),
    true,
  );
  const people = ["playedWith:kaylee", "playedWith:logan"];
  assert.equal(matchesFilters(song, people), false);
  assert.equal(matchesFilters(song, ["playedWith:logan"]), false);
  assert.equal(matchesFilters({ ...song, playedWith: [] }, people), false);
  // Removing Logan restores matches for Kaylee.
  assert.equal(
    matchesFilters(
      song,
      people.filter((value) => value !== "playedWith:logan"),
    ),
    true,
  );
});

test("genres and guitar tunings match any within a category and all across categories", () => {
  const filters = [
    "genres:punk",
    "genres:country",
    "tuning:E standard",
    "tuning:Eb standard",
  ];
  assert.equal(matchesFilters(song, filters), true);
  assert.equal(matchesFilters({ ...song, tuning: "Drop C" }, filters), false);
  assert.equal(
    matchesFilters({ ...song, genres: ["classic-rock"] }, filters),
    false,
  );
  assert.equal(matchesFilters(song, [...filters, "playedWith:logan"]), false);
  assert.equal(
    matchesFilters(song, [...filters, "playedWith:casey", "playedWith:kaylee"]),
    true,
  );
  assert.equal(
    matchesFilters(song, [...filters, "playedWith:logan", "playedWith:kaylee"]),
    false,
  );
});

test("practice and descriptive tags remain cumulative without discarding mixed readiness", () => {
  assert.equal(
    matchesFilters(song, [
      "practice:Stage Ready",
      "practice:Needs Work",
      "practice:Solo Not Learned",
      "tags:Acoustic",
    ]),
    true,
  );
  assert.equal(
    matchesFilters(song, ["practice:Stage Ready", "practice:Solo Learned"]),
    false,
  );
  assert.equal(matchesFilters(song, ["tags:Acoustic", "tags:Open Jam"]), false);
});

test("Yousician filters distinguish marked and unmarked songs", () => {
  assert.equal(matchesFilters(song, ["yousician:true"]), true);
  assert.equal(matchesFilters(song, ["yousician:false"]), false);
  assert.equal(
    matchesFilters({ ...song, hasYousician: false }, ["yousician:false"]),
    true,
  );
  assert.equal(
    matchesFilters(song, ["yousician:true", "yousician:false"]),
    true,
  );
  assert.equal(
    matchesFilters({ ...song, hasYousician: false }, [
      "yousician:true",
      "yousician:false",
    ]),
    true,
  );
});

test("chart filters distinguish songs with chart sections", () => {
  assert.equal(matchesFilters(song, ["charts:missing"]), true);
  assert.equal(matchesFilters(song, ["charts:tabbed"]), false);
  assert.equal(
    matchesFilters({ ...song, sections: [{ title: "Intro" }] }, [
      "charts:tabbed",
    ]),
    true,
  );
});

test("search finds moved metadata, remaining tags and musical details", () => {
  for (const query of [
    " familiar ",
    "jam friends",
    "KAYLEE",
    "punk",
    "Yousician",
    "stage ready",
    "E standard",
  ]) {
    assert.equal(matchesSearch(song, query), true, query);
  }
  assert.equal(
    matchesSearch({ ...song, genres: ["classic-rock"] }, "classic rock"),
    true,
  );
  assert.equal(
    matchesSearch({ ...song, hasYousician: false }, "Yousician"),
    false,
  );
  assert.equal(matchesSearch(song, "Logan"), false);
  assert.equal(matchesSearch(song, "A minor"), false);
});

test("filter options are grouped, deduplicated and do not invent missing song metadata", () => {
  const groups = getFilterOptions([song, song]);
  assert.deepEqual(
    groups.filter((group) => !group.advanced).map(({ label }) => label),
    ["Played with", "Guitar Tuning", "Genre", "Chart"],
  );
  assert.deepEqual(
    groups.filter((group) => group.advanced).map(({ label }) => label),
    ["Practice", "Yousician", "Other Tags"],
  );
  assert.equal(groups[0].id, "playedWith");
  assert.deepEqual(
    groups[0].options.map(({ label }) => label),
    ["Casey", "Kaylee"],
  );
  assert.deepEqual(
    groups.find(({ id }) => id === "genres").options.map(({ label }) => label),
    ["Punk"],
  );
  assert.equal(
    getFilterOptions([{}]).some(({ id }) => id === "playedWith"),
    false,
  );
  assert.equal(
    groups.some(({ id }) => id === "key"),
    false,
  );
  assert.equal(groups.find(({ id }) => id === "tuning").label, "Guitar Tuning");
  assert.equal(matchesFilters(song, ["unknown:filter"]), false);
});

test("song card filters prioritize people, guitar tuning and readiness without musical key", () => {
  const filters = getSongFilters(song);
  assert.deepEqual(
    filters.filter(({ primary }) => primary).map(({ label }) => label),
    ["E standard", "Kaylee", "Casey", "Stage Ready", "Needs Work"],
  );
  assert.equal(
    filters.some(({ group }) => group === "key"),
    false,
  );
  for (const value of [
    "genres:punk",
    "practice:Solo Not Learned",
    "yousician:true",
    "tags:Acoustic",
  ]) {
    assert.equal(
      filters.find((filter) => filter.value === value).primary,
      false,
    );
  }
});

test("catalog entries use known metadata IDs, booleans, and valid remaining tags", () => {
  const songs = getJamSongs();
  assert.ok(songs.length > 0);
  assert.equal(new Set(songs.map(({ slug }) => slug)).size, songs.length);
  const validTags = new Set(Object.values(jamTags));
  for (const entry of songs) {
    assert.ok(Array.isArray(entry.playedWith), entry.slug);
    assert.ok(Array.isArray(entry.genres), entry.slug);
    assert.equal(typeof entry.hasYousician, "boolean", entry.slug);
    for (const id of entry.playedWith)
      assert.ok(Object.hasOwn(jamMusicians, id), `${entry.slug}: ${id}`);
    for (const id of entry.genres)
      assert.ok(Object.hasOwn(jamGenres, id), `${entry.slug}: ${id}`);
    for (const tag of entry.tags)
      assert.ok(validTags.has(tag), `${entry.slug}: ${tag}`);
    const filters = getSongFilters(entry);
    assert.equal(
      new Set(filters.map(({ value }) => value)).size,
      filters.length,
      entry.slug,
    );
  }
});
