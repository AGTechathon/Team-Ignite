import React, { useState } from 'react';

const VoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setError('');
      // Add your recording logic here
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Error starting recording. Please try again.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Add your stop recording logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Voice Chat with Gemini AI</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-8">
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        )}

        {transcript && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Your Message:</h2>
            <p className="bg-gray-50 p-4 rounded-lg">{transcript}</p>
          </div>
        )}

        {aiResponse && (
          <div>
            <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
            <p className="bg-blue-50 p-4 rounded-lg">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceChat; 