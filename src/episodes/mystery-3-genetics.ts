import type { EpisodeConfig } from "./types";

const dnaDiagramSvg = `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg"><path d="M 50 20 Q 70 50, 50 80 Q 30 50, 50 20" fill="none" stroke="#ff6b6b" stroke-width="3"/><path d="M 150 20 Q 130 50, 150 80 Q 170 50, 150 20" fill="none" stroke="#ff6b6b" stroke-width="3"/><line x1="50" y1="30" x2="150" y2="30" stroke="#4ecdc4" stroke-width="2"/><line x1="50" y1="50" x2="150" y2="50" stroke="#4ecdc4" stroke-width="2"/><line x1="50" y1="70" x2="150" y2="70" stroke="#4ecdc4" stroke-width="2"/><circle cx="65" cy="30" r="6" fill="#ffd700" stroke="#333" stroke-width="1"/><circle cx="65" cy="50" r="6" fill="#ff9999" stroke="#333" stroke-width="1"/><circle cx="65" cy="70" r="6" fill="#90ee90" stroke="#333" stroke-width="1"/><text x="100" y="120" text-anchor="middle" font-size="12" font-weight="bold">DNA Double Helix</text><text x="100" y="220" text-anchor="middle" font-size="11">Genes carry instructions</text></svg>`;

const GENETICS_MATCH_ANSWER_KEY = [
  { id: "g1", fromId: "dna", toId: "molecule" },
  { id: "g2", fromId: "gene", toId: "section" },
  { id: "g3", fromId: "allele", toId: "variant" },
  { id: "g4", fromId: "chromosome", toId: "package" },
];

export const mystery3Genetics: EpisodeConfig = {
  id: "mystery-3-genetics",
  title: "The Inheritance Puzzle",
  tier: "flagship",
  setup: { heading: "Inheritance", body: "You have inherited your mother's eyes and father's hair. Genes pass traits from parent to child through DNA. Trace the path.", diagramSvg: dnaDiagramSvg, cta: "Decode inheritance →" },
  battles: [
    { type: "match", id: "battle_1", heading: "Evidence 1", intro: "Match genetic terms to their meanings", setupCta: "Match →", setupDiagramSvg: dnaDiagramSvg, viewBox: { width: 300, height: 200 }, diagramDescription: "Genetic terms", nodes: [{ id: "dna", x: 60, y: 40, label: "DNA", accessibleLabel: "DNA" }, { id: "gene", x: 60, y: 80, label: "Gene", accessibleLabel: "Gene" }, { id: "allele", x: 60, y: 120, label: "Allele", accessibleLabel: "Allele" }, { id: "chromosome", x: 60, y: 160, label: "Chr", accessibleLabel: "Chromosome" }, { id: "molecule", x: 240, y: 40, label: "📜", accessibleLabel: "Molecule with genes" }, { id: "section", x: 240, y: 80, label: "🔍", accessibleLabel: "DNA section for trait" }, { id: "variant", x: 240, y: 120, label: "🎯", accessibleLabel: "Gene version" }, { id: "package", x: 240, y: 160, label: "📦", accessibleLabel: "Packaged DNA" }], answerKey: GENETICS_MATCH_ANSWER_KEY, teachBack: "DNA is molecule, genes are sections, alleles are variants, chromosomes package DNA", wrongHint: "Not quite", finalWrongHint: "Hint: DNA > genes > alleles > chromosomes" },
    { type: "scenario", id: "battle_2", heading: "Evidence 2", intro: "Dominant vs recessive inheritance", setupCta: "Choose →", setupDiagramSvg: dnaDiagramSvg, quizDiagramSvg: dnaDiagramSvg, question: "Brown eyes (B) are dominant, blue (b) are recessive. Bb genotype gives what eye color?", options: [{ id: "opt1", text: "Brown", correct: true }, { id: "opt2", text: "Blue", correct: false }, { id: "opt3", text: "Green", correct: false }, { id: "opt4", text: "Depends", correct: false }], teachBack: "One dominant allele masks recessive. Bb = brown eyes.", wrongHint: "Not quite", finalWrongHint: "Hint: Review the question carefully" },
    { type: "scenario", id: "battle_3", heading: "Evidence 3", intro: "Meiosis creates sex cells", setupCta: "Answer →", setupDiagramSvg: dnaDiagramSvg, quizDiagramSvg: dnaDiagramSvg, question: "A human cell has 46 chromosomes. After meiosis, sex cells have?", options: [{ id: "opt1", text: "23 (half)", correct: true }, { id: "opt2", text: "46 (same)", correct: false }, { id: "opt3", text: "92 (double)", correct: false }, { id: "opt4", text: "Varies", correct: false }], teachBack: "Meiosis divides chromosomes in half for sex cells.", wrongHint: "Not quite", finalWrongHint: "Hint: Review the question carefully" }
  ],
  bridges: { battle_1: { id: "1", title: "Genetics vocabulary", evidence: "Terms", body: "DNA contains genes with allele variants", diagramSvg: dnaDiagramSvg, diagramLabel: "Hierarchy", cta: "Dominance →" }, battle_2: { id: "2", title: "Dominance rules", evidence: "Inheritance", body: "One dominant allele shows its trait", diagramSvg: dnaDiagramSvg, diagramLabel: "Inheritance", cta: "Learn meiosis →" } },
  resolution: { heading: "Puzzle Solved!", body: "Traits inherit through genes. Meiosis shuffles genes, creating genetic variation.", diagramSvg: dnaDiagramSvg }
};
