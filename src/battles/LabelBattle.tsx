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
  // Keyboard / no-drag path: which label is currently "picked up".
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const draggingId = useRef<string | null>(null);
  const diagramHeight = battle.diagramSize * 0.75;

  const allPlacedCorrectly = useMemo(() => chips.every((c) => c.correct === true), [chips]);

  function zoneOf(id: string) {
    return battle.zones.find((z) => z.id === id)!;
  }

  function nameOf(id: string) {
    return zoneOf(id).accessibleLabel;
  }

  function toDiagramCoords(clientX: number, clientY: number) {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * battle.diagramSize,
      y: ((clientY - rect.top) / rect.height) * diagramHeight,
    };
  }

  function registerPlacement(id: string, correct: boolean) {
    setChips((prev) => prev.map((c) => (c.id === id ? { ...c, correct } : c)));
    setAttempts((a) => a + 1);
    setHint(correct ? null : attempts + 1 >= 3 ? battle.finalWrongHint : battle.wrongHint);
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

    const chip = chips.find((c) => c.id === id)!;
    const correct = isWithinDragZone(zoneOf(id), { x: chip.x, y: chip.y }, battle.diagramSize);
    registerPlacement(id, correct);
  }

  /** Step 1 of the keyboard path: pick a label up (or put it back down). */
  function pickUp(id: string) {
    if (chips.find((c) => c.id === id)?.correct === true) return;
    if (pickedId === id) {
      setPickedId(null);
      setAnnouncement(`${nameOf(id)} put back.`);
      return;
    }
    setPickedId(id);
    setAnnouncement(`${nameOf(id)} picked up. Now choose where it goes.`);
  }

  /** Step 2 of the keyboard path: drop the picked label into a zone. Exact, no tolerance. */
  function placeInZone(zoneId: string) {
    if (!pickedId) return;
    const zone = zoneOf(zoneId);
    const name = nameOf(pickedId);
    const correct = pickedId === zoneId;

    setChips((prev) => prev.map((c) => (c.id === pickedId ? { ...c, x: zone.x, y: zone.y, correct } : c)));
    setAttempts((a) => a + 1);
    setHint(correct ? null : attempts + 1 >= 3 ? battle.finalWrongHint : battle.wrongHint);
    setAnnouncement(
      correct
        ? `Correct. ${name} placed on the ${zone.accessibleLabel}.`
        : `Not quite. ${name} does not belong on the ${zone.accessibleLabel}. Pick it up and try another spot.`
    );
    setPickedId(null);
  }

  function onKeyDownStage(e: React.KeyboardEvent) {
    if (e.key === "Escape" && pickedId) {
      setAnnouncement(`${nameOf(pickedId)} put back.`);
      setPickedId(null);
    }
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
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="scene" onKeyDown={onKeyDownStage}>
      <h1 className="ibby-heading">{battle.heading}</h1>
      <p>Drag each label onto the matching part of the diagram — or use the buttons below, which work with a keyboard.</p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${battle.diagramSize} ${diagramHeight}`}
        className="battle-stage"
        style={{ maxHeight: diagramHeight, touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="img"
        aria-label={battle.diagramDescription}
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
              strokeWidth={pickedId === chip.id ? 5 : 2}
              strokeDasharray={pickedId === chip.id ? "5 3" : undefined}
            />
            <text x={chip.x} y={chip.y + 5} textAnchor="middle" fontFamily="Caveat, sans-serif" fontSize={20}>
              {chip.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="ibby-keyboard-path">
        <h2 className="ibby-keyboard-path-title">Place the labels</h2>
        <p className="ibby-keyboard-path-hint">
          Choose a label, then choose where it goes. Press Escape to put a label back.
        </p>

        <p className="ibby-keyboard-caption">1. Pick a label</p>
        <div className="ibby-keyboard-row" role="group" aria-label="Labels to place">
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={`ibby-chip-btn${pickedId === chip.id ? " is-picked" : ""}${
                chip.correct === true ? " is-correct" : chip.correct === false ? " is-wrong" : ""
              }`}
              aria-pressed={pickedId === chip.id}
              disabled={chip.correct === true}
              onClick={() => pickUp(chip.id)}
            >
              {zoneOf(chip.id).accessibleLabel}
              {chip.correct === true ? " ✓ placed" : ""}
            </button>
          ))}
        </div>

        <p className="ibby-keyboard-caption">2. Pick where it goes</p>
        <div className="ibby-keyboard-row" role="group" aria-label="Places on the diagram">
          {battle.zones.map((z) => (
            <button
              key={z.id}
              type="button"
              className="ibby-zone-btn"
              disabled={!pickedId}
              aria-label={`Place on the ${z.accessibleLabel}`}
              onClick={() => placeInZone(z.id)}
            >
              → {z.accessibleLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="ibby-chip-row" aria-hidden="true">
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

      <p className="ibby-sr-status" role="status" aria-live="polite" aria-label="Move announcements">
        {announcement}
      </p>

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
