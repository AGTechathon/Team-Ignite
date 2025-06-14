import React, { useState, useRef } from 'react';

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const startRecording = async () => {
    try {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError('Speech recognition is not supported in your browser.');
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Error with speech recognition. Please try again.');
      };

      // Start speech recognition
      recognitionRef.current.start();

      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError('');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Error accessing microphone. Please make sure you have granted microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob) => {
    setIsLoading(true);
    setError('');
    try {
      // Send transcript to backend
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: transcript }),
      });

      const data = await res.json();
      setReply(data.reply);
      
      // Convert AI response to speech
      const speech = new SpeechSynthesisUtterance(data.reply);
      window.speechSynthesis.speak(speech);
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        🎙️ Start Your Health Chat
      </h2>

      <p className="text-gray-600 text-center text-sm mb-6">
        Speak or type your symptoms in your native language (e.g., Marathi, Hindi, Tamil).
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={startRecording}
          disabled={isRecording || isLoading}
          className={`px-6 py-3 rounded-lg font-semibold ${
            isRecording || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          Start Recording
        </button>
        
        <button
          onClick={stopRecording}
          disabled={!isRecording || isLoading}
          className={`px-6 py-3 rounded-lg font-semibold ${
            !isRecording || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          } text-white transition-colors`}
        >
          Stop Recording
        </button>
      </div>

      {isLoading && (
        <div className="text-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Processing...</p>
        </div>
      )}

      {transcript && (
        <div className="mb-4">
          <h3 className="font-medium text-green-800 mb-2">Your Message:</h3>
          <p className="bg-gray-50 p-4 rounded-lg">{transcript}</p>
        </div>
      )}

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
