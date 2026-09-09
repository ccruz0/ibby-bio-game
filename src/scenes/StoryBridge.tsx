import { useNavigate, useParams, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import CohesionSvg from "../diagrams/cohesion.svg?raw";
import StriderSvg from "../diagrams/strider.svg?raw";
import HbondSvg from "../diagrams/hbond.svg?raw";

export type BridgeId = "1" | "2";

interface BridgeContent {
  title: string;
  evidence: string;
  body: ReactNode;
  diagram: string;
  diagramLabel: string;
  peekDiagram?: string;
  peekLabel?: string;
  nextPath: string;
  cta: string;
}

const BRIDGES: Record<BridgeId, BridgeContent> = {
  "1": {
    title: "Evidence logged",
    evidence: "Evidence 1 — water molecule",
    body: (
      <>
        Nice find. A water molecule is one{" "}
        <span className="ibby-keyword">oxygen</span> bonded to two{" "}
        <span className="ibby-keyword">hydrogens</span> — a tiny magnet that can tug on
        its neighbors. Next clue: how those molecules stick together.
      </>
    ),
    diagram: HbondSvg,
    diagramLabel: "Hydrogen-bond sketch tease",
    nextPath: "/battle/2",
    cta: "Follow the bonds →",
  },
  "2": {
    title: "Evidence logged",
    evidence: "Evidence 2 — hydrogen bonds",
    body: (
      <>
        Dashed links are <span className="ibby-keyword">hydrogen bonds</span>. Many of
        them make water molecules cling in a chain —{" "}
        <span className="ibby-keyword">cohesion</span>. That film on the pond might be
        strong enough for a strider…
      </>
    ),
    diagram: CohesionSvg,
    diagramLabel: "Cohesion chain tease",
    peekDiagram: StriderSvg,
    peekLabel: "Water strider surface-tension tease",
    nextPath: "/battle/3",
    cta: "Test the pond surface →",
  },
};

export default function StoryBridge() {
  const { bridgeId } = useParams<{ bridgeId: string }>();
  const navigate = useNavigate();
  const id = bridgeId === "1" || bridgeId === "2" ? bridgeId : undefined;

  if (!id) return <Navigate to="/" replace />;

  const content = BRIDGES[id];

  return (
    <div className="scene ibby-bridge" data-bridge={id}>
      <div className="ibby-chip-row" aria-label="Progress">
        <span className="ibby-chip is-correct">{content.evidence}</span>
      </div>
      <h1 className="ibby-heading">{content.title}</h1>
      <p className="ibby-bridge-copy">{content.body}</p>

      <div
        className="battle-stage ibby-bridge-diagram"
        dangerouslySetInnerHTML={{ __html: content.diagram }}
        aria-label={content.diagramLabel}
      />

      {content.peekDiagram && (
        <div
          className="battle-stage ibby-bridge-diagram ibby-bridge-diagram--peek"
          dangerouslySetInnerHTML={{ __html: content.peekDiagram }}
          aria-label={content.peekLabel}
        />
      )}

      <button className="ibby-btn" type="button" onClick={() => navigate(content.nextPath)}>
        {content.cta}
      </button>
    </div>
  );
}
