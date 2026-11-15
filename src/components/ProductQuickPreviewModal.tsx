import React, { useEffect, useRef, useState } from 'react';
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
import { ParallaxDeviceStage } from './ParallaxDeviceStage';
import { ProductColorSwatches } from './ProductColorSwatches';
import { getProductColorOptions } from '../utils/productColors';
import { haptics } from '../utils/haptics';

interface ProductQuickPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenFullAnalysis: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  activePriorities?: PrioritySelection;
}

/**
 * ProductQuickPreviewModal
 * Modernized with Google Chrome Modern Web Guidance:
 * - Native HTML <dialog> modal with showModal() and top-layer rendering
 * - overscroll-behavior: contain (no document.body.overflow locking needed)
 * - Native keyboard Esc & platform back-gesture dismissal
 * - Native backdrop light dismiss on outside tap
 * - Interactive Color Swatch dynamic finish preview
 * - Web Audio API haptic feedback
 */
export const ProductQuickPreviewModal: React.FC<ProductQuickPreviewModalProps> = ({
  product,
  onClose,
  onOpenFullAnalysis,
  isSaved,
  onToggleSave,
  onCompare,
  activePriorities = {},
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // Reset selected color when product changes
  useEffect(() => {
    setSelectedColorIdx(0);
  }, [product?.id]);

  // Synchronize native <dialog> state via Chrome Modern Web Guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [product]);

  if (!product) return null;

  const stats = getProductSentimentStats(product.id);
  const personaMatch = Object.keys(activePriorities).length > 0
    ? calculatePersonalizedMatch(product.id, activePriorities)
    : null;

  const colorOptions = getProductColorOptions(product.id);
  const activeColor = colorOptions[selectedColorIdx] || colorOptions[0];

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        haptics.play('pop');
        onClose();
      }}
      onClick={(e) => {
        // Native backdrop light dismiss (Chrome Guidance rule)
        if (e.target === dialogRef.current) {
          haptics.play('pop');
          onClose();
        }
      }}
      className="frosted-native-dialog p-0 bg-transparent border-none max-w-4xl w-[calc(100%-2rem)] m-auto animate-scaleUp text-slate-900"
    >
      {/* High-Density Frosted Glass Dialog Body */}
      <div className="relative w-full max-h-[90vh] overflow-y-auto frosted-modal rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Decoded Device Intelligence • {product.brand}
            </span>
          </div>

          {/* Principle 13 & 14: Fitts's Law Generous Close Hit Area */}
          <button
            onClick={() => {
              haptics.play('click');
              onClose();
            }}
            className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-900 active:scale-90 transition-all cursor-pointer"
            aria-label="Close Preview (Esc)"
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
            {/* Floating Device Showcase with Principle 11: 3D Parallax Tilt */}
            <div className="relative h-48 w-full frosted-panel rounded-2xl p-4 flex flex-col items-center justify-between overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-indigo-300/15 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

              {/* Badges */}
              <div className="w-full flex items-center justify-between z-30">
                <span className="frosted-pill text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                  {product.brand}
                </span>
                <span className="bg-slate-900/85 backdrop-blur-md text-white px-2.5 py-0.5 rounded text-xs font-bold border border-white/20 shadow-xs">
                  {formatINR(product.priceMSRP)}
                </span>
              </div>

              {/* 3D Parallax Stage */}
              <div className="my-auto flex items-center justify-center w-full h-32">
                <ParallaxDeviceStage maxTilt={10} showGlare={true} className="w-full h-full">
                  <img
                    src={product.imageUrl}
                    alt={`${product.name} in ${activeColor.name}`}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                    }}
                    className="max-h-32 max-w-full object-contain relative z-10 drop-shadow-lg select-none pointer-events-none transition-all duration-300"
                    style={{ filter: activeColor.filterStyle || 'none' }}
                  />
                </ParallaxDeviceStage>
              </div>

              {/* Interactive Color Swatch Switcher */}
              <ProductColorSwatches
                productId={product.id}
                selectedIndex={selectedColorIdx}
                onSelectColor={setSelectedColorIdx}
                size="md"
              />
            </div>

            {/* Device Identity */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Stars & Reviews */}
              <div className="flex items-center gap-2">
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
                <span className="text-xs font-bold text-slate-900">{product.sampleRating}</span>
                <span className="text-xs text-slate-400">• {product.sampleReviewCount} verified reviews</span>
              </div>
            </div>

            {/* Quick Verdict */}
            <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-sky-400 pl-3">
              {product.quickVerdict}
            </p>

            {/* Primary Action Buttons with Tactile Spring Physics */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  haptics.play('click');
                  onOpenFullAnalysis(product.id);
                }}
                className="btn-interactive-primary w-full py-2.5 text-xs font-bold cursor-pointer"
              >
                <span>Open Full Deep-Dive Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    haptics.play('pop');
                    onToggleSave(product.id);
                  }}
                  className={`btn-interactive-secondary w-full py-2 text-xs font-semibold cursor-pointer ${
                    isSaved ? 'bg-sky-50 text-sky-800 border-sky-300' : ''
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved ? 'fill-sky-700 text-sky-700' : 'text-slate-400'
                    }`}
                  />
                  <span>{isSaved ? 'Shortlisted' : 'Shortlist'}</span>
                </button>

                <button
                  onClick={() => {
                    haptics.play('click');
                    onCompare(product.id);
                  }}
                  className="btn-interactive-secondary w-full py-2 text-xs font-semibold cursor-pointer"
                >
                  <GitCompare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Compare</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Decoded Intelligence Quadrant (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            {/* Sentiment Meter Bar */}
            <div className="frosted-panel rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Cross-Platform Sentiment</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {stats.positivePct}% Positive Consensus
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-200/80 flex overflow-hidden">
                <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
                <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-400" />
                <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-400" />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-0.5">
                <span>{stats.positivePct}% Positive</span>
                <span>{stats.mixedPct}% Mixed</span>
                <span>{stats.negativePct}% Negative</span>
              </div>
            </div>

            {/* Do's & Don'ts Balanced Comparison (Zero Space Waste) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Strengths */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Most Appreciated Strengths</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700 leading-snug">
                  {product.aiSummary?.appreciatedFeatures?.points?.slice(0, 3).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  )) || (
                    <li className="text-slate-500">Verified flagship performance and high build quality.</li>
                  )}
                </ul>
              </div>

              {/* Caveats */}
              <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">!</span>
                  <span>Verified Drawbacks & Caveats</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700 leading-snug">
                  {product.aiSummary?.commonComplaints?.points?.slice(0, 2).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  )) || (
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                      <span>MSRP premium reflects import duties & flagship positioning.</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Hardware Specifications Grid */}
            <div className="frosted-panel rounded-2xl p-3.5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Hardware Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-800">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Chipset / Engine</span>
                  <span className="font-semibold truncate block">
                    {(product.specsSummary.chipset || 'Integrated').split('(')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Display / Driver</span>
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
    </dialog>
  );
};
