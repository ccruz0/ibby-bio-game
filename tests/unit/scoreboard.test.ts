import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_PLAYER_NAME, getPlayer, setPlayerName } from "../../src/player/player";
import { averageScore, countFinished, readScoreboard } from "../../src/player/scoreboard";

describe("player", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to Ibby when nothing is stored", () => {
    expect(getPlayer().name).toBe(DEFAULT_PLAYER_NAME);
  });

  it("remembers a name and ignores a blank one", () => {
    setPlayerName("Ibby C");
    expect(getPlayer().name).toBe("Ibby C");
    setPlayerName("   ");
    expect(getPlayer().name).toBe(DEFAULT_PLAYER_NAME);
  });
});

describe("scoreboard", () => {
  beforeEach(() => localStorage.clear());

  it("lists every registered episode even with nothing played", () => {
    const scores = readScoreboard();
    expect(scores.length).toBeGreaterThanOrEqual(3);
    expect(scores.every((s) => !s.started && s.score === 0)).toBe(true);
    expect(countFinished(scores)).toBe(0);
    expect(averageScore(scores)).toBe(0);
  });

  it("averages only the episodes actually started", () => {
    const scores = [
      { id: "a", title: "A", tier: "flagship", totalBattles: 3, completedBattles: 3, score: 90, started: true, finished: true },
      { id: "b", title: "B", tier: "flagship", totalBattles: 3, completedBattles: 1, score: 50, started: true, finished: false },
      { id: "c", title: "C", tier: "fast-lane", totalBattles: 1, completedBattles: 0, score: 0, started: false, finished: false },
    ];
    expect(averageScore(scores)).toBe(70);
    expect(countFinished(scores)).toBe(1);
  });
});
