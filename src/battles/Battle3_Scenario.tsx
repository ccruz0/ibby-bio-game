import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { isCorrectScenarioChoice, scoreBattle } from "../hooks/useQuizValidation";
import { playHbondReveal } from "../animations/hbondTimeline";
import HbondSvg from "../diagrams/hbond.svg?raw";
import type { ScenarioOption } from "../types";

const OPTIONS: ScenarioOption[] = [
  { id: "opt_cohesion", text: "Cohesion between water molecules makes the surface act like an elastic film.", correct: true },
  { id: "opt_density", text: "Water is simply denser than the strider's legs.", correct: false },
  { id: "opt_temp", text: "The pond water is cold enough to be slightly frozen at the surface.", correct: false },
];

export default function Battle3_Scenario() {
  const navigate = useNavigate();
  const { complete } = useProgress();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!diagramRef.current) return;
    return playHbondReveal(diagramRef.current);
  }, []);

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

  return (
    <div className="scene">
      <h1 className="ibby-heading">Evidence 3: Why does cohesion let insects float?</h1>

      <div className="battle-stage" ref={diagramRef} dangerouslySetInnerHTML={{ __html: HbondSvg }} aria-hidden="true" />

      <p>Why can a water strider stand on the surface of a pond without sinking?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {OPTIONS.map((opt) => (
          <label key={opt.id} style={{ display: "flex", gap: 8 }}>
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
        <p className="ibby-keyword">
          {attempts >= 3
            ? "Hint: think about what holds water molecules together at the surface — the same force from Evidence 2."
            : "Not quite — try again."}
        </p>
      )}
      {submitted && correct && <p>✅ Yes! Cohesion from hydrogen bonds creates surface tension.</p>}

      {!submitted && (
        <button onClick={handleCheck} disabled={!choice}>
          Check answer
        </button>
      )}
      {submitted && (
        <button onClick={handleContinue}>{correct ? "Solve the mystery →" : "Continue anyway →"}</button>
      )}
    </div>
  );
}
