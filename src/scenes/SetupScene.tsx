import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { playMoleculeReveal } from "../animations/moleculeTimeline";
import MoleculeSvg from "../diagrams/molecule.svg?raw";

export default function SetupScene() {
  const navigate = useNavigate();
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramRef.current) return;
    return playMoleculeReveal(diagramRef.current);
  }, []);

  return (
    <div className="scene">
      <h1 className="ibby-heading">The Water Strider Mystery</h1>
      <p>
        You and Ibby are young scientists investigating a strange sight down by the pond:{" "}
        <span className="ibby-keyword">water striders</span> walking on water without sinking. Something about
        water itself must explain it — time to look closer.
      </p>
      <div
        className="battle-stage"
        ref={diagramRef}
        dangerouslySetInnerHTML={{ __html: MoleculeSvg }}
        aria-hidden="true"
      />
      <button onClick={() => navigate("/battle/1")}>Start the investigation →</button>
    </div>
  );
}
