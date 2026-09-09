import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { episodeBattlePath } from "../episodes/navigation";
import { getEpisode } from "../episodes/registry";

export default function SetupScene() {
  const { episodeId } = useParams<{ episodeId: string }>();
  const navigate = useNavigate();
  const diagramRef = useRef<HTMLDivElement>(null);
  const episode = episodeId ? getEpisode(episodeId) : undefined;

  useEffect(() => {
    if (!diagramRef.current || !episode?.setup.playRevealAnimation) return;
    return episode.setup.playRevealAnimation(diagramRef.current);
  }, [episode]);

  if (!episode) return <Navigate to="/" replace />;

  const firstBattle = episode.battles[0];

  return (
    <div className="scene">
      <h1 className="ibby-heading">{episode.setup.heading}</h1>
      <p>{episode.setup.body}</p>
      <div
        className="battle-stage"
        ref={diagramRef}
        dangerouslySetInnerHTML={{ __html: episode.setup.diagramSvg }}
        aria-hidden="true"
      />
      <button
        className="ibby-btn"
        onClick={() => navigate(episodeBattlePath(episode.id, firstBattle.id))}
      >
        {episode.setup.cta}
      </button>
    </div>
  );
}
