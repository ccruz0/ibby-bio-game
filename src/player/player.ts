/**
 * Who is playing. For now there is exactly one player on a device — Ibby — so
 * there is no sign-in, no account and nothing leaves the browser. The name is
 * stored so the score card can address her by name and so a future
 * multi-player hall of fame has something real to key on.
 */

const PLAYER_KEY = "ibby-bio-game:player";
export const DEFAULT_PLAYER_NAME = "Ibby";

export interface Player {
  name: string;
}

export function getPlayer(): Player {
  try {
    const raw = localStorage.getItem(PLAYER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Player>;
      if (parsed.name && parsed.name.trim()) return { name: parsed.name.trim() };
    }
  } catch {
    // Private windows and blocked site data both land here; the default is fine.
  }
  return { name: DEFAULT_PLAYER_NAME };
}

export function setPlayerName(name: string): Player {
  const player = { name: name.trim() || DEFAULT_PLAYER_NAME };
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
  } catch {
    // Not being able to remember the name must never block play.
  }
  return player;
}
