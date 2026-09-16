import React, { useState } from 'react';
import { Product } from '../types';
import { ShieldCheck, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface TrustAndQualityCardProps {
  product: Product;
}

export const TrustAndQualityCard: React.FC<TrustAndQualityCardProps> = ({ product }) => {
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);

  const toggleSignal = (id: string) => {
    setExpandedSignal(expandedSignal === id ? null : id);
  };

  const signals = [
    {
      id: 'source-cov',
      label: 'Cross-Source Coverage Balance',
      status: product.trustIndicators.sourceCoverageScore >= 80 ? 'optimal' : 'moderate',
      scoreText: `${product.trustIndicators.sourceCoverageScore}% Balance`,
      summary: 'Feedback is corroborated across retail, marketplace, and technical enthusiast channels.',
      details: 'Evaluates whether review volume is concentrated in a single merchant channel or corroborated across independent consumer forums and marketplaces to mitigate vendor bias.',
    },
    {
      id: 'date-cov',
      label: 'Review Recency & Timeline Stability',
      status: product.trustIndicators.recencyConfidence === 'High' ? 'optimal' : 'moderate',
      scoreText: product.trustIndicators.recencyConfidence,
      summary: product.trustIndicators.recencyNote,
      details: `Reviews span from ${product.dateRange.start} through ${product.dateRange.end}. Steady post-launch review velocity prevents single-day promotional spikes from skewing overall ratings.`,
    },
    {
      id: 'dup-pattern',
      label: 'Text Clustering & Pattern Analysis',
      status: product.trustIndicators.duplicatePatternFlag ? 'warning' : 'optimal',
      scoreText: product.trustIndicators.duplicatePatternFlag ? 'Potential anomaly' : 'Clear',
      summary: product.trustIndicators.duplicatePatternNote,
      details: product.trustIndicators.duplicatePatternFlag
        ? 'Identified reviews from retailer sources sharing closely aligned sentence cadence regarding unboxing.'
        : 'Lexical analysis shows diverse sentence construction, unique user syntax, and natural error variance across all verified reviews.',
    },
    {
      id: 'variant-info',
      label: 'Hardware Variant Specificity',
      status: product.trustIndicators.variantCompletenessScore >= 85 ? 'optimal' : 'moderate',
      scoreText: `${product.trustIndicators.variantCompletenessScore}% Specificity`,
      summary: product.trustIndicators.variantNote,
      details: 'Tracks whether reviewers state their exact storage tier or processor configuration. High variant clarity allows consumers to differentiate thermal or battery complaints related to specific hardware configs.',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#D5E9FA] shadow-sm p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E9FA] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Review Integrity & Trust Signals
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#182C45] tracking-tight">
            Data Quality & Authenticity Audit
          </h2>
          <p className="text-xs text-[#64748B]">
            Systematic audit of sample distribution, temporal clustering, and source diversity.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#0284C7] bg-[#EAF5FF] border border-[#D5E9FA] px-3.5 py-1.5 rounded-xl self-start sm:self-auto font-semibold">
          Audit Model: v2.4 (Simulated)
        </span>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {signals.map(sig => (
          <div
            key={sig.id}
            className={`rounded-2xl border p-5 transition-all shadow-xs ${
              sig.status === 'warning'
                ? 'bg-amber-50/40 border-amber-200'
                : 'bg-[#F5F8FC] border-[#D5E9FA] hover:border-[#8CBCE5]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {sig.status === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <h4 className="text-sm font-bold text-[#182C45]">{sig.label}</h4>
              </div>

              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  sig.status === 'warning'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {sig.scoreText}
              </span>
            </div>

            <p className="text-xs text-[#475569] mb-3">{sig.summary}</p>

            <button
              onClick={() => toggleSignal(sig.id)}
              className="text-[11px] font-bold text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1 transition-colors"
            >
              <span>{expandedSignal === sig.id ? 'Hide audit explanation' : 'View audit methodology'}</span>
              {expandedSignal === sig.id ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedSignal === sig.id && (
              <div className="mt-3 pt-3 border-t border-[#D5E9FA] text-xs text-[#64748B] leading-relaxed animate-fadeIn">
                {sig.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
