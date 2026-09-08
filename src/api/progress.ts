import type { BattleId, PlayerProgress } from "../types";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  // Set by the deployed API Gateway stage URL. Empty in local dev — callers
  // fall back to localStorage (see useProgress) so the game is playable
  // without any AWS resources provisioned yet. Read per-call (not module-level)
  // so it reflects env changes in tests and hot-reloaded dev config.
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL not configured — no backend deployed yet");
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Progress API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function initSession(): Promise<PlayerProgress> {
  return request<PlayerProgress>("/progress/init", { method: "POST", body: "{}" });
}

export function recordBattleComplete(
  player_id: string,
  battle_id: BattleId,
  score: number,
  attempts: number
): Promise<PlayerProgress> {
  return request<PlayerProgress>("/progress/battle-complete", {
    method: "POST",
    body: JSON.stringify({ player_id, battle_id, score, attempts }),
  });
}

export function fetchSession(player_id: string): Promise<PlayerProgress> {
  return request<PlayerProgress>(`/progress/session?player_id=${encodeURIComponent(player_id)}`);
}
