import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sliders,
  Check,
  Info,
} from 'lucide-react';
import {
  Product,
  PrioritySelection,
  AttributeKey,
  UserProfile,
  VoxAiMessage,
  VoxAiContext,
  ContextualActionType,
} from '../types';
import { ATTRIBUTE_CONFIG, SAMPLE_PRODUCTS } from '../data/mockData';
import { generateVoxAiResponse } from '../utils/voxAiEngine';
import { getAiHistoryStorageKey } from '../utils/auth';

interface AskVoxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  context: VoxAiContext;
  priorities: PrioritySelection;
  onTogglePriority: (key: AttributeKey) => void;
  onClearPriorities: () => void;
  currentUser: UserProfile;
  onOpenEvidence: (title: string, subtitle: string, reviewIds?: string[]) => void;
  onNavigateToProduct: (productId: string) => void;
}

const AVAILABLE_PRIORITIES: { key: AttributeKey; label: string }[] = [
  { key: 'battery', label: 'Battery life' },
  { key: 'camera', label: 'Camera quality' },
  { key: 'reliability', label: 'Durability & Reliability' },
  { key: 'performance', label: 'Speed & Performance' },
  { key: 'value', label: 'Value for money' },
  { key: 'software', label: 'Clean Software' },
];

export const AskVoxDrawer: React.FC<AskVoxDrawerProps> = ({
  isOpen,
  onClose,
  context,
  priorities,
  onTogglePriority,
  onClearPriorities,
  currentUser,
  onOpenEvidence,
  onNavigateToProduct,
}) => {
  const [messages, setMessages] = useState<VoxAiMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Derive active priorities
  const activeKeys = (Object.keys(priorities) as AttributeKey[]).filter((k) => priorities[k]);

  // Derive target product from context
  const currentProduct: Product | undefined =
    context.productId ? SAMPLE_PRODUCTS.find((p) => p.id === context.productId) : undefined;

  // Load user-isolated conversation history from localStorage
  useEffect(() => {
    try {
      const historyKey = getAiHistoryStorageKey(currentUser.id);
      const saved = localStorage.getItem(historyKey);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        // Initial welcome message
        const welcomeMsg: VoxAiMessage = {
          id: 'vox-welcome-1',
          sender: 'vox',
          text: `**Welcome to Personal VOX AI**\n\nI decode real-world customer reviews, manufacturer specifications, and user priorities into empirical buying intelligence.\n\nAsk any question below, or select a contextual quick-action for instant evidence-grounded analysis.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([welcomeMsg]);
      }
    } catch {
      // Fallback
    }
  }, [currentUser.id]);

  // Persist conversation history isolated to user ID
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const historyKey = getAiHistoryStorageKey(currentUser.id);
        localStorage.setItem(historyKey, JSON.stringify(messages));
      } catch (e) {
        console.warn('Could not save AI history', e);
      }
    }
  }, [messages, currentUser.id]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Keyboard accessibility: focus input & Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle auto-executing contextual action when drawer opens with one
  useEffect(() => {
    if (isOpen && context.initialAction) {
      handleExecuteAction(context.initialAction);
    }
  }, [isOpen, context.initialAction, context.productId]);

  const handleExecuteAction = (action: ContextualActionType) => {
    let userPromptText = '';
    if (action === 'summarize_reviews') {
      userPromptText = currentProduct
        ? `Summarize verified customer reviews for ${currentProduct.name}`
        : 'Summarize customer reviews';
    } else if (action === 'check_priorities') {
      userPromptText = currentProduct
        ? `Is the ${currentProduct.name} right for my priorities?`
        : 'Evaluate against my priorities';
    } else if (action === 'pros_and_cons') {
      userPromptText = currentProduct
        ? `Show verified pros and cons for ${currentProduct.name}`
        : 'Show pros and cons';
    } else if (action === 'compare_devices') {
      userPromptText = 'Ask VOX to compare these selected products';
    }

    const userMsg: VoxAiMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: userPromptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateVoxAiResponse({
        context,
        priorities,
        actionType: action,
        activeProductId: currentProduct?.id,
      });
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    const userMsg: VoxAiMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateVoxAiResponse({
        context,
        priorities,
        userQuery: query,
        activeProductId: currentProduct?.id,
      });
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 400);
  };

  const handleClearHistory = () => {
    try {
      const historyKey = getAiHistoryStorageKey(currentUser.id);
      localStorage.removeItem(historyKey);
    } catch {}
    const resetMsg: VoxAiMessage = {
      id: 'vox-reset-' + Date.now(),
      sender: 'vox',
      text: `**Conversation cleared.**\n\nHow can Personal VOX AI help with your smartphone purchase decision today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([resetMsg]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vox-ai-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop clickable */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Drawer Container */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#D5E9FA] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <header className="p-4 sm:p-5 border-b border-[#D5E9FA] bg-[#F8FAFC] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#182C45] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="vox-ai-drawer-title" className="text-sm sm:text-base font-black text-[#182C45]">
                  Personal VOX AI
                </h2>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#EAF5FF] text-[#0284C7] px-2 py-0.5 rounded-md border border-[#D5E9FA]">
                  Evidence Grounded
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">HEAR WHAT MATTERS — Real customer insights</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              title="Reset and clear conversation history"
              className="p-2 rounded-xl text-[#64748B] hover:text-[#182C45] hover:bg-[#EAF5FF] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close Ask VOX drawer"
              className="p-2 rounded-xl text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Transparent Priorities Strip */}
        <section aria-label="Review Priorities" className="bg-[#EAF5FF]/70 border-b border-[#D5E9FA] px-4 py-2.5 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#182C45]">
              <Sliders className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Review Priorities:</span>
            </div>
            <button
              onClick={() => setShowPrioritySelector(!showPrioritySelector)}
              className="text-[11px] font-semibold text-[#0284C7] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showPrioritySelector ? 'Hide Options' : 'Edit Priorities'}</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${showPrioritySelector ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Active Priorities Label */}
          <div className="text-[11px] text-[#475569] flex items-center gap-1.5 flex-wrap">
            {activeKeys.length > 0 ? (
              <>
                <span className="font-semibold text-emerald-700">Active:</span>
                {activeKeys.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-[#B8DBF7] text-[10.5px] font-bold text-[#0284C7] shadow-2xs"
                  >
                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                    {ATTRIBUTE_CONFIG[k]?.label || k}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-[#64748B] italic">
                No priorities set — using general objective review consensus
              </span>
            )}
          </div>

          {/* Expandable Priority Selector */}
          {showPrioritySelector && (
            <div className="mt-3 pt-2.5 border-t border-[#D5E9FA] grid grid-cols-2 gap-1.5 animate-in slide-in-from-top-2 duration-150">
              {AVAILABLE_PRIORITIES.map(({ key, label }) => {
                const isSelected = !!priorities[key];
                return (
                  <button
                    key={key}
                    onClick={() => onTogglePriority(key)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#0284C7] text-[#0284C7] shadow-2xs'
                        : 'bg-[#F8FAFC] border-[#D5E9FA] text-[#64748B] hover:bg-white hover:text-[#182C45]'
                    }`}
                  >
                    <span className="truncate">{label}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${
                        isSelected ? 'bg-[#0284C7] text-white' : 'border border-[#CBD5E1]'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </button>
                );
              })}
              {activeKeys.length > 0 && (
                <div className="col-span-2 text-right pt-1">
                  <button
                    onClick={onClearPriorities}
                    className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                  >
                    Clear all priorities
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Current Active Context Badge */}
        {currentProduct && (
          <div className="bg-[#F8FAFC] px-4 py-2 border-b border-[#D5E9FA] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-[10px] font-bold text-[#0284C7] uppercase shrink-0">Active Context:</span>
              <span className="text-xs font-extrabold text-[#182C45] truncate">{currentProduct.name}</span>
            </div>
            <button
              onClick={() => onNavigateToProduct(currentProduct.id)}
              className="text-[11px] text-[#0284C7] font-semibold hover:underline shrink-0"
            >
              View Specs
            </button>
          </div>
        )}

        {/* Messages Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#182C45] text-white rounded-tr-xs shadow-xs'
                    : 'bg-[#F8FAFC] text-[#1E293B] border border-[#D5E9FA] rounded-tl-xs shadow-xs space-y-3'
                }`}
              >
                {/* Formatted Markdown Content */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Verified Hardware Specs (If Available) */}
                {msg.verifiedSpecs && msg.verifiedSpecs.length > 0 && (
                  <div className="pt-2 border-t border-[#D5E9FA]">
                    <span className="text-[10.5px] font-extrabold text-[#0284C7] uppercase tracking-wider block mb-1.5">
                      Verified Hardware Specs:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {msg.verifiedSpecs.map((spec, i) => (
                        <div key={i} className="bg-white px-2.5 py-1.5 rounded-lg border border-[#D5E9FA] text-[11px]">
                          <span className="text-[#64748B] font-medium">{spec.label}: </span>
                          <span className="text-[#182C45] font-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Evidence Themes & Citations */}
                {msg.reviewEvidence && msg.reviewEvidence.length > 0 && (
                  <div className="pt-2 border-t border-[#D5E9FA] space-y-2">
                    <span className="text-[10.5px] font-extrabold text-[#0284C7] uppercase tracking-wider block">
                      Supporting Review Grounding:
                    </span>
                    {msg.reviewEvidence.map((ev, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-[#D5E9FA] space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#182C45]">{ev.themeName}</span>
                          <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {ev.consensusPct}% Positive ({ev.sampleCount} reviews)
                          </span>
                        </div>

                        {/* Direct Quotes */}
                        {ev.citations && ev.citations.map((cit) => (
                          <div
                            key={cit.reviewId}
                            className="bg-[#F8FAFC] p-2 rounded-lg border-l-2 border-[#0284C7] text-[11px] text-[#475569] italic"
                          >
                            "{cit.quoteSnippet}"
                            <div className="not-italic text-[10px] text-[#94A3B8] mt-1 flex items-center justify-between">
                              <span>— {cit.author} ({cit.source})</span>
                              <span className="font-mono text-[#0284C7]">ID: {cit.reviewId}</span>
                            </div>
                          </div>
                        ))}

                        {/* Open Supporting Reviews Link */}
                        <button
                          onClick={() =>
                            onOpenEvidence(
                              ev.themeName,
                              `Customer consensus: ${ev.consensusPct}% positive across ${ev.sampleCount} reviews`,
                              ev.supportingReviewIds
                            )
                          }
                          className="w-full text-center py-1 text-[11px] font-bold text-[#0284C7] hover:bg-[#EAF5FF] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View {ev.sampleCount} Supporting Reviews</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Insufficient Evidence Warning Box */}
                {msg.isInsufficientEvidence && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-amber-900 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Integrity Safeguard</span>
                      <span>{msg.insufficientEvidenceReason}</span>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-[#94A3B8] text-right">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#F8FAFC] border border-[#D5E9FA] px-3.5 py-2.5 rounded-2xl w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7] animate-spin" />
              <span>VOX AI is synthesizing verified reviews...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Contextual Action Chips Strip */}
        <section aria-label="Contextual Quick Actions" className="px-4 py-2 border-t border-[#D5E9FA] bg-[#F8FAFC] shrink-0">
          <span className="text-[10.5px] font-bold text-[#64748B] block mb-1.5">
            Contextual Quick Actions:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {currentProduct ? (
              <>
                <button
                  onClick={() => handleExecuteAction('summarize_reviews')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5E9FA] text-[#182C45] hover:border-[#0284C7] hover:text-[#0284C7] text-xs font-semibold whitespace-nowrap shadow-2xs transition-all cursor-pointer"
                >
                  📝 Summarize reviews
                </button>
                <button
                  onClick={() => handleExecuteAction('check_priorities')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5E9FA] text-[#182C45] hover:border-[#0284C7] hover:text-[#0284C7] text-xs font-semibold whitespace-nowrap shadow-2xs transition-all cursor-pointer"
                >
                  🎯 Right for my priorities?
                </button>
                <button
                  onClick={() => handleExecuteAction('pros_and_cons')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5E9FA] text-[#182C45] hover:border-[#0284C7] hover:text-[#0284C7] text-xs font-semibold whitespace-nowrap shadow-2xs transition-all cursor-pointer"
                >
                  ⚖️ Show pros and cons
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleExecuteAction('compare_devices')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5E9FA] text-[#182C45] hover:border-[#0284C7] hover:text-[#0284C7] text-xs font-semibold whitespace-nowrap shadow-2xs transition-all cursor-pointer"
                >
                  🔄 Compare top phones
                </button>
                <button
                  onClick={() => handleExecuteAction('check_priorities')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5E9FA] text-[#182C45] hover:border-[#0284C7] hover:text-[#0284C7] text-xs font-semibold whitespace-nowrap shadow-2xs transition-all cursor-pointer"
                >
                  🎯 Match to my priorities
                </button>
              </>
            )}
          </div>
        </section>

        {/* Input Bar */}
        <form onSubmit={handleCustomSubmit} className="p-4 border-t border-[#D5E9FA] bg-white flex gap-2 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              currentProduct
                ? `Ask VOX about ${currentProduct.name} battery, camera, or flaws...`
                : 'Ask VOX anything about smartphones...'
            }
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#D5E9FA] bg-[#F8FAFC] text-xs sm:text-sm text-[#182C45] focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Privacy & Session Isolation Footnote */}
        <footer className="px-4 py-2 bg-[#F8FAFC] border-t border-[#D5E9FA] text-[10px] text-[#64748B] flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Private to your profile ({currentUser.name})</span>
          </span>
          <span>Zero third-party trackers</span>
        </footer>
      </div>
    </div>
  );
};
