import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const LM_STUDIO_URL = process.env.LM_STUDIO_URL || 'http://127.0.0.1:1234';

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// LM Studio proxy - chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(\/v1/chat/completions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('LM Studio error:', error);
    res.status(500).json({ error: 'Failed to reach LM Studio' });
  }
});

// Generate website prompt
app.post('/api/generate-website', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(\/v1/chat/completions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model',
        messages: [
          {
            role: 'system',
            content: 'You are an expert HTML/CSS/JavaScript developer. Generate complete, working website code. Return ONLY valid HTML/CSS/JS code wrapped in a code block.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Website generation error:', error);
    res.status(500).json({ error: 'Failed to generate website' });
  }
});

app.listen(PORT, () => {
  console.log(\🚀 DLXStudios Backend running on http://localhost:\\);
  console.log(\📡 Connected to LM Studio: \\);
});
