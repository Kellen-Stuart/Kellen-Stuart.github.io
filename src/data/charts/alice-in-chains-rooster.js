import { strumPattern } from "../../lib/jam/rhythm.js";
import { eStandard } from "../guitarTunings.js";

const soloChords = { c1: "E/F#7add11", c2: "F#", c3: "B" };

function openingPattern(first, second) {
  return strumPattern(
    "D--- D-D- ---- D-DU",
    [first, first, second, second, second, second],
    { accents: [0, 12] },
  );
}

// Existing transcription preserved; verify musical placement against your arrangement.
// Frets and chord names are relative to standard-tuning shapes.
export default {
  stringLabels: eStandard.notes, // song is actually in Eb Standard but notating in E Standard to simplify mental calculation for live settings.
  tempo: 72,
  timeSignature: "4/4",
  chordNotation: "Shape-relative names as if the guitar were in E Standard.",
  defaultScrollSpeed: 5,
  chords: {
    "F#": {
      frets: [2, 4, 4, 3, 2, 2],
      fingers: [1, 3, 4, 2, 1, 1],
      barre: {
        fret: 2,
        fromString: 6,
        toString: 1,
      },
    },
    "F#7add11": {
      frets: [2, 4, 4, 3, 0, 0],
      fingers: [1, 3, 4, 2, "", ""],
      showAboveChart: true,
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
      barre: {
        fret: 5,
        fromString: 6,
        toString: 1,
      },
    },
    "A*": {
      frets: ["x", 0, 2, 2, 5, 5],
      fingers: ["", "", 1, 1, 3, 4],
      showAboveChart: true,
      note: "Chorus ending: x02255.",
    },
    Aadd9: {
      frets: [5, 7, 7, 6, 0, 0],
      fingers: [1, 3, 4, 2, "", ""],
      showAboveChart: true,
    },
    A5: {
      frets: [5, 7, 7, "x", "x", "x"],
      fingers: [1, 3, 4, "", "", ""],
    },
    B: {
      frets: [7, 9, 9, 8, 7, 7],
      fingers: [1, 3, 4, 2, 1, 1],
      barre: {
        fret: 7,
        fromString: 6,
        toString: 1,
      },
    },
    D: {
      frets: [10, 12, 12, 11, 10, 10],
      fingers: [1, 3, 4, 2, 1, 1],
      barre: {
        fret: 10,
        fromString: 6,
        toString: 1,
      },
    },
  },
  sections: [
    {
      title: "Quick Chart",
      cue: "Song order, chord changes, and performance cues.",
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
            {
              text: "(strum solo)",
              href: "#rooster-strum-solo",
            },
            {
              text: "yeah...",
            },
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
            {
              text: "(strum solo)",
              href: "#rooster-strum-solo",
            },
            "[B]Yeah, here come the",
            "[D]Rooster, YEAH!",
            "",
            "Bars 66-73 | Chorus riff x2",
            "[E5]You know he [F#5]ain't gonna [F#7add11]die [A]",
            "[E5]No, no, [F#5]no, you know he [F#7add11]ain't gonna [A5]die [A*]",
            "",
            "Bars 74-89 | Verse, intro riff",
            {
              text: "Heavy distorted F#5 ring over clean/reverb intro riff; army march drum roll; light solo underneath.",
            },
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
            {
              text: "(strum solo)",
              href: "#rooster-strum-solo",
            },
            "[B]Yeah, here come the",
            "[D]Rooster, YEAH!",
            "",
            "Bars 96-103 | Chorus riff x2",
            "[E5]You know he [F#5]ain't gonna [F#7add11]die [A]",
            "[E5]No, [F#5]no, you know he [F#7add11]ain't gonna [A5]die [A*]",
            "",
            "Bars 104-111 | Outro, vocal swell x4",
            "[F#]Ohhhh-[F#7add11]Ohhh-[A]Ohhhh...[Aadd9]",
            {
              text: "Ends on beat 1 of bar 111; drums hit hi-hat on beats 2 and 4.",
            },
          ],
        },
      ],
      id: "quick-chart",
      role: "quick",
    },
    {
      id: "rhythm-patterns",
      role: "reference",
      title: "Rhythm Patterns",
      cue: "Count the subdivisions; play only the marked strokes.",
      blocks: [
        {
          type: "strum",
          label: "Bar 1 strum: F# to F#7add11",
          note: "Attacks land on 1, 2, & of 2, 4, & of 4, and a of 4. The & of 2 sustains through beat 3.",
          id: "opening-strum",
          ...openingPattern("F#", "F#7add11"),
        },
        {
          type: "strum",
          label: "Bar 2 strum: A to Aadd9",
          note: "Same rhythm with A and Aadd9. Repeat these two bars for the intro and verses.",
          ...openingPattern("A", "Aadd9"),
        },
        {
          type: "strum",
          label: "Build Up: B eighth notes",
          note: "Use these eighth-note downstrokes for both B and D in each build-up.",
          ...strumPattern("DD DD DD DD", Array(8).fill("B")),
        },
        {
          type: "strum",
          id: "rooster-strum-solo",
          label: "Bar 35 strum solo",
          chordLabels: {
            "E/F#7add11": "c1",
            "F#": "c2",
            B: "c3",
          },
          ...strumPattern(
            "DD-D DDD- ---- --DD",
            [
              soloChords.c1,
              soloChords.c2,
              soloChords.c1,
              soloChords.c2,
              soloChords.c1,
              soloChords.c2,
              soloChords.c2,
              soloChords.c1,
            ],
            { accents: [0, 4] },
          ),
        },
        {
          type: "strum",
          label: "Bar 36 strum solo",
          chordLabels: {
            "E/F#7add11": "c1",
            "F#": "c2",
            B: "c3",
          },
          ...strumPattern(
            "D--D DDD- --D- D-D-",
            [
              soloChords.c2,
              soloChords.c1,
              soloChords.c2,
              soloChords.c1,
              soloChords.c3,
              soloChords.c2,
              soloChords.c2,
              soloChords.c2,
            ],
            { accents: [0, 4, 12] },
          ),
        },
      ],
    },
  ],
};
