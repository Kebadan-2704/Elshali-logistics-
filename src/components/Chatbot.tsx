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
import { siteConfig } from '@/data/site';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasQuotePrompt?: boolean;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Hello! 👋 Welcome to ELSHALI LOGISTICS.\n\nHow can I help you today? I can assist with freight rate quotes, vehicle capacities, transport routes, and dispatch details.',
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

  // ESC key closes chat
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
      const historyPayload = messages
        .filter((m) => m !== INITIAL_MESSAGE)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: historyPayload }),
      });
      const data = await res.json();

      const answerText =
        data?.answer ||
        data?.error ||
        `I apologize, I could not process your request. Please call us at +91 ${siteConfig.phone} or use the quote form for immediate assistance.`;

      const isQuoteRelated =
        data?.configured === false ||
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
          content: `Sorry, I'm having trouble connecting right now.\n\nPlease call us directly at +91 ${siteConfig.phone} or message on WhatsApp for immediate dispatch assistance.`,
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
                setIsOpen(false);
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
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (next) setShowPulse(false);
            return next;
          });
        }}
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
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
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
              <h3>ELSHALI AI Assistant</h3>
              <span className="chatbot-status">
                <span className="chatbot-status-dot" />
                Online • Logistics Desk
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
          <div
            className="chatbot-messages"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            role="log"
            aria-live="polite"
            aria-label="Chat messages history"
          >
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

          {/* Footer note & Privacy Notice */}
          <div className="chatbot-footer-note" style={{ flexDirection: 'column', gap: '3px', padding: '6px 12px 8px' }}>
            <span>POWERED BY ELSHALI LOGISTICS AI</span>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'none', letterSpacing: 'normal' }}>
              Privacy note: Automated assistant. Do not enter confidential or financial details.
            </span>
          </div>
        </div>
      )}
    </>
  );
}
