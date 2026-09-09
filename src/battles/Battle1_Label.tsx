import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { isWithinDragZone, scoreBattle } from "../hooks/useQuizValidation";
import type { DragLabelZone } from "../types";
import MoleculeSvg from "../diagrams/molecule.svg?raw";

// Coordinates match src/diagrams/molecule.svg's #molecule_1_dropzones (viewBox 400x300).
const DIAGRAM_SIZE = 400;
const ZONES: DragLabelZone[] = [
  { id: "dropzone_o", label: "O", x: 200, y: 150, toleranceRatio: 0.1 },
  { id: "dropzone_h1", label: "H", x: 130, y: 220, toleranceRatio: 0.1 },
  { id: "dropzone_h2", label: "H", x: 270, y: 220, toleranceRatio: 0.1 },
];

interface Chip {
  id: string;
  label: string;
  x: number; // current position in diagram viewBox coordinates
  y: number;
  correct: boolean | null;
}

const START_POSITIONS: Record<string, { x: number; y: number }> = {
  dropzone_o: { x: 60, y: 40 },
  dropzone_h1: { x: 160, y: 40 },
  dropzone_h2: { x: 260, y: 40 },
};

const TEACH_BACK =
  "Teach-back: oxygen (pink) sits in the middle; the two hydrogens (yellow) share electrons with it — a polar H₂O ready to attract other waters.";

export default function Battle1_Label() {
  const navigate = useNavigate();
  const { complete } = useProgress();
  const svgRef = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<"setup" | "quiz">("setup");
  const [chips, setChips] = useState<Chip[]>(
    ZONES.map((z) => ({ id: z.id, label: z.label, ...START_POSITIONS[z.id], correct: null }))
  );
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const draggingId = useRef<string | null>(null);

  const allPlacedCorrectly = useMemo(() => chips.every((c) => c.correct === true), [chips]);

  function toDiagramCoords(clientX: number, clientY: number) {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * DIAGRAM_SIZE,
      y: ((clientY - rect.top) / rect.height) * (DIAGRAM_SIZE * 0.75),
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

    const zone = ZONES.find((z) => z.id === id)!;
    const chip = chips.find((c) => c.id === id)!;
    const correct = isWithinDragZone(zone, { x: chip.x, y: chip.y }, DIAGRAM_SIZE);

    setChips((prev) => prev.map((c) => (c.id === id ? { ...c, correct } : c)));
    setAttempts((a) => a + 1);
    setHint(
      correct
        ? null
        : attempts + 1 >= 3
          ? "Hint: Oxygen (pink) is the big center atom; Hydrogen (yellow) are the two smaller side atoms."
          : "Not quite — try again."
    );
  }

  function handleSubmit() {
    const correctCount = chips.filter((c) => c.correct).length;
    const score = scoreBattle(correctCount, chips.length);
    complete("battle_1", score);
    navigate("/bridge/1");
  }

  if (phase === "setup") {
    return (
      <div className="scene ibby-battle-setup" data-battle="1">
        <h1 className="ibby-heading">Evidence 1: What is a water molecule?</h1>
        <p className="ibby-bridge-copy">
          First stop in the notebook: zoom into one water molecule. Label the atoms so we
          know which end of the magnet is which.
        </p>
        <div
          className="battle-stage ibby-bridge-diagram"
          dangerouslySetInnerHTML={{ __html: MoleculeSvg }}
          aria-hidden="true"
        />
        <button className="ibby-btn" type="button" onClick={() => setPhase("quiz")}>
          Label the atoms →
        </button>
      </div>
    );
  }

  return (
    <div className="scene">
      <h1 className="ibby-heading">Evidence 1: What is a water molecule?</h1>
      <p>Drag each label onto the matching atom in the diagram.</p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${DIAGRAM_SIZE} 300`}
        className="battle-stage"
        style={{ maxHeight: 300, touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <line x1="200" y1="150" x2="130" y2="220" stroke="#2c3e50" strokeWidth={3} />
        <line x1="200" y1="150" x2="270" y2="220" stroke="#2c3e50" strokeWidth={3} />
        {ZONES.map((z) => (
          <circle
            key={z.id}
            cx={z.x}
            cy={z.y}
            r={z.id === "dropzone_o" ? 55 : 30}
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
          {TEACH_BACK}
        </p>
      )}

      <button className="ibby-btn" onClick={handleSubmit} disabled={!allPlacedCorrectly}>
        Confirm evidence →
      </button>
    </div>
  );
}
