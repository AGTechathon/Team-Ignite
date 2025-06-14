import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import http from 'http';
import { WebSocket } from 'ws';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON body

app.use('/api/users', userRoutes);

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server for client connections
const wss = new WebSocketServer({ server });

// Gemini WebSocket connection
let geminiWs = null;
const connectToGemini = async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return;
    }

    const uri = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
    
    geminiWs = new WebSocket(uri);
    
    geminiWs.on('open', () => {
      console.log('Connected to Gemini');
      geminiWs.send(JSON.stringify({
        setup: {
          model: "models/gemini-2.0-flash-exp"
        }
      }));
    });

    geminiWs.on('message', (data) => {
      try {
        const response = JSON.parse(data);
        // Forward Gemini's response to the client
        if (wss.clients.size > 0) {
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(response));
            }
          });
        }
      } catch (error) {
        console.error('Error processing Gemini response:', error);
      }
    });

    geminiWs.on('error', (error) => {
      console.error('Gemini WebSocket error:', error);
      // Notify all connected clients about the error
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            error: 'Error connecting to Gemini API. Please check your API key and quota.'
          }));
        }
      });
    });

    geminiWs.on('close', (code, reason) => {
      console.log('Gemini connection closed:', code, reason.toString());
      // Check if it's a quota error
      if (reason.toString().includes('quota')) {
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              error: 'API quota exceeded. Please check your Gemini API usage and billing.'
            }));
          }
        });
      }
      // Try to reconnect after 5 seconds
      setTimeout(connectToGemini, 5000);
    });
  } catch (error) {
    console.error('Error connecting to Gemini:', error);
    setTimeout(connectToGemini, 5000);
  }
};

// Connect to Gemini when server starts
connectToGemini();

// Handle client WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    try {
      if (message instanceof Buffer) {
        // Check if Gemini is connected before sending
        if (!geminiWs || geminiWs.readyState !== WebSocket.OPEN) {
          ws.send(JSON.stringify({
            error: 'Not connected to Gemini API. Please try again in a few seconds.'
          }));
          return;
        }

        // Forward audio data to Gemini
        geminiWs.send(JSON.stringify({
          realtime_input: {
            media_chunks: [{
              data: message.toString('base64'),
              mime_type: "audio/pcm"
            }]
          }
        }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        error: 'Error processing your message'
      }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});
