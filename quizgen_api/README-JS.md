# QuizGen API (JavaScript conversion)

This is a JavaScript/Node.js + Express conversion of the original `quizgen_api` Python/FastAPI backend. It keeps the existing endpoint names and response fields so the current frontend can continue using it.

## Requirements

- Node.js 18+
- An API key for a supported model provider

## Setup

From the repository root:

```bash
cd quizgen_api
npm install
```

Copy `.env.example` to `.env` and set `API_KEY`, `LLM_MODEL`, `LLM_PROVIDER`, `ALLOWED_ORIGINS`, and optionally `PORT`.

Example for Groq:

```env
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile
API_KEY=your_groq_api_key
ALLOWED_ORIGINS=https://quizgen-v1.vercel.app,http://localhost:5173
PORT=10000
```

Start the API:

```bash
npm run dev
```

## API endpoints

- `GET /` — API status and version.
- `GET /health` — health check.
- `POST /chat` — accepts `{ "session_id": "...", "message": "..." }`; returns `session_id`, `reply`, and `history`.
- `POST /chat/stream` — same request payload; streams plain-text model output.
- `GET /session/:session_id` — fetch a session history.
- `DELETE /session/:session_id` — delete a session.
- `GET /sessions` — list session IDs.

## Important behavior

Session data remains in a process-local `Map`, as in the original Python backend. It disappears on restart and is not shared between multiple server instances. Use Redis or a database for production-scale session persistence.

The stream endpoint deliberately stays plain text for compatibility with the existing frontend. It does not switch to SSE.

This conversion supports the Groq and OpenAI providers. The Python implementation used LangChain's generic model initializer, so other providers require adding their provider package and corresponding factory branch.

The original FastAPI service is retained alongside this JavaScript version. To switch deployments, point the backend start command at `quizgen_api` and set the environment variables in the deployment platform. Do not commit your real `.env` or API key.
