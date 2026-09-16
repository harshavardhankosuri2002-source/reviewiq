import React from 'react';
import { Product, ReviewSource } from '../types';
import { Globe2, Star, ArrowUpRight, Info } from 'lucide-react';
import { getSourceBreakdown } from '../utils/analytics';

interface CrossSourceCardProps {
  product: Product;
  onOpenSourceReviews: (source: ReviewSource) => void;
}

export const CrossSourceCard: React.FC<CrossSourceCardProps> = ({ product, onOpenSourceReviews }) => {
  const sources = getSourceBreakdown(product.id);

  return (
    <div className="bg-white rounded-3xl border border-[#D5E9FA] shadow-sm p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E9FA] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
              <Globe2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Cross-Platform Disparity Analysis
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#182C45] tracking-tight">
            Cross-Source Review Intelligence
          </h2>
          <p className="text-xs text-[#64748B]">
            Comparing feedback consistency across retail, marketplace, and consumer community channels.
          </p>
        </div>

        <div className="text-[11px] font-mono text-[#0284C7] bg-[#EAF5FF] border border-[#D5E9FA] px-3.5 py-1.5 rounded-xl self-start sm:self-auto font-semibold">
          Multi-Channel Aggregation
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {sources.map(src => (
          <div
            key={src.source}
            className="rounded-2xl border border-[#D5E9FA] bg-white p-5 flex flex-col justify-between space-y-4 hover:border-[#8CBCE5] hover:shadow-md transition-all shadow-xs"
          >
            <div className="space-y-3">
              {/* Source Title & Count */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                    Source Channel
                  </span>
                  <h3 className="text-base font-bold text-[#182C45]">{src.source}</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EAF5FF] border border-[#D5E9FA] text-[#0284C7]">
                  {src.count} Reviews
                </span>
              </div>

              {/* Rating & Sentiment Splits */}
              <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Channel Avg Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="text-sm font-black text-[#182C45]">{src.avgRating}</span>
                    <span className="text-xs text-[#64748B]">/ 5.0</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#D5E9FA] font-semibold">
                  <span className="text-emerald-700">{src.positivePct}% Pos</span>
                  <span className="text-amber-700">{src.mixedPct}% Mix</span>
                  <span className="text-rose-700">{src.negativePct}% Neg</span>
                </div>
              </div>

              {/* Observation */}
              <div className="text-xs text-[#475569] leading-relaxed">
                <span className="font-bold text-[#182C45] block mb-0.5">Channel Perspective:</span>
                {src.keyObservation}
              </div>
            </div>

            <button
              onClick={() => onOpenSourceReviews(src.source)}
              className="w-full pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#475569] hover:text-[#0284C7] flex items-center justify-between group transition-colors"
            >
              <span>Inspect {src.source} reviews</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Disparity Insight Callout */}
      <div className="p-4 rounded-xl bg-[#EAF5FF]/60 border border-[#D5E9FA] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
        <div className="text-xs text-[#475569] space-y-0.5">
          <span className="font-bold text-[#182C45]">Cross-Source Insight:</span>
          <p className="text-[#64748B] leading-relaxed">
            Marketplace reviews focus heavily on delivery condition and out-of-box setup, while technical community threads offer deeper evaluation of sustained thermals, display PWM sensitivity, and long-term battery degradation.
          </p>
        </div>
      </div>
    </div>
  );
};
