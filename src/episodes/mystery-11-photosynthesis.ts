import { EpisodeConfig } from '../types';

const ZONE_LABEL_ARRAYS = {
  battle1: [
    { id: 'z1', label: 'Photosystem II', accessibleLabel: 'Photosystem II zone', x: 30, y: 40, toleranceRatio: 0.12 },
    { id: 'z2', label: 'Photosystem I', accessibleLabel: 'Photosystem I zone', x: 70, y: 40, toleranceRatio: 0.12 },
    { id: 'z3', label: 'Electron transport chain', accessibleLabel: 'Electron transport chain zone', x: 50, y: 65, toleranceRatio: 0.13 },
  ],
};

const MATCH_ANSWER_KEY = [
  { id: 'm1', fromId: 'light-reactions', toId: 'thylakoid' },
  { id: 'm2', fromId: 'dark-reactions', toId: 'stroma' },
];

export const mystery11: EpisodeConfig = {
  id: 'mystery-11',
  title: 'Light Energy Captured',
  subtitle: 'Explore photosynthesis light and dark reactions',
  episodeNumber: 11,
  battle1: {
    type: 'drag-label',
    title: 'Thylakoid Reactions',
    description: 'Label the light-dependent reaction components.',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" fill="none" stroke="#FFD700" stroke-width="2"/><text x="50" y="52" text-anchor="middle" font-size="7" fill="#333">H₂O → O₂ + ATP + NADPH</text></svg>`,
    zones: ZONE_LABEL_ARRAYS.battle1,
    draggableLabels: ['Photosystem II', 'Photosystem I', 'Electron transport chain'],
  },
  bridge1: {
    diagramLabel: 'Light Capture',
    teachbackMessage: 'Light reactions occur in the thylakoid and produce ATP and NADPH using light energy.',
    cta: 'Next: Dark Reactions',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">Light Reactions</text></svg>`,
  },
  battle2: {
    type: 'match',
    title: 'Light vs Dark Reactions',
    description: 'Match reactions with their location and inputs.',
    nodes: [
      { id: 'light-reactions', label: 'Light reactions', side: 'left' },
      { id: 'dark-reactions', label: 'Dark reactions (Calvin cycle)', side: 'left' },
      { id: 'thylakoid', label: 'Occurs in thylakoid', side: 'right' },
      { id: 'stroma', label: 'Occurs in stroma', side: 'right' },
    ],
    answerKey: MATCH_ANSWER_KEY,
    wrongHint: 'Remember: light reactions need light; dark reactions use ATP/NADPH.',
    finalWrongHint: 'Light reactions = thylakoid; Calvin cycle = stroma.',
  },
  bridge2: {
    diagramLabel: 'Photosynthetic Stages',
    teachbackMessage: 'The Calvin cycle (dark reactions) uses ATP and NADPH from light reactions to fix CO₂ into glucose.',
    cta: 'Next: Limiting Factors',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">Calvin Cycle</text></svg>`,
  },
  battle3: {
    type: 'scenario',
    title: 'Limiting Factors',
    description: 'On a cloudy day with reduced light, which process is most affected?',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="15" fill="#FFD700" opacity="0.3"/><text x="50" y="42" text-anchor="middle" font-size="6" fill="#333">Low Light</text><rect x="35" y="60" width="30" height="20" fill="#90EE90" opacity="0.5" rx="2"/></svg>`,
    options: [
      { id: 'opt1', text: 'ATP and NADPH production decreases', correct: true },
      { id: 'opt2', text: 'CO₂ fixation increases', correct: false },
      { id: 'opt3', text: 'Calvin cycle runs faster', correct: false },
      { id: 'opt4', text: 'Water availability changes', correct: false },
    ],
    wrongHint: 'Think about what light energy powers.',
    finalWrongHint: 'Low light reduces ATP/NADPH from light reactions, limiting the Calvin cycle.',
  },
  resolution: {
    heading: 'Photosynthesis — Light Harnessed!',
    body: 'Photosynthesis converts light energy into chemical energy (ATP/NADPH) in light reactions, which powers carbon fixation in the Calvin cycle.',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="50" r="15" fill="#FFD700" opacity="0.6"/><line x1="40" y1="50" x2="60" y2="50" stroke="#333" stroke-width="2"/><circle cx="75" cy="50" r="15" fill="#90EE90" opacity="0.6"/><text x="25" y="52" text-anchor="middle" font-size="6" fill="#333">Light</text><text x="75" y="52" text-anchor="middle" font-size="6" fill="#333">Sugar</text></svg>`,
  },
};
