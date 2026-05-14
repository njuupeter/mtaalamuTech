import { useState, useRef, useEffect, useMemo } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, MinusCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { chatWithAI } from "../services/geminiService";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm Sarah, your MtaalamuTech Assistant. How can I help you today?" }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const QUICK_SUGGESTIONS = useMemo(() => {
    const path = location.pathname;
    
    if (path === "/services" || path.startsWith("/services")) {
      return [
        "📊 Forex Signals",
        "💹 Portfolio Sync",
        "🖥️ System Design",
        "🎨 UI/UX Strategy",
        "🛠️ Custom Programming"
      ];
    }
    
    if (path === "/booking") {
      return [
        "🗓️ Available Slots",
        "📝 Consultation Fee",
        "❓ Booking Process",
        "📍 Office Location"
      ];
    }

    if (path === "/contact") {
      return [
        "📩 Email Support",
        "📱 Whatsapp Chat",
        "🏢 Office Hours",
        "🆘 Urgent Issue"
      ];
    }

    return [
      "📈 Trading Services",
      "💼 Investment Advice",
      "💻 Web Development",
      "💰 Pricing Plans",
      "📞 Talk to an Agent"
    ];
  }, [location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-popup after 3 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: textToSend }] };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = messages.slice(-6); // Keep last 6 messages for context
    const response = await chatWithAI(textToSend, history);

    const botMessage: Message = { role: 'model', parts: [{ text: response }] };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <div className="flex flex-col items-end gap-4">
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setShowNotification(false);
                  }}
                >
                  <div className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 max-w-[200px] flex flex-col gap-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
                    <p className="text-xs font-medium text-slate-800 leading-tight">
                      "Hi there! I'm Sarah. How can I help you today?"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Online Now</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNotification(false);
                    }}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
              }}
              className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 transition-transform hover:scale-110 active:scale-95 overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Assistant" 
                className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-indigo-600/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className={cn(
              "flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300",
              isMinimized ? "h-16 w-72" : "h-[600px] w-[90vw] max-w-[400px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-indigo-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Assistant" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white" />
                </div>
                <div>
                  <h3 className="font-bold leading-none">Sarah</h3>
                  <p className="mt-1 text-xs text-indigo-100">MtaalamuTech Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-lg p-1 hover:bg-white/10"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex w-full gap-3",
                          m.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white overflow-hidden",
                          m.role === 'user' ? "bg-slate-800" : "bg-indigo-600"
                        )}>
                          {m.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <img 
                              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" 
                              alt="Sarah" 
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                        <div className={cn(
                          "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm",
                          m.role === 'user' 
                            ? "bg-slate-100 text-slate-800 rounded-tr-none" 
                            : "bg-indigo-50 text-slate-800 rounded-tl-none"
                        )}>
                          <div className="markdown-body prose prose-sm prose-slate max-w-none">
                            <ReactMarkdown>
                              {m.parts[0].text}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" 
                            alt="Sarah" 
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center gap-1 rounded-2xl bg-indigo-50 p-4 shadow-sm">
                          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                          <span className="text-xs text-indigo-600 font-medium">Assistant is thinking...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Quick Suggestions */}
                {messages.length < 4 && (
                  <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Common Questions</p>
                    <div className="flex flex-wrap gap-2">
                       {QUICK_SUGGESTIONS.map((suggestion) => (
                         <button
                          key={suggestion}
                          onClick={() => handleSend(suggestion)}
                          className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                         >
                           {suggestion}
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="border-t border-slate-100 p-4">
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-focus focus:border-indigo-600 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
