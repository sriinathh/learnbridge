// ChatbotWindow.jsx
import React, { useState } from 'react';
import { chatbotMessage } from '../../api/aiApi.js';

const ChatbotWindow = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setText('');
    setLoading(true);
    try {
      const { data } = await chatbotMessage(userMsg.content);
      const botMsg = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      alert('Chat failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[420px] flex-col rounded-2xl border border-slate-800 bg-slate-900/80 text-xs">
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-lg px-3 py-2 ${
              m.role === 'user'
                ? 'ml-auto bg-indigo-500 text-white'
                : 'mr-auto bg-slate-800 text-slate-100'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="text-[11px] text-slate-400">LearnBuddy is typing...</p>}
      </div>
      <div className="flex gap-2 border-t border-slate-800 p-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          className="flex-1 rounded-md bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-indigo-500"
          placeholder="Ask LearnBuddy anything..."
        />
        <button
          onClick={send}
          disabled={loading}
          className="rounded-md bg-indigo-500 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;