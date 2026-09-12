import { EpisodeConfig } from '../types';

const ZONE_LABEL_ARRAYS = {
  battle1: [
    { id: 'z1', label: 'Active site', accessibleLabel: 'Active site zone', x: 50, y: 35, toleranceRatio: 0.10 },
    { id: 'z2', label: 'Substrate', accessibleLabel: 'Substrate zone', x: 60, y: 50, toleranceRatio: 0.10 },
    { id: 'z3', label: 'Enzyme-substrate complex', accessibleLabel: 'Enzyme-substrate complex zone', x: 50, y: 65, toleranceRatio: 0.12 },
    { id: 'z4', label: 'Product', accessibleLabel: 'Product zone', x: 40, y: 50, toleranceRatio: 0.10 },
  ],
};

const MATCH_ANSWER_KEY = [
  { id: 'm1', fromId: 'lock-key', toId: 'enzyme-substrate' },
  { id: 'm2', fromId: 'vmax', toId: 'max-velocity' },
  { id: 'm3', fromId: 'km', toId: 'substrate-affinity' },
];

export const mystery10: EpisodeConfig = {
  id: 'mystery-10',
  title: 'The Enzyme Catalyst',
  subtitle: 'Master enzyme kinetics and catalysis',
  episodeNumber: 10,
  battle1: {
    type: 'drag-label',
    title: 'Enzyme Mechanism',
    description: 'Label the stages of the enzyme-catalyzed reaction.',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="50" r="12" fill="#FF69B4" opacity="0.6"/><polygon points="45,45 50,50 45,55" fill="#4169E1"/><circle cx="65" cy="50" r="8" fill="#FFD700" opacity="0.6"/><text x="25" y="52" text-anchor="middle" font-size="6" fill="#333">E</text><text x="50" y="52" text-anchor="middle" font-size="6" fill="#333">→</text><text x="65" y="52" text-anchor="middle" font-size="6" fill="#333">P</text></svg>`,
    zones: ZONE_LABEL_ARRAYS.battle1,
    draggableLabels: ['Active site', 'Substrate', 'Enzyme-substrate complex', 'Product'],
  },
  bridge1: {
    diagramLabel: 'Enzyme Structure',
    teachbackMessage: 'Enzymes lower activation energy by forming enzyme-substrate complexes at their active sites.',
    cta: 'Next: Kinetic Parameters',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">Catalyst Action</text></svg>`,
  },
  battle2: {
    type: 'match',
    title: 'Kinetic Parameters',
    description: 'Match kinetic terms with their definitions.',
    nodes: [
      { id: 'lock-key', label: 'Lock-and-key model', side: 'left' },
      { id: 'vmax', label: 'Vmax', side: 'left' },
      { id: 'km', label: 'Km value', side: 'left' },
      { id: 'enzyme-substrate', label: 'Describes enzyme-substrate fit', side: 'right' },
      { id: 'max-velocity', label: 'Maximum reaction velocity', side: 'right' },
      { id: 'substrate-affinity', label: 'Measure of substrate affinity', side: 'right' },
    ],
    answerKey: MATCH_ANSWER_KEY,
    wrongHint: 'Think about reaction kinetics and binding affinity.',
    finalWrongHint: 'Vmax = max velocity; Km = substrate concentration at half Vmax.',
  },
  bridge2: {
    diagramLabel: 'Reaction Kinetics',
    teachbackMessage: 'Enzyme kinetics describes how fast reactions occur. Vmax is maximum velocity; Km indicates substrate affinity.',
    cta: 'Next: Enzyme Inhibition',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">Rate & Affinity</text></svg>`,
  },
  battle3: {
    type: 'scenario',
    title: 'Enzyme Inhibition',
    description: 'A competitive inhibitor binds to an enzyme. What changes?',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="50" r="8" fill="#FF69B4" opacity="0.6"/><circle cx="55" cy="50" r="6" fill="#FF4500" opacity="0.8"/><text x="30" y="52" text-anchor="middle" font-size="6" fill="#333">E</text><text x="55" y="52" text-anchor="middle" font-size="6" fill="#333">I</text><line x1="38" y1="50" x2="47" y2="50" stroke="#666" stroke-width="1"/></svg>`,
    options: [
      { id: 'opt1', text: 'Km increases, Vmax unchanged', correct: true },
      { id: 'opt2', text: 'Vmax decreases, Km unchanged', correct: false },
      { id: 'opt3', text: 'Both Km and Vmax decrease', correct: false },
      { id: 'opt4', text: 'No change in kinetic parameters', correct: false },
    ],
    wrongHint: 'Think about competitive vs non-competitive inhibition.',
    finalWrongHint: 'Competitive inhibitors compete with substrate; Km increases but Vmax is maintained.',
  },
  resolution: {
    heading: 'The Enzyme Catalyst — Mastered!',
    body: 'Enzymes accelerate reactions by lowering activation energy. Enzyme kinetics describe reaction rates and substrate affinity through Vmax and Km.',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="none" stroke="#FF69B4" stroke-width="2" opacity="0.7"/><text x="50" y="50" text-anchor="middle" font-size="8" font-weight="bold" fill="#FF69B4">Enzyme Kinetics</text></svg>`,
  },
};
