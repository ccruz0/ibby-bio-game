import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

describe("Cell Structure A2.2 flagship episode", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads the setup scene and advances into Battle 1 setup", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/cell-structure-a2.2/setup");
    render(<App />);

    expect(screen.getByText(/What's Inside the Box\?/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Enter the cell/i }));

    expect(await screen.findByText(/What are the parts of a eukaryotic cell\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Label the structures/i })).toBeInTheDocument();
  });

  it("plays Battle 2 (match) through to Battle 3 (scenario) and resolution", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/cell-structure-a2.2/battle/battle_2");
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Draw the matches/i }));

    // Match nucleoid to nucleus
    await user.click(screen.getByRole("button", { name: /prokaryote nucleoid/i }));
    await user.click(screen.getByRole("button", { name: /eukaryote nucleus/i }));

    // Match 70S to 80S ribosomes
    await user.click(screen.getByRole("button", { name: /prokaryote 70S/i }));
    await user.click(screen.getByRole("button", { name: /eukaryote 80S/i }));

    // Match cell wall to membrane-bound organelles
    await user.click(screen.getByRole("button", { name: /prokaryote cell wall/i }));
    await user.click(screen.getByRole("button", { name: /membrane-bound organelles/i }));

    expect(await screen.findByText(/Bonds found: 3 \/ 3/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Confirm evidence/i }));

    // Bridge after battle_2
    expect(await screen.findByText(/Comparison complete/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Unlock the evolutionary advantage/i }));

    // Battle 3 setup -> quiz
    expect(await screen.findByText(/Why does compartmentalization matter\?/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Make a prediction/i }));

    await user.click(
      screen.getByText(/Separate compartments let different reactions happen at once/i)
    );
    await user.click(screen.getByRole("button", { name: /Check answer/i }));
    await user.click(await screen.findByRole("button", { name: /Solve the mystery/i }));

    expect(await screen.findByText(/The Mystery Solved!/i)).toBeInTheDocument();
  });

  it("lists the episode on the episode picker", async () => {
    window.history.pushState({}, "", "/episodes");
    render(<App />);

    expect(await screen.findByText(/What's Inside the Box\? \(flagship\)/i)).toBeInTheDocument();
  });
});
