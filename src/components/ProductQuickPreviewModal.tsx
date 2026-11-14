import React, { useEffect, useRef } from 'react';
import { Product, PrioritySelection } from '../types';
import {
  X,
  Star,
  ShieldCheck,
  Check,
  ArrowRight,
  Bookmark,
  GitCompare,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { getProductSentimentStats, calculatePersonalizedMatch } from '../utils/analytics';
import { formatINR } from '../utils/currency';

interface ProductQuickPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenFullAnalysis: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  activePriorities?: PrioritySelection;
}

export const ProductQuickPreviewModal: React.FC<ProductQuickPreviewModalProps> = ({
  product,
  onClose,
  onOpenFullAnalysis,
  isSaved,
  onToggleSave,
  onCompare,
  activePriorities = {},
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const stats = getProductSentimentStats(product.id);
  const personaMatch = Object.keys(activePriorities).length > 0
    ? calculatePersonalizedMatch(product.id, activePriorities)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/40 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Frosted Floating Device Card */}
      <div
        ref={scrollRef}
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl p-6 sm:p-8 space-y-6 scrollbar-thin text-slate-900 animate-scaleUp"
      >
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Interactive Device Inspection</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================== */}
        {/* STAGE 1: POP-UP FLOATING MOBILE HERO                      */}
        {/* ========================================================== */}
        <div className="text-center space-y-4 pt-2">
          {/* Floating Device Showcase with Interactive Pop & Soft Glow */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center group cursor-pointer">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-indigo-400/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

            <img
              src={product.imageUrl}
              alt={product.name}
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
              }}
              className="max-h-40 sm:max-h-48 max-w-full object-contain relative z-10 drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 select-none"
            />
          </div>

          {/* Device Title & Brand Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                {product.brand}
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                {formatINR(product.priceMSRP)}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h2>

            {/* Stars & Review count */}
            <div className="flex items-center justify-center gap-2 pt-0.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.sampleRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{product.sampleRating}</span>
              <span className="text-xs text-slate-400">
                ({product.sampleReviewCount} verified customer reviews)
              </span>
            </div>
          </div>

          {/* Quick Fit Score if Persona Active */}
          {personaMatch && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{personaMatch.score}% Personal Priority Fit</span>
            </div>
          )}

          {/* Decoded Verdict Lead Paragraph */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed pt-1">
            {product.quickVerdict}
          </p>

          {/* Scroll Down Prompt Indicator */}
          <div className="pt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 animate-bounce">
            <span>Scroll down to inspect decoded consensus</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* ========================================================== */}
        {/* STAGE 2: PROGRESSIVELY REVEALED INTELLIGENCE ON SCROLL    */}
        {/* ========================================================== */}
        <div className="pt-4 space-y-6 border-t border-slate-100">
          {/* Customer Sentiment Breakdown Meter */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Cross-Platform Sentiment</span>
              <span className="text-emerald-700 font-mono font-bold">{stats.positivePct}% Positive Consensus</span>
            </div>

            <div className="h-2 w-full rounded-full bg-slate-200 flex overflow-hidden">
              <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
              <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-400" />
              <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-400" />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
              <span>{stats.positivePct}% Positives</span>
              <span>{stats.mixedPct}% Mixed</span>
              <span>{stats.negativePct}% Complaints</span>
            </div>
          </div>

          {/* 2-Column Consensus: Strengths vs Trade-Offs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* What Customers Appreciate */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Most Appreciated Strengths</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 leading-snug">
                {product.aiSummary.appreciatedFeatures.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Complaints */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-900">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[9px] font-black">!</span>
                <span>Verified Complaints & Caveats</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 leading-snug">
                {product.aiSummary.commonComplaints.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Core Hardware Specifications
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">Processor / Engine</span>
                <span className="font-semibold">{product.specsSummary.chipset || 'Integrated'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Display / Driver</span>
                <span className="font-semibold">{product.specsSummary.display || product.specsSummary.driver || 'Standard'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Battery Stamina</span>
                <span className="font-semibold">{product.specsSummary.battery || 'Standard'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Chassis Weight</span>
                <span className="font-semibold">{product.specsSummary.weight || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Authenticity & Source Verification */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Evidence Citations • Bot Screened</span>
            </div>
            <a
              href={product.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 font-semibold"
            >
              <span>{product.retailerName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* ========================================================== */}
          {/* STAGE 3: INTERACTIVE ACTION BUTTONS                       */}
          {/* ========================================================== */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenFullAnalysis(product.id);
              }}
              className="btn-interactive-primary w-full py-3.5 text-sm cursor-pointer shadow-lg"
            >
              <span>Open Full Deep-Dive Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onToggleSave(product.id)}
                className={`btn-interactive-secondary w-full py-2.5 text-xs ${
                  isSaved ? 'bg-sky-50 text-sky-800 border-sky-300' : ''
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-700 text-sky-700' : 'text-slate-400'}`} />
                <span>{isSaved ? 'Shortlisted' : 'Shortlist'}</span>
              </button>

              <button
                onClick={() => {
                  onCompare(product.id);
                  onClose();
                }}
                className="btn-interactive-secondary w-full py-2.5 text-xs"
              >
                <GitCompare className="w-3.5 h-3.5 text-sky-700" />
                <span>Add to Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

