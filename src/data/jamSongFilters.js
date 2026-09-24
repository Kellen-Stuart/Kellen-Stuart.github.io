import { hasJamSongTab, jamGenres, jamMusicians, jamTags } from "./jamSongs.js";

export const jamFilterGroups = [
  { id: "playedWith", label: "Played with", matchAll: true },
  { id: "tuning", label: "Guitar Tuning" },
  { id: "genres", label: "Genre" },
  { id: "charts", label: "Chart" },
  { id: "practice", label: "Practice", advanced: true, matchAll: true },
  { id: "yousician", label: "Yousician", advanced: true },
  { id: "tags", label: "Other Tags", advanced: true, matchAll: true },
];

const practiceTags = new Set([
  jamTags.needsWork,
  jamTags.stageReady,
  jamTags.soloLearned,
  jamTags.soloNotLearned,
]);

function createFilter(
  group,
  id,
  label,
  { primary = false, className = "" } = {},
) {
  return { group, value: `${group}:${id}`, label, primary, className };
}

export function getSongFilters(song) {
  const filters = [];
  if (song.tuning) {
    filters.push(
      createFilter("tuning", song.tuning, song.tuning, {
        primary: true,
        className: "is-tuning",
      }),
    );
  }
  for (const id of song.playedWith ?? []) {
    filters.push(createFilter("playedWith", id, jamMusicians[id] ?? id));
  }
  for (const id of song.genres ?? []) {
    filters.push(createFilter("genres", id, jamGenres[id] ?? id));
  }
  for (const tag of song.tags ?? []) {
    const group = practiceTags.has(tag) ? "practice" : "tags";
    filters.push(
      createFilter(group, tag, tag, {
        primary: tag === jamTags.stageReady,
        className: tag === jamTags.stageReady ? "is-stage-ready" : "",
      }),
    );
  }
  filters.push(
    createFilter(
      "yousician",
      String(Boolean(song.hasYousician)),
      song.hasYousician ? "Available" : "Not Available",
    ),
  );
  const tabbed = hasJamSongTab(song);
  filters.push(
    createFilter(
      "charts",
      tabbed ? "tabbed" : "missing",
      tabbed ? "Tabbed" : "No tab yet",
      {
        className: tabbed ? "is-tabbed-status" : "is-missing-tab-status",
      },
    ),
  );
  return filters;
}

export function getFilterOptions(songs) {
  const filters = new Map();
  for (const song of songs) {
    for (const filter of getSongFilters(song))
      filters.set(filter.value, filter);
  }
  return jamFilterGroups
    .map((group) => ({
      ...group,
      options: [...filters.values()]
        .filter((filter) => filter.group === group.id)
        .sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .filter((group) => group.options.length > 0);
}

export function matchesFilters(song, activeFilters) {
  const songFilters = new Set(
    getSongFilters(song).map((filter) => filter.value),
  );
  const selections = new Map();
  for (const value of activeFilters) {
    const group = value.slice(0, value.indexOf(":"));
    if (!selections.has(group)) selections.set(group, []);
    selections.get(group).push(value);
  }
  return [...selections].every(([groupId, values]) => {
    const group = jamFilterGroups.find(({ id }) => id === groupId);
    if (!group) return false;
    return group.matchAll
      ? values.every((value) => songFilters.has(value))
      : values.some((value) => songFilters.has(value));
  });
}

export function matchesSearch(song, query) {
  const labels = getSongFilters(song)
    // An unmarked song should not match a search for Yousician.
    .filter((filter) => filter.value !== "yousician:false")
    .map(
      (filter) =>
        `${filter.label} ${jamFilterGroups.find(({ id }) => id === filter.group).label}`,
    );
  return [
    song.artist,
    song.title,
    song.summary,
    song.tempo,
    song.timeSignature,
    song.capo,
    song.difficulty ? `difficulty ${song.difficulty}/10` : null,
    ...labels,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query.trim().toLowerCase());
}
