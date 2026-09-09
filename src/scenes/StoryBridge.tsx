import { Navigate, useNavigate, useParams } from "react-router-dom";
import { nextRouteAfterBridge } from "../episodes/navigation";
import { getEpisode } from "../episodes/registry";

export default function StoryBridge() {
  const { episodeId, bridgeId } = useParams<{ episodeId: string; bridgeId: string }>();
  const navigate = useNavigate();
  const episode = episodeId ? getEpisode(episodeId) : undefined;
  const content = episode && bridgeId ? Object.values(episode.bridges).find((b) => b?.id === bridgeId) : undefined;

  if (!episode || !content) return <Navigate to="/" replace />;

  return (
    <div className="scene ibby-bridge" data-bridge={content.id}>
      <div className="ibby-chip-row" aria-label="Progress">
        <span className="ibby-chip is-correct">{content.evidence}</span>
      </div>
      <h1 className="ibby-heading">{content.title}</h1>
      <p className="ibby-bridge-copy">{content.body}</p>

      <div
        className="battle-stage ibby-bridge-diagram"
        dangerouslySetInnerHTML={{ __html: content.diagramSvg }}
        aria-label={content.diagramLabel}
      />

      {content.peekDiagramSvg && (
        <div
          className="battle-stage ibby-bridge-diagram ibby-bridge-diagram--peek"
          dangerouslySetInnerHTML={{ __html: content.peekDiagramSvg }}
          aria-label={content.peekLabel}
        />
      )}

      <button
        className="ibby-btn"
        type="button"
        onClick={() => navigate(nextRouteAfterBridge(episode, content.id))}
      >
        {content.cta}
      </button>
    </div>
  );
}
