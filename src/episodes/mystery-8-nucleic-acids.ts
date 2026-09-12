import type { EpisodeConfig } from "./types";

const dnaCodeSvg = `
  <svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg">
    <text x="120" y="20" text-anchor="middle" font-size="12" font-weight="bold">Central Dogma</text>
    <rect x="20" y="40" width="60" height="40" fill="#ffcc99" stroke="#333" stroke-width="2" rx="5"/>
    <text x="50" y="65" text-anchor="middle" font-size="10" font-weight="bold">DNA</text>
    <polygon points="120,60 100,40 140,40" fill="#333"/>
    <line x1="90" y1="60" x2="120" y2="60" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
    <rect x="140" y="40" width="60" height="40" fill="#ffff99" stroke="#333" stroke-width="2" rx="5"/>
    <text x="170" y="65" text-anchor="middle" font-size="10" font-weight="bold">RNA</text>
    <line x1="170" y1="80" x2="170" y2="110" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
    <rect x="140" y="110" width="60" height="40" fill="#cc99ff" stroke="#333" stroke-width="2" rx="5"/>
    <text x="170" y="140" text-anchor="middle" font-size="9" font-weight="bold">Protein</text>
    <text x="120" y="170" text-anchor="middle" font-size="10">Replication</text>
    <text x="120" y="185" text-anchor="middle" font-size="10">↓</text>
    <text x="120" y="200" text-anchor="middle" font-size="11">Transcription → Translation</text>
  </svg>
`;

const NUCLEIC_MATCH_ANSWER_KEY = [
  { id: "n1", fromId: "dna", toId: "storage" },
  { id: "n2", fromId: "mrna", toId: "message" },
  { id: "n3", fromId: "trna", toId: "delivery" },
  { id: "n4", fromId: "ribosome", toId: "factory" },
];

export const mystery8NucleicAcids: EpisodeConfig = {
  id: "mystery-8-nucleic-acids",
  title: "The Code of Life",
  tier: "flagship",
  setup: {
    heading: "The Code of Life",
    body: "Life's instructions are written in DNA, copied into RNA, and translated into proteins. This is the central dogma of molecular biology. Let's trace how information flows from genes to traits.",
    diagramSvg: dnaCodeSvg,
    cta: "Decode life's instructions →",
  },
  battles: [
    {
      type: "match",
      id: "battle_1",
      heading: "Evidence 1: The central dogma",
      intro: "Information flows from DNA to RNA to proteins. Match each molecule to its role.",
      setupCta: "Match the molecules →",
      setupDiagramSvg: dnaCodeSvg,
      viewBox: { width: 300, height: 200 },
      diagramDescription: "Central dogma molecules on the left with their roles on the right.",
      nodes: [
        { id: "dna", x: 60, y: 40, label: "DNA", accessibleLabel: "DNA molecule" },
        { id: "mrna", x: 60, y: 80, label: "mRNA", accessibleLabel: "Messenger RNA" },
        { id: "trna", x: 60, y: 120, label: "tRNA", accessibleLabel: "Transfer RNA" },
        { id: "ribosome", x: 60, y: 160, label: "Rib", accessibleLabel: "Ribosome" },
        { id: "storage", x: 240, y: 40, label: "📜", accessibleLabel: "Stores genetic information" },
        { id: "message", x: 240, y: 80, label: "📨", accessibleLabel: "Carries message from DNA" },
        { id: "delivery", x: 240, y: 120, label: "🎯", accessibleLabel: "Delivers amino acids" },
        { id: "factory", x: 240, y: 160, label: "🏭", accessibleLabel: "Assembles proteins" },
      ],
      answerKey: NUCLEIC_MATCH_ANSWER_KEY,
      teachBack: "DNA stores instructions. mRNA copies the message. tRNA delivers amino acids. Ribosomes assemble proteins.",
      wrongHint: "Not quite. Think about what each molecule does.",
      finalWrongHint: "Hint: DNA = storage. mRNA = message. tRNA = delivery. Ribosome = factory.",
    },
    {
      type: "scenario",
      id: "battle_2",
      heading: "Evidence 2: The genetic code",
      intro: "DNA uses four bases (A, T, G, C) to write instructions. Groups of three bases form codons. What does start codon AUG code for?",
      setupCta: "Choose the amino acid →",
      setupDiagramSvg: dnaCodeSvg,
      quizDiagramSvg: dnaCodeSvg,
      question: "The start codon AUG codes for which amino acid?",
      options: [
        { id: "opt1", text: "Methionine (the start signal)", correct: true },
        { id: "opt2", text: "Stop (terminates protein)", correct: false },
        { id: "opt3", text: "Valine", correct: false },
        { id: "opt4", text: "No amino acid", correct: false },
      ],
      teachBack: "AUG signals start. Each codon specifies an amino acid. Stop codons end translation.",
      wrongHint: "Not quite. AUG is special — it's the start signal.",
      finalWrongHint: "Hint: AUG is the start codon. It codes for methionine and signals where translation begins.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Mutations and protein changes",
      intro: "A mutation changes one base in a gene. Not all mutations have the same effect. What happens if a mutation changes the amino acid produced?",
      setupCta: "Answer the question →",
      setupDiagramSvg: dnaCodeSvg,
      quizDiagramSvg: dnaCodeSvg,
      question: "If a codon for serine mutates to a stop codon, what type of mutation is this?",
      options: [
        { id: "opt1", text: "Nonsense mutation (creates stop codon)", correct: true },
        { id: "opt2", text: "Silent mutation (no change)", correct: false },
        { id: "opt3", text: "Missense mutation (different amino acid)", correct: false },
        { id: "opt4", text: "Beneficial mutation", correct: false },
      ],
      teachBack: "Mutations can be silent, missense, or nonsense. Nonsense mutations often damage proteins.",
      wrongHint: "Not quite. Think about what happens when a stop codon is created.",
      finalWrongHint: "Hint: A stop codon halts protein synthesis. This is a nonsense mutation.",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "The central dogma",
      evidence: "Evidence 1 — Information flow",
      body: "DNA holds instructions. Transcription copies it to mRNA. Translation reads mRNA and builds proteins. This flow — DNA to RNA to Protein — is how genes become traits.",
      diagramSvg: dnaCodeSvg,
      diagramLabel: "Central dogma flow",
      cta: "Decode the genetic code →",
    },
    battle_2: {
      id: "2",
      title: "Cracking the code",
      evidence: "Evidence 2 — How codons work",
      body: "The genetic code is a cipher: every three bases specify an amino acid. AUG says start. Stop codons say end. Ribosomes read this code and assemble proteins one amino acid at a time.",
      diagramSvg: dnaCodeSvg,
      diagramLabel: "Genetic code table",
      cta: "Explore mutations →",
    },
  },
  resolution: {
    heading: "The Code of Life Deciphered!",
    body: "DNA stores life's instructions using four bases. Through transcription and translation, cells read genes and build proteins. The genetic code is almost universal — evidence that all life shares common origin. Mutations change this code, driving evolution.",
    diagramSvg: dnaCodeSvg,
  },
};
