import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nextRouteAfterBattle } from "../episodes/navigation";
import type { EpisodeConfig, ScenarioBattleConfig } from "../episodes/types";
import { useProgress } from "../hooks/useProgress";
import { isCorrectScenarioChoice, scoreBattle } from "../hooks/useQuizValidation";

export default function ScenarioBattle({ episode, battle }: { episode: EpisodeConfig; battle: ScenarioBattleConfig }) {
  const navigate = useNavigate();
  const { complete } = useProgress(episode.id, episode.battles.length);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"setup" | "quiz">("setup");
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (phase !== "quiz" || !diagramRef.current || !battle.playRevealAnimation) return;
    return battle.playRevealAnimation(diagramRef.current);
  }, [phase, battle.playRevealAnimation]);

  const correct = choice ? isCorrectScenarioChoice(choice, battle.options) : false;

  function handleCheck() {
    if (!choice) return;
    setSubmitted(true);
    setAttempts((a) => a + 1);
  }

  function handleContinue() {
    const score = scoreBattle(correct ? 1 : 0, 1);
    complete(battle.id, score);
    navigate(nextRouteAfterBattle(episode, battle.id));
  }

  if (phase === "setup") {
    return (
      <div className="scene ibby-battle-setup" data-battle={battle.id}>
        <h1 className="ibby-heading">{battle.heading}</h1>
        <p className="ibby-bridge-copy">{battle.intro}</p>
        <div
          className="battle-stage ibby-bridge-diagram"
          dangerouslySetInnerHTML={{ __html: battle.setupDiagramSvg }}
          aria-hidden="true"
        />
        <button className="ibby-btn" type="button" onClick={() => setPhase("quiz")}>
          {battle.setupCta}
        </button>
      </div>
    );
  }

  return (
    <div className="scene">
      <h1 className="ibby-heading">{battle.heading}</h1>

      <div
        className="battle-stage"
        ref={diagramRef}
        dangerouslySetInnerHTML={{ __html: battle.quizDiagramSvg }}
        aria-hidden="true"
      />

      <p>{battle.question}</p>
      <div className="ibby-options" role="radiogroup" aria-label="Scenario answers">
        {battle.options.map((opt) => (
          <label key={opt.id} className={`ibby-option${choice === opt.id ? " is-selected" : ""}`}>
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
          {attempts >= 3 ? battle.finalWrongHint : battle.wrongHint}
        </p>
      )}
      {submitted && correct && (
        <p className="ibby-feedback is-ok" data-tone="ok" role="status">
          {battle.teachBack}
        </p>
      )}

      {!submitted && (
        <button className="ibby-btn" onClick={handleCheck} disabled={!choice}>
          Check answer
        </button>
      )}
      {submitted && (
        <button className="ibby-btn" onClick={handleContinue}>
          {correct ? battle.successCta ?? "Solve the mystery →" : battle.retryCta ?? "Continue anyway →"}
        </button>
      )}
    </div>
  );
}
