import React, { useState } from "react";
import "./ChatAgentWidget.css";
import { useAuth } from "../context/AuthContext"; // ✅ Proper import

export default function ChatAgentWidget() {
  const auth = useAuth(); // ✅ Fallback protection
  const role = auth?.role || "guest";

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const roleGreeting = {
    guest: "👋 Welcome to WSRN. With us, you are seen and respected. We’re here to guide you through our global maritime services.",
    seafarer: "⚓ Welcome aboard, Seafarer. With us, your skills matter and your journey is valued. Let’s help you connect to your next opportunity.",
    agency: "🏢 Greetings, Agency partner. You’re a vital part of this ecosystem, and we’re here to support your talent management with respect.",
    shipping: "🚢 Hello Shipping Company rep — your crewing needs deserve thoughtful attention. WSRN is proud to assist.",
    admin: "🔒 Welcome Admin. We appreciate your oversight. Together, we keep every crew member visible and respected.",
    training: "🎓 Hello Training Center. Your mission shapes future journeys. Let’s work together to connect and uplift learners worldwide."
  };

  const initialMessage = { from: "bot", text: roleGreeting[role] };
  const [messages, setMessages] = useState([initialMessage]);

  const toggleChat = () => setIsOpen(prev => !prev);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const lowerInput = input.toLowerCase();

    let botReply = {
      from: "bot",
      text: "🌍 Thank you. With WSRN, you are our priority. Every crew member deserves to be seen and supported. How can I assist further?"
    };

    if (lowerInput.includes("register")) {
      botReply.text = "🔗 You can start registration at /register/seafarer, /register/agency, or /register/shipping. With us, every maritime journey is honored.";
    } else if (lowerInput.includes("services") || lowerInput.includes("what is wsrn")) {
      botReply.text = "🌐 WSRN is a global recruitment network connecting seafarers, shipping companies, agencies, and training centers with care, security, and purpose.";
    } else if (lowerInput.includes("match") || lowerInput.includes("job")) {
      botReply.text = "🧭 Our matching system leaves no seafarer behind. Whether you're linked to an agency or not, we’ll help find your next opportunity.";
    } else if (lowerInput.includes("training")) {
      botReply.text = "🎓 We guide seafarers toward trusted training centers to help build skills and open new doors — because your growth matters to us.";
    }

    setMessages(prev => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle" onClick={toggleChat}>
        💬 <span className="chat-label">Chat with us</span>
      </button>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            WSRN Assistant
            <button className="chat-close" onClick={toggleChat}>✖</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

