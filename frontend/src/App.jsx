import { useState } from 'react'
import generateSessionId from "./utils/generateSessionId"
import Navbar from "./components/layout/Navbar"
import InputBar from "./components/layout/InputBar"
import ChatContainer from "./components/chat/ChatContainer"

const API_LINK = "http://localhost:8000"

export default function App() {
  const [sessionId] = useState(generateSessionId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages(prev => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "", streaming: true },
    ]);
    setLoading(true);

    try {
      const res = await fetch(`${API_LINK}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: text })
      })

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true })
        setMessages(prev => prev.map((m, i) => (
          (i === prev.length - 1) ? { ...m, content: full } : m
        )));
      }

      setMessages(prev => prev.map((m, i) => (
        (i === prev.length - 1) ? { ...m, streaming: false } : m
      )));

    }

    catch (error) {

      setMessages(prev => prev.map((m, i) => (
        (i === prev.length - 1) ? { ...m, content: `ERROR: ${error.message}`, streaming: false } : m
      )));

    }

    finally {
      setLoading(false);
    }
  }

  async function clearSession() {
    try {
      await fetch(`${API_LINK}/session/${sessionId}`, {
        method: "DELETE"
      });
    } catch { }

    setMessages([]);
  }

  return (
    <div className='flex flex-col h-screen bg-black overflow-hidden'>
      <Navbar sessionId={sessionId} onReset={clearSession}/>
      <ChatContainer messages={messages} onTopicSelect={setInput}/>
      <InputBar input={input} loading={loading} onChange={setInput} onSubmit={sendMessage}/>
    </div>
  );
}