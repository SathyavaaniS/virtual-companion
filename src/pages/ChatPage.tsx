
import { useState } from "react";
import {
  Heart, Send, Sparkles, Bot, User, RotateCcw,
  Wind, BookHeart, ListTodo, ShieldCheck
} from "lucide-react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const suggestions = [
  { label: "I'm feeling overwhelmed", icon: Wind },
  { label: "Help me organise my day", icon: ListTodo },
  { label: "I need a little encouragement", icon: Heart },
  { label: "Let's reflect on my day", icon: BookHeart },
];

function getDemoReply(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("overwhelmed") || text.includes("stress") || text.includes("anxious")) {
    return "That sounds like a lot to carry right now. 💜 You don't have to solve everything at once. Try taking one slow breath, relaxing your shoulders, and choosing just one small thing to focus on. Would you like to tell me what's feeling most difficult?";
  }

  if (text.includes("sad") || text.includes("lonely") || text.includes("low")) {
    return "I'm glad you reached out. You don't need to pretend everything is okay here. Sometimes it helps to name what we're feeling before trying to change it. What has today been like for you? We can take this one step at a time. 💜";
  }

  if (text.includes("day") || text.includes("organ") || text.includes("task") || text.includes("productive")) {
    return "Let's make today feel a little more manageable. ✨ Write down everything on your mind, choose the one task that matters most, and break it into a ten-minute first step. What are the top two or three things you'd like to get done?";
  }

  if (text.includes("encourage") || text.includes("motivat") || text.includes("confidence")) {
    return "A gentle reminder: progress doesn't have to be dramatic to be real. The small things you keep showing up for matter, too. You are allowed to learn as you go, rest when you need to, and begin again. What's one small win you can give yourself credit for today? 🌱";
  }

  if (text.includes("reflect") || text.includes("journal") || text.includes("grateful")) {
    return "Let's pause and reflect together. 🌿 Think about three things: What felt difficult today? What brought you even a little comfort? And what is one thing you'd like to do differently tomorrow? You can share whichever question feels right.";
  }

  return "Thank you for sharing that with me. 💜 Let's take it at your pace. What feels most important about this for you right now? We can explore it together and look for one small, manageable next step.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi there! 💜 I'm your Virtual Companion. This is your space to pause, untangle your thoughts, or plan a gentler day. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState("");

  function sendMessage(value = input) {
    const trimmed = value.trim();
    if (!trimmed) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: trimmed },
      { role: "assistant", text: getDemoReply(trimmed) },
    ]);
    setInput("");
  }

  function resetChat() {
    setMessages([
      {
        role: "assistant",
        text: "Welcome back. 💜 We can start fresh. What would you like to talk about today?",
      },
    ]);
  }

  return (
    <div className="chat-page">
      <header className="chat-heading">
        <div>
          <div className="eyebrow"><Sparkles size={15} /> YOUR PERSONAL SPACE</div>
          <h1>AI Companion</h1>
          <p>A little understanding can make a difficult day feel lighter.</p>
        </div>
        <button className="chat-reset" onClick={resetChat} title="Start a new conversation">
          <RotateCcw size={16} /> <span>New chat</span>
        </button>
      </header>

      <div className="chat-disclaimer">
        <ShieldCheck size={17} />
        <span>Demo mode · Responses are generated from example conversation rules, not a live AI model.</span>
      </div>

      <section className="chat-panel">
        <div className="chat-messages" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`message-row ${message.role}`} key={index}>
              <div className={`message-avatar ${message.role}`}>
                {message.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className="message-content">
                <span className="message-author">
                  {message.role === "assistant" ? "Virtual Companion" : "You"}
                </span>
                <div className="message-bubble">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        {messages.length === 1 && (
          <div className="chat-suggestions">
            <p>Not sure where to start? Try one of these.</p>
            <div className="suggestion-grid">
              {suggestions.map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => sendMessage(label)} className="suggestion-chip">
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <form className="chat-composer" onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Share what's on your mind..."
            aria-label="Your message"
            maxLength={2000}
          />
          <button type="submit" disabled={!input.trim()} aria-label="Send message">
            <Send size={18} />
          </button>
        </form>
        <p className="chat-footnote"><Heart size={12} /> Take your time. You can share as much or as little as you like.</p>
      </section>

      <div className="chat-bottom-note">
        Virtual Companion supports reflection and everyday wellbeing. It isn't a therapist or emergency service.
      </div>
    </div>
  );
}
