import { useState} from 'react'
import generateSessionId from "./utils/generateSessionId"
import Navbar from "./components/layout/Navbar"
import InputBar from "./components/layout/InputBar"
import ChatContainer from "./components/chat/ChatContainer"

const API_LINK = "http://localhost:8000"

export default function App() {
  const [sessionId] = useState(generateSessionId);
}