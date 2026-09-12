import { Link } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import { episodeList } from "../episodes/registry";
import { episodeSetupPath } from "../episodes/navigation";

export default function EpisodeHome() {
  return (
    <div className="scene">
      <h1 className="ibby-heading">Ibby's Biology Notebook</h1>
      <p>Pick an episode to investigate.</p>
      <div className="ibby-chip-row" aria-label="Episode list">
        {episodeList.map((episode) => (
          <Link key={episode.id} className="ibby-btn" to={episodeSetupPath(episode.id)}>
            {episode.title} ({episode.tier})
          </Link>
        ))}
      </div>
      <Scoreboard />
    </div>
  );
}
