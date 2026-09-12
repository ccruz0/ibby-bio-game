import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

/**
 * Regression: the resolution screen had no controls at all, so solving an
 * episode left the player stuck with no way to reach the next one.
 */
describe("end of an episode leads somewhere", () => {
  beforeEach(() => localStorage.clear());

  it("offers the next mystery and a way back to the notebook", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/water-a1.1/resolution");
    render(<App />);

    const next = await screen.findByRole("link", { name: /Next mystery: The Perfect Copy Mystery/i });
    expect(screen.getByRole("link", { name: /Back to the notebook/i })).toBeInTheDocument();

    await user.click(next);
    expect(await screen.findByRole("heading", { name: /The Perfect Copy Mystery/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start the investigation/i })).toBeInTheDocument();
  });

  it("on the last episode still offers the notebook", async () => {
    const user = userEvent.setup();
    const last = "cells-a2.1-demo";
    window.history.pushState({}, "", `/e/${last}/resolution`);
    render(<App />);

    expect(screen.queryByRole("link", { name: /Next mystery/i })).not.toBeInTheDocument();
    await user.click(await screen.findByRole("link", { name: /Back to the notebook/i }));
    expect(await screen.findByRole("heading", { name: /Ibby's Biology Notebook/i })).toBeInTheDocument();
  });

  it("reaches the next mystery with the keyboard alone", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/water-a1.1/resolution");
    render(<App />);

    const next = await screen.findByRole("link", { name: /Next mystery/i });
    next.focus();
    expect(document.activeElement).toBe(next);
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("heading", { name: /The Perfect Copy Mystery/i })).toBeInTheDocument();
  });
});
