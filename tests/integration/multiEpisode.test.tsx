import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

describe("multi-episode engine", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("redirects legacy /battle/1 to the new water-a1.1 route", async () => {
    window.history.pushState({}, "", "/battle/1");
    render(<App />);

    expect(await screen.findByText(/What is a water molecule\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Label the atoms/i })).toBeInTheDocument();
  });

  it("redirects legacy /resolution to the new water-a1.1 route", async () => {
    window.history.pushState({}, "", "/resolution");
    render(<App />);

    expect(await screen.findByText(/Mystery Solved!/i)).toBeInTheDocument();
  });

  it("plays a second, differently-shaped episode end to end through the same generic engine", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/e/cells-a2.1-demo/setup");
    render(<App />);

    expect(screen.getByText(/Origins of Cells \(Fast-Lane preview\)/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Start the quick check/i }));
    await user.click(await screen.findByRole("button", { name: /Answer the question/i }));

    expect(screen.getByText(/What is the main reason early cells needed a boundary membrane/i)).toBeInTheDocument();

    await user.click(screen.getByText(/To separate internal chemistry from the outside environment/i));
    await user.click(screen.getByRole("button", { name: /Check answer/i }));
    await user.click(await screen.findByRole("button", { name: /Finish the preview/i }));

    expect(await screen.findByText(/Fast-Lane preview complete/i)).toBeInTheDocument();
  });

  it("lists all episodes on the episode picker", async () => {
    window.history.pushState({}, "", "/episodes");
    render(<App />);

    expect(await screen.findByText(/The Water Strider Mystery \(flagship\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Origins of Cells \(Fast-Lane preview\) \(fast-lane\)/i)).toBeInTheDocument();
  });
});
