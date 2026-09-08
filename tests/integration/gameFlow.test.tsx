import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("Setup → Battle 1 navigation", () => {
  it("loads the setup scene and advances into the first battle", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/The Water Strider Mystery/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Start the investigation/i }));

    expect(await screen.findByText(/What is a water molecule\?/i)).toBeInTheDocument();
  });
});
