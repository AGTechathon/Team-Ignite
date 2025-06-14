import React, { useState } from 'react';

const VoiceChat = () => {
  const [text, setText] = useState('');
  const [reply, setReply] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        🎙️ Start Your Health Chat
      </h2>

      <p className="text-gray-600 text-center text-sm mb-6">
        Speak or type your symptoms in your native language (e.g., Marathi, Hindi, Tamil).
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="उदा. मला छातीत दुखतंय, काय करू?"
        className="w-full h-28 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        🔍 Get Health Advice
      </button>

      {reply && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-medium text-green-800 mb-2">💡 Response:</h3>
          <p className="text-gray-800 whitespace-pre-line">{reply}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceChat;
