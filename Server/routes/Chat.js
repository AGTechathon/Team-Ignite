import express from 'express';
import { getChatReply } from '../utils/geminiClient.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const reply = await getChatReply(prompt);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Gemini failed to respond' });
  }
});

export default router;
