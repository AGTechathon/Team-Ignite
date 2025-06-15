import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './components/LandingPage';
import VoiceChat from './components/VoiceChat';
import OfflineChat from './components/OfflineChat';
import PersonalAssistant from './components/PersonalAssistant';
import Scheme from "./components/Scheme";
import HospitalCall from './components/HospitalCall';
import './App.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/voice-chat" element={<VoiceChat />} />
            {/* <Route path="/voice-chat" element={<Symptom />} /> */}
            <Route path="/assistant" element={<PersonalAssistant />} />
            <Route path="/schemes" element={<Scheme />} />
            <Route path="/offlineChat" element={<OfflineChat />} />
            <Route path="/hospital-call" element={<HospitalCall />} />
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
