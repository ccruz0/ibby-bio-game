import { EpisodeConfig } from '../types';

const ZONE_LABEL_ARRAYS = {
  battle1: [
    { id: 'z1', label: 'Phospholipid bilayer', accessibleLabel: 'Phospholipid bilayer zone', x: 50, y: 30, toleranceRatio: 0.12 },
    { id: 'z2', label: 'Integral protein', accessibleLabel: 'Integral protein zone', x: 60, y: 50, toleranceRatio: 0.10 },
    { id: 'z3', label: 'Peripheral protein', accessibleLabel: 'Peripheral protein zone', x: 40, y: 50, toleranceRatio: 0.10 },
    { id: 'z4', label: 'Cholesterol', accessibleLabel: 'Cholesterol zone', x: 55, y: 70, toleranceRatio: 0.08 },
    { id: 'z5', label: 'Carbohydrate chain', accessibleLabel: 'Carbohydrate chain zone', x: 45, y: 25, toleranceRatio: 0.09 },
  ],
};

const MATCH_ANSWER_KEY = [
  { id: 'm1', fromId: 'fluid-mosaic', toId: 'membrane-model' },
  { id: 'm2', fromId: 'hypertonic', toId: 'water-leaves' },
  { id: 'm3', fromId: 'hypotonic', toId: 'water-enters' },
  { id: 'm4', fromId: 'isotonic', toId: 'no-net-movement' },
  { id: 'm5', fromId: 'atp-required', toId: 'active-transport' },
];

export const mystery9: EpisodeConfig = {
  id: 'mystery-9',
  title: 'The Membrane Enigma',
  subtitle: 'Unlock how cells control what enters and leaves',
  episodeNumber: 9,
  battle1: {
    type: 'drag-label',
    title: 'Membrane Architecture',
    zones: ZONE_LABEL_ARRAYS.battle1,
    draggableLabels: ['Phospholipid bilayer', 'Integral protein', 'Peripheral protein', 'Cholesterol', 'Carbohydrate chain'],
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="30" rx="8" ry="3" fill="#FFA500" opacity="0.7"/><rect x="42" y="33" width="16" height="40" fill="#FFB6C1" opacity="0.5"/><ellipse cx="50" cy="73" rx="8" ry="3" fill="#FFA500" opacity="0.7"/><rect x="57" y="40" width="6" height="30" fill="#4169E1" opacity="0.8" rx="1"/><circle cx="37" cy="50" r="4" fill="#32CD32" opacity="0.7"/><polygon points="52,65 55,72 49,72" fill="#FFD700" opacity="0.7"/></svg>`,
  },
  bridge1: {
    diagramLabel: 'Membrane Selectivity',
    teachbackMessage: 'The membrane is a fluid structure with proteins embedded in a phospholipid bilayer.',
    cta: 'Next: Transport Mechanisms',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">Selective Transport</text></svg>`,
  },
  battle2: {
    type: 'match',
    title: 'Transport Mechanisms',
    nodes: [
      { id: 'fluid-mosaic', label: 'Fluid mosaic model', side: 'left' },
      { id: 'hypertonic', label: 'Hypertonic solution', side: 'left' },
      { id: 'hypotonic', label: 'Hypotonic solution', side: 'left' },
      { id: 'isotonic', label: 'Isotonic solution', side: 'left' },
      { id: 'atp-required', label: 'ATP-requiring process', side: 'left' },
      { id: 'membrane-model', label: 'Describes membrane structure', side: 'right' },
      { id: 'water-leaves', label: 'Water leaves the cell', side: 'right' },
      { id: 'water-enters', label: 'Water enters the cell', side: 'right' },
      { id: 'no-net-movement', label: 'No net water movement', side: 'right' },
      { id: 'active-transport', label: 'Active transport', side: 'right' },
    ],
    answerKey: MATCH_ANSWER_KEY,
    wrongHint: 'Think about concentration gradients.',
    finalWrongHint: 'Hypertonic = water leaves; hypotonic = water enters.',
  },
  bridge2: {
    diagramLabel: 'Cellular Responses',
    teachbackMessage: 'Osmosis is water movement across a semipermeable membrane. Cells maintain isotonic conditions.',
    cta: 'Next: Clinical Application',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="50" text-anchor="middle" font-size="8" fill="#333">Tonicity Matters</text></svg>`,
  },
  battle3: {
    type: 'scenario',
    title: 'Clinical Emergency',
    description: 'What tonicity should an IV saline solution be?',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="30" height="40" fill="#E8F4F8" stroke="#4169E1" stroke-width="1" rx="2"/><circle cx="25" cy="50" r="8" fill="#FF6B6B" opacity="0.6"/></svg>`,
    options: [
      { id: 'opt1', text: 'Hypertonic', correct: false },
      { id: 'opt2', text: 'Isotonic', correct: true },
      { id: 'opt3', text: 'Hypotonic', correct: false },
      { id: 'opt4', text: 'Any solution works', correct: false },
    ],
    wrongHint: 'IV fluids must be safe for blood cells.',
    finalWrongHint: 'Isotonic solutions maintain cell balance.',
  },
  resolution: {
    heading: 'The Membrane Enigma — Solved!',
    body: 'Cell membranes are selectively permeable barriers controlling molecular movement.',
    diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="none" stroke="#4169E1" stroke-width="2" opacity="0.7"/><text x="50" y="52" text-anchor="middle" font-size="9" font-weight="bold" fill="#4169E1">Transport</text></svg>`,
  },
};
