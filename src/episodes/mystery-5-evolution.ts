import type { EpisodeConfig } from "./types";

const evolutionDiagramSvg = `
  <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
    <text x="120" y="20" text-anchor="middle" font-size="12" font-weight="bold">Evolution Through Time</text>
    <circle cx="60" cy="50" r="12" fill="#ff9999" stroke="#333" stroke-width="1"/>
    <text x="60" y="55" text-anchor="middle" font-size="8">Gen 1</text>
    <circle cx="120" cy="70" r="12" fill="#ff6b6b" stroke="#333" stroke-width="2"/>
    <text x="120" y="75" text-anchor="middle" font-size="8">Gen 2</text>
    <circle cx="180" cy="90" r="12" fill="#cc0000" stroke="#333" stroke-width="2"/>
    <text x="180" y="95" text-anchor="middle" font-size="8">Gen 3</text>
    <line x1="70" y1="55" x2="110" y2="70" stroke="#333" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="130" y1="75" x2="170" y2="90" stroke="#333" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="120" y="130" text-anchor="middle" font-size="11">Variation + Selection = Adaptation</text>
    <path d="M 40 150 Q 120 140, 200 150" fill="none" stroke="#333" stroke-width="2"/>
    <text x="120" y="180" text-anchor="middle" font-size="10">Natural selection favors</text>
    <text x="120" y="195" text-anchor="middle" font-size="10">well-adapted individuals</text>
  </svg>
`;

const EVOLUTION_MATCH_ANSWER_KEY = [
  { id: "ev1", fromId: "adaptation", toId: "trait" },
  { id: "ev2", fromId: "naturalselection", toId: "pressure" },
  { id: "ev3", fromId: "mutation", toId: "change" },
  { id: "ev4", fromId: "speciation", toId: "newspecies" },
];

export const mystery5Evolution: EpisodeConfig = {
  id: "mystery-5-evolution",
  title: "The Origin of Species",
  tier: "flagship",
  setup: {
    heading: "The Origin of Species",
    body: "Species change over time. You and a chimpanzee share an ancestor. Finches on different islands have different beaks. How does evolution work? The answer is in variation among individuals and natural selection that shapes populations.",
    diagramSvg: evolutionDiagramSvg,
    cta: "Trace evolution →",
  },
  battles: [
    {
      type: "match",
      id: "battle_1",
      heading: "Evidence 1: The machinery of evolution",
      intro: "Match each evolutionary concept to its meaning.",
      setupCta: "Match the terms →",
      setupDiagramSvg: evolutionDiagramSvg,
      viewBox: { width: 300, height: 200 },
      diagramDescription: "Evolutionary terms on the left with their definitions on the right.",
      nodes: [
        { id: "adaptation", x: 60, y: 40, label: "Adapt", accessibleLabel: "Adaptation" },
        { id: "naturalselection", x: 60, y: 80, label: "NatSel", accessibleLabel: "Natural selection" },
        { id: "mutation", x: 60, y: 120, label: "Mut", accessibleLabel: "Mutation" },
        { id: "speciation", x: 60, y: 160, label: "Spec", accessibleLabel: "Speciation" },
        { id: "trait", x: 240, y: 40, label: "🎯", accessibleLabel: "Trait that helps survive" },
        { id: "pressure", x: 240, y: 80, label: "⚡", accessibleLabel: "Survival pressure" },
        { id: "change", x: 240, y: 120, label: "🧬", accessibleLabel: "Random DNA change" },
        { id: "newspecies", x: 240, y: 160, label: "🌳", accessibleLabel: "New species emerges" },
      ],
      answerKey: EVOLUTION_MATCH_ANSWER_KEY,
      teachBack: "Adaptations are traits that help survival. Natural selection favors adapted individuals. Mutations create variation. Speciation happens when populations diverge.",
      wrongHint: "Not quite. Think about what each term means.",
      finalWrongHint: "Hint: Adaptation = helpful trait. Natural selection = survival pressure. Mutation = DNA change. Speciation = new species.",
    },
    {
      type: "scenario",
      id: "battle_2",
      heading: "Evidence 2: Evidence for evolution",
      intro: "Multiple lines of evidence support evolution. Which of these is NOT evidence for evolution?",
      setupCta: "Choose your answer →",
      setupDiagramSvg: evolutionDiagramSvg,
      quizDiagramSvg: evolutionDiagramSvg,
      question: "Which is evidence that all life shares common ancestry?",
      options: [
        { id: "opt1", text: "Similar DNA sequences across species", correct: true },
        { id: "opt2", text: "Homologous structures (similar bones in different animals)", correct: false },
        { id: "opt3", text: "Fossil transitions showing intermediate forms", correct: false },
        { id: "opt4", text: "Rapid changes in small populations", correct: false },
      ],
      teachBack: "DNA similarity, homologous structures, fossil records, and observed evolution in real time all support common descent.",
      wrongHint: "All of these are evidence for evolution. Try another.",
      finalWrongHint: "Hint: All of these point to evolution — pick the one strongest for common ancestry.",
    },
    {
      type: "scenario",
      id: "battle_3",
      heading: "Evidence 3: Mechanisms of speciation",
      intro: "When populations are separated, they evolve differently and may become new species. What is this process called?",
      setupCta: "Answer the question →",
      setupDiagramSvg: evolutionDiagramSvg,
      quizDiagramSvg: evolutionDiagramSvg,
      question: "When a geographic barrier separates a population and they evolve into different species, this is called:",
      options: [
        { id: "opt1", text: "Allopatric speciation (geographic isolation)", correct: true },
        { id: "opt2", text: "Sympatric speciation (no isolation)", correct: false },
        { id: "opt3", text: "Artificial speciation (human-made)", correct: false },
        { id: "opt4", text: "Adaptive radiation (rapid diversification)", correct: false },
      ],
      teachBack: "Allopatric speciation is speciation via geographic isolation. Sympatric speciation occurs without isolation. Both create new species.",
      wrongHint: "Not quite. Think about geographic barriers.",
      finalWrongHint: "Hint: Allopatric = other homeland. When geography separates populations, they diverge into new species.",
    },
  ],
  bridges: {
    battle_1: {
      id: "1",
      title: "Evolutionary mechanics",
      evidence: "Evidence 1 — How evolution works",
      body: "Now you know: Mutations create variation. Natural selection favors individuals with helpful traits. Over many generations, this shapes populations. Eventually, speciation creates new species.",
      diagramSvg: evolutionDiagramSvg,
      diagramLabel: "Evolution diagram",
      cta: "Explore the evidence →",
    },
    battle_2: {
      id: "2",
      title: "Evidence from multiple angles",
      evidence: "Evidence 2 — Supporting evolution",
      body: "Evolution is supported by fossils, genetics, anatomy, and observation. We have watched bacteria evolve resistance, seen DNA similarities across species, and found transitional fossils.",
      diagramSvg: evolutionDiagramSvg,
      diagramLabel: "Evidence for evolution",
      cta: "Learn about speciation →",
    },
  },
  resolution: {
    heading: "The Origin of Species Revealed!",
    body: "Evolution is the process by which species change and diversify. Through natural selection, organisms suited to their environment survive and reproduce. Mutations provide variation. Over millions of years, this creates new species and drives life's diversity.",
    diagramSvg: evolutionDiagramSvg,
  },
};
