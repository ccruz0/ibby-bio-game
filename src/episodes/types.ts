import type { ReactNode } from "react";
import type { DragLabelZone, MatchPair, ScenarioOption } from "../types";

export type EpisodeTier = "flagship" | "fast-lane";

/** Shared chrome every battle scene renders regardless of type. */
interface BattleBase {
  id: string; // stable within an episode, used in routes and progress keys
  heading: string;
  intro: ReactNode;
  teachBack: string;
  wrongHint: string;
  finalWrongHint: string; // shown once attempts pass the hint threshold
  setupCta: string;
}

export interface LabelBattleConfig extends BattleBase {
  type: "drag-label";
  setupDiagramSvg: string;
  diagramSvg: string;
  /** Spoken description of the diagram for screen readers. Required. */
  diagramDescription: string;
  diagramSize: number; // viewBox width; height is diagramSize * 0.75
  zones: DragLabelZone[];
  startPositions: Record<string, { x: number; y: number }>;
  connectorLines?: { x1: number; y1: number; x2: number; y2: number }[];
}

export interface MatchBattleConfig extends BattleBase {
  type: "match";
  setupDiagramSvg: string;
  /** Spoken description of the diagram for screen readers. Required. */
  diagramDescription: string;
  viewBox: { width: number; height: number };
  /** `accessibleLabel` is the spoken name; `label` is the short glyph drawn in the SVG. */
  nodes: { id: string; x: number; y: number; label: string; accessibleLabel: string }[];
  answerKey: MatchPair[];
}

export interface ScenarioBattleConfig extends BattleBase {
  type: "scenario";
  setupDiagramSvg: string;
  quizDiagramSvg: string;
  playRevealAnimation?: (container: HTMLElement | SVGElement) => () => void;
  question: string;
  options: ScenarioOption[];
  successCta?: string; // defaults to "Solve the mystery →"
  retryCta?: string; // defaults to "Continue anyway →"
}

export type BattleConfig = LabelBattleConfig | MatchBattleConfig | ScenarioBattleConfig;

export interface BridgeConfig {
  id: string;
  title: string;
  evidence: string;
  body: ReactNode;
  diagramSvg: string;
  diagramLabel: string;
  peekDiagramSvg?: string;
  peekLabel?: string;
  cta: string;
}

export interface SceneCopy {
  heading: string;
  body: ReactNode;
  diagramSvg: string;
  playRevealAnimation?: (container: HTMLElement | SVGElement) => () => void;
}

export interface EpisodeConfig {
  id: string; // used in routes: /e/:id/...
  title: string;
  tier: EpisodeTier;
  setup: SceneCopy & { cta: string };
  battles: BattleConfig[]; // ordered — drives progression
  /** Keyed by the battle id it follows; a battle without an entry advances straight to the next battle/resolution. */
  bridges: Partial<Record<string, BridgeConfig>>;
  resolution: SceneCopy;
}
