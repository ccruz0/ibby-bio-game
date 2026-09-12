import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

function pressEnterOn(name: RegExp | string) {
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name });
  button.focus();
  return user.keyboard("{Enter}");
}

describe("score card", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows Ibby, the episode and the score on every episode screen", async () => {
    window.history.pushState({}, "", "/e/water-a1.1/setup");
    render(<App />);

    const bar = screen.getByRole("region", { name: /current score/i });
    expect(bar).toHaveTextContent("Ibby");
    expect(bar).toHaveTextContent(/The Water Strider Mystery/i);
    expect(bar).toHaveTextContent(/Evidence 0 of 3/i);
    expect(bar).toHaveTextContent(/Score 0%/i);
  });

  it("counts up as evidence is confirmed, without leaving the battle", async () => {
    window.history.pushState({}, "", "/e/water-a1.1/battle/battle_1");
    render(<App />);
    await pressEnterOn(/Label the atoms/i);

    for (const part of ["oxygen atom", "left hydrogen atom", "right hydrogen atom"]) {
      await pressEnterOn(part);
      await pressEnterOn(`Place on the ${part}`);
    }
    await pressEnterOn(/Confirm evidence/i);

    const bar = await screen.findByRole("region", { name: /current score/i });
    expect(bar).toHaveTextContent(/Evidence 1 of 3/i);
    expect(bar).toHaveTextContent(/Score 100%/i);
  });

  it("keeps the score after leaving the battle screen", async () => {
    window.history.pushState({}, "", "/e/water-a1.1/battle/battle_1");
    render(<App />);
    await pressEnterOn(/Label the atoms/i);
    for (const part of ["oxygen atom", "left hydrogen atom", "right hydrogen atom"]) {
      await pressEnterOn(part);
      await pressEnterOn(`Place on the ${part}`);
    }
    await pressEnterOn(/Confirm evidence/i);

    // The battle component unmounts as it navigates, so this is exactly the case
    // where the score used to be lost.
    const saved = JSON.parse(localStorage.getItem("ibby-bio-game:progress:water-a1.1") ?? "{}");
    expect(saved.battles?.battle_1?.status).toBe("complete");
    expect(saved.battles?.battle_1?.score).toBe(100);
  });

  it("is hidden on the notebook home, where the full card is shown instead", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.queryByRole("region", { name: /current score/i })).not.toBeInTheDocument();
    const card = screen.getByRole("region", { name: /Ibby's score card/i });
    expect(card).toHaveTextContent(/0 of 4 mysteries solved/i);
    expect(card).toHaveTextContent(/Nothing solved yet/i);
  });

  it("lists every episode in the full card, with saved progress", async () => {
    localStorage.setItem(
      "ibby-bio-game:progress:water-a1.1",
      JSON.stringify({
        player_id: "",
        episode: "water-a1.1",
        battles: {
          battle_1: { status: "complete", score: 100, attempts: 3, timestamp: "2026-09-12T00:00:00.000Z" },
          battle_2: { status: "complete", score: 80, attempts: 2, timestamp: "2026-09-12T00:00:00.000Z" },
          battle_3: { status: "complete", score: 90, attempts: 1, timestamp: "2026-09-12T00:00:00.000Z" },
        },
        episode_status: "complete",
        overall_score: 90,
      })
    );

    window.history.pushState({}, "", "/");
    render(<App />);

    const row = screen.getByRole("row", { name: /The Water Strider Mystery/i });
    expect(row).toHaveTextContent("3 / 3");
    expect(row).toHaveTextContent("90%");
    expect(row).toHaveTextContent(/Solved/i);
    expect(screen.getByRole("region", { name: /Ibby's score card/i })).toHaveTextContent(
      /1 of 4 mysteries solved/i
    );
  });
});
