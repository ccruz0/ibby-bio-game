import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import { episodeSetupPath } from "../episodes/navigation";
import { episodeList, getEpisode } from "../episodes/registry";
import { useProgress } from "../hooks/useProgress";

export default function ResolutionScene() {
  const { episodeId } = useParams<{ episodeId: string }>();
  const diagramRef = useRef<HTMLDivElement>(null);
  const episode = episodeId ? getEpisode(episodeId) : undefined;
  const { progress } = useProgress(episodeId ?? "", episode?.battles.length ?? 0);

  useEffect(() => {
    if (!diagramRef.current || !episode?.resolution.playRevealAnimation) return;
    return episode.resolution.playRevealAnimation(diagramRef.current);
  }, [episode]);

  if (!episode) return <Navigate to="/" replace />;

  // The resolution used to be a dead end: no way onward, so finishing an episode
  // trapped the player. Offer the next episode and always a way back to the hub.
  const currentIndex = episodeList.findIndex((e) => e.id === episode.id);
  const nextEpisode = currentIndex >= 0 ? episodeList[currentIndex + 1] : undefined;

  const totalBattles = episode.battles.length;
  const completedCount = progress
    ? Object.values(progress.battles).filter((b) => b.status === "complete").length
    : 0;

  return (
    <div className="scene">
      <h1 className="ibby-heading">{episode.resolution.heading}</h1>
      <p>{episode.resolution.body}</p>
      <div
        className="battle-stage"
        ref={diagramRef}
        dangerouslySetInnerHTML={{ __html: episode.resolution.diagramSvg }}
        aria-hidden="true"
      />
      <div className="ibby-chip-row">
        <span className="ibby-chip is-correct">
          Case closed — {completedCount} of {totalBattles} evidence
        </span>
        <span className="ibby-chip">Score: {progress?.overall_score ?? 0}%</span>
      </div>
      <nav className="ibby-next-steps" aria-label="What next">
        {nextEpisode && (
          <Link className="ibby-btn" to={episodeSetupPath(nextEpisode.id)}>
            Next mystery: {nextEpisode.title} →
          </Link>
        )}
        <Link className="ibby-btn is-secondary" to="/episodes">
          Back to the notebook
        </Link>
      </nav>

      <Scoreboard highlightEpisodeId={episode.id} />
    </div>
  );
}
