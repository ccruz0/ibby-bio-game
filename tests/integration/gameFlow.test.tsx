import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/App";

describe("Setup → Battle 1 navigation", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/e/water-a1.1/setup");
  });

  it("loads the setup scene and advances into the first battle setup", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/The Water Strider Mystery/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Start the investigation/i }));

    expect(await screen.findByText(/What is a water molecule\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Label the atoms/i })).toBeInTheDocument();
  });

  it("enters Battle 1 quiz after the short setup bridge", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Start the investigation/i }));
    await user.click(await screen.findByRole("button", { name: /Label the atoms/i }));

    expect(screen.getByText(/Drag each label onto the matching part of the diagram/i)).toBeInTheDocument();
  });
});
