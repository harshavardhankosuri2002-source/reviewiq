import React, { useState } from 'react';
import { PrioritySelection, AttributeKey, Product, ReviewSentiment } from '../types';
import {
  Sparkles,
  Check,
  Info,
  ArrowRight,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { calculatePersonalizedMatch, getThemeBreakdown } from '../utils/analytics';
import { ATTRIBUTE_CONFIG } from '../data/mockData';

interface PersonalizedInsightsProps {
  product: Product;
  priorities: PrioritySelection;
  onTogglePriority: (key: AttributeKey) => void;
  onOpenEvidence: (title: string, subtitle: string, reviewIds?: string[], attribute?: AttributeKey) => void;
  onNavigateSupportingReviews?: (attribute?: AttributeKey, sentiment?: ReviewSentiment, focusTitle?: string) => void;
  onNavigateCalculation?: () => void;
}

const AVAILABLE_PRIORITIES: { key: AttributeKey; label: string }[] = [
  { key: 'battery', label: 'Battery life' },
  { key: 'camera', label: 'Camera quality' },
  { key: 'reliability', label: 'Reliability' },
  { key: 'performance', label: 'Performance' },
  { key: 'value', label: 'Value for money' },
  { key: 'software', label: 'Software experience' },
];

export const PersonalizedInsights: React.FC<PersonalizedInsightsProps> = ({
  product,
  priorities,
  onTogglePriority,
  onOpenEvidence,
  onNavigateSupportingReviews,
  onNavigateCalculation,
}) => {
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const matchResult = calculatePersonalizedMatch(product.id, priorities);
  const activeKeys = (Object.keys(priorities) as AttributeKey[]).filter(k => priorities[k]);
  const themes = getThemeBreakdown(product.id);

  // Map 0-100 score to 4 verdict states
  let verdictLabel = 'Good fit';
  let verdictStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  let strokeColor = '#0284C7';

  if (activeKeys.length === 0) {
    verdictLabel = 'Select priorities';
    verdictStyle = 'bg-gray-100 text-gray-500 border-gray-200';
    strokeColor = '#CBD5E1';
  } else if (matchResult.score >= 70) {
    verdictLabel = 'Good fit';
    verdictStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    strokeColor = '#059669';
  } else if (matchResult.score >= 40) {
    verdictLabel = 'Mixed fit';
    verdictStyle = 'bg-amber-50 text-amber-800 border-amber-200';
    strokeColor = '#D97706';
  } else {
    verdictLabel = 'Potential mismatch';
    verdictStyle = 'bg-rose-50 text-rose-800 border-rose-200';
    strokeColor = '#DC2626';
  }

  // Calculate evidence counts for selected priorities
  const relevantReviewCount =
    activeKeys.length > 0
      ? themes
          .filter(t => activeKeys.includes(t.key))
          .reduce((sum, t) => sum + t.totalMentions, 0)
      : product.sampleReviewCount;

  // Circular gauge offset
  const strokeDashoffset =
    activeKeys.length === 0
      ? 251.2
      : Math.max(0, 251.2 - (251.2 * matchResult.score) / 100);

  const handleHowItCalculatedClick = () => {
    if (onNavigateCalculation) {
      onNavigateCalculation();
    } else {
      setShowCalculationModal(!showCalculationModal);
    }
  };

  const handleViewSupportingReviewsClick = (attribute?: AttributeKey, label?: string) => {
    if (onNavigateSupportingReviews) {
      onNavigateSupportingReviews(
        attribute,
        undefined,
        attribute
          ? `${product.name} — ${label || attribute} Evidence`
          : `${product.name} — Personalized Recommendation Evidence`
      );
    } else {
      onOpenEvidence(
        `${product.name} — ${label || 'Personalized Evidence'}`,
        `Customer reviews related to your chosen criteria.`,
        undefined,
        attribute
      );
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-[#D5E9FA] p-6 sm:p-10 space-y-8 shadow-card">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E9FA] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7]">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Personalized Decision Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#182C45] tracking-tight">
            Is this product right for you?
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            VOX weighs customer satisfaction across your chosen priorities to assess genuine compatibility.
          </p>
        </div>

        <button
          onClick={handleHowItCalculatedClick}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] bg-[#EAF5FF] px-4 py-2.5 rounded-xl border border-[#B8DBF7] transition-colors self-start sm:self-auto shadow-soft"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>How is this calculated?</span>
        </button>
      </div>

      {/* 1. Purchasing Priorities Selector */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
          Select What Matters Most to You:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_PRIORITIES.map(p => {
            const isSelected = !!priorities[p.key];
            return (
              <button
                key={p.key}
                onClick={() => onTogglePriority(p.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0284C7] text-white shadow-sm'
                    : 'bg-[#F5F8FC] text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF] hover:text-[#0284C7]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Personalized Decision Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F5F8FC] p-6 sm:p-8 rounded-3xl border border-[#D5E9FA]">
        {/* Left Circular Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-3 border-b lg:border-b-0 lg:border-r border-[#D5E9FA] pb-6 lg:pb-0 lg:pr-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#E2E8F0]"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                style={{ stroke: strokeColor }}
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#182C45] leading-none tracking-tight">
                {activeKeys.length === 0 ? '—' : `${matchResult.score}%`}
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mt-1">
                Fit Score
              </span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${verdictStyle}`}
          >
            {verdictLabel}
          </span>
        </div>

        {/* Right Insight Narrative */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Tailored Customer Advice
            </span>
            <p className="text-sm sm:text-base text-[#182C45] leading-relaxed font-normal">
              {matchResult.summary}
            </p>
          </div>

          {/* Breakdown for Selected Priorities */}
          {activeKeys.length > 0 && matchResult.matchDetails && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                Evidence Breakdown by Selected Factor:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchResult.matchDetails.map(item => (
                  <div
                    key={item.key}
                    onClick={() => handleViewSupportingReviewsClick(item.key, item.label)}
                    className="bg-white p-2.5 rounded-xl border border-[#D5E9FA] hover:border-[#8CBCE5] cursor-pointer transition-colors flex items-center justify-between group shadow-soft"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#182C45] group-hover:text-[#0284C7]">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-[#0284C7]">
                        {item.score}% satisfaction
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#94A3B8] group-hover:text-[#0284C7] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Count Citation Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-[#64748B] border-t border-[#D5E9FA] gap-2">
            <span>
              Synthesized from <strong className="text-[#182C45]">{relevantReviewCount}</strong> relevant customer review mentions
            </span>
            <button
              onClick={() => handleViewSupportingReviewsClick()}
              className="text-[#0284C7] hover:text-[#0369A1] font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>View supporting reviews &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calculation Transparency Drawer (Fallback) */}
      {showCalculationModal && (
        <div className="p-6 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] text-xs text-[#475569] space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-[#0284C7] font-bold text-sm">
              <Info className="w-4 h-4" />
              <span>How VOX Calculates Your Fit Score</span>
            </div>
            <button
              onClick={() => setShowCalculationModal(false)}
              className="text-[#94A3B8] hover:text-[#182C45]"
            >
              ✕
            </button>
          </div>
          <p className="leading-relaxed text-[#334155]">
            VOX parses customer reviews and maps sentences to core product attributes (Battery, Camera, Reliability, Performance, Value, Software). When you select priority tags, the algorithm extracts the net positive sentiment score specifically for those attributes and computes a uniform-denominator percentage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1 font-mono">
            <div className="p-2.5 rounded-lg bg-white border border-[#D5E9FA]">
              <span className="text-[#0284C7] font-bold block">1. Attribute Extraction</span>
              <span>Reviews filtered by selected priority mentions.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#D5E9FA]">
              <span className="text-[#0284C7] font-bold block">2. Net Positive Ratio</span>
              <span>Positive mentions divided by total attribute discussions.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#D5E9FA]">
              <span className="text-[#0284C7] font-bold block">3. Combined Score</span>
              <span>Equal weight average across selected priorities.</span>
            </div>
          </div>
          <div className="pt-2 text-right">
            <button
              onClick={onNavigateCalculation}
              className="text-[#0284C7] hover:text-[#0369A1] font-bold underline"
            >
              Open Full Transparent Calculation Audit Screen &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
