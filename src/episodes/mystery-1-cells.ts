import type { EpisodeConfig } from "./types";

const CELL_LABEL_ZONES = [
  { id: "z1", label: "Nucleus", accessibleLabel: "nucleus", x: 100, y: 100, toleranceRatio: 0.1 },
  { id: "z2", label: "Mitochondria", accessibleLabel: "mitochondria", x: 140, y: 80, toleranceRatio: 0.1 },
  { id: "z3", label: "Chloroplast", accessibleLabel: "chloroplast", x: 70, y: 90, toleranceRatio: 0.1 },
  { id: "z4", label: "Cell membrane", accessibleLabel: "cell membrane", x: 100, y: 30, toleranceRatio: 0.1 },
  { id: "z5", label: "Cell wall", accessibleLabel: "cell wall", x: 100, y: 25, toleranceRatio: 0.1 },
];

const CELL_MATCH_ANSWER_KEY = [
  { id: "m1", fromId: "mitochondria", toId: "energy" },
  { id: "m2", fromId: "nucleus", toId: "control" },
  { id: "m3", fromId: "chloroplast", toId: "photosynthesis" },
  { id: "m4", fromId: "ribosome", toId: "protein" },
  { id: "m5", fromId: "cellwall", toId: "support" },
];

const cellDiagramSvg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="90" fill="#e8f4f8" stroke="#333" stroke-width="2"/><circle cx="100" cy="100" r="85" fill="none" stroke="#666" stroke-width="1" stroke-dasharray="2,2"/><circle cx="100" cy="100" r="40" fill="#ffd700" stroke="#333" stroke-width="1"/><text x="100" y="105" text-anchor="middle" font-size="12" font-weight="bold">Nucleus</text><ellipse cx="130" cy="70" rx="15" ry="12" fill="#ff6b6b" stroke="#333" stroke-width="1"/><text x="130" y="75" text-anchor="middle" font-size="10">Mit</text><ellipse cx="65" cy="80" rx="20" ry="15" fill="#90ee90" stroke="#333" stroke-width="1"/><text x="65" y="85" text-anchor="middle" font-size="9">Chlo</text><circle cx="80" cy="120" r="8" fill="#ff9999" stroke="#333" stroke-width="1"/><circle cx="120" cy="130" r="8" fill="#ff9999" stroke="#333" stroke-width="1"/><text x="100" y="20" text-anchor="middle" font-size="11" font-weight="bold">Cell</text></svg>`;

export const mystery1Cells: EpisodeConfig = {
  id: "mystery-1-cells",
  title: "The Hidden City",
  tier: "flagship",
  setup: { heading: "The Hidden City", body: "You have discovered an ancient civilization inside a massive structure. Label the parts and learn how cells work.", diagramSvg: cellDiagramSvg, cta: "Enter the cell →" },
  battles: [
    { type: "drag-label", id: "battle_1", heading: "Evidence 1", intro: "Label the structures", setupCta: "Label →", setupDiagramSvg: cellDiagramSvg, diagramSvg: cellDiagramSvg, diagramSize: 200, diagramDescription: "Plant cell diagram", zones: CELL_LABEL_ZONES, startPositions: { z1: { x: 10, y: 10 }, z2: { x: 10, y: 35 }, z3: { x: 10, y: 60 }, z4: { x: 10, y: 85 }, z5: { x: 10, y: 110 } }, connectorLines: [{ x1: 100, y1: 100, x2: 100, y2: 100 }], teachBack: "Nucleus controls; mitochondria and chloroplasts are power plants", wrongHint: "Not quite", finalWrongHint: "Hint: Nucleus is yellow center" },
    { type: "match", id: "battle_2", heading: "Evidence 2", intro: "Match structures to jobs", setupCta: "Match →", setupDiagramSvg: cellDiagramSvg, viewBox: { width: 300, height: 200 }, diagramDescription: "Cell organelles", nodes: [{ id: "mitochondria", x: 60, y: 40, label: "Mit", accessibleLabel: "Mitochondria" }, { id: "nucleus", x: 60, y: 80, label: "Nuc", accessibleLabel: "Nucleus" }, { id: "chloroplast", x: 60, y: 120, label: "Chl", accessibleLabel: "Chloroplast" }, { id: "ribosome", x: 60, y: 160, label: "Rib", accessibleLabel: "Ribosome" }, { id: "cellwall", x: 60, y: 180, label: "CW", accessibleLabel: "Cell wall" }, { id: "energy", x: 240, y: 40, label: "🔋", accessibleLabel: "Energy" }, { id: "control", x: 240, y: 80, label: "⚙️", accessibleLabel: "Control" }, { id: "photosynthesis", x: 240, y: 120, label: "☀️", accessibleLabel: "Make glucose" }, { id: "protein", x: 240, y: 160, label: "🧬", accessibleLabel: "Make proteins" }, { id: "support", x: 240, y: 180, label: "🏗️", accessibleLabel: "Support" }], answerKey: CELL_MATCH_ANSWER_KEY, teachBack: "Mitochondria = energy, Nucleus = control", wrongHint: "Not a match", finalWrongHint: "Hint: Mitochondria = energy" },
    { type: "scenario", id: "battle_3", heading: "Energy source", intro: "Where does plant energy come from?", setupCta: "Choose →", setupDiagramSvg: cellDiagramSvg, quizDiagramSvg: cellDiagramSvg, question: "Where does plant cell energy come from?", options: [{ id: "opt1", text: "From the sun via photosynthesis", correct: true }, { id: "opt2", text: "From soil", correct: false }, { id: "opt3", text: "From water", correct: false }, { id: "opt4", text: "From nucleus", correct: false }], teachBack: "Chloroplasts capture sun", wrongHint: "Not quite", finalWrongHint: "Hint: Review the question carefully" }
  ],
  bridges: { battle_1: { id: "1", title: "City revealed", evidence: "Structures", body: "You identified the cell parts", diagramSvg: cellDiagramSvg, diagramLabel: "Cell", cta: "Match →" }, battle_2: { id: "2", title: "Functions", evidence: "Roles", body: "Now you understand their roles", diagramSvg: cellDiagramSvg, diagramLabel: "Functions", cta: "Energy →" } },
  resolution: { heading: "Mystery Solved!", body: "The cell is organized with specialized structures that work together", diagramSvg: cellDiagramSvg }
};
