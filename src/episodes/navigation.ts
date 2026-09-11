import type { EpisodeConfig } from "./types";

export function episodeSetupPath(episodeId: string): string {
  return `/e/${episodeId}/setup`;
}

export function episodeBattlePath(episodeId: string, battleId: string): string {
  return `/e/${episodeId}/battle/${battleId}`;
}

export function episodeBridgePath(episodeId: string, bridgeId: string): string {
  return `/e/${episodeId}/bridge/${bridgeId}`;
}

export function episodeResolutionPath(episodeId: string): string {
  return `/e/${episodeId}/resolution`;
}

/** Where to go right after a battle is confirmed: its bridge, or straight to the next battle/resolution. */
export function nextRouteAfterBattle(episode: EpisodeConfig, battleId: string): string {
  const bridge = episode.bridges[battleId];
  if (bridge) return episodeBridgePath(episode.id, bridge.id);
  return nextBattleOrResolutionPath(episode, battleId);
}

/** Where a bridge's CTA leads: the next battle after the one it followed, or resolution if it was the last. */
export function nextRouteAfterBridge(episode: EpisodeConfig, bridgeId: string): string {
  const fromBattleId = Object.keys(episode.bridges).find((battleId) => episode.bridges[battleId]?.id === bridgeId);
  if (!fromBattleId) return episodeResolutionPath(episode.id);
  return nextBattleOrResolutionPath(episode, fromBattleId);
}

function nextBattleOrResolutionPath(episode: EpisodeConfig, currentBattleId: string): string {
  const index = episode.battles.findIndex((b) => b.id === currentBattleId);
  const next = episode.battles[index + 1];
  return next ? episodeBattlePath(episode.id, next.id) : episodeResolutionPath(episode.id);
}
