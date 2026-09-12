import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

/**
 * These tests use the keyboard ONLY — no pointer events at all.
 * If they pass, a player who cannot use a mouse can finish the drag-label
 * and match battles. That is the whole point of the suite.
 */

async function pressEnterOn(name: RegExp | string) {
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name });
  button.focus();
  expect(document.activeElement).toBe(button);
  await user.keyboard("{Enter}");
}

describe("keyboard-only play", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("completes the water A1.1 drag-label battle with the keyboard alone", async () => {
    window.history.pushState({}, "", "/e/water-a1.1/battle/battle_1");
    render(<App />);

    await pressEnterOn(/Label the atoms/i);

    // The diagram itself is announced rather than being an invisible blob.
    expect(await screen.findByRole("img", { name: /water molecule/i })).toBeInTheDocument();

    for (const part of ["oxygen atom", "left hydrogen atom", "right hydrogen atom"]) {
      await pressEnterOn(part);
      expect(screen.getByRole("button", { name: part })).toHaveAttribute("aria-pressed", "true");
      await pressEnterOn(`Place on the ${part}`);
      expect(screen.getByRole("status", { name: /move announcements/i })).toHaveTextContent(new RegExp(`Correct.*${part}`, "i"));
    }

    const confirm = screen.getByRole("button", { name: /Confirm evidence/i });
    expect(confirm).toBeEnabled();
    await pressEnterOn(/Confirm evidence/i);

    // Confirming leads on to the story bridge, so the battle really was completed.
    expect(await screen.findByRole("button", { name: /→/ })).toBeInTheDocument();
  });

  it("lets the keyboard put a picked-up label back with Escape", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/water-a1.1/battle/battle_1");
    render(<App />);
    await pressEnterOn(/Label the atoms/i);

    await pressEnterOn("oxygen atom");
    expect(screen.getByRole("button", { name: "oxygen atom" })).toHaveAttribute("aria-pressed", "true");

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "oxygen atom" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("status", { name: /move announcements/i })).toHaveTextContent(/put back/i);
  });

  it("completes the nucleic acids A1.2 match battle with the keyboard alone", async () => {
    window.history.pushState({}, "", "/e/nucleic-acids-a1.2/battle/battle_2");
    render(<App />);

    await pressEnterOn(/Pair the bases|Match|→/i);

    for (const [first, second] of [
      ["adenine", "thymine"],
      ["guanine", "cytosine"],
    ]) {
      await pressEnterOn(first);
      expect(screen.getByRole("button", { name: first })).toHaveAttribute("aria-pressed", "true");
      await pressEnterOn(second);
      expect(screen.getByRole("status", { name: /move announcements/i })).toHaveTextContent(new RegExp(`Correct.*${first}.*${second}`, "i"));
    }

    expect(screen.getByRole("button", { name: /Confirm evidence/i })).toBeEnabled();
  });

  it("completes a match battle where one node belongs to two pairs, with the keyboard alone", async () => {
    // Water A1.1 Evidence 2: the middle molecule bonds to BOTH neighbours, so a
    // node that is already part of a correct pair must stay usable.
    window.history.pushState({}, "", "/e/water-a1.1/battle/battle_2");
    render(<App />);
    await pressEnterOn(/Draw the bonds/i);

    await pressEnterOn("left water molecule");
    await pressEnterOn("middle water molecule");
    expect(screen.getByRole("status", { name: /move announcements/i })).toHaveTextContent(/Correct/i);

    await pressEnterOn("middle water molecule");
    await pressEnterOn("right water molecule");
    expect(screen.getByRole("status", { name: /move announcements/i })).toHaveTextContent(/Correct/i);

    expect(screen.getByRole("button", { name: /Confirm evidence/i })).toBeEnabled();
  });

  it("reaches a label button by tabbing, without any pointer event", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/water-a1.1/battle/battle_1");
    render(<App />);
    await pressEnterOn(/Label the atoms/i);

    const target = screen.getByRole("button", { name: "oxygen atom" });
    let reached = false;
    for (let i = 0; i < 20 && !reached; i += 1) {
      await user.tab();
      reached = document.activeElement === target;
    }
    expect(reached).toBe(true);
  });
});
