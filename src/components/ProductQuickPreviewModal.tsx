import React, { useEffect } from 'react';
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
  // Close on Escape key & Lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while inspection modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!product) return null;

  const stats = getProductSentimentStats(product.id);
  const personaMatch = Object.keys(activePriorities).length > 0
    ? calculatePersonalizedMatch(product.id, activePriorities)
    : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 modal-backdrop-deep-blur animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* High-Density Frosted Glass Dialog (Zero Wasted Space, Crisp High Focus) */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto frosted-modal rounded-3xl p-5 sm:p-7 space-y-4 text-slate-900 shadow-2xl animate-scaleUp">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Decoded Device Intelligence • {product.brand}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================== */}
        {/* BALANCED 2-COLUMN LAYOUT: ZERO EMPTY SPACE                 */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Device Hero & Actions (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* Floating Device Showcase */}
            <div className="relative h-48 w-full frosted-panel rounded-2xl p-4 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-indigo-300/15 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

              <img
                src={product.imageUrl}
                alt={product.name}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                }}
                className="max-h-36 max-w-full object-contain relative z-10 drop-shadow-lg group-hover:scale-105 transition-transform duration-300 select-none"
              />

              {/* Price Pill */}
              <div className="absolute top-2.5 right-2.5 bg-slate-900/85 backdrop-blur-md text-white px-2.5 py-0.5 rounded text-xs font-bold border border-white/20 shadow-xs">
                {formatINR(product.priceMSRP)}
              </div>

              {/* Brand Pill */}
              <div className="absolute top-2.5 left-2.5 frosted-pill text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                {product.brand}
              </div>
            </div>

            {/* Device Identity */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h2>

              {/* Stars & Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.sampleRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-900">{product.sampleRating}</span>
                <span className="text-xs text-slate-500">
                  • {product.sampleReviewCount} verified reviews
                </span>
              </div>

              {/* Persona Fit Score if active */}
              {personaMatch && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-mono font-bold mt-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{personaMatch.score}% Fit Match for Your Priorities</span>
                </div>
              )}
            </div>

            {/* Quick Verdict */}
            <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-sky-400 pl-3">
              {product.quickVerdict}
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenFullAnalysis(product.id);
                }}
                className="btn-interactive-primary w-full py-2.5 text-xs font-bold shadow-md cursor-pointer"
              >
                <span>Open Full Deep-Dive Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onToggleSave(product.id)}
                  className={`btn-interactive-secondary w-full py-2 text-xs cursor-pointer ${
                    isSaved ? 'bg-sky-50 text-sky-800 border-sky-300' : ''
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-700 text-sky-700' : 'text-slate-400'}`} />
                  <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
                </button>

                <button
                  onClick={() => {
                    onCompare(product.id);
                    onClose();
                  }}
                  className="btn-interactive-secondary w-full py-2 text-xs cursor-pointer"
                >
                  <GitCompare className="w-3.5 h-3.5 text-sky-700" />
                  <span>Compare</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Decoded Intelligence & Consensus (7 cols) */}
          <div className="md:col-span-7 space-y-3.5">
            {/* Customer Sentiment Breakdown Meter */}
            <div className="frosted-panel p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">Cross-Platform Sentiment</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {stats.positivePct}% Positive Consensus
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-200/80 flex overflow-hidden">
                <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
                <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-400" />
                <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-400" />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{stats.positivePct}% Positive</span>
                <span>{stats.mixedPct}% Mixed</span>
                <span>{stats.negativePct}% Negative</span>
              </div>
            </div>

            {/* Strengths & Caveats 2-Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Appreciated */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Most Appreciated Strengths</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px] leading-snug">
                  {product.aiSummary.appreciatedFeatures.points.slice(0, 3).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complaints */}
              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-rose-900">
                  <span className="w-3 h-3 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[8px] font-black">!</span>
                  <span>Verified Drawbacks & Caveats</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px] leading-snug">
                  {product.aiSummary.commonComplaints.points.slice(0, 3).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hardware Specifications Grid */}
            <div className="frosted-panel p-3.5 rounded-xl space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Hardware Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Chipset / Engine</span>
                  <span className="font-semibold truncate block">
                    {(product.specsSummary.chipset || 'Integrated').split('(')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Display / Acoustics</span>
                  <span className="font-semibold truncate block">
                    {(product.specsSummary.display || product.specsSummary.driver || 'Standard').split(',')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Battery Stamina</span>
                  <span className="font-semibold truncate block">
                    {(product.specsSummary.battery || 'Standard').split('(')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Weight</span>
                  <span className="font-semibold truncate block">
                    {product.specsSummary.weight || 'Standard'}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust & Verification Footer */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-white/60">
              <div className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Evidence-Linked Quotes • Bot Screened</span>
              </div>
              <a
                href={product.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-900"
              >
                <span>{product.retailerName}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
