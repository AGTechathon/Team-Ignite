import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceChat = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const recognitionRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectWebSocket = () => {
    try {
      wsRef.current = new WebSocket('ws://localhost:8000');

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error. Please make sure the server is running.');
      };

      wsRef.current.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          if (response.error) return setError(response.error);
          if (response.text) {
            setAiText(response.text);
            setMessages(prev => [...prev, { type: 'bot', text: response.text }]);
          }
          if (response.audio) playAudio(response.audio);
        } catch (error) {
          console.error('Processing error:', error);
          setError('Error processing server response');
        }
      };
    } catch (error) {
      console.error('WebSocket creation error:', error);
      setError('Failed to connect to server');
    }
  };

  useEffect(() => {
    connectWebSocket();

    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
        setUserText(transcript);
      };
    }

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (recognitionRef.current) recognitionRef.current.stop();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  const startRecording = async () => {
    if (!isConnected) return setError('Not connected to server. Please wait...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(e.data);
        }
      };
      mediaRecorderRef.current.start(100);
      setIsListening(true);
      setUserText('');
      setAiText('');
      recognitionRef.current?.start();
      setMessages(prev => [...prev, { type: 'user', text: 'Listening...' }]);
    } catch (error) {
      console.error('Mic error:', error);
      setError('Error accessing mic. Check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
      recognitionRef.current?.stop();
      setMessages(prev => [...prev, { type: 'user', text: userText }]);
    }
  };

  const playAudio = async (audioData) => {
    try {
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        await fetch(`data:audio/wav;base64,${audioData}`).then(r => r.arrayBuffer())
      );
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start();
      setIsProcessing(false);
    } catch (error) {
      console.error('Audio play error:', error);
      setError('Audio playback failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Voice Chat with Gemini</h1>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>}
        {!isConnected && <div className="bg-yellow-100 text-yellow-700 p-2 rounded mb-2">Connecting to server...</div>}

        <div className="flex flex-col gap-2 min-h-[300px] max-h-[400px] overflow-y-auto bg-gray-50 p-2 rounded mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg p-2 text-white max-w-[70%] ${msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <textarea className="w-full p-2 border rounded mb-2" value={userText} readOnly rows={2} placeholder="Your Speech" />
        <textarea className="w-full p-2 border rounded mb-4" value={aiText} readOnly rows={2} placeholder="AI Response" />

        <div className="flex justify-center gap-4">
          <button
            onClick={isListening ? stopRecording : startRecording}
            disabled={!isConnected || isProcessing}
            className={`px-4 py-2 rounded text-white flex items-center gap-2 ${isListening ? 'bg-red-500' : 'bg-blue-600'} disabled:opacity-50`}
          >
            {isListening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
            {isListening ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
