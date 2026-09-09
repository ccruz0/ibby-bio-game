import { useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";
import { playStriderReveal } from "../animations/striderTimeline";
import StriderSvg from "../diagrams/strider.svg?raw";

export default function ResolutionScene() {
  const { progress } = useGame();
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramRef.current) return;
    return playStriderReveal(diagramRef.current);
  }, []);

  const completedCount = progress
    ? Object.values(progress.battles).filter((b) => b.status === "complete").length
    : 0;

  return (
    <div className="scene">
      <h1 className="ibby-heading">Mystery Solved!</h1>
      <p>
        Because of <span className="ibby-keyword">hydrogen bonds</span>, water molecules stick together — creating{" "}
        <span className="ibby-keyword">surface tension</span> strong enough to hold a water strider up.
      </p>
      <div
        className="battle-stage"
        ref={diagramRef}
        dangerouslySetInnerHTML={{ __html: StriderSvg }}
        aria-hidden="true"
      />
      <div className="ibby-chip-row">
        <span className="ibby-chip is-correct">
          Case closed — {completedCount} of 3 evidence
        </span>
        <span className="ibby-chip">Score: {progress?.overall_score ?? 0}%</span>
      </div>
    </div>
  );
}
