import { useCallback, useEffect } from "react";
import * as progressApi from "../api/progress";
import { emptyProgress, useGame } from "../context/GameContext";

function storageKey(episodeId: string): string {
  return `ibby-bio-game:progress:${episodeId}`;
}

/**
 * Wraps the AWS-backed progress API with a localStorage fallback (Rollback
 * Plan: "If Lambda API fails mid-playtest, fall back to localStorage without
 * blocking gameplay"). No backend is deployed yet, so this currently always
 * uses the local path — swap in real calls once API Gateway is live.
 *
 * Progress is keyed per episode id (both in localStorage and in the shared
 * PlayerProgress record) so switching episodes never clobbers another
 * episode's saved progress.
 */
export function useProgress(episodeId: string, totalBattles: number) {
  const { progress, setProgress, recordScore } = useGame();

  useEffect(() => {
    const cached = localStorage.getItem(storageKey(episodeId));
    if (cached) {
      const parsed = JSON.parse(cached) as ReturnType<typeof emptyProgress>;
      if (parsed.episode === episodeId) {
        setProgress(parsed);
        return;
      }
    }
    progressApi
      .initSession()
      .then((p) => setProgress({ ...p, episode: episodeId }))
      .catch(() => {
        // No backend deployed — local-only session is fine for dev/playtest.
        setProgress(emptyProgress(episodeId));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId]);

  useEffect(() => {
    if (progress && progress.episode === episodeId) {
      localStorage.setItem(storageKey(episodeId), JSON.stringify(progress));
    }
  }, [progress, episodeId]);

  const complete = useCallback(
    (battleId: string, score: number) => {
      recordScore(episodeId, battleId, score, totalBattles);
      if (progress?.player_id) {
        progressApi
          .recordBattleComplete(progress.player_id, battleId, score, (progress.battles[battleId]?.attempts ?? 0) + 1)
          .catch(() => {
            // Sync will retry next session; localStorage already has the score.
          });
      }
    },
    [progress, recordScore, episodeId, totalBattles]
  );

  return { progress, complete };
}
