export type BattleId = "battle_1" | "battle_2" | "battle_3";

export type BattleType = "drag-label" | "match" | "scenario";

export interface BattleProgress {
  status: "complete" | "incomplete";
  score: number; // 0-100
  attempts: number;
  timestamp: string; // ISO 8601
}

export interface PlayerProgress {
  player_id: string;
  episode: "water-a1.1";
  battles: Record<BattleId, BattleProgress>;
  episode_status: "in_progress" | "complete";
  overall_score: number;
}

export interface DragLabelZone {
  id: string;
  label: string; // e.g. "O", "H"
  x: number;
  y: number;
  toleranceRatio: number; // e.g. 0.1 = 10%
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
