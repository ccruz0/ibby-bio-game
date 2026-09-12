import { describe, expect, it } from "vitest";
import {
  isWithinDragZone,
  isCorrectMatch,
  isCorrectScenarioChoice,
  scoreBattle,
} from "../../src/hooks/useQuizValidation";

describe("isWithinDragZone", () => {
  const zone = { id: "z1", label: "O", accessibleLabel: "oxygen atom", x: 200, y: 150, toleranceRatio: 0.1 };

  it("accepts a drop exactly on the zone", () => {
    expect(isWithinDragZone(zone, { x: 200, y: 150 }, 400)).toBe(true);
  });

  it("accepts a drop just inside the tolerance boundary", () => {
    expect(isWithinDragZone(zone, { x: 235, y: 150 }, 400)).toBe(true);
  });

  it("rejects a drop well outside the tolerance", () => {
    expect(isWithinDragZone(zone, { x: 350, y: 150 }, 400)).toBe(false);
  });
});

describe("isCorrectMatch", () => {
  const answerKey = [{ id: "p1", fromId: "a", toId: "b" }];

  it("matches pairs regardless of direction", () => {
    expect(isCorrectMatch({ fromId: "b", toId: "a" }, answerKey)).toBe(true);
  });

  it("rejects an unbonded pair", () => {
    expect(isCorrectMatch({ fromId: "a", toId: "c" }, answerKey)).toBe(false);
  });
});

describe("isCorrectScenarioChoice", () => {
  const options = [
    { id: "right", text: "correct", correct: true },
    { id: "wrong", text: "incorrect", correct: false },
  ];

  it("accepts the correct option", () => {
    expect(isCorrectScenarioChoice("right", options)).toBe(true);
  });

  it("rejects an incorrect option", () => {
    expect(isCorrectScenarioChoice("wrong", options)).toBe(false);
  });
});

describe("scoreBattle", () => {
  it("computes a percentage score", () => {
    expect(scoreBattle(2, 3)).toBe(67);
  });

  it("returns 0 for an empty battle", () => {
    expect(scoreBattle(0, 0)).toBe(0);
  });
});
