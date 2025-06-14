import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VoiceChat from "./components/VoiceChat";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/voice-chat" element={<VoiceChat />} />
      </Routes>
    </div>
  );
};

export default App;
