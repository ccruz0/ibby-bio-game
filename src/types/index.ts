// Battle and episode ids are config-defined strings (see src/episodes/types.ts),
// not a fixed union — the engine supports any number of episodes/battles.
export type BattleId = string;

export type BattleType = "drag-label" | "match" | "scenario";

export interface BattleProgress {
  status: "complete" | "incomplete";
  score: number; // 0-100
  attempts: number;
  timestamp: string; // ISO 8601
}

export interface PlayerProgress {
  player_id: string;
  episode: string; // episode id, e.g. "water-a1.1"
  battles: Record<BattleId, BattleProgress>;
  episode_status: "in_progress" | "complete";
  overall_score: number;
}

export interface DragLabelZone {
  id: string;
  label: string; // short glyph drawn in the diagram, e.g. "O", "H"
  /**
   * Spoken name for screen readers and the keyboard path, e.g. "oxygen atom".
   * Required on purpose: a new episode cannot ship without it.
   */
  accessibleLabel: string;
  x: number;
  y: number;
  toleranceRatio: number; // e.g. 0.1 = 10% — pointer dragging only; the keyboard path is exact
}

export interface MatchPair {
  id: string;
  fromId: string;
  toId: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  correct: boolean;
}
