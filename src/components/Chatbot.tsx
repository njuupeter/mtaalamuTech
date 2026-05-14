import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, MinusCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm the MtaalamuTech Assistant. How can I help you today?" }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = messages.slice(-6); // Keep last 6 messages for context
    const response = await chatWithAI(input, history);

    const botMessage: Message = { role: 'model', parts: [{ text: response }] };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 transition-transform hover:scale-110 active:scale-95"
          >
            <MessageSquare className="h-7 w-7 transition-transform group-hover:rotate-12" />
          </motion.button>
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
                <div className="rounded-full bg-white/20 p-2">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold leading-none">MtaalamuTech Assistant</h3>
                  <p className="mt-1 text-xs text-indigo-100">Always active</p>
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
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white",
                          m.role === 'user' ? "bg-slate-800" : "bg-indigo-600"
                        )}>
                          {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
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
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                          <Bot className="h-4 w-4" />
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
