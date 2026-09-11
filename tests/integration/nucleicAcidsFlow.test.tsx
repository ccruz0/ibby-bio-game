import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

describe("Nucleic Acids A1.2 flagship episode", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads the setup scene and advances into Battle 1 setup", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/nucleic-acids-a1.2/setup");
    render(<App />);

    expect(screen.getByText(/The Perfect Copy Mystery/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Start the investigation/i }));

    expect(await screen.findByText(/What is a nucleotide\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Label the parts/i })).toBeInTheDocument();
  });

  it("plays Battle 2 (match) through to Battle 3 (scenario) and resolution", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/nucleic-acids-a1.2/battle/battle_2");
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Draw the bonds/i }));

    // Correct pair: A-T
    await user.click(screen.getByText("A"));
    await user.click(screen.getByText("T"));
    // Correct pair: G-C
    await user.click(screen.getByText("G"));
    await user.click(screen.getByText("C"));

    expect(await screen.findByText(/Bonds found: 2 \/ 2/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Confirm evidence/i }));

    // Bridge after battle_2
    expect(await screen.findByText(/Evidence 2 — base pairing/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Test the copying machine/i }));

    // Battle 3 setup -> quiz
    expect(await screen.findByText(/Why does base pairing let DNA copy perfectly\?/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Make a prediction/i }));

    await user.click(
      screen.getByText(/The two strands separate and each acts as a template/i)
    );
    await user.click(screen.getByRole("button", { name: /Check answer/i }));
    await user.click(await screen.findByRole("button", { name: /Solve the mystery/i }));

    expect(await screen.findByText(/Mystery Solved!/i)).toBeInTheDocument();
  });

  it("lists the episode on the episode picker", async () => {
    window.history.pushState({}, "", "/episodes");
    render(<App />);

    expect(await screen.findByText(/The Perfect Copy Mystery \(flagship\)/i)).toBeInTheDocument();
  });
});
