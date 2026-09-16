import React, { useState } from 'react';
import { Product } from '../types';
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
} from 'lucide-react';
import { getProductSentimentStats } from '../utils/analytics';

interface ProductOverviewProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  onScrollToQA: () => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  product,
  isSaved,
  onToggleSave,
  onCompare,
  onScrollToQA,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant);
  const stats = getProductSentimentStats(product.id);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* ============================================================ */}
      {/* 1. EDITORIAL HEADER & TITLE                                  */}
      {/* ============================================================ */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-[#0284C7] bg-[#EAF5FF] px-3.5 py-1 rounded-full border border-[#B8DBF7] font-bold uppercase tracking-wider">
            {product.brand} • {product.category} • {product.releaseYear}
          </span>
          <span className="text-[#94A3B8] font-mono hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-[#64748B] font-mono">
            <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>
              Coverage Window: {product.dateRange.start} → {product.dateRange.end}
            </span>
          </div>
        </div>

        {/* Large Editorial Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#182C45] tracking-tight leading-none">
          {product.name}
        </h1>

        {/* Rating, Price & Review Count Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <div className="flex items-center gap-2 bg-white border border-[#D5E9FA] px-3.5 py-1.5 rounded-xl shadow-soft">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.sampleRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-base font-black text-[#182C45]">{product.sampleRating}</span>
            <span className="text-xs text-[#64748B]">/ 5.0</span>
          </div>

          <span className="text-sm font-semibold text-[#475569]">
            Based on <strong className="text-[#182C45]">{product.sampleReviewCount}</strong> verified customer feedback reports
          </span>

          <div className="px-3.5 py-1 rounded-xl bg-[#182C45] text-white font-black text-sm shadow-sm">
            {product.priceMSRP} MSRP
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PRODUCT HERO STAGE (Expansive Floating Device Visual)     */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl bg-white border border-[#D5E9FA] p-6 sm:p-12 overflow-hidden shadow-card">
        {/* Soft Center Glow */}
        <div className="ambient-glow-iceberg w-[500px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Device Stage Visual */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Device Frame */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F5F8FC] border border-[#D5E9FA] shadow-card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge 1 (Top Left) */}
              <div className="absolute -top-3 -left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#B8DBF7] text-xs text-[#0284C7] shadow-soft flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span className="font-bold">{product.brand} Verified Model</span>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800 shadow-soft flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">{stats.positivePct}% Positive Sentiment</span>
              </div>
            </div>
          </div>

          {/* Consensus Overview & Action Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Decoded Consensus Narrative */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Consensus Experience Summary
              </span>
              <p className="text-base sm:text-lg text-[#182C45] leading-relaxed font-normal">
                "{product.quickVerdict}"
              </p>
            </div>

            {/* Sentiment Progress Breakdown Bar */}
            <div className="space-y-2 bg-[#F5F8FC] p-4 rounded-2xl border border-[#D5E9FA]">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[#475569]">Customer Sentiment Ratio</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {stats.positivePct}% Positive
                </span>
              </div>

              <div className="h-2.5 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden">
                <div
                  style={{ width: `${stats.positivePct}%` }}
                  className="bg-emerald-500"
                  title={`Positive: ${stats.positivePct}%`}
                />
                <div
                  style={{ width: `${stats.mixedPct}%` }}
                  className="bg-amber-500"
                  title={`Mixed: ${stats.mixedPct}%`}
                />
                <div
                  style={{ width: `${stats.negativePct}%` }}
                  className="bg-rose-500"
                  title={`Negative: ${stats.negativePct}%`}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#64748B] pt-1 font-mono font-medium">
                <span className="text-emerald-700">{stats.positivePct}% Positive</span>
                <span className="text-amber-700">{stats.mixedPct}% Mixed</span>
                <span className="text-rose-700">{stats.negativePct}% Negative</span>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                Selected Configuration Variant:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(variant => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedVariant === variant
                        ? 'bg-[#0284C7] text-white shadow-sm'
                        : 'bg-[#F5F8FC] text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF] hover:text-[#0284C7]'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToQA}
                className="flex-1 sm:flex-initial px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquareCode className="w-4 h-4 text-white" />
                <span>Ask ReviewIQ a Question</span>
              </button>

              <button
                onClick={() => onToggleSave(product.id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isSaved
                    ? 'bg-[#EAF5FF] text-[#0284C7] border-[#B8DBF7]'
                    : 'bg-white text-[#475569] border-[#D5E9FA] hover:bg-[#F5F8FC] hover:text-[#182C45]'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isSaved ? 'fill-[#0284C7] text-[#0284C7]' : 'text-[#94A3B8]'}`}
                />
                <span>{isSaved ? 'Shortlisted' : 'Save'}</span>
              </button>

              <button
                onClick={() => onCompare(product.id)}
                className="px-4 py-3 rounded-xl text-xs font-bold bg-white text-[#475569] border border-[#D5E9FA] hover:bg-[#F5F8FC] hover:text-[#182C45] transition-all flex items-center gap-1.5"
              >
                <GitCompare className="w-4 h-4 text-[#0284C7]" />
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. EXPANSIVE HARDWARE SPECIFICATIONS (Zero Truncation)        */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="border-b border-[#D5E9FA] pb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
            Hardware & Engineering Baseline
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#182C45] tracking-tight mt-0.5">
            Technical Specifications
          </h3>
        </div>

        {/* Clean, Full-Width Feature Cards with full text wrapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Display Spec Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5E9FA] space-y-2 hover:border-[#8CBCE5] transition-all shadow-card">
            <div className="flex items-center gap-2 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Display & Refresh</span>
            </div>
            <p className="text-sm font-semibold text-[#182C45] leading-relaxed whitespace-normal break-words">
              {product.specsSummary.display}
            </p>
          </div>

          {/* Chipset Spec Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5E9FA] space-y-2 hover:border-[#8CBCE5] transition-all shadow-card">
            <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Processor & Architecture</span>
            </div>
            <p className="text-sm font-semibold text-[#182C45] leading-relaxed whitespace-normal break-words">
              {product.specsSummary.chipset}
            </p>
          </div>

          {/* Camera Spec Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5E9FA] space-y-2 hover:border-[#8CBCE5] transition-all shadow-card">
            <div className="flex items-center gap-2 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>Optics & Sensors</span>
            </div>
            <p className="text-sm font-semibold text-[#182C45] leading-relaxed whitespace-normal break-words">
              {product.specsSummary.camera}
            </p>
          </div>

          {/* Battery Spec Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5E9FA] space-y-2 hover:border-[#8CBCE5] transition-all shadow-card">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Battery className="w-4 h-4" />
              <span>Battery & Endurance</span>
            </div>
            <p className="text-sm font-semibold text-[#182C45] leading-relaxed whitespace-normal break-words">
              {product.specsSummary.battery}
            </p>
          </div>

          {/* Weight & Form Factor */}
          <div className="bg-white p-5 rounded-2xl border border-[#D5E9FA] space-y-2 hover:border-[#8CBCE5] transition-all sm:col-span-2 lg:col-span-1 shadow-card">
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <Weight className="w-4 h-4" />
              <span>Chassis & Weight</span>
            </div>
            <p className="text-sm font-semibold text-[#182C45] leading-relaxed whitespace-normal break-words">
              {product.specsSummary.weight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
