import { eStandard } from "../guitarTunings.js";

const openVoicings = "[Em] [Cmaj7] [G6] [G6/F#]";
const lowStringVoicings = "[E5] [C5/G] [G] [D/F#]";
const turnaroundVoicings = "[Em] [Cmaj7] [G6|Lead Melody] [G6/F#|Lead Melody]";

// Both choruses share eight bars of lyrics, followed by different vocal tags.
const chorusLines = [
  "[E5]Head… in your [C5/G]head, zombie",
  "[G]zombie zom [D/F#]bae eh eh, what's in your",
  "[E5]head, in your [C5/G]head, zombie",
  "[G]zombie, zom [D/F#]bie eh eh eh",
];
const vocalTagLines = [
  "[E5]oh! doo doo doo [C5/G]doo doo doo",
  "[G]doo doo doo [D/F#]doo doo doo",
];
const secondVocalTagLines = [
  "[E5]Oh! Oh! Oh! Oh! [C5/G]Oh! Oh! Oh! Eh-Ay!",
  "[G]Oooooohhhhhh [D/F#]Ah-Ah yah!",
];

// Draft reading of "1&2&a3y&-y&a": the & of 3 rings across beat 4.
// The shared notation uses e for the author's y. Stroke directions are
// intentionally unspecified until confirmed; chord-only events are attacks.
const cleanAttacks = new Set([0, 2, 4, 6, 7, 8, 9, 10, 13, 14, 15]);
const cleanRhythm = {
  type: "strum",
  id: "clean-strum",
  label: "Clean strum (draft)",
  timeSignature: "4/4",
  counts: [
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
  ],
  events: Array.from({ length: 16 }, (_, index) =>
    cleanAttacks.has(index) ? { chord: "Em" } : { hold: true },
  ),
  note: "1 & 2 & a 3 e & (hold across 4) e & a. Here e means y in your count. Same rhythm for each open voicing; stroke directions to confirm.",
};

const overdriveRhythm = {
  type: "strum",
  id: "overdrive-eighths",
  label: "Overdrive · straight eighth notes",
  timeSignature: "4/4",
  counts: ["1", "&", "2", "&", "3", "&", "4", "&"],
  events: Array.from({ length: 8 }, () => ({ chord: "E5" })),
  note: "One bar per low-string voicing. Stroke directions to confirm.",
};

export default {
  stringLabels: eStandard.notes,
  tempo: 84,
  timeSignature: "4/4",
  defaultScrollSpeed: 6,
  chords: {
    Em: {
      showAboveChart: true,
      frets: [0, 7, 9, 0, 0, 0],
      fingers: ["", 1, 3, "", "", ""],
    },
    Cmaj7: {
      showAboveChart: true,
      frets: ["x", 3, 5, 0, 0, 0],
      fingers: ["", 1, 3, "", "", ""],
    },
    G6: {
      showAboveChart: true,
      frets: [3, "x", 0, 0, 3, 0],
      fingers: [2, "", "", "", 3, ""],
    },
    "G6/F#": {
      showAboveChart: true,
      frets: [2, "x", 0, 0, 3, 0],
      fingers: [1, "", "", "", 3, ""],
    },
    E5: {
      frets: [0, 7, 9, "x", "x", "x"],
      fingers: ["", 1, 3, "", "", ""],
    },
    "C5/G": {
      frets: [3, 3, 5, "x", "x", "x"],
      fingers: [1, 1, 3, "", "", ""],
      barre: {
        fret: 3,
        fromString: 6,
        toString: 5,
      },
    },
    G: {
      frets: [3, 2, 0, "x", "x", "x"],
      fingers: [2, 1, "", "", "", ""],
    },
    "D/F#": {
      frets: [2, 0, 0, "x", "x", "x"],
      fingers: [1, "", "", "", "", ""],
      showAboveChart: true,
      note: "Overdrive: play only the low E, A, and D strings.",
    },
  },
  sections: [
    {
      id: "quick-chart",
      role: "quick",
      title: "Quick Chart",
      cue: "Each chord lasts one bar unless noted.",
      blocks: [
        {
          type: "chordLyrics",
          lines: [
            "Bars 1–4 | Clean tone · open voicings",
            { text: "Clean strum", href: "#clean-strum" },
            openVoicings,
            "",
            "Bars 5–12 | Overdrive ON · low-string voicings",
            lowStringVoicings,
            lowStringVoicings,
            "",
            "Bars 13–16 | Clean tone · open voicings",
            turnaroundVoicings,
            "",
            "Bars 17–28 | Verse - Clean Tone - Open Voicings",
            "[Em]Another [Cmaj7]head hangs lowly",
            // The ellipsis marks a held lyric across the bar line,
            // without inventing a syllable boundary for the change.
            "[G6]child is slowly taken... [G6/F#|arpeggiate]",
            "",
            "[Em]And the violence, [Cmaj7]caused such silence",
            "[G6]who are we mistaken [G6/F#|arpeggiate]… but you see",
            "",
            "[Em]It's not me, it's not [Cmaj7]my family, in your",
            "[G6]head, in your head they are [G6/F#|arpeggiate]fighting… with their",
            "",
            "Bars 29–32 | Build into chorus",
            "[Em]tanks and their bombs and their [Cmaj7]bombs and their guns, in your",
            "[G6]head, in your head, they are [G6/F#|arpeggiate]cryin'… in your",
            "",
            "Bars 33–40 | Chorus · high gain ON",
            ...chorusLines,
            "",
            "Bars 41–44 | Vocal tag · high gain",
            ...vocalTagLines,
            "",
            "Bars 45–48 | Instrumental turnaround · clean tone · open voicings",
            turnaroundVoicings,
            "",
            "Bars 49–60 | Verse 2 - Clean Tone - Open Voicings",
            "[Em]Another [Cmaj7]mother's breakin'",
            // "o" is the pickup on the & of 4; "ver" lands on bar 52.
            "[G6]heart is takin' o[G6/F#|arpeggiate]ver",
            "",
            "[Em]when the violence [Cmaj7]causes silence",
            "[G6]we must be mis [G6/F#|arpeggiate]taken… It's the same",
            "",
            "[Em]old theme, since [Cmaj7]nineteen-sixteen, in your",
            "[G6]head, in your head, they're [G6/F#|arpeggiate]still fightin', with their",
            "",
            "Bars 61–64 | Build into chorus",
            "[Em]tanks, and their bombs, and their [Cmaj7]bombs, and their guns, in your",
            "[G6]head, in your head, they are [G6/F#|arpeggiate]dyin'… in your",
            "",
            "Bars 65–72 | Chorus · high gain ON",
            ...chorusLines,
            "",
            "Bars 73–76 | Vocal tag · high gain",
            ...secondVocalTagLines,
            "",
            "Bars 77–80 | Instrumental · high gain",
            lowStringVoicings,
            "",
            "Bars 81–84 | Bass riff · guitar rings out",
            "[E5|let ring for 4 bars · bass riff]",
            "",
            "Bars 85–88 | Solo / Outro · clean tone · open voicings",
            openVoicings,
            { text: "Lead Solo" },
            "",
            "Bars 89–96 | Solo / Outro · overdrive ON",
            lowStringVoicings,
            lowStringVoicings,
            "",
            "Bars 97–100 | Solo / Outro · punk drum build",
            {
              text: "Bars 97–99: eighth-note punk beat — snare on downbeats, kick on upbeats.",
            },
            "[E5] [C5/G] [G] [D/F#|eighth-note tom build]",
            "",
            "Bars 101–102 | Crash → bass alone",
            {
              text: "Beat 1: guitar and drums crash out; solo ends. Bass continues alone; guitar stays silent through the two-bar break.",
            },
            "",
            "Bars 103–106 | Outro guitar riff + bass",
            {
              text: "Bass Riff prominent. Guitar plays bass riff palm muted.",
            },
            "",
            "Bar 107 | Ending",
            { text: "End Beat 1 anything Em flavor" },
          ],
        },
      ],
    },
    {
      id: "rhythm-patterns",
      role: "reference",
      title: "Rhythm Patterns",
      blocks: [cleanRhythm, overdriveRhythm],
    },
  ],
};
