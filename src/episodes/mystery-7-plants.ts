import type { EpisodeConfig } from "./types";

const plantDiagramSvg = `
  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <g id="plant">
      <circle cx="100" cy="50" r="30" fill="#90ee90" stroke="#333" stroke-width="2"/>
      <path d="M 75 75 Q 70 100, 75 130 Q 75 150, 80 170" fill="none" stroke="#8b4513" stroke-width="3"/>
      <path d="M 125 75 Q 130 100, 125 130 Q 125 150, 120 170" fill="none" stroke="#8b4513" stroke-width="3"/>
      <path d="M 100 80 L 60 100 L 55 110 L 70 105" fill="#90ee90" stroke="#333" stroke-width="1"/>
      <path d="M 100 80 L 140 100 L 145 110 L 130 105" fill="#90ee90" stroke="#333" stroke-width="1"/>
      <path d="M 80 170 Q 65 185, 60 200" fill="none" stroke="#8b6914" stroke-width="2"/>
      <path d="M 120 170 Q 135 185, 140 200" fill="none" stroke="#8b6914" stroke-width="2"/>
      <circle cx="60" cy="210" r="8" fill="#d2b48c" stroke="#333" stroke-width="1"/>
      <circle cx="140" cy="210" r="8" fill="#d2b48c" stroke="#333" stroke-width="1"/>
    </g>
    <text x="100" y="25" text-anchor="middle" font-size="12" font-weight="bold">Plant Structure</text>
  </svg>
`;

const PLANTS_MATCH_ANSWER_KEY = [
  { id: "pl1", fromId: "xylem", toId: "water" },
  { id: "pl2", fromId: "phloem", toId: "sugar" },
  { id: "pl3", fromId: "leaves", toId: "photosyn" },
  { id: "pl4", fromId: "roots", toId: "absorb" },
];

export const mystery7Plants: EpisodeConfig = {
  id: "mystery-7-plants",
  title: "The Green Kingdom",
  tier: "flagship",
  setup: {
    heading: "The Green Kingdom",
    body: "Plants are rooted in place yet thrive everywhere. They capture sunlight, pull water from soil, and grow taller every year. How do they transport water against gravity? How do they make their own food?",
    diagramSvg: plantDiagramSvg,
    cta: "Explore the plants →",
  },
  battles: [
    {
      type: "match",
      id: "battle_1",
      heading: "Evidence 1: Plant transport systems",
      intro: "Plants have two transport systems. Match each to what it carries.",
      setupCta: "Match the systems →",
      setupDiagramSvg: plantDiagramSvg,
      viewBox: { width: 300, height: 200 },
      diagramDescription: "Plant transport systems on the left with what they carry on the right.",
      nodes: [
        { id: "xylem", x: 60, y: 40, label: "Xylem", accessibleLabel: "Xylem tissue" },
        { id: "phloem", x: 60, y: 80, label: "Phloem", accessibleLabel: "Phloem tissue" },
        { id: "leaves", x: 60, y: 120, label: "Leaves", accessibleLabel: "Leaf structures" },
        { id: "roots", x: 60, y: 160, label: "Roots", accessibleLabel: "Root structures" },
        { id: "water", x: 240, y: 40, label: "💧", accessibleLabel: "Water and minerals" },
        { id: "sugar", x: 240, y: 80, label: "🍬", accessibleLabel: "Sugars from photosynthesis" },
        { id: "photosyn", x: 240, y: 120, label: "☀️", accessibleLabel: "Photosynthesis happens" },
        { id: "absorb", x: 240, y: 160, label: "🔽", accessibleLabel: "Absorb water and minerals" },
      ],
      answerKey: PLANTS_MATCH_ANSWER_KEY,
      teachBack: "Xylem transports water and minerals up from roots. Phloem carries sugars from leaves. Leaves photosynthesize. Roots absorb water.",
      wrongHint: "Not quite. Think about what each tissue or structure does.",
      finalWrongHint: "Hint: Xylem = water. Phloem = sugar. Leaves = photosynthesis. Roots = absorption.",
    },
    {
      type: "scenario",
      id: "battle_2",
      heading: "Evidence 2: Photosynthesis equation",
      intro: "Plants make their own food using sunlight, water, and carbon dioxide. What is the balanced equation?",
      setupCta: "Choose the equation →",
      setupDiagramSvg: plantDiagramSvg,
      quizDiagramSvg: plantDiagramSvg,
      question: "What is the overall equation for photosynthesis?",
      options: [
        { id: "opt1", text: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", correct: true },
        { id: "opt2", text: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy", correct: false },
        { id: "opt3", text: "CO₂ + H₂O → glucose", correct: false },
        { id: "opt4", text: "Sunlight + water → oxygen only", correct: false },
      ],
      teachBack: "Plants capture CO₂ and water using light energy, producing glucose and oxygen. This is the foundation of nearly all life on Earth.",
      wrongHint: "Not quite. Think about what goes in and what comes out.",
      finalWrongHint: "Hint: Inputs are CO₂, H₂O, and light. Outputs are glucose and O₂.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Plant reproduction",
      intro: "Plants have two main reproductive strategies. Which involves pollination by insects or wind?",
      setupCta: "Answer the question →",
      setupDiagramSvg: plantDiagramSvg,
      quizDiagramSvg: plantDiagramSvg,
      question: "Which type of plant reproduction involves pollen transfer and seed formation?",
      options: [
        { id: "opt1", text: "Sexual reproduction (flowers, seeds)", correct: true },
        { id: "opt2", text: "Asexual reproduction (runners, bulbs)", correct: false },
        { id: "opt3", text: "Binary fission", correct: false },
        { id: "opt4", text: "Fragmentation", correct: false },
      ],
      teachBack: "Sexual reproduction creates seeds through pollination and fertilization. Asexual reproduction creates clones.",
      wrongHint: "Not quite. Think about flowers and seeds.",
      finalWrongHint: "Hint: Flowers are for sexual reproduction. Pollen is transferred by insects or wind.",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "Transport systems revealed",
      evidence: "Evidence 1 — Plant structure",
      body: "Perfect. Xylem carries water and minerals up from roots. Phloem carries sugars made in leaves throughout the plant. This system keeps plants hydrated and fed.",
      diagramSvg: plantDiagramSvg,
      diagramLabel: "Plant transport",
      cta: "Learn photosynthesis →",
    },
    battle_2: {
      id: "2",
      title: "Making food from light",
      evidence: "Evidence 2 — Photosynthesis",
      body: "In their leaves, plants perform photosynthesis: they capture light energy and convert water and CO₂ into glucose. The oxygen is released — which is why plants are vital to breathing life.",
      diagramSvg: plantDiagramSvg,
      diagramLabel: "Photosynthesis process",
      cta: "Explore reproduction →",
    },
  },
  resolution: {
    heading: "The Green Kingdom Revealed!",
    body: "Plants are remarkable organisms. They capture sunlight through photosynthesis, transport water against gravity via xylem, and distribute sugars through phloem. They reproduce through flowers and seeds, creating diversity. Plants are the foundation of life on Earth.",
    diagramSvg: plantDiagramSvg,
  },
};
