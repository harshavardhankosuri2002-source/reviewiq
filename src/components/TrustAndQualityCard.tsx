import React, { useState } from 'react';
import { Product, StressScenarioId } from '../types';
import { ShieldCheck, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ShieldAlert, RotateCcw } from 'lucide-react';
import { STRESS_SCENARIOS } from '../data/mockData';

interface TrustAndQualityCardProps {
  product: Product;
}

export const TrustAndQualityCard: React.FC<TrustAndQualityCardProps> = ({ product }) => {
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<StressScenarioId>('baseline');

  const toggleSignal = (id: string) => {
    setExpandedSignal(expandedSignal === id ? null : id);
  };

  const currentScenario = STRESS_SCENARIOS.find(s => s.id === activeScenarioId) || STRESS_SCENARIOS[0];

  // Calculate stress-tested authenticity metrics
  const rawCoverage = product.trustIndicators.sourceCoverageScore;
  const rawVariant = product.trustIndicators.variantCompletenessScore;
  const confidencePenalty = currentScenario.confidencePenaltyPct;
  const adjustedTrustScore = Math.max(25, Math.round(((rawCoverage + rawVariant) / 2) - confidencePenalty));

  const signals = [
    {
      id: 'source-cov',
      label: 'Cross-Source Coverage Balance',
      status: activeScenarioId !== 'baseline' ? 'moderate' : (product.trustIndicators.sourceCoverageScore >= 80 ? 'optimal' : 'moderate'),
      scoreText: `${product.trustIndicators.sourceCoverageScore}% Balance`,
      summary: 'Feedback is corroborated across retail, marketplace, and technical enthusiast channels.',
      details: 'Evaluates whether review volume is concentrated in a single merchant channel or corroborated across independent consumer forums and marketplaces to mitigate vendor bias.',
    },
    {
      id: 'date-cov',
      label: 'Review Recency & Timeline Stability',
      status: activeScenarioId === 'sponsored_surge' ? 'warning' : (product.trustIndicators.recencyConfidence === 'High' ? 'optimal' : 'moderate'),
      scoreText: activeScenarioId === 'sponsored_surge' ? 'Suspicious Burst' : product.trustIndicators.recencyConfidence,
      summary: activeScenarioId === 'sponsored_surge' ? 'Unusual burst velocity: +50 reviews detected in 48 hours' : product.trustIndicators.recencyNote,
      details: `Reviews span from ${product.dateRange.start} through ${product.dateRange.end}. Steady post-launch review velocity prevents single-day promotional spikes from skewing overall ratings.`,
    },
    {
      id: 'dup-pattern',
      label: 'Text Clustering & Pattern Analysis',
      status: (product.trustIndicators.duplicatePatternFlag || activeScenarioId !== 'baseline') ? 'warning' : 'optimal',
      scoreText: activeScenarioId !== 'baseline' ? 'Cluster Detected' : (product.trustIndicators.duplicatePatternFlag ? 'Potential anomaly' : 'Clear'),
      summary: activeScenarioId === 'sponsored_surge'
        ? '86% lexical similarity across unverified accounts.'
        : activeScenarioId === 'review_bomb'
        ? 'Repetitive 1-star phrasing detected across new accounts.'
        : product.trustIndicators.duplicatePatternNote,
      details: activeScenarioId !== 'baseline'
        ? 'Anomaly detection algorithms isolate duplicate sentences and unverified purchaser clusters.'
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
              Trust & Review Quality Audit
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight">
            Data Integrity & Authenticity Signals
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Statistical indicators identifying linguistic patterns, velocity surges, and sample completeness.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-[#64748B]">Authenticity Index:</span>
          <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
            adjustedTrustScore >= 80
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : adjustedTrustScore >= 60
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-rose-50 text-rose-800 border-rose-300'
          }`}>
            {adjustedTrustScore}% Verified
          </span>
        </div>
      </div>

      {/* Stress-Test Review Manipulation Defense Simulator */}
      <div className="bg-[#F5F8FC] rounded-2xl p-5 border border-[#D5E9FA] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7]">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span className="text-xs font-extrabold text-[#182C45] uppercase tracking-wider">
              Stress-Test Review Manipulation Defense
            </span>
          </div>
          <span className="text-[11px] text-[#64748B]">Interactive MBA Security Simulator</span>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed">
          Inject synthetic review anomalies to observe how ReviewIQ's anti-gaming algorithms protect customer fit scores against coordinated promotional surges or competitor smear campaigns.
        </p>

        {/* Scenario Switcher Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {STRESS_SCENARIOS.map(sc => {
            const isActive = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#182C45] text-white border-[#182C45] shadow-sm'
                    : 'bg-white text-[#182C45] border-[#D5E9FA] hover:bg-[#EAF5FF] hover:border-[#8CBCE5]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{sc.label}</span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />}
                </div>
                <p className={`text-[10px] line-clamp-2 ${isActive ? 'text-slate-300' : 'text-[#64748B]'}`}>
                  {sc.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Anomaly Detection Banner */}
        {activeScenarioId !== 'baseline' ? (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>ANOMALY DETECTED: {currentScenario.anomalyTitle}</span>
              </span>
              <span className="font-mono text-rose-700 font-extrabold">
                -{confidencePenalty}% Confidence Penalty
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-800">
              {currentScenario.anomalyExplanation}
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-rose-700 font-medium">Original Fit Score Protected Against Injected Distortion</span>
              <button
                onClick={() => setActiveScenarioId('baseline')}
                className="inline-flex items-center gap-1 text-rose-800 font-bold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Baseline</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Organic Baseline: Clean lexical diversity and normal temporal review velocity verified.</span>
            </span>
            <span className="font-mono font-bold text-emerald-700">0% Penalty</span>
          </div>
        )}
      </div>

      {/* Signals Accordion List */}
      <div className="divide-y divide-[#D5E9FA] border border-[#D5E9FA] rounded-2xl overflow-hidden bg-white">
        {signals.map(signal => {
          const isExpanded = expandedSignal === signal.id;
          return (
            <div key={signal.id} className="transition-colors hover:bg-[#F5F8FC]">
              <div
                onClick={() => toggleSignal(signal.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  {signal.status === 'optimal' ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : signal.status === 'warning' ? (
                    <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-[#182C45]">{signal.label}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">{signal.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                    signal.status === 'optimal'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : signal.status === 'warning'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {signal.scoreText}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#64748B]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-[#F5F8FC]">
                  <p>{signal.details}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
