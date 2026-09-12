import { playBasepairReveal } from "../animations/basepairTimeline";
import { playNucleotideReveal } from "../animations/nucleotideTimeline";
import { playReplicationReveal } from "../animations/replicationTimeline";
import BasepairSvg from "../diagrams/basepair.svg?raw";
import HelixSvg from "../diagrams/helix.svg?raw";
import NucleotideSvg from "../diagrams/nucleotide.svg?raw";
import ReplicationSvg from "../diagrams/replication.svg?raw";
import type { EpisodeConfig } from "./types";

// Coordinates match src/diagrams/nucleotide.svg's #nucleotide_1_dropzones (viewBox 400x300).
const LABEL_ZONES = [
  { id: "dropzone_p", label: "P", accessibleLabel: "phosphate group", x: 110, y: 90, toleranceRatio: 0.1 },
  { id: "dropzone_s", label: "S", accessibleLabel: "sugar", x: 200, y: 170, toleranceRatio: 0.1 },
  { id: "dropzone_b", label: "B", accessibleLabel: "nitrogenous base", x: 300, y: 170, toleranceRatio: 0.1 },
];

// Correct complementary base pairs per IB A1.2.6: A-T (2 H-bonds) and G-C (3 H-bonds).
const MATCH_ANSWER_KEY = [
  { id: "pair_at", fromId: "mol_a", toId: "mol_t" },
  { id: "pair_gc", fromId: "mol_g", toId: "mol_c" },
];

export const nucleicAcidsA12: EpisodeConfig = {
  id: "nucleic-acids-a1.2",
  title: "The Perfect Copy Mystery",
  tier: "flagship",
  setup: {
    heading: "The Perfect Copy Mystery",
    body: (
      <>
        You and Ibby are watching a cell about to divide under the microscope. Somehow, both new
        cells will end up with an exact copy of the same hereditary <span className="ibby-keyword">instruction
        manual</span>. How can something that long be copied without a single mistake? Time to zoom
        into the molecule that stores it — <span className="ibby-keyword">DNA</span>.
      </>
    ),
    diagramSvg: NucleotideSvg,
    playRevealAnimation: playNucleotideReveal,
    cta: "Start the investigation →",
  },
  battles: [
    {
      type: "drag-label",
      id: "battle_1",
      heading: "Evidence 1: What is a nucleotide?",
      intro:
        "First stop in the notebook: zoom into one building block of DNA. Label its three parts so we know what we're working with.",
      setupCta: "Label the parts →",
      setupDiagramSvg: NucleotideSvg,
      diagramSvg: NucleotideSvg,
      diagramSize: 400,
      diagramDescription:
        "Hand-drawn nucleotide: three linked parts — one at the top left, one in the middle, one to its right.",
      zones: LABEL_ZONES,
      startPositions: {
        dropzone_p: { x: 60, y: 40 },
        dropzone_s: { x: 180, y: 40 },
        dropzone_b: { x: 300, y: 40 },
      },
      connectorLines: [
        { x1: 200, y1: 170, x2: 110, y2: 90 },
        { x1: 200, y1: 170, x2: 300, y2: 170 },
      ],
      teachBack:
        "Teach-back: every nucleotide is a phosphate (P) linked to a pentose sugar (S), linked to a nitrogenous base (B) — the repeating three-part unit that builds every strand of DNA and RNA.",
      wrongHint: "Not quite — try again.",
      finalWrongHint: "Hint: the sugar sits in the middle; the phosphate attaches on one side, the base attaches on the other.",
    },
    {
      type: "match",
      id: "battle_2",
      heading: "Evidence 2: How do bases pair up?",
      intro: (
        <>
          Bases don&apos;t pair up randomly. Draw the hydrogen bonds that link each base on one
          strand to its partner on the other — that&apos;s <span className="ibby-keyword">complementary
          base pairing</span>.
        </>
      ),
      setupCta: "Draw the bonds →",
      setupDiagramSvg: BasepairSvg,
      viewBox: { width: 560, height: 220 },
      diagramDescription:
        "Four hand-drawn DNA bases in a row: adenine, thymine, guanine and cytosine.",
      nodes: [
        { id: "mol_a", x: 80, y: 110, label: "A", accessibleLabel: "adenine" },
        { id: "mol_t", x: 220, y: 110, label: "T", accessibleLabel: "thymine" },
        { id: "mol_g", x: 340, y: 110, label: "G", accessibleLabel: "guanine" },
        { id: "mol_c", x: 480, y: 110, label: "C", accessibleLabel: "cytosine" },
      ],
      answerKey: MATCH_ANSWER_KEY,
      teachBack:
        "Teach-back: adenine (A) only pairs with thymine (T), and guanine (G) only pairs with cytosine (C) — complementary base pairing. That fixed rule is what makes DNA copyable without losing information.",
      wrongHint: "That pair isn't complementary — try again.",
      finalWrongHint: "Hint: A pairs with T, and G pairs with C — nothing else.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Why does base pairing let DNA copy perfectly?",
      intro: (
        <>
          Back at the dividing cell: the double helix has two strands held together by{" "}
          <span className="ibby-keyword">complementary base pairing</span>. Predict how that lets
          the cell build an exact copy every time it divides.
        </>
      ),
      setupCta: "Make a prediction →",
      setupDiagramSvg: HelixSvg,
      quizDiagramSvg: BasepairSvg,
      playRevealAnimation: playBasepairReveal,
      question:
        "When a cell divides, how does each new DNA molecule end up with the exact same base sequence as the original?",
      options: [
        {
          id: "opt_template",
          text: "The two strands separate and each acts as a template — complementary base pairing rebuilds an exact matching strand.",
          correct: true,
        },
        {
          id: "opt_blueprint",
          text: "The cell measures the DNA and manufactures an identical copy from scratch using a separate blueprint.",
          correct: false,
        },
        {
          id: "opt_discard",
          text: "Random bases are added and the cell discards any copies that come out looking different.",
          correct: false,
        },
      ],
      teachBack:
        "✅ Teach-back: each strand is a template. Because A only pairs with T and G only pairs with C, rebuilding a complementary strand always recreates the exact original sequence — semi-conservative replication.",
      wrongHint: "Not quite — try again.",
      finalWrongHint: "Hint: think about what each of the two original strands can guide the cell to rebuild — the same rule from Evidence 2.",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "Evidence logged",
      evidence: "Evidence 1 — nucleotide",
      body: (
        <>
          Nice find. A nucleotide is a <span className="ibby-keyword">phosphate</span>, a{" "}
          <span className="ibby-keyword">sugar</span>, and a <span className="ibby-keyword">base</span> —
          link thousands of them and you get a strand of DNA. Next clue: how two strands find each
          other.
        </>
      ),
      diagramSvg: BasepairSvg,
      diagramLabel: "Complementary base-pairing sketch tease",
      cta: "Find the pairing rule →",
    },
    battle_2: {
      id: "2",
      title: "Evidence logged",
      evidence: "Evidence 2 — base pairing",
      body: (
        <>
          A always pairs with T, and G always pairs with C — <span className="ibby-keyword">complementary
          base pairing</span>. Two strands held together this way twist into a{" "}
          <span className="ibby-keyword">double helix</span>. That fixed rule might be exactly what
          lets a cell copy its DNA without a single mistake…
        </>
      ),
      diagramSvg: HelixSvg,
      diagramLabel: "Double helix tease",
      peekDiagramSvg: ReplicationSvg,
      peekLabel: "DNA replication tease",
      cta: "Test the copying machine →",
    },
  },
  resolution: {
    heading: "Mystery Solved!",
    body: (
      <>
        Because of <span className="ibby-keyword">complementary base pairing</span>, each strand of
        the double helix can act as a template — letting the cell rebuild a perfect copy of its
        entire genetic code, every single time it divides.
      </>
    ),
    diagramSvg: ReplicationSvg,
    playRevealAnimation: playReplicationReveal,
  },
};
