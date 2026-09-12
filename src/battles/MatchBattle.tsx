import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nextRouteAfterBattle } from "../episodes/navigation";
import type { EpisodeConfig, MatchBattleConfig } from "../episodes/types";
import { useProgress } from "../hooks/useProgress";
import { isCorrectMatch, scoreBattle } from "../hooks/useQuizValidation";

export default function MatchBattle({ episode, battle }: { episode: EpisodeConfig; battle: MatchBattleConfig }) {
  const navigate = useNavigate();
  const { complete } = useProgress(episode.id, episode.battles.length);
  const [phase, setPhase] = useState<"setup" | "quiz">("setup");
  const [selected, setSelected] = useState<string | null>(null);
  const [drawnPairs, setDrawnPairs] = useState<{ fromId: string; toId: string; correct: boolean }[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const correctPairsFound = useMemo(() => drawnPairs.filter((p) => p.correct).length, [drawnPairs]);
  const pairedIds = useMemo(
    () => new Set(drawnPairs.filter((p) => p.correct).flatMap((p) => [p.fromId, p.toId])),
    [drawnPairs]
  );
  const done = correctPairsFound >= battle.answerKey.length;

  function nameOf(id: string) {
    return battle.nodes.find((n) => n.id === id)!.accessibleLabel;
  }

  function handleClickNode(id: string) {
    if (done) return;
    if (!selected) {
      setSelected(id);
      setAnnouncement(`${nameOf(id)} selected. Now choose what it pairs with.`);
      return;
    }
    if (selected === id) {
      setSelected(null);
      setAnnouncement(`${nameOf(id)} unselected.`);
      return;
    }

    const correct = isCorrectMatch({ fromId: selected, toId: id }, battle.answerKey);
    setDrawnPairs((prev) => [...prev, { fromId: selected, toId: id, correct }]);
    setAttempts((a) => a + 1);
    setAnnouncement(
      correct
        ? `Correct. ${nameOf(selected)} pairs with ${nameOf(id)}.`
        : `Not quite. ${nameOf(selected)} does not pair with ${nameOf(id)}. Try another pair.`
    );
    setSelected(null);
    setHint(correct ? null : attempts + 1 >= 3 ? battle.finalWrongHint : battle.wrongHint);
  }

  function onKeyDownStage(e: React.KeyboardEvent) {
    if (e.key === "Escape" && selected) {
      setAnnouncement(`${nameOf(selected)} unselected.`);
      setSelected(null);
    }
  }

  function handleSubmit() {
    const score = scoreBattle(correctPairsFound, battle.answerKey.length);
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
    <div className="scene" onKeyDown={onKeyDownStage}>
      <h1 className="ibby-heading">{battle.heading}</h1>
      <p>
        Pick two items to join them with a bond — click them in the diagram, or use the buttons below, which work
        with a keyboard.
      </p>

      <svg
        viewBox={`0 0 ${battle.viewBox.width} ${battle.viewBox.height}`}
        className="battle-stage"
        style={{ maxHeight: battle.viewBox.height }}
        role="img"
        aria-label={battle.diagramDescription}
      >
        {drawnPairs.map((p, i) => {
          const from = battle.nodes.find((n) => n.id === p.fromId)!;
          const to = battle.nodes.find((n) => n.id === p.toId)!;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={p.correct ? "#2c3e50" : "#e74c3c"}
              strokeWidth={2}
              strokeDasharray="6 6"
              aria-hidden="true"
            />
          );
        })}
        {battle.nodes.map((n) => (
          <g key={n.id} onClick={() => handleClickNode(n.id)} style={{ cursor: "pointer" }}>
            <circle
              cx={n.x}
              cy={n.y}
              r={34}
              fill="#e84393"
              fillOpacity={selected === n.id ? 0.7 : 0.35}
              stroke="#e84393"
              strokeWidth={2.5}
            />
            <text x={n.x} y={n.y + 7} textAnchor="middle" fontFamily="Caveat, sans-serif" fontSize={22}>
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="ibby-keyboard-path">
        <h2 className="ibby-keyboard-path-title">Make the pairs</h2>
        <p className="ibby-keyboard-path-hint">
          Choose one item, then choose the item it pairs with. Press Escape to unselect.
        </p>
        <div className="ibby-keyboard-row" role="group" aria-label="Items to pair">
          {battle.nodes.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`ibby-chip-btn${selected === n.id ? " is-picked" : ""}${
                pairedIds.has(n.id) ? " is-correct" : ""
              }`}
              aria-pressed={selected === n.id}
              disabled={done || pairedIds.has(n.id)}
              onClick={() => handleClickNode(n.id)}
            >
              {n.accessibleLabel}
              {pairedIds.has(n.id) ? " ✓ paired" : ""}
            </button>
          ))}
        </div>
      </div>

      <p className="ibby-sr-status" role="status" aria-live="polite" aria-label="Move announcements">
        {announcement}
      </p>

      {hint && (
        <p className="ibby-feedback is-wrong" data-tone="wrong" role="status">
          {hint}
        </p>
      )}

      {done && (
        <p className="ibby-feedback is-ok" data-tone="ok" role="status">
          {battle.teachBack}
        </p>
      )}

      <div className="ibby-chip-row">
        <span className={`ibby-chip${done ? " is-correct" : ""}`}>
          Bonds found: {correctPairsFound} / {battle.answerKey.length}
        </span>
      </div>

      <button className="ibby-btn" onClick={handleSubmit} disabled={!done}>
        Confirm evidence →
      </button>
    </div>
  );
}
