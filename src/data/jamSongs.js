const sixteenthCounts = [
  "1",
  "e",
  "&",
  "a",
  "2",
  "e",
  "&",
  "a",
  "3",
  "e",
  "&",
  "a",
  "4",
  "e",
  "&",
  "a",
];

const eighthCounts = ["1", "&", "2", "&", "3", "&", "4", "&"];

const roosterStrumEvents = (firstChord, secondChord) => [
  { stroke: "D", chord: firstChord, accent: true },
  { hold: true },
  { hold: true },
  { hold: true },
  { stroke: "D", chord: firstChord },
  { hold: true },
  { stroke: "D", chord: secondChord },
  { hold: true },
  { hold: true },
  { hold: true },
  { hold: true },
  { hold: true },
  { stroke: "D", chord: secondChord, accent: true },
  { hold: true },
  { stroke: "D", chord: secondChord },
  { stroke: "U", chord: secondChord },
];

const roosterBEvents = eighthCounts.map(() => ({ stroke: "D", chord: "B" }));
const roosterDEvents = eighthCounts.map(() => ({ stroke: "D", chord: "D" }));

const strumSoloChordLegend = "c1 = E/F#7add11, c2 = F#, c3 = B";

function strumSoloEvents(pattern, chords) {
  let chordIndex = 0;

  return [...pattern].map((symbol) => {
    if (symbol === "-") {
      return { hold: true };
    }

    const chord = chords[chordIndex];
    chordIndex += 1;

    return { stroke: "D", chord, accent: /[1-4]/.test(symbol) };
  });
}

const roosterStrumSoloBar35Events = strumSoloEvents("1e-a2e&-------&a", [
  "c1",
  "c2",
  "c1",
  "c2",
  "c1",
  "c2",
  "c2",
  "c1",
]);

const roosterStrumSoloBar36Events = strumSoloEvents("1--a2e&---&-3-&-", [
  "c2",
  "c1",
  "c2",
  "c1",
  "c3",
  "c2",
  "c2",
  "c2",
]);

export const jamSongs = [
  {
    slug: "alice-in-chains-rooster",
    artist: "Alice in Chains",
    title: "Rooster",
    tuning: "Eb standard",
    stringLabels: ["E", "A", "D", "G", "B", "e"],
    key: "F# minor",
    tempo: 72,
    timeSignature: "4/4",
    chordNotation: "Shape-relative names as if the guitar were in E standard.",
    defaultScrollSpeed: 5,
    tags: ["grunge", "eb-standard", "16th-note-strum"],
    summary:
      "Opening two-bar progression with chord names written as standard-tuning shapes.",
    chords: {
      "F#": {
        frets: [2, 4, 4, 3, 2, 2],
        fingers: [1, 3, 4, 2, 1, 1],
        barre: { fret: 2, fromString: 6, toString: 1 },
      },
      "F#7add11": {
        frets: [2, 4, 4, 3, 0, 0],
        fingers: [1, 3, 4, 2, "", ""],
      },
      "E/F#7add11": {
        frets: [0, 4, 4, 3, 0, 0],
        fingers: ["", 3, 4, 2, "", ""],
      },
      E5: {
        frets: [0, 2, 2, "x", "x", "x"],
        fingers: ["", 1, 2, "", "", ""],
      },
      "F#5": {
        frets: [2, 4, 4, "x", "x", "x"],
        fingers: [1, 3, 4, "", "", ""],
      },
      A: {
        frets: [5, 7, 7, 6, 5, 5],
        fingers: [1, 3, 4, 2, 1, 1],
        barre: { fret: 5, fromString: 6, toString: 1 },
      },
      "A*": {
        frets: ["x", 0, 2, 2, 5, 5],
        fingers: ["", "", 1, 1, 3, 4],
      },
      Aadd9: {
        frets: [5, 7, 7, 6, 0, 0],
        fingers: [1, 3, 4, 2, "", ""],
      },
      A5: {
        frets: [5, 7, 7, "x", "x", "x"],
        fingers: [1, 3, 4, "", "", ""],
      },
      B: {
        frets: [7, 9, 9, 8, 7, 7],
        fingers: [1, 3, 4, 2, 1, 1],
        barre: { fret: 7, fromString: 6, toString: 1 },
      },
      D: {
        frets: [10, 12, 12, 11, 10, 10],
        fingers: [1, 3, 4, 2, 1, 1],
        barre: { fret: 10, fromString: 6, toString: 1 },
      },
    },
    sections: [
      {
        title: "Quick Chart",
        cue: "Fast live view. Chords are placed for memory, not exact subdivision.",
        dividerAfter: true,
        blocks: [
          {
            type: "chordLyrics",
            lines: [
              "Bars 1-8 | Intro x4",
              "[F#] [F#7add11] [A] [Aadd9]",
              "",
              "Bars 9-16 | Vocal swell x4",
              "[F#]Ohhhh-[F#7add11]Ohhh-[A]Ohhhh...[Aadd9]",
              "",
              "Bars 17-32 | Verse",
              "[F#]Ain't found a way to [F#7add11]kill me [A]yet [Aadd9]",
              "[F#]Eyes burn with [F#7add11]stingin' [A]sweat [Aadd9]",
              "[F#]Seems every path [F#7add11]leads me [A]to nowhere [Aadd9]",
              "[F#]mmmmmm-[F#7add11]mmmmm... [A] [Aadd9]",
              "[F#]Wife and kids, a [F#7add11]household [A]pet [Aadd9]",
              "[F#]Army green was [F#7add11]no safe [A]bet [Aadd9]",
              "[F#]The bullets scream to [F#7add11]me from [A]somewhere [Aadd9]",
              "[F#]mmm-[F#7add11]mmm [A] [Aadd9]",
              "",
              "Bars 33-38 | Build Up / strum solo",
              "[B]Here they come to snuff the",
              "[D]Rooster, aw",
              { text: "(strum solo)", href: "#rooster-strum-solo" },
              { text: "yeah..." },
              "[B]Yeah here come the",
              "[D]Rooster... YEAH!",
              "",
              "Bars 39-46 | Chorus riff x2",
              "[E5] [F#5] [F#7add11] [A] (riff walk down)",
              "[E5] [F#5] [F#7add11] [A5] [A*]",
              "",
              "Bars 47-59 | Solo x3",
              "(solo, riff repeats 3x)",
              "",
              "Bars 60-65 | Build Up / strum solo, more distortion",
              "[B]Here they come to snuff the",
              "[D]Rooster, aw, yeah",
              { text: "(strum solo)", href: "#rooster-strum-solo" },
              "[B]Yeah, here come the",
              "[D]Rooster, YEAH!",
              "",
              "Bars 66-73 | Chorus riff x2",
              "[E5]You know he [F#5]ain't gonna [F#7add11]die [A]",
              "[E5]No, no, [F#5]no, you know he [F#7add11]ain't gonna [A5]die [A*]",
              "",
              "Bars 74-89 | Verse, intro riff",
              { text: "Heavy distorted F#5 ring over clean/reverb intro riff; army march drum roll; light solo underneath." },
              "[F#]Walkin' tall [F#7add11]machine-gun [A]man [Aadd9]",
              "[F#]They spit on [F#7add11]me in my [A]homeland [Aadd9]",
              "[F#]Gloria sent me [F#7add11]pictures of my [A]boy, mm-mm [Aadd9]",
              "[F#]Got my pills [F#7add11]'gainst mosquito [A]death [Aadd9]",
              "[F#]My buddy's breathing [F#7add11]his dying [A]breath [Aadd9]",
              "[F#]Oh, God, please, won't you [F#7add11]help me make it [A]through? Mm-mm [Aadd9]",
              "",
              "Bars 90-95 | Build Up / strum solo",
              "[B]Here they come to snuff the",
              "[D]Rooster, aw yeah",
              { text: "(strum solo)", href: "#rooster-strum-solo" },
              "[B]Yeah, here come the",
              "[D]Rooster, YEAH!",
              "",
              "Bars 96-103 | Chorus riff x2",
              "[E5]You know he [F#5]ain't gonna [F#7add11]die [A]",
              "[E5]No, [F#5]no, you know he [F#7add11]ain't gonna [A5]die [A*]",
              "",
              "Bars 104-111 | Outro, vocal swell x4",
              "[F#]Ohhhh-[F#7add11]Ohhh-[A]Ohhhh...[Aadd9]",
              { text: "Ends on beat 1 of bar 111; drums hit hi-hat on beats 2 and 4." },
            ],
          },
        ],
      },
      {
        title: "Opening Progression",
        cue: "Repeat the two-bar movement. Chord names are written as shapes, not sounding pitch.",
        blocks: [
          {
            type: "chordLyrics",
            lines: ["[F#]F# to [F#7add11]F#7add11", "[A]A to [Aadd9]Aadd9"],
          },
          {
            type: "strum",
            label: "Bar 1 strum: F# to F#7add11",
            compact: true,
            counts: sixteenthCounts,
            events: roosterStrumEvents("F#", "F#7add11"),
            note: "Attacks land on 1, 2, & of 2, 4, & of 4, and a of 4. The & of 2 sustains through beat 3.",
          },
          {
            type: "strum",
            label: "Bar 2 strum: A to Aadd9",
            compact: true,
            counts: sixteenthCounts,
            events: roosterStrumEvents("A", "Aadd9"),
            note: "Same rhythm as bar 1.",
          },
          {
            type: "structure",
            items: [
              "Bar 1: F# on 1 and 2, F#7add11 on & of 2, 4, & of 4, a of 4",
              "Bar 2: A on 1 and 2, Aadd9 on & of 2, 4, & of 4, a of 4",
              "Repeat as the opening progression.",
            ],
          },
        ],
      },
      {
        title: "Song Structure",
        cue: "Opening progression continues under the vocal cues until the B change.",
        blocks: [
          {
            type: "barMap",
            label: "Intro and first verse",
            rows: [
              {
                bars: "1-8",
                chords: "F# / F#7add11 => A / Aadd9",
                cue: "Intro, repeat two-bar progression x4",
              },
              {
                bars: "9-16",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Ohhhh-Ohhh-Ohhhh...",
              },
              {
                bars: "17-18",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Ain't found a way to kill me yet",
              },
              {
                bars: "19-20",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Eyes burn with stingin' sweat",
              },
              {
                bars: "21-22",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Seems every path leads me to nowhere",
              },
              {
                bars: "23-24",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "mmmmmm-mmmmm...",
              },
              {
                bars: "25-26",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Wife and kids, a household pet",
              },
              {
                bars: "27-28",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Army green was no safe bet",
              },
              {
                bars: "29-30",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "The bullets scream to me from somewhere",
              },
              {
                bars: "31-32",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "mmm-mmm",
              },
              {
                bars: "33",
                chords: "B",
                lyric: "Here they come to snuff the",
                cue: "Build Up, all eighth-note downstrokes.",
              },
              {
                bars: "34",
                chords: "D",
                lyric: "Rooster, aw",
                cue: "Build Up, all eighth-note downstrokes.",
              },
              {
                bars: "35-36",
                chords: "c1 / c2 / c3",
                lyric: "yeah",
                cue: `Strum solo. ${strumSoloChordLegend}.`,
              },
              {
                bars: "37",
                chords: "B",
                lyric: "Yeah here come the",
                cue: "Build Up, all eighth-note downstrokes.",
              },
              {
                bars: "38",
                chords: "D",
                lyric: "Rooster... YEAH!",
                cue: "Build Up, all eighth-note downstrokes.",
              },
              {
                bars: "39-40",
                chords: "E5 / F#5 / F#7add11 / A",
                cue: "Chorus riff, with walk down.",
              },
              {
                bars: "41-42",
                chords: "E5 / F#5 / F#7add11 / A5 / A*",
                cue: "A* = x02255.",
              },
              {
                bars: "43-46",
                chords: "Repeat bars 39-42",
                cue: "Second pass of the chorus riff.",
              },
              {
                bars: "47-59",
                chords: "Solo",
                cue: "Skip exact notation; chorus riff repeats 3x under solo.",
              },
              {
                bars: "60",
                chords: "B",
                lyric: "Here they come to snuff the",
                cue: "Repeat build-up with more distortion.",
              },
              {
                bars: "61",
                chords: "D",
                lyric: "Rooster, aw, yeah",
                cue: "Repeat build-up with more distortion.",
              },
              {
                bars: "62-63",
                chords: "c1 / c2 / c3",
                cue: `Strum solo, more distortion. ${strumSoloChordLegend}.`,
              },
              {
                bars: "64",
                chords: "B",
                lyric: "Yeah, here come the",
                cue: "Repeat build-up with more distortion.",
              },
              {
                bars: "65",
                chords: "D",
                lyric: "Rooster, YEAH!",
                cue: "Repeat build-up with more distortion.",
              },
              {
                bars: "66-69",
                chords: "E5 / F#5 / F#7add11 / A then E5 / F#5 / F#7add11 / A5 / A*",
                lyric: "You know he ain't gonna die / No, no, no, you know he ain't gonna die",
                cue: "Chorus riff.",
              },
              {
                bars: "70-73",
                chords: "Repeat bars 66-69",
                cue: "Second pass of the chorus riff.",
              },
              {
                bars: "74-75",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Walkin' tall machine-gun man",
                cue: "Heavy distorted F#5 ring for four bars over clean/reverb intro riff; army march drum roll; light solo underneath.",
              },
              {
                bars: "76-77",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "They spit on me in my homeland",
              },
              {
                bars: "78-81",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Gloria sent me pictures of my boy, mm-mm",
              },
              {
                bars: "82-83",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Got my pills 'gainst mosquito death",
              },
              {
                bars: "84-85",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "My buddy's breathing his dying breath",
              },
              {
                bars: "86-89",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Oh, God, please, won't you help me make it through? Mm-mm",
              },
              {
                bars: "90",
                chords: "B",
                lyric: "Here they come to snuff the",
                cue: "Repeat build-up.",
              },
              {
                bars: "91",
                chords: "D",
                lyric: "Rooster, aw yeah",
                cue: "Repeat build-up.",
              },
              {
                bars: "92-93",
                chords: "c1 / c2 / c3",
                cue: `Strum solo. ${strumSoloChordLegend}.`,
              },
              {
                bars: "94",
                chords: "B",
                lyric: "Yeah, here come the",
                cue: "Repeat build-up.",
              },
              {
                bars: "95",
                chords: "D",
                lyric: "Rooster, YEAH!",
                cue: "Repeat build-up.",
              },
              {
                bars: "96-99",
                chords: "E5 / F#5 / F#7add11 / A then E5 / F#5 / F#7add11 / A5 / A*",
                lyric: "You know he ain't gonna die / No, no, you know he ain't gonna die",
                cue: "Chorus riff.",
              },
              {
                bars: "100-103",
                chords: "Repeat bars 96-99",
                cue: "Second pass of the chorus riff.",
              },
              {
                bars: "104-111",
                chords: "F# / F#7add11 => A / Aadd9",
                lyric: "Ohhhh-Ohhh-Ohhhh...",
                cue: "Outro vocal swell x4. Ends on beat 1 of bar 111; drums hit hi-hat on beats 2 and 4.",
              },
            ],
          },
          {
            type: "strum",
            label: "Build Up: B eighth notes",
            compact: true,
            counts: eighthCounts,
            events: roosterBEvents,
            note: "Bars 33 and 37. Straight eighth-note downstrokes on B.",
          },
          {
            type: "strum",
            label: "Build Up: D eighth notes",
            compact: true,
            counts: eighthCounts,
            events: roosterDEvents,
            note: "Bars 34 and 38. Straight eighth-note downstrokes on D.",
          },
          {
            type: "rhythmicLyrics",
            label: "Bar 33 lyric map",
            counts: eighthCounts,
            measures: [
              [
                { chord: "B", lyric: "Here" },
                { chord: "B", lyric: "they" },
                { chord: "B", lyric: "come" },
                { chord: "B", lyric: "to" },
                { chord: "B", lyric: "snuff" },
                { chord: "B", lyric: "the" },
                { chord: "B" },
                { chord: "B" },
              ],
            ],
          },
          {
            type: "rhythmicLyrics",
            label: "Bar 34 lyric map",
            counts: eighthCounts,
            measures: [
              [
                { chord: "D", lyric: "Roost" },
                { chord: "D", lyric: "er" },
                { chord: "D" },
                { chord: "D", lyric: "aw" },
                { chord: "D" },
                { chord: "D" },
                { chord: "D" },
                { chord: "D" },
              ],
            ],
          },
          {
            type: "strum",
            id: "rooster-strum-solo",
            label: "Bar 35 strum solo",
            compact: true,
            pattern: "1e-a2e&-------&a",
            counts: sixteenthCounts,
            events: roosterStrumSoloBar35Events,
            note: strumSoloChordLegend,
          },
          {
            type: "strum",
            label: "Bar 36 strum solo",
            compact: true,
            pattern: "1--a2e&---&-3-&-",
            counts: sixteenthCounts,
            events: roosterStrumSoloBar36Events,
            note: strumSoloChordLegend,
          },
          {
            type: "rhythmicLyrics",
            label: "Bar 35 lyric entrance",
            counts: sixteenthCounts,
            measures: [
              [
                { chord: "E/F#7add11", lyric: "yeah" },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
            ],
          },
          {
            type: "rhythmicLyrics",
            label: "Bar 37 lyric map",
            counts: eighthCounts,
            measures: [
              [
                { chord: "B", lyric: "Yeah" },
                { chord: "B", lyric: "here" },
                { chord: "B", lyric: "come" },
                { chord: "B", lyric: "the" },
                { chord: "B" },
                { chord: "B" },
                { chord: "B" },
                { chord: "B" },
              ],
            ],
          },
          {
            type: "rhythmicLyrics",
            label: "Bar 38 lyric map",
            counts: eighthCounts,
            measures: [
              [
                { chord: "D", lyric: "Roost" },
                { chord: "D", lyric: "er" },
                { chord: "D" },
                { chord: "D", lyric: "YEAH!" },
                { chord: "D" },
                { chord: "D" },
                { chord: "D" },
                { chord: "D" },
              ],
            ],
          },
        ],
      },
    ],
  },
];

export function getJamSongs() {
  return [...jamSongs].sort((a, b) =>
    `${a.artist} ${a.title}`.localeCompare(`${b.artist} ${b.title}`)
  );
}

export function getJamSongBySlug(slug) {
  return jamSongs.find((song) => song.slug === slug);
}
