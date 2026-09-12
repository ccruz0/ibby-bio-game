import type { EpisodeConfig } from "./types";

const moleculeDiagramSvg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="100" r="25" fill="#ffcc99" stroke="#333" stroke-width="2"/><text x="60" y="105" text-anchor="middle" font-weight="bold">C</text><circle cx="100" cy="100" r="25" fill="#ffff99" stroke="#333" stroke-width="2"/><text x="100" y="105" text-anchor="middle" font-weight="bold">H</text><circle cx="140" cy="100" r="25" fill="#ff9999" stroke="#333" stroke-width="2"/><text x="140" y="105" text-anchor="middle" font-weight="bold">O</text><line x1="85" y1="100" x2="115" y2="100" stroke="#333" stroke-width="2"/><line x1="125" y1="100" x2="155" y2="100" stroke="#333" stroke-width="2"/><text x="100" y="30" text-anchor="middle" font-size="14" font-weight="bold">Organic Molecules</text></svg>`;

const MOLECULE_MATCH_ANSWER_KEY = [
  { id: "m1", fromId: "carbs", toId: "energy" },
  { id: "m2", fromId: "proteins", toId: "structure" },
  { id: "m3", fromId: "lipids", toId: "storage" },
  { id: "m4", fromId: "nucleic", toId: "dna" },
];

export const mystery2Molecules: EpisodeConfig = {
  id: "mystery-2-molecules",
  title: "The Recipe of Life",
  tier: "flagship",
  setup: { heading: "The Recipe of Life", body: "You have found an ancient cookbook. Four main ingredients build all life: carbohydrates, proteins, lipids, and nucleic acids. Decode them.", diagramSvg: moleculeDiagramSvg, cta: "Read the recipes →" },
  battles: [
    { type: "match", id: "battle_1", heading: "Evidence 1", intro: "Match organic molecules to their roles", setupCta: "Match →", setupDiagramSvg: moleculeDiagramSvg, viewBox: { width: 300, height: 200 }, diagramDescription: "Molecules and their roles", nodes: [{ id: "carbs", x: 60, y: 50, label: "CHO", accessibleLabel: "Carbohydrates" }, { id: "proteins", x: 60, y: 100, label: "Prot", accessibleLabel: "Proteins" }, { id: "lipids", x: 60, y: 150, label: "Lipid", accessibleLabel: "Lipids" }, { id: "nucleic", x: 60, y: 180, label: "DNA", accessibleLabel: "Nucleic acids" }, { id: "energy", x: 240, y: 50, label: "⚡", accessibleLabel: "Quick energy" }, { id: "structure", x: 240, y: 100, label: "🏗️", accessibleLabel: "Build structures" }, { id: "storage", x: 240, y: 150, label: "📦", accessibleLabel: "Store energy" }, { id: "dna", x: 240, y: 180, label: "🧬", accessibleLabel: "Store information" }], answerKey: MOLECULE_MATCH_ANSWER_KEY, teachBack: "Carbs = energy, Proteins = structure, Lipids = storage, Nucleic acids = genetic info", wrongHint: "Not the right match", finalWrongHint: "Hint: Carbs = energy, Proteins = structure, Lipids = storage, Nucleic acids = code" },
    { type: "scenario", id: "battle_2", heading: "Evidence 2", intro: "Which atoms are in ALL organic molecules?", setupCta: "Choose →", setupDiagramSvg: moleculeDiagramSvg, quizDiagramSvg: moleculeDiagramSvg, question: "Which atoms are found in ALL organic molecules?", options: [{ id: "opt1", text: "Carbon and Hydrogen", correct: true }, { id: "opt2", text: "Nitrogen and Oxygen", correct: false }, { id: "opt3", text: "Sulfur and Phosphorus", correct: false }, { id: "opt4", text: "Iron and Magnesium", correct: false }], teachBack: "Carbon is the backbone of all organic molecules. Hydrogen bonds to carbon.", wrongHint: "Not quite", finalWrongHint: "Hint: Review the question carefully" },
    { type: "scenario", id: "battle_3", heading: "Evidence 3", intro: "When molecules link, what is removed?", setupCta: "Answer →", setupDiagramSvg: moleculeDiagramSvg, quizDiagramSvg: moleculeDiagramSvg, question: "When two glucose molecules bond, what is removed?", options: [{ id: "opt1", text: "A water molecule (H2O)", correct: true }, { id: "opt2", text: "Carbon (C)", correct: false }, { id: "opt3", text: "Oxygen (O2)", correct: false }, { id: "opt4", text: "Hydrogen (H2)", correct: false }], teachBack: "Dehydration synthesis removes water when bonds form.", wrongHint: "Not quite", finalWrongHint: "Hint: Review the question carefully" }
  ],
  bridges: { battle_1: { id: "1", title: "Molecules identified", evidence: "Molecules", body: "You matched the four organic molecules to their roles", diagramSvg: moleculeDiagramSvg, diagramLabel: "Roles", cta: "Explore atoms →" }, battle_2: { id: "2", title: "Carbon chemistry", evidence: "Foundation", body: "All organic life is based on carbon and hydrogen", diagramSvg: moleculeDiagramSvg, diagramLabel: "Carbon bonds", cta: "Learn building →" } },
  resolution: { heading: "Recipe Decoded!", body: "Life is built from four organic molecules using carbon, hydrogen, and other atoms.", diagramSvg: moleculeDiagramSvg }
};
