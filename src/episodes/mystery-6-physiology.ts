import type { EpisodeConfig } from "./types";

const physiologyDiagramSvg = `
  <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="60" rx="20" ry="25" fill="#ff9999" stroke="#333" stroke-width="2"/>
    <text x="60" y="65" text-anchor="middle" font-size="9" font-weight="bold">Heart</text>
    <ellipse cx="180" cy="60" rx="15" ry="20" fill="#ffcc99" stroke="#333" stroke-width="2"/>
    <text x="180" y="65" text-anchor="middle" font-size="8">Lungs</text>
    <circle cx="120" cy="80" r="10" fill="#99ccff" stroke="#333" stroke-width="1"/>
    <text x="120" y="85" text-anchor="middle" font-size="7">Cell</text>
    <polygon points="60,110 80,130 40,130" fill="#ffb3b3" stroke="#333" stroke-width="1"/>
    <text x="60" y="125" text-anchor="middle" font-size="8">Kidney</text>
    <circle cx="120" cy="150" r="12" fill="#ffd700" stroke="#333" stroke-width="2"/>
    <text x="120" y="155" text-anchor="middle" font-size="9">Brain</text>
    <line x1="80" y1="60" x2="100" y2="80" stroke="#ff0000" stroke-width="2"/>
    <line x1="160" y1="60" x2="130" y2="80" stroke="#0000ff" stroke-width="2"/>
    <text x="120" y="20" text-anchor="middle" font-size="12" font-weight="bold">Human Body Systems</text>
  </svg>
`;

const PHYSIOLOGY_MATCH_ANSWER_KEY = [
  { id: "p1", fromId: "heart", toId: "pump" },
  { id: "p2", fromId: "lungs", toId: "gasex" },
  { id: "p3", fromId: "kidneys", toId: "filter" },
  { id: "p4", fromId: "brain", toId: "control" },
];

export const mystery6Physiology: EpisodeConfig = {
  id: "mystery-6-physiology",
  title: "The Human Machine",
  tier: "flagship",
  setup: {
    heading: "The Human Machine",
    body: "Your body is a system of systems. Your heart pumps blood, your lungs exchange gases, and your brain coordinates everything. How do all these parts work together to keep you alive?",
    diagramSvg: physiologyDiagramSvg,
    cta: "Trace the systems →",
  },
  battles: [
    {
      type: "match",
      id: "battle_1",
      heading: "Evidence 1: Organ systems and their roles",
      intro: "Match each major organ system to its primary function.",
      setupCta: "Match the systems →",
      setupDiagramSvg: physiologyDiagramSvg,
      viewBox: { width: 300, height: 200 },
      diagramDescription: "Human organ systems on the left with their functions on the right.",
      nodes: [
        { id: "heart", x: 60, y: 40, label: "Heart", accessibleLabel: "Heart and circulatory" },
        { id: "lungs", x: 60, y: 80, label: "Lungs", accessibleLabel: "Lungs and respiratory" },
        { id: "kidneys", x: 60, y: 120, label: "Kidney", accessibleLabel: "Kidneys and excretory" },
        { id: "brain", x: 60, y: 160, label: "Brain", accessibleLabel: "Brain and nervous" },
        { id: "pump", x: 240, y: 40, label: "💓", accessibleLabel: "Pumps blood" },
        { id: "gasex", x: 240, y: 80, label: "💨", accessibleLabel: "Gas exchange" },
        { id: "filter", x: 240, y: 120, label: "🔄", accessibleLabel: "Filter waste" },
        { id: "control", x: 240, y: 160, label: "⚙️", accessibleLabel: "Control all systems" },
      ],
      answerKey: PHYSIOLOGY_MATCH_ANSWER_KEY,
      teachBack: "Heart pumps blood. Lungs exchange oxygen and carbon dioxide. Kidneys filter waste. Brain coordinates everything.",
      wrongHint: "Not quite. Think about what each system does.",
      finalWrongHint: "Hint: Heart = pump. Lungs = gas exchange. Kidneys = filter waste. Brain = control.",
    },
    {
      type: "scenario",
      id: "battle_2",
      heading: "Evidence 2: Digestion and energy",
      intro: "Food must be broken down into small molecules that cells can absorb. Which system does this?",
      setupCta: "Choose the answer →",
      setupDiagramSvg: physiologyDiagramSvg,
      quizDiagramSvg: physiologyDiagramSvg,
      question: "After digestive system breaks down food into glucose, where does it go?",
      options: [
        { id: "opt1", text: "Into bloodstream to mitochondria for energy", correct: true },
        { id: "opt2", text: "Directly into the brain for thinking", correct: false },
        { id: "opt3", text: "Into fat storage only", correct: false },
        { id: "opt4", text: "Excreted as waste", correct: false },
      ],
      teachBack: "Digestion breaks down nutrients. Glucose enters blood, reaches cells, and enters mitochondria for aerobic respiration to make ATP.",
      wrongHint: "Not quite. Think about what happens to glucose.",
      finalWrongHint: "Hint: Glucose enters bloodstream and travels to cells. Mitochondria use it to make energy.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Homeostasis",
      intro: "Your body temperature stays around 37°C even if it's hot outside. This is homeostasis. How does it work?",
      setupCta: "Answer the question →",
      setupDiagramSvg: physiologyDiagramSvg,
      quizDiagramSvg: physiologyDiagramSvg,
      question: "When body temperature rises above 37°C, what happens to cool you down?",
      options: [
        { id: "opt1", text: "You sweat; evaporation cools your skin", correct: true },
        { id: "opt2", text: "Your body temperature rises even more", correct: false },
        { id: "opt3", text: "Your heart stops pumping", correct: false },
        { id: "opt4", text: "You stop breathing", correct: false },
      ],
      teachBack: "Homeostasis maintains stable internal conditions. Negative feedback loops sense changes and trigger responses that counteract them.",
      wrongHint: "Not quite. Think about how sweating helps.",
      finalWrongHint: "Hint: When too hot, you sweat. Evaporation of sweat cools your skin. This is negative feedback.",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "Systems identified",
      evidence: "Evidence 1 — Organ systems",
      body: "Perfect. Circulatory system transports oxygen and nutrients. Respiratory system exchanges gases. Nervous system coordinates everything through the brain.",
      diagramSvg: physiologyDiagramSvg,
      diagramLabel: "Body systems",
      cta: "Learn about digestion →",
    },
    battle_2: {
      id: "2",
      title: "Energy pathways",
      evidence: "Evidence 2 — From food to energy",
      body: "Your digestive system breaks food into molecules. Glucose enters blood, travels to cells, and enters mitochondria for aerobic respiration. This makes ATP — the energy currency of life.",
      diagramSvg: physiologyDiagramSvg,
      diagramLabel: "Energy production",
      cta: "Explore homeostasis →",
    },
  },
  resolution: {
    heading: "The Human Machine Unveiled!",
    body: "Your body is an integrated system where organs work together to survive. Circulatory system delivers oxygen and nutrients. Digestive system extracts energy from food. Nervous system coordinates everything. Homeostasis keeps internal conditions stable.",
    diagramSvg: physiologyDiagramSvg,
  },
};
