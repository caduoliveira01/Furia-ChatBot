import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatMessage from "./components/ChatMessage";
import furiaLogo from "/furia-logo.png";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Olá! Sou o FURIA Assistant. Pergunte sobre o time, jogadores, títulos ou curiosidades!",
      sender: "bot",
      icon: furiaLogo,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://furia-chatbot-3dxa.onrender.com/api/chat",
        {
          message: input,
        }
      );

      const botMessage = {
        text: response.data.reply,
        sender: "bot",
        icon: furiaLogo,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "⚠️ Erro ao conectar com o servidor. Tente novamente.",
        sender: "bot",
        icon: furiaLogo,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <a
          href="https://instagram.com/furiagg"
          target="_blank"
          rel="noopener noreferrer"
          className="logo-link"
        >
          <img src={furiaLogo} alt="FURIA Logo" className="main-logo" />
        </a>
        <h1>FURIA Assistant</h1>
      </header>

      <div className="chat-container">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg.text}
            sender={msg.sender}
            icon={msg.icon}
            loading={msg.loading}
          />
        ))}
        {loading && (
          <ChatMessage message="..." sender="bot" icon={furiaLogo} loading />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pergunte sobre a FURIA..."
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </div>

      <a
        href="https://www.linkedin.com/in/carlos-oliveira-338a04233/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="24px"
          height="24px"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
