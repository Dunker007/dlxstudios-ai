import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const LM_STUDIO_URL = process.env.LM_STUDIO_URL || "http://127.0.0.1:1234";
const DEMO_MODE = process.env.LM_STUDIO_URL === "undefined" || process.env.NODE_ENV === "production";

app.use(cors());
app.use(express.json());

// Serve frontend static files
const frontendPath = path.join(__dirname, "../../frontend/out");
app.use(express.static(frontendPath));

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    lmStudioAvailable: !DEMO_MODE,
    environment: process.env.NODE_ENV || "development"
  });
});

// LM Studio proxy - chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    let response;
    try {
      const lmUrl = `${LM_STUDIO_URL}/v1/chat/completions`;
      response = await Promise.race([
        fetch(lmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "local-model",
            messages,
            temperature: 0.7,
            max_tokens: 2000,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        ),
      ]);

      const data = await (response as Response).json();
      res.json(data);
    } catch (lmError) {
      console.warn("LM Studio unavailable, using demo response");
      res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: "Demo Response: LM Studio is currently unavailable. Please configure LM_STUDIO_URL environment variable or connect your local LM Studio instance.",
            },
          },
        ],
      });
    }
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

// Generate website prompt
app.post("/api/generate-website", async (req, res) => {
  try {
    const { prompt } = req.body;

    try {
      const lmUrl = `${LM_STUDIO_URL}/v1/chat/completions`;
      const response = await Promise.race([
        fetch(lmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "local-model",
            messages: [
              {
                role: "system",
                content: "You are an expert HTML/CSS/JavaScript developer. Generate complete, working website code. Return ONLY valid HTML/CSS/JS code wrapped in a code block.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.5,
            max_tokens: 4000,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        ),
      ]);

      const data = await (response as Response).json();
      res.json(data);
    } catch (lmError) {
      console.warn("LM Studio unavailable for generation");
      const demoHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
    .demo { background: #f0f0f0; padding: 20px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="demo">
    <h1>Demo Website</h1>
    <p>LM Studio is offline. Connect your local LM Studio to generate real websites.</p>
  </div>
</body>
</html>`;
      
      res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: demoHtml,
            },
          },
        ],
      });
    }
  } catch (error) {
    console.error("Website generation error:", error);
    res.status(500).json({ error: "Failed to generate website" });
  }
});

// Serve frontend index.html for all other routes (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`LM Studio configured: ${LM_STUDIO_URL}`);
  console.log(`Mode: ${DEMO_MODE ? "DEMO" : "LIVE"}`);
});
