# DLXStudios.ai - AI Web Development Studio

🎨 An intelligent web development studio running locally on LuxRig, powered by AI and LM Studio.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- LM Studio running on \http://127.0.0.1:1234\

### Installation

\\\ash
# Clone and install
npm install

# Start both backend and frontend
npm run dev

# Or start individually:
npm run dev:backend    # Port 5000
npm run dev:frontend   # Port 3000
\\\

### Access
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Backend Health**: http://localhost:5000/health

## 📋 Architecture

\\\
┌─────────────────────────────────────┐
│   DLXStudios.ai Frontend (Next.js)  │
│         Port 3000                   │
│                                     │
│  • Chat Interface                   │
│  • Live Preview                     │
│  • Code Viewer                      │
│  • Export Tools                     │
└────────────┬────────────────────────┘
             │ /api/*
             ↓
┌─────────────────────────────────────┐
│   Backend API (Express + TS)        │
│         Port 5000                   │
│                                     │
│  • Chat Proxy                       │
│  • Website Generation               │
│  • LM Studio Integration            │
└────────────┬────────────────────────┘
             │ HTTP
             ↓
┌─────────────────────────────────────┐
│   LM Studio (Local LLM)             │
│   Port 1234 (Qwen-4b Model)        │
└─────────────────────────────────────┘
\\\

## 📁 Project Structure

\\\
dlxstudios-ai/
├── apps/
│   ├── backend/              # Express.js API server
│   │   ├── src/
│   │   │   └── index.ts     # Main server + endpoints
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/             # Next.js React app
│       ├── app/
│       │   ├── page.tsx      # Main chat/preview UI
│       │   ├── layout.tsx
│       │   ├── globals.css
│       │   └── page.module.css
│       ├── public/
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   └── shared/               # Shared types
│       └── index.ts
├── package.json              # Root workspace
└── .gitignore
\\\

## 🔧 Development

### Available Scripts

\\\ash
npm run build           # Build all projects
npm run dev            # Run both backend & frontend
npm run dev:backend    # Run backend only (watch mode)
npm run dev:frontend   # Run frontend only (dev server)
npm test               # Run all tests
\\\

### Environment Variables

**Backend (.env)**:
- \PORT=5000\ - Server port
- \LM_STUDIO_URL=http://127.0.0.1:1234\ - LM Studio endpoint
- \NODE_ENV=development\ - Environment

## 📡 API Endpoints

### \GET /health\
Health check endpoint
\\\ash
curl http://localhost:5000/health
\\\

### \POST /api/chat\
Multi-turn chat with LM Studio
\\\ash
curl -X POST http://localhost:5000/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"role": "user", "content": "What is React?"}
    ]
  }'
\\\

### \POST /api/generate-website\
Generate website code from prompt
\\\ash
curl -X POST http://localhost:5000/api/generate-website \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Create a modern portfolio website"}'
\\\

## 🎯 Current Status

✅ **Completed**:
- Monorepo structure (npm workspaces)
- Express backend with LM Studio proxy
- Next.js frontend with chat interface
- Local development setup
- GitHub repository initialization

⏳ **In Progress**:
- Website export functionality
- Code viewer component
- Advanced animations (post-MVP)

🔜 **Planned**:
- Domain routing (DLXStudios.ai → LuxRig IP)
- Claude API integration
- Multiple model selection
- Advanced animation components
- Crypto trading signals integration
- Content generation automation

## 🌐 Deployment

### Local Development
Currently running on localhost with hot reload support for rapid development.

### Future: Domain Deployment
Once LuxRig has a static IP:
1. Configure DLXStudios.ai DNS A record to LuxRig IP
2. Set up port forwarding (80/443 → 3000/5000)
3. Deploy frontend + backend on LuxRig
4. Run 24/7 for passive income generation

## 🤝 Contributing

This is a personal project. Contributions welcome via pull requests.

## 📝 License

MIT

---

**Built with**: TypeScript • React • Next.js • Express • LM Studio
