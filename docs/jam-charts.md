# Authoring jam charts

## Workflow

1. **Choose the arrangement.** Establish tuning, capo, tempo, and whether chord
   names describe sounding pitches or familiar guitar shapes. Chart the version
   you intend to play; verify changes against that arrangement.
2. **Find the catalog entry.** Search `src/data/jamSongs.js` for the artist and
   title. Reuse an existing entry. For a new song, add a `createCatalogSong()`
   entry to `knownSongCatalog` using the existing metadata conventions.
3. **Create the chart module.** Start with the [minimal chart](#minimal-chart)
   below in `src/data/charts/<artist>-<song>.js`. Write the quick chart first:
   song order, repeats, chord changes, and only the lyric cues needed in a jam.
4. **Add performance details.** Anchor chords to the right lyric character,
   define missing or specific voicings, and flag shapes worth remembering.
   Add reference rhythm patterns or riffs only when they convey information
   the quick chart does not already provide.
5. **Connect the module to the catalog.** Import it in `jamSongs.js` and pass it
   through the entry's `chart` property, as shown below. Shared rendering,
   scrolling, printing, and chord popovers work without song-specific React code.
6. **Validate and play through it.** Run the [validation commands](#validation),
   then have the operator check the page, phone layout, and print preview.
   Play through the chart to verify musical placement and repeats.
7. **Review the source changes for version control.** A typical new chart changes
   one chart module and its catalog entry. Review those files together; generated
   `dist/` output and `node_modules/` are not chart source. Update this guide if
   you introduce a new authoring convention.

## File responsibilities and registration

| File                                                      | Responsibility                                                  |
| --------------------------------------------------------- | --------------------------------------------------------------- |
| [`src/data/jamSongs.js`](../src/data/jamSongs.js)         | Song metadata and association with a chart module               |
| `src/data/charts/<artist>-<song>.js`                      | That song's chart, voicings, rhythm patterns, and local helpers |
| [`src/data/guitarChords.js`](../src/data/guitarChords.js) | Reusable chord shapes shared by songs                           |
| [`src/lib/jam/rhythm.js`](../src/lib/jam/rhythm.js)       | Rhythm authoring helper                                         |
| [`src/components/jam/`](../src/components/jam/)           | Shared chart rendering and controls                             |

Keep song metadata in `src/data/jamSongs.js`. Put the chart and its song-specific
helpers in `src/data/charts/<artist>-<song>.js`, then import it and pass it as
`chart` to the song's existing `createCatalogSong()` entry. Catalog-only songs need no chart file. Charts currently
use ordinary imports; loading them on demand is a future optimization.

For example, after creating a chart module for Zombie:

```js
import zombieChart from "./charts/the-cranberries-zombie.js";

// Edit Zombie's existing entry:
createCatalogSong({
  title: "Zombie",
  artist: "The Cranberries",
  // Keep its existing tuning, key, tags, and other metadata here.
  chart: zombieChart,
});
```

Keep the song's existing metadata and add `chart` to that entry. Do not create
a duplicate catalog entry or spread chart fields into the factory's argument;
the factory accepts chart content through the explicit `chart` property.

The factory generates the page slug from the artist and title; this example
appears at `/jam/the-cranberries-zombie`. Changing the artist or title can change
that URL. A song with chart sections automatically becomes available through
the catalog's chart links. No separate route registration is necessary.

See [Jam Song Metadata](../README.md#jam-song-metadata) for tuning, genre, tags,
and other catalog fields. The registration snippet above illustrates where to
add `chart`; it is not a replacement for the entry's existing metadata.

[Rooster](../src/data/charts/alice-in-chains-rooster.js) is the worked example:
one quick chart followed by rhythm patterns. Its existing chord markers and
rhythm attack positions were preserved, not re-transcribed from a recording.

## Minimal chart

```js
export default {
  defaultScrollSpeed: 5, // optional, pixels per second
  timeSignature: "4/4",
  chords: {}, // common shapes come from guitarChords.js
  sections: [
    {
      id: "quick-chart",
      role: "quick",
      title: "Quick Chart",
      blocks: [
        {
          type: "chordLyrics",
          lines: [
            "Intro — repeat 4x",
            "[Em] [C] [G] [D]",
            "",
            "Verse",
            "[Em]An original lyric [C]goes here",
          ],
        },
      ],
    },
  ],
};
```

Every chart has exactly one `role: "quick"` section. Additional sections use
`role: "reference"`. Use those for useful rhythm patterns or riffs; avoid
repeating the quick chart's song structure in prose. Section and block IDs
must be unique within a chart.

The existing block types remain available: `chordLyrics`, `tab`, `strum`,
`rhythm`, `rhythmicLyrics`, `barMap`, and `structure`.

## Chords above lyrics

Write each chord immediately before the character on which it changes:

```js
"A pickup before [Am]sunlight fades";
"A change inside sun[G]light";
"[Am] [G] [C]"; // instrumental progression
```

Do not pad lines with spaces to position chords. The renderer uses the lyric
prefix's text width to place each chord, and wraps at spaces or written hyphens. Long labels
reserve extra space after a word without inserting space inside it. Multiple
changes within a word occupy separate chord rows to prevent overlap while
retaining their horizontal anchors.

The source marker determines musical placement: layout checks cannot determine
whether a change is on the correct syllable in the recording.

For a playing instruction beside a particular chord, use `[chord|instruction]`:

```js
"[G6/F#|arpeggiate]An original lyric";
"[Em|let ring]";
```

The instruction appears in parentheses beside the chord above the lyrics,
including in print. It applies only to that occurrence, keeps the same lyric
anchor, and does not change the chord's fingering lookup. Use this for cues
such as arpeggiate, let ring, or palm mute that a singer should not read as lyrics.
An annotated chord shares space with the following lyric phrase up to the next
chord. Words in that phrase retain normal spacing and can wrap on narrow screens;
the instruction does not add a gap after its first word.

Plain nonempty strings without chords become section labels. Use an object
for a performance cue: `{ text: "Let the last chord ring." }`. Link to a rhythm
block with `{ text: "Strum solo", href: "#solo-pattern" }`. The cue remains
readable in print even though the reference section is omitted.

## Voicings to remember

Chord IDs first resolve against the chart's `chords` object, then against
`guitarChords.js`. Check that a shared shape exists before relying on it. Add
arrangement-specific shapes to the chart; add a shape to the shared dictionary
when it should be reused across songs. A local definition of `D`, for example,
overrides the shared `D` throughout that chart. Use distinct IDs when a song
needs more than one voicing of the same chord.

Keys identify exact shapes; `label` optionally supplies a display name:

```js
const chords = {
  dLow: {
    label: "D/F# (low strings)",
    frets: [2, 0, 0, "x", "x", "x"],
    fingers: [1, "", "", "", "", ""],
    showAboveChart: true,
    note: "Play only the lowest three strings.",
  },
};
// Use [dLow] to reference this exact shape.
```

Include this object as `chords` in the chart's default export.

This example assumes standard tuning and muted upper strings; it illustrates
the requested voicing, not a verified Zombie transcription. Frets run from low
string to high string: low E, A, D, G, B, high e in standard tuning. `0` is open,
`"x"` is muted. Optional `fingers` entries use the same six-string order, with
empty strings for unspecified fingers. A barre can be described as
`barre: { fret: 2, fromString: 6, toString: 1 }`, where string 6 is the lowest
string and string 1 is the highest. Specify tuning in the
catalog; explain shape-relative names or capo-relative fretting in
`chordNotation` when applicable.

Every flagged shape appears once above the quick chart and in print, including
shapes used in ASCII tabs. Give different voicings distinguishable labels if
they share a harmonic name. Inline chord buttons retain their fingering popovers.

## Rhythm authoring

```js
import { strumPattern } from "../../lib/jam/rhythm.js";

const pattern = {
  type: "strum",
  id: "verse-strum",
  label: "Verse rhythm",
  ...strumPattern("D--- D-D- ---- D-DU", ["Am", "Am", "C", "C", "C", "C"], {
    accents: [0, 12],
  }),
};

// Append this section after the quick section in the chart's sections array.
const rhythmSection = {
  id: "rhythm-patterns",
  role: "reference",
  title: "Rhythm Patterns",
  blocks: [pattern],
};
```

Defining a pattern alone does not display it: include it in a section's `blocks`
and include that section in the exported `sections` array. To point to this
pattern from the quick chart, add
`{ text: "Verse rhythm", href: "#verse-strum" }` to its `lines` array.

Each space-separated group is one quarter-note beat. Groups contain 1, 2, or 4
subdivisions and must all be the same length. The helper generates counts and
the time signature for that pattern; the chart's top-level `timeSignature` is
song metadata, not an override for the helper. Compound meter and tuplets are
not yet supported.

| Character | Meaning                                      |
| --------- | -------------------------------------------- |
| `D`       | Downstroke; displayed as the open-bottom box |
| `U`       | Upstroke; displayed as V                     |
| `-`       | Sustain; no new attack                       |
| `r`       | Rest/silence                                 |
| `x`       | Muted attack                                 |

Supply one chord ID per D, U, or x, in order. Accents use zero-based subdivision
indexes and must point at attacks. They are explicit, not inferred from beat
numbers. The grid emphasizes beat boundaries and labels chords at changes.

For rapid changes between long names, set `chordLabels`, for example
`{ "F#7add11": "c1", "Aadd9": "c2" }`. The grid uses short labels and supplies
a key with full names and fingering popovers. Events still store real chord IDs.

## Printing and scrolling

The Print quick chart button and browser print command include the song
heading/details, flagged voicings, and quick chart. Reference sections,
navigation, controls, and popovers are excluded. The separate `/jam/print`
catalog printout remains available.

Auto-scroll stops at the quick-chart ending. It pauses for print, hidden
browser tabs, and in-page reference links. Speed is saved per song when local
storage is available; the default is 5 px/s.

## Staff notation

Rhythm patterns default to a VexFlow 5 SVG staff. Each pattern has Staff and
Count grid buttons; both views use the same song data. No song needs VexFlow
objects or a second transcription.

The staff uses five lines with a time signature and rhythm notes on the middle
line, without a pitched clef. Chord changes and accents appear above; the
open-bottom downstroke box and V upstroke appear below. Muted attacks use
cross noteheads. Chord aliases share the same key as the count grid.

The converter supports one complete bar of quarter-note meter (for example,
2/4, 3/4, or 4/4), with quarter, eighth, and sixteenth input subdivisions.
It combines sustain slots into durations, uses dotted eighths where appropriate,
and splits/ties sustained notes at beat boundaries. Long sustains are spelled
with tied quarters to keep beats explicit. Beams group notes within each
quarter-note beat. Tied continuations receive no new strum, accent, or chord
change. Adjacent rests combine, but rests are never tied to notes.

A bar must start with an attack or rest: a leading sustain has no previous
note to attach to. Compound meter, tuplets, and ties across separate pattern
blocks are not yet supported. Authoring checks report invalid input.

VexFlow loads in a separate chunk when a staff mounts. The installed
`vexflow/bravura` entry bundles Bravura and Academico fonts; no CDN or separate
font download is required. Rendering waits for those fonts. It redraws on
width changes and cleans up its SVG and observer when unmounted. Narrow views
scroll horizontally to preserve legibility. If loading or rendering fails,
the count grid stays available with a short status message.

Reference sections remain excluded from quick-chart printing in either view.

## Validation

Run `npm run test:jam` and `npm run build`. Tests cover lyric anchors, word
boundaries, rhythm patterns, chord references, link targets, chord-shape
dimensions, section roles, duration totals, ties, and preservation of rhythm
attacks. They do not verify the musical transcription or browser layout.

The chart tests validate all registered charts, so importing a new chart into
the catalog includes it in those checks. Fix reported errors such as unknown
chord IDs, broken local links, invalid rhythm input, or duplicate IDs before
considering the chart ready. A data-only song addition normally does not need
its own test file; add focused tests when extending shared behavior.

Operator smoke tests:

- Open the song through the jam catalog and confirm its title, tuning, capo,
  notation convention, and section order. Play through the intended arrangement.
- Check desktop and phone layouts with long chord labels, mid-word changes,
  pickups, and chord-only progressions. Words should remain intact.
- Hover, focus, and tap chord diagrams; follow the strum-solo links.
- Check down/up symbols, accents, sustained subdivisions, and the chord key.
- Print preview should contain only heading/details, voicings, and quick chart.
  Check for clipped lyric lines and test the separate catalog printout.
- Test start/pause/reset, saved speed after reload, reference links, printing
  while scrolling, and stopping at the quick-chart ending.

For an automated browser check after a production build, run
`node scripts/check-jam-notation.mjs` with Playwright Chromium available. It
is a renderer regression check using Rooster's five patterns; it does not
replace checking a newly authored song. It launches and closes a headless
browser, intercepts requests to serve the local
build without a server, and checks SVG bounds, view switching, responsive
layout, printing, and cleanup. Temporary browser files stay in `dist` and are
removed afterward; screenshots remain as `dist/jam-notation-desktop.png` and
`dist/jam-notation-mobile.png`. It performs no browser or dependency downloads.
