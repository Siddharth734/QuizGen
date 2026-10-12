import { Router } from "express";
import {
  getChatResponse,
  streamChatResponse,
} from "../services/llmService.js";
import { getSession } from "../services/sessionService.js";

const router = Router();

function validateChatRequest(req, res) {
  const { session_id: sessionId, message } = req.body ?? {};
  if (typeof sessionId !== "string" || !sessionId.trim()) {
    res.status(400).json({ detail: "session_id must be a non-empty string" });
    return null;
  }
  if (typeof message !== "string" || !message.trim()) {
    res.status(400).json({ detail: "message must be a non-empty string" });
    return null;
  }
  if (sessionId.length > 200 || message.length > 20000) {
    res.status(413).json({ detail: "Request is too large" });
    return null;
  }
  return { sessionId, message };
}

router.post("/chat", async (req, res, next) => {
  const input = validateChatRequest(req, res);
  if (!input) return;
  try {
    const reply = await getChatResponse(input.sessionId, input.message);
    res.json({
      session_id: input.sessionId,
      reply,
      history: getSession(input.sessionId),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/chat/stream", async (req, res, next) => {
  const input = validateChatRequest(req, res);
  if (!input) return;

  res.status(200);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  try {
    for await (const token of streamChatResponse(input.sessionId, input.message)) {
      if (res.destroyed) return;
      res.write(token);
    }
    res.end();
  } catch (error) {
    if (!res.headersSent) return next(error);
    console.error("Chat stream failed:", error?.message || error);
    res.end("\n[ERROR]: The model could not complete this response.");
  }
});

export default router;
