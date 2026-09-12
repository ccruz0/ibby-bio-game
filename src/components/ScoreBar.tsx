import { useLocation } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { getEpisode } from "../episodes/registry";
import { getPlayer } from "../player/player";
import { readEpisodeProgress, summariseEpisode } from "../player/scoreboard";

/** Pull the episode id out of any /e/:episodeId/... route. */
function episodeIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/e\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Always-visible score card. Sits at the top of every episode screen so the
 * player can see who is playing, how far along she is and her score without
 * having to finish the episode first.
 */
export default function ScoreBar() {
  const { pathname } = useLocation();
  const { progress } = useGame();
  const episodeId = episodeIdFromPath(pathname);
  if (!episodeId || !getEpisode(episodeId)) return null;

  // Prefer live in-session progress; fall back to whatever is saved on the device.
  const live = progress && progress.episode === episodeId ? progress : readEpisodeProgress(episodeId);
  const summary = summariseEpisode(episodeId, live);
  if (!summary) return null;

  const player = getPlayer();

  return (
    <div className="ibby-scorebar" role="region" aria-label="Current score">
      <span className="ibby-scorebar-player">{player.name}</span>
      <span className="ibby-scorebar-sep" aria-hidden="true">
        ·
      </span>
      <span className="ibby-scorebar-episode">{summary.title}</span>
      <span className="ibby-scorebar-stats">
        <span className="ibby-scorebar-stat">
          Evidence <strong>{summary.completedBattles}</strong> of <strong>{summary.totalBattles}</strong>
        </span>
        <span className="ibby-scorebar-stat">
          Score <strong>{summary.score}%</strong>
        </span>
      </span>
    </div>
  );
}
