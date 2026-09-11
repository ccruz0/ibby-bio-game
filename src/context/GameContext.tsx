import { createContext, useContext, useState, type ReactNode } from "react";
import type { PlayerProgress } from "../types";

interface GameContextValue {
  progress: PlayerProgress | null;
  setProgress: (p: PlayerProgress) => void;
  recordScore: (episodeId: string, battleId: string, score: number, totalBattles: number) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function emptyProgress(episodeId: string): PlayerProgress {
  return {
    player_id: "",
    episode: episodeId,
    battles: {},
    episode_status: "in_progress",
    overall_score: 0,
  };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<PlayerProgress | null>(null);

  const recordScore = (episodeId: string, battleId: string, score: number, totalBattles: number) => {
    setProgress((prev) => {
      const base = prev && prev.episode === episodeId ? prev : emptyProgress(episodeId);
      const attempts = (base.battles[battleId]?.attempts ?? 0) + 1;
      const battles = {
        ...base.battles,
        [battleId]: {
          status: score >= 70 ? ("complete" as const) : ("incomplete" as const),
          score: Math.max(score, base.battles[battleId]?.score ?? 0),
          attempts,
          timestamp: new Date().toISOString(),
        },
      };
      const scores = Object.values(battles).map((b) => b.score);
      const overall_score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      const episode_status =
        Object.keys(battles).length >= totalBattles && Object.values(battles).every((b) => b.status === "complete")
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
