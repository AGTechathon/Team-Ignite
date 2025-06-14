import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './components/LandingPage';
import VoiceChat from './components/VoiceChat';
import PersonalAssistant from './components/PersonalAssistant';
import './App.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/voice-chat" element={<VoiceChat />} />
            <Route path="/assistant" element={<PersonalAssistant />} />
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
