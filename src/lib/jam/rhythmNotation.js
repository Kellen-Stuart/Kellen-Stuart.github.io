// Convert one count-grid bar to notation without depending on an engraver.
// One tick is a sixteenth note. Split at quarter-note beats so syncopation
// remains readable; ties continue a sound and never create another attack.
export function compileRhythmNotation(block) {
  const meter = /^(\d+)\/4$/.exec(block.timeSignature ?? "");
  if (!meter || Number(meter[1]) < 1) {
    throw new Error(
      "Staff notation currently requires a quarter-note meter, such as 4/4.",
    );
  }
  const beats = Number(meter[1]);
  const subdivisions = block.counts?.length / beats;
  if (
    ![1, 2, 4].includes(subdivisions) ||
    block.events?.length !== block.counts.length
  ) {
    throw new Error(
      "Each bar needs matching count/event arrays with 1, 2, or 4 subdivisions per beat.",
    );
  }
  const suffixes = { 1: [], 2: ["&"], 4: ["e", "&", "a"] };
  const counts = Array.from({ length: beats }, (_, index) => [
    String(index + 1),
    ...suffixes[subdivisions],
  ]).flat();
  if (counts.some((count, index) => count !== block.counts[index])) {
    throw new Error("Count labels must match the meter and subdivision order.");
  }
  const ticksPerSlot = 4 / subdivisions;
  const spans = [];
  block.events.forEach((event, index) => {
    if (!event || (event.stroke && !["D", "U"].includes(event.stroke))) {
      throw new Error(`Invalid rhythm event at subdivision ${index + 1}.`);
    }
    if (event.hold || event.rest) {
      if (
        (event.hold && event.rest) ||
        event.stroke ||
        event.mute ||
        event.chord ||
        event.accent
      ) {
        throw new Error("A sustain or rest cannot also contain an attack.");
      }
    }
    if (event.hold) {
      if (!spans.length)
        throw new Error(
          "A bar cannot begin with an unanchored sustain; use a rest or an attack.",
        );
      spans.at(-1).ticks += ticksPerSlot;
    } else if (event.rest && spans.at(-1)?.event.rest) {
      spans.at(-1).ticks += ticksPerSlot;
    } else {
      if (
        !event.rest &&
        !event.stroke &&
        !event.mute &&
        !event.chord &&
        !event.label
      ) {
        throw new Error(
          `Missing attack, rest, or sustain at subdivision ${index + 1}.`,
        );
      }
      spans.push({ event, start: index * ticksPerSlot, ticks: ticksPerSlot });
    }
  });

  const notes = [];
  for (const span of spans) {
    let remaining = span.ticks;
    let start = span.start;
    while (remaining > 0) {
      let ticks = Math.min(4 - (start % 4), remaining);
      // Show the eighth-note boundary for a sustain beginning on e or a.
      if (start % 2 === 1 && ticks > 1) ticks = 1;
      const continuation = start !== span.start;
      notes.push({
        start,
        ticks,
        duration: ticks === 4 ? "q" : ticks === 1 ? "16" : "8",
        dots: ticks === 3 ? 1 : 0,
        rest: Boolean(span.event.rest),
        mute: Boolean(span.event.mute),
        tieFromPrevious: continuation && !span.event.rest,
        attack: !continuation && !span.event.rest,
        ...(!continuation && !span.event.rest
          ? {
              chord: span.event.chord,
              stroke: span.event.stroke,
              accent: Boolean(span.event.accent),
            }
          : {}),
      });
      remaining -= ticks;
      start += ticks;
    }
  }
  return { beats, timeSignature: block.timeSignature, notes };
}
