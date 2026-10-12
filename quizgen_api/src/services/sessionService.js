// In-memory session store, matching the original Python implementation.
// Sessions will be lost when the process restarts and are not shared across instances.
const sessions = new Map();

export function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  return sessions.get(sessionId);
}

export function appendMessage(sessionId, role, content) {
  getSession(sessionId).push({ role, content });
}

export function deleteSession(sessionId) {
  return sessions.delete(sessionId);
}

export function listSessions() {
  return [...sessions.keys()];
}
