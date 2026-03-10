export default function generateSessionId() {

    return `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}