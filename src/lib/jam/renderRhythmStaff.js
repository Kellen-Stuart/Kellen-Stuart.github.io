// This module is imported on demand. The Bravura build embeds its music and
// text fonts, so neither the renderer nor its fonts need a CDN request.
import {
  Annotation,
  Articulation,
  Beam,
  Dot,
  Formatter,
  Fraction,
  ModifierPosition,
  Renderer,
  Stave,
  StaveNote,
  StaveTie,
  Stem,
  Voice,
} from "vexflow/bravura";
import { compileRhythmNotation } from "./rhythmNotation.js";

export async function prepareRhythmFonts() {
  const fonts = await Promise.all([
    document.fonts.load('16px "Bravura"', "\uE0A4"),
    document.fonts.load('16px "Academico"'),
  ]);
  if (fonts.some((family) => !family.length))
    throw new Error("Notation fonts did not load.");
}

// Export the score construction separately so tests can check real VexFlow
// durations, beam groups, and attack modifiers without a browser or server.
export function createRhythmScore(block, chordShapes = {}) {
  const notation = compileRhythmNotation(block);
  let lastChord;
  const notes = notation.notes.map((event) => {
    const note = new StaveNote({
      keys: ["b/4"],
      duration: event.duration,
      dots: event.dots,
      type: event.rest ? "r" : event.mute ? "m" : "n",
      stemDirection: Stem.UP,
    });
    if (event.dots) Dot.buildAndAttach([note], { all: true });
    if (event.stroke) {
      note.addModifier(
        new Articulation(event.stroke === "D" ? "am" : "a|").setPosition(
          ModifierPosition.BELOW,
        ),
        0,
      );
    }
    if (event.accent) {
      note.addModifier(
        new Articulation("a>").setPosition(ModifierPosition.ABOVE),
        0,
      );
    }
    if (event.chord && event.chord !== lastChord) {
      const label =
        block.chordLabels?.[event.chord] ??
        chordShapes[event.chord]?.label ??
        event.chord;
      note.addModifier(
        new Annotation(label)
          .setFont("Arial", 11, "bold")
          .setJustification(Annotation.HorizontalJustify.LEFT)
          .setVerticalJustification(Annotation.VerticalJustify.TOP),
        0,
      );
      lastChord = event.chord;
    }
    return note;
  });
  const voice = new Voice({
    numBeats: notation.beats,
    beatValue: 4,
  }).addTickables(notes);
  const beams = Beam.generateBeams(notes, {
    groups: [new Fraction(1, 4)],
    stemDirection: Stem.UP,
    beamRests: false,
  });
  const ties = notation.notes.flatMap((event, index) =>
    event.tieFromPrevious
      ? [
          new StaveTie({
            firstNote: notes[index - 1],
            lastNote: notes[index],
            firstIndexes: [0],
            lastIndexes: [0],
          }),
        ]
      : [],
  );
  return { notation, notes, voice, beams, ties };
}

export function renderRhythmStaff(element, block, chordShapes, availableWidth) {
  element.replaceChildren();
  const { notation, voice, beams, ties } = createRhythmScore(
    block,
    chordShapes,
  );
  const formatter = new Formatter().joinVoices([voice]);
  const minimumWidth = formatter.preCalculateMinTotalWidth([voice]);
  // Preserve readable spacing on phones by scrolling horizontally instead of
  // shrinking glyphs. The formatter also reserves space for long chord names.
  const width = Math.ceil(Math.max(availableWidth, 420, minimumWidth + 110));
  const height = 240;
  const renderer = new Renderer(element, Renderer.Backends.SVG);
  renderer.resize(width, height);
  const context = renderer.getContext();
  const stave = new Stave(8, 70, width - 16).addTimeSignature(
    notation.timeSignature,
  );
  stave.setContext(context).draw();
  formatter.formatToStave([voice], stave);
  voice.draw(context, stave);
  beams.forEach((beam) => beam.setContext(context).draw());
  ties.forEach((tie) => tie.setContext(context).draw());
  const svg = element.querySelector("svg");
  // VexFlow measures glyph ink, whereas SVG text getBBox includes the music
  // font's oversized em box. Use the ink bounds for compact, unclipped staffs.
  const bounds = voice.getBoundingBox();
  const top = Math.floor(Math.min(bounds.getY(), stave.getYForLine(0)) - 12);
  const bottom = Math.ceil(
    Math.max(bounds.getY() + bounds.getH(), stave.getYForLine(4)) + 12,
  );
  const fittedHeight = bottom - top;
  svg.setAttribute("viewBox", `0 ${top} ${width} ${fittedHeight}`);
  svg.setAttribute("height", String(fittedHeight));
  // VexFlow also sets inline dimensions; keep those in sync with the viewBox.
  svg.style.width = `${width}px`;
  svg.style.height = `${fittedHeight}px`;
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    `${block.label}, ${notation.timeSignature}. Rhythm on the middle staff line. Strum directions below; accents and chord changes above. Ties sustain without another stroke.`,
  );
  // VexFlow's SVG text nodes are decorative within this labelled image.
  svg.setAttribute("focusable", "false");
}
