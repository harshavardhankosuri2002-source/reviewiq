import React, { useState } from 'react';
import { Product, ContextualActionType } from '../types';
import {
  Star,
  Calendar,
  Bookmark,
  GitCompare,
  MessageSquareCode,
  Sparkles,
  Cpu,
  Battery,
  Eye,
  Weight,
  Camera,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Info,
  Headphones,
} from 'lucide-react';
import { getProductSentimentStats } from '../utils/analytics';
import { formatINR } from '../utils/currency';
import { ParallaxDeviceStage } from './ParallaxDeviceStage';
import { ProductColorSwatches } from './ProductColorSwatches';
import { getProductColorOptions } from '../utils/productColors';
import { haptics } from '../utils/haptics';

interface ProductOverviewProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  onScrollToQA: () => void;
  onOpenAskVoxWithAction?: (action: ContextualActionType) => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  product,
  isSaved,
  onToggleSave,
  onCompare,
  onScrollToQA,
  onOpenAskVoxWithAction,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const stats = getProductSentimentStats(product.id);

  // Sync image source when product changes
  React.useEffect(() => {
    setImgSrc(product.imageUrl);
  }, [product.imageUrl]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ============================================================ */}
      {/* 1. EDITORIAL HEADER & TITLE (Apple-Clean Typography)         */}
      {/* ============================================================ */}
      <div className="space-y-2.5 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 font-bold uppercase tracking-wider text-[10px]">
            {product.brand} • {product.category} • {product.releaseYear}
          </span>
          {product.colorVariant && (
            <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold text-[10px]">
              Verified Variant: {product.colorVariant}
            </span>
          )}
          <span className="text-slate-300 font-mono hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>
              Coverage Window: {product.dateRange.start} → {product.dateRange.end}
            </span>
          </div>
        </div>

        {/* Large Editorial Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {product.name}
        </h1>

        {/* Rating, Price & Review Count Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-0.5">
          <div className="flex items-center gap-2 frosted-panel px-3 py-1 rounded-xl shadow-2xs">
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
            <span className="text-sm font-black text-slate-900">{product.sampleRating}</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Based on <strong className="text-slate-900">{product.sampleReviewCount}</strong> verified customer feedback reports
          </span>

          <div className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs">
            {formatINR(product.priceMSRP)} MSRP
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PRODUCT HERO STAGE (Apple Store-Inspired Display)          */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl frosted-modal p-5 sm:p-7 border border-white/80 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Device Stage Visual - Apple Store Card Inspiration */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[280px] h-[320px] sm:h-[340px] frosted-panel rounded-2xl p-4 flex flex-col items-center justify-between mx-auto relative group shadow-xs">
              {/* Top Badges */}
              <div className="w-full flex items-center justify-between text-[10px] font-bold">
                <span className="frosted-pill px-2 py-0.5 rounded text-slate-700">
                  {product.brand} Verified
                </span>
                <span className="bg-emerald-500/10 text-emerald-800 border border-emerald-300/60 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{stats.positivePct}% Positive</span>
                </span>
              </div>

              {/* Centered Device Image with Principle 11: 3D Parallax Tilt */}
              <ParallaxDeviceStage maxTilt={8} showGlare={true} className="w-full flex items-center justify-center my-auto">
                <img
                  src={imgSrc}
                  alt={`${product.name} in ${getProductColorOptions(product.id)[selectedColorIdx]?.name || 'default finish'}`}
                  onError={() => {
                    setImgSrc('/images/products/device-placeholder.svg');
                  }}
                  className="max-h-52 sm:max-h-56 max-w-full object-contain my-auto drop-shadow-md select-none pointer-events-none transition-all duration-300"
                  style={{ filter: getProductColorOptions(product.id)[selectedColorIdx]?.filterStyle || 'none' }}
                />
              </ParallaxDeviceStage>

              {/* Interactive Color Swatch Switcher (Option 2) */}
              <ProductColorSwatches
                productId={product.id}
                selectedIndex={selectedColorIdx}
                onSelectColor={setSelectedColorIdx}
                size="md"
              />
            </div>
          </div>

          {/* Consensus Overview & Action Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Decoded Consensus Narrative */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-600" /> Consensus Experience Summary
              </span>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed border-l-2 border-sky-400 pl-3">
                "{product.quickVerdict}"
              </p>
            </div>

            {/* Sentiment Progress Breakdown Bar */}
            <div className="space-y-1.5 frosted-panel p-3.5 rounded-xl">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">Cross-Platform Sentiment</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {stats.positivePct}% Positive Consensus
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-200/80 flex overflow-hidden">
                <div
                  style={{ width: `${stats.positivePct}%` }}
                  className="bg-emerald-500"
                  title={`Positive: ${stats.positivePct}%`}
                />
                <div
                  style={{ width: `${stats.mixedPct}%` }}
                  className="bg-amber-400"
                  title={`Mixed: ${stats.mixedPct}%`}
                />
                <div
                  style={{ width: `${stats.negativePct}%` }}
                  className="bg-rose-400"
                  title={`Negative: ${stats.negativePct}%`}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                <span>{stats.positivePct}% Positive</span>
                <span>{stats.mixedPct}% Mixed</span>
                <span>{stats.negativePct}% Negative</span>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Selected Configuration Variant:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map(variant => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedVariant === variant
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'frosted-pill text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Official Purchase Link Box */}
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-white text-sky-700 border border-sky-200">
                    <ShoppingBag className="w-3.5 h-3.5 text-sky-700" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Official Manufacturer Product Page
                    </span>
                    <span className="text-[11px] text-sky-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified Source: {product.retailerName || 'Official Manufacturer Store'}
                    </span>
                  </div>
                </div>

                <a
                  href={product.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-interactive-primary py-2 px-3.5 text-xs font-bold shrink-0"
                >
                  <span>Buy from Official Store</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-1 text-[10px] text-slate-500 pt-1 border-t border-sky-200/60">
                <Info className="w-3 h-3 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  ReviewIQ is an independent review analysis engine and does not sell products or process payments. Clicking will direct you safely to the manufacturer's official portal.
                </span>
              </div>
            </div>

            {/* Contextual AI Quick-Action Buttons */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-600" />
                <span>Contextual AI Actions:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onOpenAskVoxWithAction ? onOpenAskVoxWithAction('summarize_reviews') : onScrollToQA()}
                  className="px-2.5 py-1 rounded-lg frosted-pill text-slate-700 hover:text-slate-900 font-bold text-xs hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>📝 Summarize reviews</span>
                </button>
                <button
                  onClick={() => onOpenAskVoxWithAction ? onOpenAskVoxWithAction('check_priorities') : onScrollToQA()}
                  className="px-2.5 py-1 rounded-lg frosted-pill text-slate-700 hover:text-slate-900 font-bold text-xs hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>🎯 Check my priorities</span>
                </button>
                <button
                  onClick={() => onOpenAskVoxWithAction ? onOpenAskVoxWithAction('pros_and_cons') : onScrollToQA()}
                  className="px-2.5 py-1 rounded-lg frosted-pill text-slate-700 hover:text-slate-900 font-bold text-xs hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>⚖️ Pros & Cons</span>
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                onClick={onScrollToQA}
                className="btn-interactive-primary flex-1 sm:flex-initial py-2.5 px-4 text-xs font-bold"
              >
                <MessageSquareCode className="w-4 h-4 text-white" />
                <span>Ask ReviewIQ a Question</span>
              </button>

              <button
                onClick={() => onToggleSave(product.id)}
                className={`btn-interactive-secondary py-2.5 px-3.5 text-xs font-bold ${
                  isSaved ? 'bg-sky-50 text-sky-800 border-sky-300' : ''
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-700 text-sky-700' : 'text-slate-400'}`}
                />
                <span>{isSaved ? 'Shortlisted' : 'Save'}</span>
              </button>

              <button
                onClick={() => onCompare(product.id)}
                className="btn-interactive-secondary py-2.5 px-3.5 text-xs font-bold"
              >
                <GitCompare className="w-3.5 h-3.5 text-sky-700" />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. EXPANSIVE HARDWARE SPECIFICATIONS (Uniform & Balanced)     */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Hardware & Engineering Baseline
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Technical Specifications
          </h3>
        </div>

        {/* Clean, Uniform Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Display / Driver Spec Card */}
          <div className="frosted-panel p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-sky-300 transition-all shadow-2xs">
            <div className="flex items-center gap-1.5 text-sky-700 text-[10px] font-bold uppercase tracking-wider">
              {product.category === 'Headphones' ? <Headphones className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{product.category === 'Headphones' ? 'Acoustic Driver' : 'Display & Refresh'}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug break-words">
              {product.specsSummary.display || 'Precision Driver Engine'}
            </p>
          </div>

          {/* Chipset / Audio Engine Spec Card */}
          <div className="frosted-panel p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-sky-300 transition-all shadow-2xs">
            <div className="flex items-center gap-1.5 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>{product.category === 'Headphones' ? 'Audio Processor' : 'Processor & Architecture'}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug break-words">
              {product.specsSummary.chipset || 'Integrated Processor'}
            </p>
          </div>

          {/* Camera / Wireless Spec Card */}
          <div className="frosted-panel p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-sky-300 transition-all shadow-2xs">
            <div className="flex items-center gap-1.5 text-sky-700 text-[10px] font-bold uppercase tracking-wider">
              {product.category === 'Headphones' ? <Sparkles className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
              <span>{product.category === 'Headphones' ? 'Wireless & ANC' : 'Optics & Sensors'}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug break-words">
              {product.specsSummary.camera || product.specsSummary.connectivity || 'Multipoint Bluetooth • ANC'}
            </p>
          </div>

          {/* Battery Spec Card */}
          <div className="frosted-panel p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-sky-300 transition-all shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
              <Battery className="w-3.5 h-3.5" />
              <span>Battery & Endurance</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug break-words">
              {product.specsSummary.battery}
            </p>
          </div>

          {/* Weight & Form Factor */}
          <div className="frosted-panel p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between hover:border-sky-300 transition-all sm:col-span-2 lg:col-span-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
              <Weight className="w-3.5 h-3.5" />
              <span>Chassis & Weight</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug break-words">
              {product.specsSummary.weight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
