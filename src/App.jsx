import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SymptomAnalysisPage from "./components/SymptomAnalysisPage";
import './App.css'; // Keep global styles

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<div>Chat Page Coming Soon...</div>} />
      <Route path="/symptom-analysis" element={<SymptomAnalysisPage />} />
    </Routes>
  );
};

export default App;
