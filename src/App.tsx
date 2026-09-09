import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import SetupScene from "./scenes/SetupScene";
import ResolutionScene from "./scenes/ResolutionScene";
import StoryBridge from "./scenes/StoryBridge";
import Battle1_Label from "./battles/Battle1_Label";
import Battle2_Match from "./battles/Battle2_Match";
import Battle3_Scenario from "./battles/Battle3_Scenario";

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SetupScene />} />
          <Route path="/battle/1" element={<Battle1_Label />} />
          <Route path="/bridge/:bridgeId" element={<StoryBridge />} />
          <Route path="/battle/2" element={<Battle2_Match />} />
          <Route path="/battle/3" element={<Battle3_Scenario />} />
          <Route path="/resolution" element={<ResolutionScene />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
