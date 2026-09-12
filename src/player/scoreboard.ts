import { episodeList } from "../episodes/registry";
import type { PlayerProgress } from "../types";

/** Single source of truth for where an episode's progress is kept. */
export function progressStorageKey(episodeId: string): string {
  return `ibby-bio-game:progress:${episodeId}`;
}

export function readEpisodeProgress(episodeId: string): PlayerProgress | null {
  try {
    const raw = localStorage.getItem(progressStorageKey(episodeId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlayerProgress;
    return parsed.episode === episodeId ? parsed : null;
  } catch {
    return null;
  }
}

export interface EpisodeScore {
  id: string;
  title: string;
  tier: string;
  totalBattles: number;
  completedBattles: number;
  score: number; // 0-100, 0 when never played
  started: boolean;
  finished: boolean;
}

export function summariseEpisode(episodeId: string, progress: PlayerProgress | null): EpisodeScore | null {
  const episode = episodeList.find((e) => e.id === episodeId);
  if (!episode) return null;
  const battles = progress ? Object.values(progress.battles) : [];
  const completedBattles = battles.filter((b) => b.status === "complete").length;
  return {
    id: episode.id,
    title: episode.title,
    tier: episode.tier,
    totalBattles: episode.battles.length,
    completedBattles,
    score: progress?.overall_score ?? 0,
    started: battles.length > 0,
    finished: progress?.episode_status === "complete",
  };
}

/** Every episode, in registry order, with whatever this device has saved. */
export function readScoreboard(): EpisodeScore[] {
  return episodeList
    .map((e) => summariseEpisode(e.id, readEpisodeProgress(e.id)))
    .filter((s): s is EpisodeScore => s !== null);
}

/** Badges earned: one per finished episode. */
export function countFinished(scores: EpisodeScore[]): number {
  return scores.filter((s) => s.finished).length;
}

/** Average score across episodes the player has actually started. */
export function averageScore(scores: EpisodeScore[]): number {
  const played = scores.filter((s) => s.started);
  if (played.length === 0) return 0;
  return Math.round(played.reduce((sum, s) => sum + s.score, 0) / played.length);
}
