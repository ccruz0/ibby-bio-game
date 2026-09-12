import { playHbondReveal } from "../animations/hbondTimeline";
import { playMoleculeReveal } from "../animations/moleculeTimeline";
import { playStriderReveal } from "../animations/striderTimeline";
import CohesionSvg from "../diagrams/cohesion.svg?raw";
import HbondSvg from "../diagrams/hbond.svg?raw";
import MoleculeSvg from "../diagrams/molecule.svg?raw";
import StriderSvg from "../diagrams/strider.svg?raw";
import type { EpisodeConfig } from "./types";

// Coordinates match src/diagrams/molecule.svg's #molecule_1_dropzones (viewBox 400x300).
const LABEL_ZONES = [
  { id: "dropzone_o", label: "O", accessibleLabel: "oxygen atom", x: 200, y: 150, toleranceRatio: 0.1 },
  { id: "dropzone_h1", label: "H", accessibleLabel: "left hydrogen atom", x: 130, y: 220, toleranceRatio: 0.1 },
  { id: "dropzone_h2", label: "H", accessibleLabel: "right hydrogen atom", x: 270, y: 220, toleranceRatio: 0.1 },
];

// Correct hydrogen-bond pairs per biology-notes-03.png: A-B and B-C bond, A-C does not.
const MATCH_ANSWER_KEY = [
  { id: "pair_ab", fromId: "mol_a", toId: "mol_b" },
  { id: "pair_bc", fromId: "mol_b", toId: "mol_c" },
];

export const waterA11: EpisodeConfig = {
  id: "water-a1.1",
  title: "The Water Strider Mystery",
  tier: "flagship",
  setup: {
    heading: "The Water Strider Mystery",
    body: (
      <>
        You and Ibby are young scientists investigating a strange sight down by the pond:{" "}
        <span className="ibby-keyword">water striders</span> walking on water without sinking. Something about
        water itself must explain it — time to look closer.
      </>
    ),
    diagramSvg: MoleculeSvg,
    playRevealAnimation: playMoleculeReveal,
    cta: "Start the investigation →",
  },
  battles: [
    {
      type: "drag-label",
      id: "battle_1",
      heading: "Evidence 1: What is a water molecule?",
      intro:
        "First stop in the notebook: zoom into one water molecule. Label the atoms so we know which end of the magnet is which.",
      setupCta: "Label the atoms →",
      setupDiagramSvg: MoleculeSvg,
      diagramSvg: MoleculeSvg,
      diagramSize: 400,
      diagramDescription:
        "Hand-drawn water molecule: one large central atom with two smaller atoms attached below it, left and right.",
      zones: LABEL_ZONES,
      startPositions: {
        dropzone_o: { x: 60, y: 40 },
        dropzone_h1: { x: 160, y: 40 },
        dropzone_h2: { x: 260, y: 40 },
      },
      connectorLines: [
        { x1: 200, y1: 150, x2: 130, y2: 220 },
        { x1: 200, y1: 150, x2: 270, y2: 220 },
      ],
      teachBack:
        "Teach-back: oxygen (pink) sits in the middle; the two hydrogens (yellow) share electrons with it — a polar H₂O ready to attract other waters.",
      wrongHint: "Not quite — try again.",
      finalWrongHint: "Hint: Oxygen (pink) is the big center atom; Hydrogen (yellow) are the two smaller side atoms.",
    },
    {
      type: "match",
      id: "battle_2",
      heading: "Evidence 2: How do hydrogen bonds work?",
      intro: (
        <>
          Water molecules don&apos;t float alone. Sketch the dashed attractions that tug one H₂O toward the next —
          those are the bonds that build <span className="ibby-keyword">cohesion</span>.
        </>
      ),
      setupCta: "Draw the bonds →",
      setupDiagramSvg: HbondSvg,
      viewBox: { width: 500, height: 260 },
      diagramDescription:
        "Three hand-drawn water molecules: one on the left, one lower in the middle, one on the right, with dashed attractions between neighbours.",
      nodes: [
        { id: "mol_a", x: 90, y: 70, label: "O", accessibleLabel: "left water molecule" },
        { id: "mol_b", x: 250, y: 160, label: "O", accessibleLabel: "middle water molecule" },
        { id: "mol_c", x: 410, y: 70, label: "O", accessibleLabel: "right water molecule" },
      ],
      answerKey: MATCH_ANSWER_KEY,
      teachBack:
        "Teach-back: hydrogen bonds are the dashed attractions between neighboring H₂O molecules — weaker than covalent bonds, but strong enough in numbers to glue water together.",
      wrongHint: "That pair isn't bonded — try again.",
      finalWrongHint: "Hint: hydrogen bonds form between adjacent molecules — check the dashed lines in the setup diagram.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Why does cohesion let insects float?",
      intro: (
        <>
          Back at the pond: many hydrogen bonds mean <span className="ibby-keyword">cohesion</span>. Predict why a
          water strider can stand on the surface without sinking.
        </>
      ),
      setupCta: "Make a prediction →",
      setupDiagramSvg: CohesionSvg,
      quizDiagramSvg: HbondSvg,
      playRevealAnimation: playHbondReveal,
      question: "Why can a water strider stand on the surface of a pond without sinking?",
      options: [
        { id: "opt_cohesion", text: "Cohesion between water molecules makes the surface act like an elastic film.", correct: true },
        { id: "opt_density", text: "Water is simply denser than the strider's legs.", correct: false },
        { id: "opt_temp", text: "The pond water is cold enough to be slightly frozen at the surface.", correct: false },
      ],
      teachBack: "✅ Teach-back: cohesion from hydrogen bonds creates surface tension — a stretchy film that can hold a light insect.",
      wrongHint: "Not quite — try again.",
      finalWrongHint: "Hint: think about what holds water molecules together at the surface — the same force from Evidence 2.",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "Evidence logged",
      evidence: "Evidence 1 — water molecule",
      body: (
        <>
          Nice find. A water molecule is one <span className="ibby-keyword">oxygen</span> bonded to two{" "}
          <span className="ibby-keyword">hydrogens</span> — a tiny magnet that can tug on its neighbors. Next clue:
          how those molecules stick together.
        </>
      ),
      diagramSvg: HbondSvg,
      diagramLabel: "Hydrogen-bond sketch tease",
      cta: "Follow the bonds →",
    },
    battle_2: {
      id: "2",
      title: "Evidence logged",
      evidence: "Evidence 2 — hydrogen bonds",
      body: (
        <>
          Dashed links are <span className="ibby-keyword">hydrogen bonds</span>. Many of them make water molecules
          cling in a chain — <span className="ibby-keyword">cohesion</span>. That film on the pond might be strong
          enough for a strider…
        </>
      ),
      diagramSvg: CohesionSvg,
      diagramLabel: "Cohesion chain tease",
      peekDiagramSvg: StriderSvg,
      peekLabel: "Water strider surface-tension tease",
      cta: "Test the pond surface →",
    },
  },
  resolution: {
    heading: "Mystery Solved!",
    body: (
      <>
        Because of <span className="ibby-keyword">hydrogen bonds</span>, water molecules stick together — creating{" "}
        <span className="ibby-keyword">surface tension</span> strong enough to hold a water strider up.
      </>
    ),
    diagramSvg: StriderSvg,
    playRevealAnimation: playStriderReveal,
  },
};
