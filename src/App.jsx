import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VoiceChat from './components/setsection/VoiceChat';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/voice-chat" element={<VoiceChat />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
