import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { isCorrectScenarioChoice, scoreBattle } from "../hooks/useQuizValidation";
import { playHbondReveal } from "../animations/hbondTimeline";
import HbondSvg from "../diagrams/hbond.svg?raw";
import CohesionSvg from "../diagrams/cohesion.svg?raw";
import type { ScenarioOption } from "../types";

const OPTIONS: ScenarioOption[] = [
  { id: "opt_cohesion", text: "Cohesion between water molecules makes the surface act like an elastic film.", correct: true },
  { id: "opt_density", text: "Water is simply denser than the strider's legs.", correct: false },
  { id: "opt_temp", text: "The pond water is cold enough to be slightly frozen at the surface.", correct: false },
];

const TEACH_BACK =
  "✅ Teach-back: cohesion from hydrogen bonds creates surface tension — a stretchy film that can hold a light insect.";

export default function Battle3_Scenario() {
  const navigate = useNavigate();
  const { complete } = useProgress();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"setup" | "quiz">("setup");
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (phase !== "quiz" || !diagramRef.current) return;
    return playHbondReveal(diagramRef.current);
  }, [phase]);

  const correct = choice ? isCorrectScenarioChoice(choice, OPTIONS) : false;

  function handleCheck() {
    if (!choice) return;
    setSubmitted(true);
    setAttempts((a) => a + 1);
  }

  function handleContinue() {
    const score = scoreBattle(correct ? 1 : 0, 1);
    complete("battle_3", score);
    navigate("/resolution");
  }

  if (phase === "setup") {
    return (
      <div className="scene ibby-battle-setup" data-battle="3">
        <h1 className="ibby-heading">Evidence 3: Why does cohesion let insects float?</h1>
        <p className="ibby-bridge-copy">
          Back at the pond: many hydrogen bonds mean{" "}
          <span className="ibby-keyword">cohesion</span>. Predict why a water strider can
          stand on the surface without sinking.
        </p>
        <div
          className="battle-stage ibby-bridge-diagram"
          dangerouslySetInnerHTML={{ __html: CohesionSvg }}
          aria-hidden="true"
        />
        <button className="ibby-btn" type="button" onClick={() => setPhase("quiz")}>
          Make a prediction →
        </button>
      </div>
    );
  }

  return (
    <div className="scene">
      <h1 className="ibby-heading">Evidence 3: Why does cohesion let insects float?</h1>

      <div className="battle-stage" ref={diagramRef} dangerouslySetInnerHTML={{ __html: HbondSvg }} aria-hidden="true" />

      <p>Why can a water strider stand on the surface of a pond without sinking?</p>
      <div className="ibby-options" role="radiogroup" aria-label="Scenario answers">
        {OPTIONS.map((opt) => (
          <label
            key={opt.id}
            className={`ibby-option${choice === opt.id ? " is-selected" : ""}`}
          >
            <input
              type="radio"
              name="scenario"
              checked={choice === opt.id}
              onChange={() => {
                setChoice(opt.id);
                setSubmitted(false);
              }}
            />
            {opt.text}
          </label>
        ))}
      </div>

      {submitted && !correct && (
        <p className="ibby-feedback is-wrong" data-tone="wrong" role="status">
          {attempts >= 3
            ? "Hint: think about what holds water molecules together at the surface — the same force from Evidence 2."
            : "Not quite — try again."}
        </p>
      )}
      {submitted && correct && (
        <p className="ibby-feedback is-ok" data-tone="ok" role="status">
          {TEACH_BACK}
        </p>
      )}

      {!submitted && (
        <button className="ibby-btn" onClick={handleCheck} disabled={!choice}>
          Check answer
        </button>
      )}
      {submitted && (
        <button className="ibby-btn" onClick={handleContinue}>
          {correct ? "Solve the mystery →" : "Continue anyway →"}
        </button>
      )}
    </div>
  );
}
