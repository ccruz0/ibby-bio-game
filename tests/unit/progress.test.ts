import { afterEach, describe, expect, it, vi } from "vitest";
import { initSession, recordBattleComplete, fetchSession } from "../../src/api/progress";

const mockProgress = {
  player_id: "uuid-1",
  episode: "water-a1.1" as const,
  battles: {
    battle_1: { status: "incomplete" as const, score: 0, attempts: 0, timestamp: "" },
    battle_2: { status: "incomplete" as const, score: 0, attempts: 0, timestamp: "" },
    battle_3: { status: "incomplete" as const, score: 0, attempts: 0, timestamp: "" },
  },
  episode_status: "in_progress" as const,
  overall_score: 0,
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("progress API client", () => {
  it("throws a clear error when no backend is configured (local/dev default)", async () => {
    await expect(initSession()).rejects.toThrow(/VITE_API_BASE_URL not configured/);
  });

  it("calls the configured endpoint and returns parsed JSON", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockProgress });
    vi.stubGlobal("fetch", fetchMock);

    const result = await initSession();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/progress/init",
      expect.objectContaining({ method: "POST" })
    );
    expect(result.player_id).toBe("uuid-1");
  });

  it("rejects on a non-OK response", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(recordBattleComplete("uuid-1", "battle_1", 85, 1)).rejects.toThrow(/failed: 500/);
  });

  it("fetches a session by player_id", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockProgress });
    vi.stubGlobal("fetch", fetchMock);

    await fetchSession("uuid-1");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/progress/session?player_id=uuid-1",
      expect.anything()
    );
  });
});
