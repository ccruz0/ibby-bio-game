import type { PlayerProgress } from "../types";
import { getIdToken } from "../auth/auth";

const API = () => import.meta.env.VITE_PROGRESS_API_URL ?? "";

async function call<T>(path: string, init?: RequestInit): Promise<T | null> {
  const token = await getIdToken();
  if (!token || !API()) return null;
  const r = await fetch(`${API()}${path}`, { ...init, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } });
  if (!r.ok) throw new Error(`progress ${r.status}`);
  return r.json() as Promise<T>;
}

export async function loadChapter(chapter: string): Promise<PlayerProgress | null> {
  const r = await call<{ chapters: { chapter: string; progress: PlayerProgress }[] }>("/progress");
  return r?.chapters.find((c) => c.chapter === chapter)?.progress ?? null;
}

export async function listChapters() {
  return call<{ chapters: { chapter: string; status: string; score: number; updated_at: string }[] }>("/progress");
}

export async function saveChapter(chapter: string, progress: PlayerProgress): Promise<void> {
  await call(`/progress/${encodeURIComponent(chapter)}`, { method: "PUT", body: JSON.stringify({ progress }) });
}
