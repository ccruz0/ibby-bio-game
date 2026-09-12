import { playCellCompartmentsReveal, playCellReveal } from "../animations/cellRevealTimeline";
import CellCompartmentsSvg from "../diagrams/cell-compartments.svg?raw";
import CellComparisonSvg from "../diagrams/cell-comparison.svg?raw";
import EukaryoticCellSvg from "../diagrams/eukaryotic-cell.svg?raw";
import ProkaryoteCellSvg from "../diagrams/prokaryote-cell.svg?raw";
import type { EpisodeConfig } from "./types";

// Label zones for eukaryotic cell diagram (drag-label battle).
// Coordinates match src/diagrams/eukaryotic-cell.svg viewBox (500x400).
const EUKARYOTIC_LABEL_ZONES = [
  { id: "dropzone_nucleus", label: "nucleus", accessibleLabel: "nucleus", x: 250, y: 140, toleranceRatio: 0.15 },
  { id: "dropzone_mitochondria", label: "mitochondria", accessibleLabel: "mitochondria", x: 150, y: 280, toleranceRatio: 0.12 },
  { id: "dropzone_er", label: "endoplasmic\nreticulum", accessibleLabel: "endoplasmic reticulum", x: 140, y: 200, toleranceRatio: 0.12 },
  { id: "dropzone_golgi", label: "Golgi\napparatus", accessibleLabel: "Golgi apparatus", x: 250, y: 320, toleranceRatio: 0.12 },
  { id: "dropzone_ribosome", label: "ribosome", accessibleLabel: "ribosome", x: 310, y: 170, toleranceRatio: 0.1 },
  { id: "dropzone_membrane", label: "cell\nmembrane", accessibleLabel: "cell membrane", x: 250, y: 50, toleranceRatio: 0.12 },
];

// Match answer key for prokaryote vs eukaryote comparison.
const PROKARYOTE_EUKARYOTE_MATCHES = [
  { id: "pair_nucleoid", fromId: "node_nucleoid", toId: "node_nucleus" },
  { id: "pair_70s", fromId: "node_70s_ribosome", toId: "node_80s_ribosome" },
  { id: "pair_organelles", fromId: "node_cell_wall_prokaryote", toId: "node_membrane_bound_organelles" },
];

export const cellStructureA22: EpisodeConfig = {
  id: "cell-structure-a2.2",
  title: "What's Inside the Box?",
  tier: "flagship",
  setup: {
    heading: "What's Inside the Box?",
    body: (
      <>
        Under the microscope, a speck appears — so tiny you can barely see it. But zoom in, and it reveals
        itself to be a <span className="ibby-keyword">living cell</span> — like a miniature city with compartments,
        walls, and structures. You and Ibby must explore this invisible architecture and unlock its secrets. Why do
        some cells have walls and others don't? Why do some have a nucleus and others don't? The answer lies in the
        <span className="ibby-keyword">cell structure</span>.
      </>
    ),
    diagramSvg: EukaryoticCellSvg,
    playRevealAnimation: playCellReveal,
    cta: "Enter the cell →",
  },
  battles: [
    {
      type: "drag-label",
      id: "battle_1",
      heading: "Evidence 1: What are the parts of a eukaryotic cell?",
      intro:
        "Start by mapping the main structures of a eukaryotic cell. Each part has a function — label them so we know what we're exploring.",
      setupCta: "Label the structures →",
      setupDiagramSvg: EukaryoticCellSvg,
      diagramSvg: EukaryoticCellSvg,
      diagramSize: 500,
      diagramDescription:
        "Hand-drawn eukaryotic cell in cross-section, with six unlabelled structures inside its outer boundary.",
      zones: EUKARYOTIC_LABEL_ZONES,
      startPositions: {
        dropzone_nucleus: { x: 50, y: 50 },
        dropzone_mitochondria: { x: 80, y: 110 },
        dropzone_er: { x: 180, y: 50 },
        dropzone_golgi: { x: 280, y: 110 },
        dropzone_ribosome: { x: 380, y: 50 },
        dropzone_membrane: { x: 450, y: 110 },
      },
      connectorLines: [
        { x1: 250, y1: 160, x2: 150, y2: 190 },
        { x1: 250, y1: 320, x2: 250, y2: 280 },
      ],
      teachBack:
        "Teach-back: a eukaryotic cell has a nucleus (DNA compartment), mitochondria (energy), endoplasmic reticulum (protein synthesis), Golgi apparatus (protein packaging), ribosomes (protein makers), and a cell membrane (boundary). Each compartment is membrane-bound — a key feature of eukaryotes.",
      wrongHint: "Not quite — try again. Check the diagram for clues.",
      finalWrongHint: "Hint: Look for the largest structure first (nucleus), then the other organelles around it.",
    },
    {
      type: "match",
      id: "battle_2",
      heading: "Evidence 2: Prokaryote vs Eukaryote — how do they differ?",
      intro: (
        <>
          Not all cells are the same. <span className="ibby-keyword">Prokaryotes</span> (like bacteria) and{" "}
          <span className="ibby-keyword">eukaryotes</span> (like your cells) have different architectures. Match each
          prokaryote feature to its eukaryote equivalent.
        </>
      ),
      setupCta: "Draw the matches →",
      setupDiagramSvg: CellComparisonSvg,
      viewBox: { width: 700, height: 300 },
      diagramDescription:
        "Hand-drawn comparison: three prokaryote features listed on the left, three eukaryote features on the right.",
      nodes: [
        { id: "node_nucleoid", x: 100, y: 80, label: "Nucleoid\n(DNA region)", accessibleLabel: "prokaryote nucleoid, the DNA region" },
        { id: "node_70s_ribosome", x: 100, y: 140, label: "70S Ribosomes", accessibleLabel: "prokaryote 70S ribosomes" },
        { id: "node_cell_wall_prokaryote", x: 100, y: 200, label: "Cell Wall", accessibleLabel: "prokaryote cell wall" },
        { id: "node_nucleus", x: 600, y: 80, label: "Nucleus\n(DNA compartment)", accessibleLabel: "eukaryote nucleus, the DNA compartment" },
        { id: "node_80s_ribosome", x: 600, y: 140, label: "80S Ribosomes", accessibleLabel: "eukaryote 80S ribosomes" },
        { id: "node_membrane_bound_organelles", x: 600, y: 200, label: "Membrane-bound\nOrganelles", accessibleLabel: "eukaryote membrane-bound organelles" },
      ],
      answerKey: PROKARYOTE_EUKARYOTE_MATCHES,
      teachBack:
        "Teach-back: prokaryotes lack a nucleus — their DNA floats freely in a nucleoid region. Prokaryotes have 70S ribosomes; eukaryotes have larger 80S ribosomes. Eukaryotes have membrane-bound organelles (nucleus, mitochondria, ER, Golgi); prokaryotes lack these compartments. Both have cell walls (in bacteria, plants, fungi) but prokaryotes' simpler structure reflects their earlier evolution.",
      wrongHint: "That's not the right pair — try again.",
      finalWrongHint: "Hint: nucleoid matches nucleus, 70S matches 80S (different ribosome sizes), and cell wall matches the compartmentalization advantage.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Why does compartmentalization matter?",
      intro: (
        <>
          You've mapped both cell types. Now think about the big picture: why would eukaryotes evolve
          <span className="ibby-keyword">membrane-bound compartments</span> for different functions, while prokaryotes
          keep everything in one space? What's the evolutionary advantage?
        </>
      ),
      setupCta: "Make a prediction →",
      setupDiagramSvg: EukaryoticCellSvg,
      quizDiagramSvg: CellCompartmentsSvg,
      playRevealAnimation: playCellCompartmentsReveal,
      question:
        "Why did eukaryotic cells evolve membrane-bound organelles (compartments) for different functions?",
      options: [
        {
          id: "opt_efficiency",
          text: "Separate compartments let different reactions happen at once without interfering with each other — more complex chemistry, greater efficiency.",
          correct: true,
        },
        {
          id: "opt_protection",
          text: "Compartments protect the DNA from damage by surrounding it with extra membranes, making prokaryotes less protected.",
          correct: false,
        },
        {
          id: "opt_size",
          text: "Compartments allow cells to be larger without losing function — prokaryotes stay small because they can't compartmentalize.",
          correct: false,
        },
      ],
      teachBack:
        "✅ Teach-back: compartmentalization is about specialization and chemical efficiency. By separating different biochemical pathways into different membrane-bound spaces, eukaryotic cells can run multiple complex reactions simultaneously without them interfering with each other. This is why eukaryotes can be larger, more complex, and multicellar — prokaryotes are limited by their single-compartment design.",
      wrongHint: "Not quite — try again. Think about what happens when you can isolate different chemical reactions.",
      finalWrongHint: "Hint: Compartmentalization allows complex cells to do many chemistry jobs at once. Which option fits that?",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "Map logged",
      evidence: "Evidence 1 — eukaryotic cell structures",
      body: (
        <>
          A eukaryotic cell is like a city with neighborhoods. The <span className="ibby-keyword">nucleus</span> is the
          control center (DNA). <span className="ibby-keyword">Mitochondria</span> are the power plants. The{" "}
          <span className="ibby-keyword">endoplasmic reticulum</span> and <span className="ibby-keyword">Golgi</span> are
          the factories. Each has a <span className="ibby-keyword">membrane</span> separating it from the rest — that's
          what makes eukaryotes special. But wait — not all cells are like this. Some are much simpler.
        </>
      ),
      diagramSvg: ProkaryoteCellSvg,
      diagramLabel: "A prokaryotic cell — no nucleus, no compartments",
      peekDiagramSvg: CellComparisonSvg,
      peekLabel: "How they differ",
      cta: "Compare the two cell types →",
    },
    battle_2: {
      id: "2",
      title: "Comparison complete",
      evidence: "Evidence 2 — prokaryote vs eukaryote",
      body: (
        <>
          Prokaryotes (bacteria) are ancient and simple: no nucleus, no organelles, just a cell wall, membrane, and
          cytoplasm. Eukaryotes are newer and complex: nucleus, mitochondria, ER, Golgi — compartments everywhere. But
          why the difference? There's an evolutionary logic here. More structure = more complexity = more
          capabilities. But it came at a cost. Let's find out what{" "}
          <span className="ibby-keyword">compartmentalization</span> actually buys you.
        </>
      ),
      diagramSvg: CellCompartmentsSvg,
      diagramLabel: "Compartments enable specialization",
      cta: "Unlock the evolutionary advantage →",
    },
  },
  resolution: {
    heading: "The Mystery Solved!",
    body: (
      <>
        The invisible city you discovered is a <span className="ibby-keyword">eukaryotic cell</span> — a marvel of
        evolution. Its <span className="ibby-keyword">compartments</span> (nucleus, mitochondria, ER, Golgi) each handle
        a specialized job. This separation lets eukaryotes run complex chemistry that prokaryotes can't — which is why
        complex, multicellular life like animals and plants are all eukaryotic. Prokaryotes keep it simple: no nucleus,
        no organelles. Both designs work, but they work in different ways. The cell is life's basic unit, but the
        details of cell structure determine what that life can become.
      </>
    ),
    diagramSvg: CellCompartmentsSvg,
    playRevealAnimation: playCellCompartmentsReveal,
  },
};
