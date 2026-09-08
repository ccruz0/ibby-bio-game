import { createContext, useContext, useState, type ReactNode } from "react";
import type { BattleId, PlayerProgress } from "../types";

interface GameContextValue {
  progress: PlayerProgress | null;
  setProgress: (p: PlayerProgress) => void;
  recordScore: (battleId: BattleId, score: number) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

const emptyProgress = (): PlayerProgress => ({
  player_id: "",
  episode: "water-a1.1",
  battles: {
    battle_1: { status: "incomplete", score: 0, attempts: 0, timestamp: "" },
    battle_2: { status: "incomplete", score: 0, attempts: 0, timestamp: "" },
    battle_3: { status: "incomplete", score: 0, attempts: 0, timestamp: "" },
  },
  episode_status: "in_progress",
  overall_score: 0,
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<PlayerProgress | null>(emptyProgress());

  const recordScore = (battleId: BattleId, score: number) => {
    setProgress((prev) => {
      const base = prev ?? emptyProgress();
      const attempts = base.battles[battleId].attempts + 1;
      const battles = {
        ...base.battles,
        [battleId]: {
          status: score >= 70 ? ("complete" as const) : ("incomplete" as const),
          score: Math.max(score, base.battles[battleId].score),
          attempts,
          timestamp: new Date().toISOString(),
        },
      };
      const scores = Object.values(battles).map((b) => b.score);
      const overall_score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      const episode_status = Object.values(battles).every((b) => b.status === "complete")
        ? ("complete" as const)
        : ("in_progress" as const);
      return { ...base, battles, overall_score, episode_status };
    });
  };

  return (
    <GameContext.Provider value={{ progress, setProgress, recordScore }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
