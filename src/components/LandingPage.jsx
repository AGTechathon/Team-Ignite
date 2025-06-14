import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Arogyaa.AI 👩‍⚕️</h1>
      <p>Your multilingual rural health assistant</p>
      <button onClick={() => navigate("/chat")}>Start Health Chat</button>
    </div>
  );
};

export default LandingPage;
