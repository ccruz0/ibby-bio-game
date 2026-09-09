import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { isCorrectMatch, scoreBattle } from "../hooks/useQuizValidation";
import type { MatchPair } from "../types";
import HbondSvg from "../diagrams/hbond.svg?raw";

const MOLECULES = [
  { id: "mol_a", x: 90, y: 70 },
  { id: "mol_b", x: 250, y: 160 },
  { id: "mol_c", x: 410, y: 70 },
];

// Correct hydrogen-bond pairs per biology-notes-03.png: A-B and B-C bond, A-C does not.
const ANSWER_KEY: MatchPair[] = [
  { id: "pair_ab", fromId: "mol_a", toId: "mol_b" },
  { id: "pair_bc", fromId: "mol_b", toId: "mol_c" },
];

const TEACH_BACK =
  "Teach-back: hydrogen bonds are the dashed attractions between neighboring H₂O molecules — weaker than covalent bonds, but strong enough in numbers to glue water together.";

export default function Battle2_Match() {
  const navigate = useNavigate();
  const { complete } = useProgress();
  const [phase, setPhase] = useState<"setup" | "quiz">("setup");
  const [selected, setSelected] = useState<string | null>(null);
  const [drawnPairs, setDrawnPairs] = useState<{ fromId: string; toId: string; correct: boolean }[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const correctPairsFound = useMemo(() => drawnPairs.filter((p) => p.correct).length, [drawnPairs]);
  const done = correctPairsFound >= ANSWER_KEY.length;

  function handleClickMolecule(id: string) {
    if (done) return;
    if (!selected) {
      setSelected(id);
      return;
    }
    if (selected === id) {
      setSelected(null);
      return;
    }

    const correct = isCorrectMatch({ fromId: selected, toId: id }, ANSWER_KEY);
    setDrawnPairs((prev) => [...prev, { fromId: selected, toId: id, correct }]);
    setAttempts((a) => a + 1);
    setSelected(null);
    setHint(
      correct
        ? null
        : attempts + 1 >= 3
          ? "Hint: hydrogen bonds form between adjacent molecules — check the dashed lines in the setup diagram."
          : "That pair isn't bonded — try again."
    );
  }

  function handleSubmit() {
    const score = scoreBattle(correctPairsFound, ANSWER_KEY.length);
    complete("battle_2", score);
    navigate("/bridge/2");
  }

  if (phase === "setup") {
    return (
      <div className="scene ibby-battle-setup" data-battle="2">
        <h1 className="ibby-heading">Evidence 2: How do hydrogen bonds work?</h1>
        <p className="ibby-bridge-copy">
          Water molecules don&apos;t float alone. Sketch the dashed attractions that tug one
          H₂O toward the next — those are the bonds that build{" "}
          <span className="ibby-keyword">cohesion</span>.
        </p>
        <div
          className="battle-stage ibby-bridge-diagram"
          dangerouslySetInnerHTML={{ __html: HbondSvg }}
          aria-hidden="true"
        />
        <button className="ibby-btn" type="button" onClick={() => setPhase("quiz")}>
          Draw the bonds →
        </button>
      </div>
    );
  }

  return (
    <div className="scene">
      <h1 className="ibby-heading">Evidence 2: How do hydrogen bonds work?</h1>
      <p>Click two molecules to draw a hydrogen bond between them (dashed line, not solid).</p>

      <svg viewBox="0 0 500 260" className="battle-stage" style={{ maxHeight: 260 }}>
        {drawnPairs.map((p, i) => {
          const from = MOLECULES.find((m) => m.id === p.fromId)!;
          const to = MOLECULES.find((m) => m.id === p.toId)!;
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
            />
          );
        })}
        {MOLECULES.map((m) => (
          <g key={m.id} onClick={() => handleClickMolecule(m.id)} style={{ cursor: "pointer" }}>
            <circle
              cx={m.x}
              cy={m.y}
              r={34}
              fill="#e84393"
              fillOpacity={selected === m.id ? 0.7 : 0.35}
              stroke="#e84393"
              strokeWidth={2.5}
            />
            <text x={m.x} y={m.y + 7} textAnchor="middle" fontFamily="Caveat, sans-serif" fontSize={22}>
              O
            </text>
          </g>
        ))}
      </svg>

      {hint && (
        <p className="ibby-feedback is-wrong" data-tone="wrong" role="status">
          {hint}
        </p>
      )}

      {done && (
        <p className="ibby-feedback is-ok" data-tone="ok" role="status">
          {TEACH_BACK}
        </p>
      )}

      <div className="ibby-chip-row">
        <span className={`ibby-chip${done ? " is-correct" : ""}`}>
          Bonds found: {correctPairsFound} / {ANSWER_KEY.length}
        </span>
      </div>

      <button className="ibby-btn" onClick={handleSubmit} disabled={!done}>
        Confirm evidence →
      </button>
    </div>
  );
}
