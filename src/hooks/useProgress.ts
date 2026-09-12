import { useCallback, useEffect } from "react";
import * as progressApi from "../api/progress";
import { emptyProgress, useGame } from "../context/GameContext";
import { progressStorageKey as storageKey } from "../player/scoreboard";

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
    // Already holding this episode's progress in memory? Keep it: re-reading the
    // saved copy here would overwrite a score recorded moments ago.
    if (progress && progress.episode === episodeId) return;

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
