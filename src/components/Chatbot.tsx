'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are ELSALI LOGISTICS AI Assistant. You help customers with:
- Getting freight quotes and transportation information
- Vehicle types: Mini/Dost, Tata Pickup, 14ft, 17ft, 20ft, 24ft, 26ft, 32ft SXL/MXL
- Services: LCV, HCV, FTL, PTL, Container, Express Freight, Dedicated Vehicle, Industrial transport
- Pan-India coverage: North, South, East, West, Central India
- Contact: Phone 6369844820, Email elshalilogistics@gmail.com
- GSTIN: 33DQAPA3611N1Z8
- Contact Person: C. ARUN KUMAR
Be helpful, professional, and concise. Always guide customers to call 6369844820 or use the quote form for specific pricing.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello! 👋 Welcome to ELSALI LOGISTICS. How can I help you today? I can assist with freight quotes, vehicle information, route details, and more.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Dismiss the pulse animation after first open
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const handleSendText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${trimmed}\nAssistant:`;
      const encodedPrompt = encodeURIComponent(fullPrompt);
      const res = await fetch(
        `https://chatbot.codexapi.workers.dev/?prompt=${encodedPrompt}&model=gpt-5.1`
      );
      const data = await res.json();

      const answerText =
        data?.answer ||
        data?.response ||
        data?.message ||
        (typeof data === 'string' ? data : '') ||
        'I apologize, I could not process your request. Please call us at 6369844820 or use the quote form for immediate assistance.';

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: answerText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting right now. Please call us directly at 6369844820 or email elshalilogistics@gmail.com for immediate assistance.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    handleSendText(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    'Get a freight quote',
    'Vehicle types available',
    'Service areas',
    'Contact details',
  ];

  return (
    <>
      {/* Floating toggle button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''} ${showPulse ? 'pulse' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageSquare size={24} />
            <span className="chatbot-toggle-badge">AI</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="chatbot-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="AI Chat Assistant"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <Sparkles size={18} />
            </div>
            <div className="chatbot-header-info">
              <h3>ELSALI AI Assistant</h3>
              <span className="chatbot-status">
                <span className="chatbot-status-dot" />
                Online
              </span>
            </div>
            <button
              className="chatbot-header-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="chatbot-message-avatar">
                  {msg.role === 'assistant' ? (
                    <Bot size={14} />
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <div className="chatbot-message-bubble">
                  <p>{msg.content}</p>
                  <span className="chatbot-message-time">
                    {msg.timestamp.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-message assistant">
                <div className="chatbot-message-avatar">
                  <Bot size={14} />
                </div>
                <div className="chatbot-message-bubble typing">
                  <div className="chatbot-typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions (only show when few messages) */}
          {messages.length <= 1 && !isLoading && (
            <div className="chatbot-quick-actions">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="chatbot-quick-btn"
                  onClick={() => handleSendText(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Ask about our services..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button
              className="chatbot-send"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? <Loader2 size={16} className="chatbot-spin" /> : <Send size={16} />}
            </button>
          </div>

          {/* Powered by */}
          <div className="chatbot-footer">
            Powered by ELSALI LOGISTICS AI
          </div>
        </div>
      )}
    </>
  );
}
