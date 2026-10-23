'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Phone,
  Mail,
  RotateCcw,
  FileText,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useQuote } from './QuoteProvider';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasQuotePrompt?: boolean;
}

const SYSTEM_PROMPT = `You are ELSALI LOGISTICS AI Assistant. ELSALI LOGISTICS provides professional road transportation solutions across North India, South India, and Pan-India.

Key Facts:
- Managing Director / Contact Person: C. ARUN KUMAR
- Primary Phone & WhatsApp: 6369844820
- Additional Phone Numbers: 8667049878, 8610814831, 9667225840, 9442444820
- Email: elshalilogistics@gmail.com
- GSTIN: 33DQAPA3611N1Z8
- Location: Coimbatore, Tamil Nadu, India (with Pan-India transport network)
- Vehicles: Mini/Dost (1.5-2.5 Ton), Tata Pickup / 407 (2.5-3.5 Ton), 14 Ft (4-5 Ton), 17 Ft (6-7 Ton), 20 Ft (8-10 Ton), 24 Ft (10-12 Ton), 26 Ft (12-15 Ton), 32 Ft SXL/MXL (15-25 Ton)
- Services: LCV & HCV transport, Full Truck Load (FTL), Part Load (PTL), Regular & Dedicated Vehicle Placement, Industrial & Machinery transport, Door-to-Door delivery.

Tone Instructions:
- Format responses with clean paragraphs and line breaks.
- When sharing phone or email, place them on separate lines.
- Be courteous, professional, and concise. Encourage customers to use the quote button or call 6369844820.`;

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Hello! 👋 Welcome to ELSALI LOGISTICS.\n\nHow can I help you today? I can assist with freight quotes, vehicle capacities, transport routes, and dispatch details.',
  timestamp: new Date(),
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { openQuote } = useQuote();

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

  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const handleReset = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        timestamp: new Date(),
      },
    ]);
  };

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

      let answerText =
        data?.answer ||
        data?.response ||
        data?.message ||
        (typeof data === 'string' ? data : '') ||
        'I apologize, I could not process your request. Please call us at 6369844820 or use the quote form for immediate assistance.';

      // Clean up common joined strings like "Phone: 6369844820 Email: elshalilogistics@gmail.com"
      answerText = answerText
        .replace(/Phone:\s*(\d{10})\s*Email:/gi, 'Phone: $1\nEmail:')
        .replace(/Email:\s*([^\s]+)\s*Phone:/gi, 'Email: $1\nPhone:');

      const isQuoteRelated =
        /quote|price|pricing|rate|freight|cost|booking|book|vehicle|placement|transport/i.test(
          trimmed + ' ' + answerText
        );

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: answerText,
        timestamp: new Date(),
        hasQuotePrompt: isQuoteRelated,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting right now.\n\nPlease call us directly at 6369844820 or email elshalilogistics@gmail.com for immediate dispatch assistance.",
          timestamp: new Date(),
          hasQuotePrompt: true,
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
    'Vehicle types & capacities',
    'Pan-India routes & hubs',
    'Contact details & phone',
  ];

  const renderFormattedMessage = (msg: ChatMessage) => {
    const lines = msg.content.split('\n').filter((l) => l.trim().length > 0);

    return (
      <div className="chatbot-message-body">
        {lines.map((line, idx) => {
          // Check for phone number
          const hasPhone = /6369844820|8667049878|8610814831|9667225840|9442444820/.test(line);
          const hasEmail = /elshalilogistics@gmail.com/.test(line);
          const hasGst = /33DQAPA3611N1Z8/.test(line);

          return (
            <p key={idx} className="chatbot-line">
              {line}
              {hasPhone && (
                <span className="chatbot-inline-actions">
                  <a href="tel:6369844820" className="chatbot-pill-link">
                    <Phone size={11} /> Call 6369844820
                  </a>
                </span>
              )}
              {hasEmail && (
                <span className="chatbot-inline-actions">
                  <a href="mailto:elshalilogistics@gmail.com" className="chatbot-pill-link">
                    <Mail size={11} /> Email Us
                  </a>
                </span>
              )}
              {hasGst && (
                <span className="chatbot-gst-badge">
                  <ShieldCheck size={12} /> GST Verified
                </span>
              )}
            </p>
          );
        })}

        {/* Interactive CTA buttons for assistant replies */}
        {msg.role === 'assistant' && msg.hasQuotePrompt && (
          <div className="chatbot-msg-actions">
            <button
              className="chatbot-action-chip primary"
              onClick={() => {
                openQuote();
              }}
            >
              <FileText size={13} />
              <span>Open Quote Form</span>
              <ArrowRight size={12} />
            </button>
            <a href="tel:6369844820" className="chatbot-action-chip secondary">
              <Phone size={12} />
              <span>Call Dispatch</span>
            </a>
          </div>
        )}
      </div>
    );
  };

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
                Online • GPT-5.1
              </span>
            </div>
            <div className="chatbot-header-btns">
              <button
                className="chatbot-header-action"
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                className="chatbot-header-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
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
                  {renderFormattedMessage(msg)}
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
          {messages.length <= 2 && !isLoading && (
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

          {/* Input area */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about rates, routes, vehicles..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="chatbot-input"
              aria-label="Chat message input"
            />
            <button
              className="chatbot-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>

          {/* Footer note */}
          <div className="chatbot-footer-note">
            <span>POWERED BY ELSALI LOGISTICS AI</span>
          </div>
        </div>
      )}
    </>
  );
}
