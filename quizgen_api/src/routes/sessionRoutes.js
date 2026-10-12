import { Router } from "express";
import {
  deleteSession,
  getSession,
  listSessions,
} from "../services/sessionService.js";

const router = Router();

router.get("/session/:session_id", (req, res) => {
  const { session_id: sessionId } = req.params;
  const history = getSessionIfExists(sessionId);
  if (!history) {
    return res.status(404).json({
      detail: `Session '${sessionId}' not found`,
    });
  }
  res.json({ session_id: sessionId, history });
});

router.delete("/session/:session_id", (req, res) => {
  const { session_id: sessionId } = req.params;
  if (!deleteSession(sessionId)) {
    return res.status(404).json({
      detail: `Session '${sessionId}' was not found`,
    });
  }
  res.json({ message: `Session '${sessionId}' deleted successfully` });
});

router.get("/sessions", (_req, res) => {
  res.json({ sessions: listSessions() });
});

// Look up without creating a new session as a side effect.
function getSessionIfExists(sessionId) {
  const knownSessions = listSessions();
  return knownSessions.includes(sessionId) ? getSession(sessionId) : null;
}

export default router;
