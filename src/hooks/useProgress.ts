import { useCallback, useEffect } from "react";
import { useGame } from "../context/GameContext";
import * as progressApi from "../api/progress";
import type { BattleId } from "../types";

const LOCAL_KEY = "ibby-bio-game:progress";

/**
 * Wraps the AWS-backed progress API with a localStorage fallback (Rollback
 * Plan: "If Lambda API fails mid-playtest, fall back to localStorage without
 * blocking gameplay"). No backend is deployed yet, so this currently always
 * uses the local path — swap in real calls once API Gateway is live.
 */
export function useProgress() {
  const { progress, setProgress, recordScore } = useGame();

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      setProgress(JSON.parse(cached));
      return;
    }
    progressApi
      .initSession()
      .then(setProgress)
      .catch(() => {
        // No backend deployed — local-only session is fine for dev/playtest.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (progress) localStorage.setItem(LOCAL_KEY, JSON.stringify(progress));
  }, [progress]);

  const complete = useCallback(
    (battleId: BattleId, score: number) => {
      recordScore(battleId, score);
      if (progress?.player_id) {
        progressApi
          .recordBattleComplete(progress.player_id, battleId, score, progress.battles[battleId].attempts + 1)
          .catch(() => {
            // Sync will retry next session; localStorage already has the score.
          });
      }
    },
    [progress, recordScore]
  );

  return { progress, complete };
}
