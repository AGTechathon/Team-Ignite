import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<div>Chat Page Coming Soon...</div>} />
    </Routes>
  );
};

export default App;
