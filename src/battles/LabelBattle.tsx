import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nextRouteAfterBattle } from "../episodes/navigation";
import type { EpisodeConfig, LabelBattleConfig } from "../episodes/types";
import { useProgress } from "../hooks/useProgress";
import { isWithinDragZone, scoreBattle } from "../hooks/useQuizValidation";

interface Chip {
  id: string;
  label: string;
  x: number; // current position in diagram viewBox coordinates
  y: number;
  correct: boolean | null;
}

export default function LabelBattle({ episode, battle }: { episode: EpisodeConfig; battle: LabelBattleConfig }) {
  const navigate = useNavigate();
  const { complete } = useProgress(episode.id, episode.battles.length);
  const svgRef = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<"setup" | "quiz">("setup");
  const [chips, setChips] = useState<Chip[]>(
    battle.zones.map((z) => ({ id: z.id, label: z.label, ...battle.startPositions[z.id], correct: null }))
  );
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const draggingId = useRef<string | null>(null);
  const diagramHeight = battle.diagramSize * 0.75;

  const allPlacedCorrectly = useMemo(() => chips.every((c) => c.correct === true), [chips]);

  function toDiagramCoords(clientX: number, clientY: number) {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * battle.diagramSize,
      y: ((clientY - rect.top) / rect.height) * diagramHeight,
    };
  }

  function onPointerDown(id: string) {
    if (chips.find((c) => c.id === id)?.correct === true) return;
    draggingId.current = id;
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingId.current) return;
    const { x, y } = toDiagramCoords(e.clientX, e.clientY);
    setChips((prev) => prev.map((c) => (c.id === draggingId.current ? { ...c, x, y } : c)));
  }

  function onPointerUp() {
    const id = draggingId.current;
    draggingId.current = null;
    if (!id) return;

    const zone = battle.zones.find((z) => z.id === id)!;
    const chip = chips.find((c) => c.id === id)!;
    const correct = isWithinDragZone(zone, { x: chip.x, y: chip.y }, battle.diagramSize);

    setChips((prev) => prev.map((c) => (c.id === id ? { ...c, correct } : c)));
    setAttempts((a) => a + 1);
    setHint(correct ? null : attempts + 1 >= 3 ? battle.finalWrongHint : battle.wrongHint);
  }

  function handleSubmit() {
    const correctCount = chips.filter((c) => c.correct).length;
    const score = scoreBattle(correctCount, chips.length);
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
      <p>Drag each label onto the matching atom in the diagram.</p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${battle.diagramSize} ${diagramHeight}`}
        className="battle-stage"
        style={{ maxHeight: diagramHeight, touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {battle.connectorLines?.map((line, i) => (
          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#2c3e50" strokeWidth={3} />
        ))}
        {battle.zones.map((z) => (
          <circle
            key={z.id}
            cx={z.x}
            cy={z.y}
            r={z.label === "O" ? 55 : 30}
            fill={chips.find((c) => c.id === z.id)?.correct ? "#87ceeb" : "none"}
            stroke="#2c3e50"
            strokeDasharray="4 4"
            strokeWidth={2}
          />
        ))}
        {chips.map((chip) => (
          <g
            key={chip.id}
            onPointerDown={() => onPointerDown(chip.id)}
            style={{ cursor: chip.correct === true ? "default" : "grab" }}
          >
            <circle
              cx={chip.x}
              cy={chip.y}
              r={chip.label === "O" ? 26 : 18}
              fill={chip.label === "O" ? "#e84393" : "#f4d03f"}
              stroke="#2c3e50"
              strokeWidth={2}
            />
            <text x={chip.x} y={chip.y + 5} textAnchor="middle" fontFamily="Caveat, sans-serif" fontSize={20}>
              {chip.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="ibby-chip-row" aria-label="Label placement status">
        {chips.map((chip) => (
          <span
            key={chip.id}
            className={`ibby-chip${chip.correct === true ? " is-correct" : chip.correct === false ? " is-wrong" : ""}`}
            data-correct={chip.correct === null ? undefined : String(chip.correct)}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {hint && (
        <p className="ibby-feedback is-wrong" data-tone="wrong" role="status">
          {hint}
        </p>
      )}

      {allPlacedCorrectly && (
        <p className="ibby-feedback is-ok" data-tone="ok" role="status">
          {battle.teachBack}
        </p>
      )}

      <button className="ibby-btn" onClick={handleSubmit} disabled={!allPlacedCorrectly}>
        Confirm evidence →
      </button>
    </div>
  );
}
