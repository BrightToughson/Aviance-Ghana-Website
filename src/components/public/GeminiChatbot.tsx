import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  RotateCcw,
  Copy,
  Check,
  User,
  AlertCircle,
  Plane,
  Shield,
  Luggage,
} from 'lucide-react';
import { AvianceLogo } from '../ui/AvianceLogo';

export type ChatRole = 'general' | 'operations' | 'passenger_baggage';
export type GeminiModel = 'gemini-3.1-flash-lite' | 'gemini-3.8-flash';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

const ROLE_CONFIGS: Record<
  ChatRole,
  {
    name: string;
    icon: any;
    recommendedModel: GeminiModel;
    description: string;
    welcomeMessage: string;
    suggestedPrompts: string[];
  }
> = {
  general: {
    name: 'General Concierge',
    icon: Plane,
    recommendedModel: 'gemini-3.1-flash-lite',
    description: 'Assistance for Kotoka T3, Kumasi & Tamale stations, contacts, and flight support.',
    welcomeMessage:
      'Welcome to Aviance Ghana Limited. I am your 24/7 Ground Operations Concierge. How may I assist you with passenger handling, executive lounge access, or flight operations today?',
    suggestedPrompts: [
      'What are the contact details for Kotoka Terminal 3 head office?',
      'Where does Aviance Ghana operate across Ghanaian aerodromes?',
      'Tell me about the Adinkra Executive Lounge amenities.',
    ],
  },
  operations: {
    name: 'Operations & Cargo Specialist',
    icon: Shield,
    recommendedModel: 'gemini-3.1-flash-lite',
    description: 'Technical analysis for IATA ISAGO turnaround, EU Cargo RA3 cold chain, and SGHA handling.',
    welcomeMessage:
      'Aviance Flight Operations & Cargo Specialist ready. How may I assist with turnaround GSE, cold chain specs, or airside ramp safety?',
    suggestedPrompts: [
      'What are the temperature limits and security controls for EU Cargo RA3?',
      'Explain the B777-300ER turnaround GSE sequencing (GPU, ambulift, pushback).',
      'What certifications validate Aviance airside ground safety?',
    ],
  },
  passenger_baggage: {
    name: 'Passenger & Baggage Guide',
    icon: Luggage,
    recommendedModel: 'gemini-3.1-flash-lite',
    description: 'Rapid assistance for baggage reconciliation, lost property tracing, and arrival desks.',
    welcomeMessage:
      'Hello traveler. I am your Passenger & Baggage Guide. I can assist with carousel locations, delayed bag tracing at Terminal 3, and Lost & Found procedures.',
    suggestedPrompts: [
      'Where is the Terminal 3 Baggage Services Office located?',
      'How does Aviance trace delayed baggage using SITA WorldTracer?',
      'Can walk-in travelers access the Adinkra Lounge?',
    ],
  },
};

interface InlineToken {
  type: 'bold' | 'italic' | 'email' | 'phone' | 'text';
  value: string;
}

function tokenizeInline(text: string): InlineToken[] {
  // Split by bold **...**
  const boldChunks = text.split(/(\*\*[^*]+\*\*)/g);
  const tokens: InlineToken[] = [];

  for (const chunk of boldChunks) {
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length >= 4) {
      tokens.push({
        type: 'bold',
        value: chunk.slice(2, -2),
      });
    } else if (chunk) {
      // Split for email, phone, and italics
      const subChunks = chunk.split(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+233[\s\d-]+|\*[^*]+\*)/g);
      for (const sc of subChunks) {
        if (!sc) continue;
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sc)) {
          tokens.push({ type: 'email', value: sc });
        } else if (/^\+233[\s\d-]+$/.test(sc) && sc.replace(/\D/g, '').length >= 9) {
          tokens.push({ type: 'phone', value: sc });
        } else if (sc.startsWith('*') && sc.endsWith('*') && sc.length >= 3) {
          tokens.push({ type: 'italic', value: sc.slice(1, -1) });
        } else {
          tokens.push({ type: 'text', value: sc });
        }
      }
    }
  }

  return tokens;
}

const renderInline = (text: string): React.ReactNode => {
  const tokens = tokenizeInline(text);
  return (
    <>
      {tokens.map((token, idx) => {
        if (token.type === 'bold') {
          // Check if bold token is an email
          if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(token.value)) {
            return (
              <a
                key={idx}
                href={`mailto:${token.value}`}
                className="font-bold text-[#204696] underline hover:text-[#009EE0] transition-colors"
              >
                {token.value}
              </a>
            );
          }
          // Check if bold token is phone
          if (/^\+233[\s\d-]+$/.test(token.value) && token.value.replace(/\D/g, '').length >= 9) {
            return (
              <a
                key={idx}
                href={`tel:${token.value.replace(/\s+/g, '')}`}
                className="font-bold text-[#204696] underline hover:text-[#009EE0] transition-colors"
              >
                {token.value}
              </a>
            );
          }
          return (
            <strong key={idx} className="font-semibold text-slate-900">
              {token.value}
            </strong>
          );
        }
        if (token.type === 'italic') {
          return (
            <em key={idx} className="italic text-slate-600">
              {token.value}
            </em>
          );
        }
        if (token.type === 'email') {
          return (
            <a
              key={idx}
              href={`mailto:${token.value}`}
              className="font-medium text-[#204696] underline hover:text-[#009EE0] transition-colors"
            >
              {token.value}
            </a>
          );
        }
        if (token.type === 'phone') {
          return (
            <a
              key={idx}
              href={`tel:${token.value.replace(/\s+/g, '')}`}
              className="font-medium text-[#204696] underline hover:text-[#009EE0] transition-colors"
            >
              {token.value}
            </a>
          );
        }
        return <span key={idx}>{token.value}</span>;
      })}
    </>
  );
};

export const FormattedChatMessage: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="my-2 space-y-1.5 pl-0.5">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#204696] shrink-0 mt-2" />
                <span className="flex-1">{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="my-2 space-y-1.5 pl-0.5">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed text-slate-700">
                <span className="w-4 h-4 rounded-full bg-blue-50 text-[#204696] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#204696]/20">
                  {idx + 1}
                </span>
                <span className="flex-1">{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    // Footnote / Grounded source note
    if ((line.startsWith('*(') && line.endsWith(')*')) || (line.startsWith('(') && line.endsWith(')') && line.includes('Grounded in'))) {
      flushList();
      const cleanNote = line.replace(/^\*\(/, '').replace(/\)\*$/, '').replace(/^\(/, '').replace(/\)$/, '');
      blocks.push(
        <div
          key={`foot-${i}`}
          className="mt-2.5 pt-2 border-t border-slate-100 text-[10.5px] font-mono text-slate-400 italic flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] shrink-0" />
          <span>{cleanNote}</span>
        </div>
      );
      continue;
    }

    // Bullet list item: starts with '- ' or '* '
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Numbered list item: starts with '1. ', '2. ', etc.
    const numberedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numberedMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(numberedMatch[1]);
      continue;
    }

    // Not a list item
    flushList();

    // Check for bold title line like **Welcome to Aviance Ghana Limited** 👋
    const boldHeaderMatch = line.match(/^\*\*([^*]+)\*\*(.*)$/);
    if (boldHeaderMatch && (!line.includes(':') || line.length < 50)) {
      blocks.push(
        <div
          key={`h-${i}`}
          className="text-sm font-bold text-[#204696] tracking-tight flex items-center gap-1.5 my-1"
        >
          <span>{boldHeaderMatch[1]}</span>
          {boldHeaderMatch[2] && <span>{boldHeaderMatch[2]}</span>}
        </div>
      );
      continue;
    }

    // Regular text paragraph
    blocks.push(
      <p key={`p-${i}`} className="my-1 text-xs sm:text-[13px] leading-relaxed text-slate-700">
        {renderInline(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{blocks}</div>;
};

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useState<ChatRole>('general');
  const [model] = useState<GeminiModel>('gemini-3.1-flash-lite');
  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('aviance_chat_history');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: ROLE_CONFIGS.general.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.1-flash-lite',
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of thread
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Save conversation history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aviance_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const handleClearHistory = () => {
    const welcome: ChatMessage = {
      id: `msg-welcome-${Date.now()}`,
      role: 'assistant',
      content: ROLE_CONFIGS[role].welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: model,
    };
    setMessages([welcome]);
    localStorage.removeItem('aviance_chat_history');
    setError(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    setError(null);
    setInput('');
    setLastUserPrompt(userText);

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn chat
      const historyPayload = newMessages
        .slice(-6)
        .slice(0, -1)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          model,
          role,
          fast: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'The Gemini API service encountered an unexpected error.');
      }

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || model,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err?.message || 'Unable to connect to the Aviance Concierge. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentRoleConfig = ROLE_CONFIGS[role];

  return (
    <>
      {/* Floating Trigger Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group select-none">
          {/* Executive Tooltip on Hover */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 text-slate-800 border border-slate-200/90 shadow-xl backdrop-blur-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse shrink-0"></span>
            <span className="font-semibold text-slate-800">Aviance Concierge</span>
            <span className="text-[10px] text-[#204696] bg-blue-50 px-2 py-0.5 rounded-full font-bold border border-[#204696]/20">
              Online 24/7
            </span>
          </div>

          {/* Floating Transparent Trigger Launcher Button with Bold Logo */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center p-0 bg-transparent transition-all duration-300 transform hover:scale-115 active:scale-95 group focus:outline-none cursor-pointer"
            aria-label="Open Aviance AI Concierge"
          >
            {/* Soft ambient aura on hover */}
            <span className="absolute inset-0 rounded-full bg-[#009EE0]/10 scale-90 group-hover:scale-110 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300 pointer-events-none" />

            {/* Official Aviance Logo Mark - Bold, Vibrant, Crisp with Drop Shadow */}
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-108 drop-shadow-[0_6px_14px_rgba(32,70,150,0.3)]">
              <AvianceLogo
                variant="mark-only"
                size="lg"
                markSize={54}
                strokeWidth={4.5}
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
              />
            </div>

            {/* Online Status Beacon */}
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#72BF44] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#72BF44] border-2 border-white shadow-md"></span>
            </span>

            {/* AI Pill Badge */}
            <span className="absolute bottom-0 right-0 px-1.5 py-0.5 rounded-full bg-white text-[9px] font-mono font-black text-[#204696] border border-slate-200 leading-none shadow-md">
              AI
            </span>
          </button>
        </div>
      )}

      {/* Expandable Chat Dialog Window */}
      {isOpen && (
        <div
          className="fixed bottom-5 right-5 z-50 w-[95vw] sm:w-[420px] md:w-[440px] h-[580px] max-h-[85vh] bg-white border border-slate-200/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Aviance Ground Concierge"
        >
          {/* Top Brand Tri-Color Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] shrink-0" />

          {/* Simple, Clean Executive Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#0F2E53] via-[#163469] to-[#204696] text-white shrink-0 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center p-1 shrink-0">
                <AvianceLogo variant="mark-only" size="sm" markSize={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight leading-tight">Aviance Concierge</h3>
                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]"></span>
                  <span>Online · 24/7 Ground Operations</span>
                </div>
              </div>
            </div>

            {/* Simple Actions: Reset & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Official Aviance Logo Avatar for Assistant Responses */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0 mt-0.5 p-1">
                      <AvianceLogo
                        variant="mark-only"
                        size="sm"
                        markSize={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                        isUser
                          ? 'bg-[#204696] text-white rounded-tr-sm shadow-sm font-medium'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm shadow-xs'
                      }`}
                    >
                      <FormattedChatMessage content={m.content} isUser={isUser} />
                    </div>

                    <div className={`flex items-center gap-2 px-1 text-[10px] text-slate-400 font-mono ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{m.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          className="hover:text-[#204696] transition-colors ml-0.5 cursor-pointer opacity-60 hover:opacity-100"
                          title="Copy reply text"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#204696] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading / Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0 p-1 animate-pulse">
                  <AvianceLogo
                    variant="mark-only"
                    size="sm"
                    markSize={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-3 bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm flex items-center gap-2 text-xs text-slate-600 shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#204696] animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#009EE0] animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-bounce [animation-delay:0.4s]"></div>
                  <span className="ml-1 text-[11px] text-slate-500 font-medium">Typing response...</span>
                </div>
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <div className="font-bold text-rose-900">Notice</div>
                  <div className="text-[11px] text-rose-700 leading-relaxed">{error}</div>
                  <button
                    onClick={() => {
                      const retryText =
                        lastUserPrompt ||
                        messages.filter((m) => m.role === 'user').slice(-1)[0]?.content;
                      if (retryText) handleSendMessage(retryText);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#204696] hover:bg-[#183878] text-white font-bold text-[11px] transition-colors shadow-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry</span>
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3.5 py-2 bg-slate-50/80 border-t border-slate-100 flex flex-wrap gap-1.5 text-xs shrink-0">
              {currentRoleConfig.suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#204696] text-slate-600 hover:text-[#204696] hover:bg-blue-50/50 text-[11px] font-medium transition-all shadow-2xs text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Clean Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#204696] focus:ring-2 focus:ring-[#204696]/15 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-gradient-to-r from-[#204696] to-[#009EE0] hover:from-[#183878] hover:to-[#0089c4] text-white rounded-xl shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 text-center pt-2 leading-tight">
              AI Concierge provides automated guidance. Carrier flight, baggage & cargo terms remain governed by airline agreements.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
