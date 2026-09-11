import SoluteSvg from "../diagrams/solute.svg?raw";
import type { EpisodeConfig } from "./types";

/**
 * Fast-Lane template proof-of-concept (ACADEMIC_YEAR_MAP.md "Platform" step).
 * Thin on purpose: one scenario battle, reused placeholder art — just enough
 * to prove the generic engine can load a second, differently-shaped episode.
 * Swap in real A2.1 diagrams/copy when this topic comes up for real production.
 */
export const cellsA21Demo: EpisodeConfig = {
  id: "cells-a2.1-demo",
  title: "Origins of Cells (Fast-Lane preview)",
  tier: "fast-lane",
  setup: {
    heading: "Origins of Cells (Fast-Lane preview)",
    body: (
      <>
        Fast-Lane episodes trade the full three-battle arc for a single sharp question. Here's a stand-in for{" "}
        <span className="ibby-keyword">A2.1 Origins of cells</span> so we can prove the engine loads more than
        just Water A1.1.
      </>
    ),
    diagramSvg: SoluteSvg,
    cta: "Start the quick check →",
  },
  battles: [
    {
      type: "scenario",
      id: "battle_1",
      heading: "Quick check: why do cells need a membrane?",
      intro: "One-battle Fast-Lane format: read the setup, then answer the question.",
      setupCta: "Answer the question →",
      setupDiagramSvg: SoluteSvg,
      quizDiagramSvg: SoluteSvg,
      question: "What is the main reason early cells needed a boundary membrane?",
      options: [
        { id: "opt_boundary", text: "To separate internal chemistry from the outside environment.", correct: true },
        { id: "opt_color", text: "To make the cell visible under a microscope.", correct: false },
        { id: "opt_weight", text: "To make the cell heavier so it could sink.", correct: false },
      ],
      teachBack:
        "Teach-back: a membrane lets a cell keep its own chemistry distinct from its surroundings — the first step toward controlled internal reactions.",
      wrongHint: "Not quite — try again.",
      finalWrongHint: "Hint: think about what a boundary lets a cell keep in (or out).",
      successCta: "Finish the preview →",
      retryCta: "Continue anyway →",
    },
  ],
  bridges: {},
  resolution: {
    heading: "Fast-Lane preview complete",
    body: <>That's the whole Fast-Lane shape: one setup, one battle, one resolution — same engine as Water A1.1.</>,
    diagramSvg: SoluteSvg,
  },
};
