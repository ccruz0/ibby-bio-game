import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import EpisodeBattleScene from "./scenes/EpisodeBattleScene";
import EpisodeHome from "./scenes/EpisodeHome";
import ResolutionScene from "./scenes/ResolutionScene";
import SetupScene from "./scenes/SetupScene";
import StoryBridge from "./scenes/StoryBridge";

const LEGACY_EPISODE_ID = "water-a1.1";
const LEGACY_BATTLE_IDS: Record<string, string> = { "1": "battle_1", "2": "battle_2", "3": "battle_3" };

function LegacyBattleRedirect() {
  const { legacyBattleNumber } = useParams<{ legacyBattleNumber: string }>();
  const battleId = (legacyBattleNumber && LEGACY_BATTLE_IDS[legacyBattleNumber]) ?? legacyBattleNumber;
  return <Navigate to={`/e/${LEGACY_EPISODE_ID}/battle/${battleId}`} replace />;
}

function LegacyBridgeRedirect() {
  const { bridgeId } = useParams<{ bridgeId: string }>();
  return <Navigate to={`/e/${LEGACY_EPISODE_ID}/bridge/${bridgeId}`} replace />;
}

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/episodes" element={<EpisodeHome />} />
          <Route path="/e/:episodeId/setup" element={<SetupScene />} />
          <Route path="/e/:episodeId/battle/:battleId" element={<EpisodeBattleScene />} />
          <Route path="/e/:episodeId/bridge/:bridgeId" element={<StoryBridge />} />
          <Route path="/e/:episodeId/resolution" element={<ResolutionScene />} />

          {/* Legacy Water A1.1 routes — keep old links/bookmarks working. */}
          <Route path="/" element={<Navigate to={`/e/${LEGACY_EPISODE_ID}/setup`} replace />} />
          <Route path="/battle/:legacyBattleNumber" element={<LegacyBattleRedirect />} />
          <Route path="/bridge/:bridgeId" element={<LegacyBridgeRedirect />} />
          <Route path="/resolution" element={<Navigate to={`/e/${LEGACY_EPISODE_ID}/resolution`} replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
