import { Navigate, useParams } from "react-router-dom";
import LabelBattle from "../battles/LabelBattle";
import MatchBattle from "../battles/MatchBattle";
import ScenarioBattle from "../battles/ScenarioBattle";
import { getEpisode } from "../episodes/registry";

export default function EpisodeBattleScene() {
  const { episodeId, battleId } = useParams<{ episodeId: string; battleId: string }>();
  const episode = episodeId ? getEpisode(episodeId) : undefined;
  const battle = episode?.battles.find((b) => b.id === battleId);

  if (!episode || !battle) return <Navigate to="/" replace />;

  switch (battle.type) {
    case "drag-label":
      return <LabelBattle episode={episode} battle={battle} />;
    case "match":
      return <MatchBattle episode={episode} battle={battle} />;
    case "scenario":
      return <ScenarioBattle episode={episode} battle={battle} />;
    default:
      return <Navigate to="/" replace />;
  }
}
