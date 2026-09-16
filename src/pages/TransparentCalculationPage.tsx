import React from 'react';
import {
  Product,
  PrioritySelection,
  AttributeKey,
  AttributeCalculation,
} from '../types';
import {
  calculatePersonalizedRecommendationAudit,
  calculateAttributeConsensus,
} from '../utils/analytics';
import { ATTRIBUTE_CONFIG } from '../data/mockData';
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MinusCircle,
  HelpCircle,
  Scale,
  AlertTriangle,
  Info,
  Check,
  ArrowRight,
  Calculator,
} from 'lucide-react';

interface TransparentCalculationPageProps {
  product: Product;
  selectedVariant?: string;
  priorities: PrioritySelection;
  onTogglePriority: (key: AttributeKey) => void;
  onBackToProduct: () => void;
  onNavigateSupportingReviews: (attribute?: AttributeKey) => void;
}

const ALL_PRIORITIES: { key: AttributeKey; label: string; description: string }[] = [
  { key: 'battery', label: 'Battery life', description: 'Endurance, charging speed, and thermal drain' },
  { key: 'camera', label: 'Camera quality', description: 'Photo clarity, low-light fidelity, and video capture' },
  { key: 'reliability', label: 'Reliability', description: 'Build durability, drop resistance, and hardware lifespan' },
  { key: 'performance', label: 'Performance', description: 'Processor velocity, multitasking, and thermal stability' },
  { key: 'value', label: 'Value for money', description: 'Price-to-feature balance and longevity' },
  { key: 'software', label: 'Software experience', description: 'OS fluidity, update track record, and AI utilities' },
];

export const TransparentCalculationPage: React.FC<TransparentCalculationPageProps> = ({
  product,
  priorities,
  onTogglePriority,
  onBackToProduct,
  onNavigateSupportingReviews,
}) => {
  const audit = calculatePersonalizedRecommendationAudit(product.id, priorities);
  const activeKeys = (Object.keys(priorities) as AttributeKey[]).filter(k => priorities[k]);

  // If no priorities are selected, show calculations for all attributes to provide full transparency
  const displayCalculations: AttributeCalculation[] =
    activeKeys.length > 0
      ? audit.attributeCalculations
      : (Object.keys(ATTRIBUTE_CONFIG) as AttributeKey[]).map(key =>
          calculateAttributeConsensus(product.id, key)
        );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={onBackToProduct}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#182C45] hover:text-[#0284C7] bg-white px-4 py-2 rounded-xl border border-[#D5E9FA] hover:bg-[#EAF5FF] transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
            <span>Back to {product.name}</span>
          </button>

          <span className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-wider bg-[#EAF5FF] px-3 py-1 rounded-lg border border-[#D5E9FA]">
            Academic Prototype Methodology
          </span>
        </div>

        {/* Hero Title Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D5E9FA] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAF5FF] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1.5 rounded-lg bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
                <Calculator className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest">
                Decision Support Transparency
              </span>
              <span className="text-xs text-[#94A3B8]">•</span>
              <span className="text-xs text-[#64748B]">{product.name}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#182C45] tracking-tight">
              Transparent Calculation & Recommendation Logic
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-3xl font-normal leading-relaxed">
              An open, step-by-step mathematical audit showing exactly how customer feedback is mapped to your selected priorities, how consensus percentages are computed, and how personalized verdicts are determined.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Prototype Disclosure Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF5FF] border border-[#8CBCE5] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#182C45] space-y-1">
          <strong className="font-bold block">
            Academic Prototype Demonstration Rules
          </strong>
          <p className="text-[#475569] leading-relaxed">
            VOX calculates scores directly from the simulated review sample. Consensus percentages use uniform denominators and sum to 100%. These thresholds are educational demonstration heuristics designed for transparent decision support rather than scientifically validated absolutes.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION A: Selected Priorities & Rationale */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E9FA] space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#D5E9FA] pb-4">
          <div className="w-8 h-8 rounded-xl bg-[#EAF5FF] text-[#0284C7] flex items-center justify-center font-bold text-sm border border-[#D5E9FA]">
            A
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#182C45]">
              Your Selected Priorities
            </h2>
            <p className="text-xs text-[#64748B]">
              Personalized evaluation isolates feedback that directly impacts your decision.
            </p>
          </div>
        </div>

        {/* Priority Toggle Buttons */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Toggle Priorities to Update Calculations in Real-Time:
            </span>
            <span className="text-xs text-[#0284C7] font-semibold">
              {activeKeys.length} of {ALL_PRIORITIES.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ALL_PRIORITIES.map(p => {
              const isSelected = !!priorities[p.key];
              return (
                <button
                  key={p.key}
                  onClick={() => onTogglePriority(p.key)}
                  className={`p-3.5 rounded-2xl text-left transition-all border flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#EAF5FF] border-[#0284C7] text-[#182C45] shadow-2xs'
                      : 'bg-[#F5F8FC] border-[#D5E9FA] text-[#475569] hover:bg-[#EAF5FF]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold block">{p.label}</span>
                    <span className="text-[11px] text-[#64748B] line-clamp-1">{p.description}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-[#0284C7] text-white border-[#0284C7]'
                        : 'border-[#D5E9FA] bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rationale Explanation Box */}
        <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] text-xs sm:text-sm text-[#475569] space-y-2 leading-relaxed">
          <strong className="text-[#182C45] font-semibold block">
            Why VOX Prioritizes Attribute Isolation Over Overall Star Ratings:
          </strong>
          <p>
            Standard marketplace ratings (e.g. 4.3 out of 5 stars) average all customer opinions together. A buyer who loves camera quality may award 5 stars even if battery life is mediocre, which misleads a customer who needs two-day battery stamina.
          </p>
          <p className="text-[#64748B]">
            VOX extracts only the customer reviews mentioning your specific purchasing criteria ({activeKeys.length > 0 ? activeKeys.map(k => ATTRIBUTE_CONFIG[k].label).join(', ') : 'all core criteria'}), providing an honest, targeted signal.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION B: Attribute-Level Calculations */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E9FA] space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#D5E9FA] pb-4">
          <div className="w-8 h-8 rounded-xl bg-[#EAF5FF] text-[#0284C7] flex items-center justify-center font-bold text-sm border border-[#D5E9FA]">
            B
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#182C45]">
              Attribute-Level Mathematical Breakdown
            </h2>
            <p className="text-xs text-[#64748B]">
              Formulas, counts, step-by-step arithmetic, and denominator integrity.
            </p>
          </div>
        </div>

        {/* Illustrative Formula Reference Box */}
        <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-3 text-xs sm:text-sm">
          <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider block">
            Mathematical Consensus Formulas (Equal Denominator Rule):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#D5E9FA]">
              <span className="text-emerald-700 font-bold block mb-1">1. Positive Consensus:</span>
              <span className="text-[#182C45]">
                (Positive Reviews / Total Relevant) × 100%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#D5E9FA]">
              <span className="text-amber-700 font-bold block mb-1">2. Mixed Consensus:</span>
              <span className="text-[#182C45]">
                (Mixed Reviews / Total Relevant) × 100%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#D5E9FA]">
              <span className="text-rose-700 font-bold block mb-1">3. Negative Consensus:</span>
              <span className="text-[#182C45]">
                (Negative Reviews / Total Relevant) × 100%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#EAF5FF] border border-[#D5E9FA] text-xs text-[#475569]">
            <strong className="text-[#0284C7]">Illustrative Reference Example (Sample Only):</strong> If 10 sample reviews discuss battery life (6 positive, 2 mixed, 2 negative), the calculation is: <br />
            <span className="font-mono text-[#182C45]">
              Positive: (6 / 10) × 100 = 60% • Mixed: (2 / 10) × 100 = 20% • Negative: (2 / 10) × 100 = 20% (Sum: 100%)
            </span>
          </div>
        </div>

        {/* Real Data Attribute Cards */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
            {activeKeys.length > 0 ? 'Calculations for Your Selected Priorities:' : 'Calculations for All Product Attributes:'}
          </span>

          <div className="space-y-4">
            {displayCalculations.map(calc => {
              const N = calc.totalRelevantReviews;
              const P = calc.positiveReviews;
              const M = calc.mixedReviews;
              const Neg = calc.negativeReviews;

              return (
                <div
                  key={calc.attributeKey}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-4"
                >
                  {/* Attribute Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5E9FA] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-[#182C45]">
                        {calc.label}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          calc.verdict === 'Good fit'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : calc.verdict === 'Mixed fit'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : calc.verdict === 'Potential mismatch'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {calc.verdict}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigateSupportingReviews(calc.attributeKey)}
                      className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
                    >
                      <span>Inspect {N} supporting reviews</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Step-by-Step Arithmetic Calculation Display */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Left: Numbers & Formula */}
                    <div className="lg:col-span-8 space-y-2 text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#182C45]">
                          {calc.positiveConsensusPct}% positive consensus
                        </span>
                        <span className="text-xs text-[#64748B]">
                          ({P} positive reviews out of {N} relevant sample reviews)
                        </span>
                      </div>

                      {/* Formula Step */}
                      <div className="font-mono text-xs text-[#182C45] bg-white p-2.5 rounded-xl border border-[#D5E9FA]">
                        <span>Calculation: </span>
                        <span className="text-emerald-700 font-bold">({P} / {N}) × 100 = {calc.positiveConsensusPct}%</span>
                        <span className="text-[#94A3B8]"> • Mixed: </span>
                        <span className="text-amber-700 font-bold">({M} / {N}) × 100 = {calc.mixedConsensusPct}%</span>
                        <span className="text-[#94A3B8]"> • Negative: </span>
                        <span className="text-rose-700 font-bold">({Neg} / {N}) × 100 = {calc.negativeConsensusPct}%</span>
                      </div>

                      <div className="text-[11px] text-[#64748B] flex items-center gap-2">
                        <span>Denominator Audit:</span>
                        <span className="text-[#182C45] font-mono">
                          {P} + {M} + {Neg} = {N} reviews ({calc.positiveConsensusPct + calc.mixedConsensusPct + calc.negativeConsensusPct}%)
                        </span>
                      </div>
                    </div>

                    {/* Right: Visual Distribution Bar */}
                    <div className="lg:col-span-4 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                        Sentiment Proportion
                      </span>
                      <div className="h-3 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden p-0.5 border border-[#D5E9FA]">
                        <div
                          style={{ width: `${calc.positiveConsensusPct}%` }}
                          className="h-full bg-emerald-500 rounded-l-full"
                          title={`Positive: ${P} (${calc.positiveConsensusPct}%)`}
                        />
                        <div
                          style={{ width: `${calc.mixedConsensusPct}%` }}
                          className="h-full bg-amber-500"
                          title={`Mixed: ${M} (${calc.mixedConsensusPct}%)`}
                        />
                        <div
                          style={{ width: `${calc.negativeConsensusPct}%` }}
                          className="h-full bg-rose-500 rounded-r-full"
                          title={`Negative: ${Neg} (${calc.negativeConsensusPct}%)`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-emerald-700 font-bold">{P} pos</span>
                        <span className="text-amber-700 font-bold">{M} mix</span>
                        <span className="text-rose-700 font-bold">{Neg} neg</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION C: Personalized Recommendation Logic */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E9FA] space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#D5E9FA] pb-4">
          <div className="w-8 h-8 rounded-xl bg-[#EAF5FF] text-[#0284C7] flex items-center justify-center font-bold text-sm border border-[#D5E9FA]">
            C
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#182C45]">
              Personalized Recommendation Logic
            </h2>
            <p className="text-xs text-[#64748B]">
              Prototype classification thresholds and multi-priority conflict resolution.
            </p>
          </div>
        </div>

        {/* Prototype Decision Rules Matrix */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider block">
            Decision Rules & Threshold Matrix:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Good Fit</span>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">
                At least <strong className="text-[#182C45]">70% positive consensus</strong>, sufficient sample evidence (N &ge; 4), and no severe recurring negative signal (negative &lt; 20%).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
                <MinusCircle className="w-4 h-4 text-amber-600" />
                <span>Mixed Fit</span>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">
                Positive consensus between <strong className="text-[#182C45]">40% and 69%</strong>, or meaningful conflicting opinions across selected priorities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-rose-800 text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Potential Mismatch</span>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">
                Positive consensus <strong className="text-[#182C45]">below 40%</strong> with sufficient evidence (N &ge; 4).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#64748B] text-sm">
                <HelpCircle className="w-4 h-4 text-[#64748B]" />
                <span>Not Enough Evidence</span>
              </div>
              <p className="text-[#475569] text-xs leading-relaxed">
                Fewer than <strong className="text-[#182C45]">4 sample reviews</strong> evaluating the selected priority in the dataset.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Priority Evaluation & Conflict Explanation */}
        <div className="p-5 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7] uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Multi-Priority Evaluation for {product.name}:</span>
          </div>

          <p className="text-xs sm:text-sm text-[#182C45] leading-relaxed">
            {audit.verdictRationale}
          </p>

          {/* Conflict Alert if present */}
          {audit.conflicts.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Conflicting Priority Trade-Off Detected:</span>
              </div>
              <p className="leading-relaxed">
                {audit.conflicts[0].description} Rather than hiding this conflict behind a single averaged score, VOX highlights that you may need to choose between these two attributes.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION D: Limitations, Caveats, and Uncertainty */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E9FA] space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#D5E9FA] pb-4">
          <div className="w-8 h-8 rounded-xl bg-[#EAF5FF] text-[#0284C7] flex items-center justify-center font-bold text-sm border border-[#D5E9FA]">
            D
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#182C45]">
              Limitations, Uncertainty & Caveats
            </h2>
            <p className="text-xs text-[#64748B]">
              Clear explanation of what these calculations do and do not establish.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#475569]">
          <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-1.5">
            <span className="font-bold text-[#182C45] block">1. Sample Size Limitations</span>
            <p className="text-[#64748B] leading-relaxed text-xs">
              Simulated demonstration samples (6–18 reviews per phone) cannot represent every edge case or the full worldwide user base.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-1.5">
            <span className="font-bold text-[#182C45] block">2. Self-Selection Reporting Bias</span>
            <p className="text-[#64748B] leading-relaxed text-xs">
              Consumers who encounter extreme positive or negative experiences are more likely to write reviews than satisfied everyday buyers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-1.5">
            <span className="font-bold text-[#182C45] block">3. Hardware & Storage Variants</span>
            <p className="text-[#64748B] leading-relaxed text-xs">
              Experience with battery life or thermals may differ between base storage tiers, regional processors, or over-the-air firmware versions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] space-y-1.5">
            <span className="font-bold text-[#182C45] block">4. Consensus vs. Satisfaction Probability</span>
            <p className="text-[#64748B] leading-relaxed text-xs">
              A 70% positive consensus indicates that 70% of sampled feedback was positive, not a 70% mathematical guarantee that an individual buyer will be satisfied.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#182C45]">
            Ready to inspect the evidence?
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Read the actual customer reviews that produced these numbers for {product.name}.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onBackToProduct}
            className="text-xs font-bold text-[#182C45] hover:text-[#0284C7] px-4 py-3 rounded-xl border border-[#D5E9FA] bg-[#F5F8FC] hover:bg-[#EAF5FF] transition-colors"
          >
            Back to Recommendation
          </button>
          <button
            onClick={() => onNavigateSupportingReviews()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3 rounded-xl transition-all shadow-2xs"
          >
            <span>View Supporting Reviews &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
