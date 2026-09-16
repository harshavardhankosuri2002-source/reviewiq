import React from 'react';
import { AISummaryQuadrant } from '../types';
import { ThumbsUp, AlertTriangle, HelpCircle, ShieldAlert, FileText, ArrowRight, Sparkles } from 'lucide-react';

interface AISummaryCardProps {
  summary: AISummaryQuadrant;
  productName: string;
  onOpenEvidence: (title: string, subtitle: string, reviewIds: string[]) => void;
}

export const AISummaryCard: React.FC<AISummaryCardProps> = ({
  summary,
  productName,
  onOpenEvidence,
}) => {
  return (
    <div className="rounded-3xl bg-white border border-[#D5E9FA] p-6 sm:p-10 space-y-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E9FA] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Evidence-Backed AI Summary
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight">
            Decoded Review Summary
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Objective customer consensus separated into praise, complaints, and purchasing caveats.
          </p>
        </div>

        <div className="text-[11px] font-mono text-[#0284C7] bg-[#EAF5FF] px-3.5 py-1.5 rounded-xl border border-[#D5E9FA] self-start sm:self-auto font-semibold">
          Grounded in Verified Dataset
        </div>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quadrant 1: Most Appreciated Features */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 flex flex-col justify-between space-y-5 hover:border-emerald-300 transition-all shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">
                {summary.appreciatedFeatures.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {summary.appreciatedFeatures.points.map((pt, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#475569] leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              onOpenEvidence(
                `${productName} — Appreciated Features`,
                'Verified customer reviews praising battery endurance, display clarity, and speed.',
                summary.appreciatedFeatures.supportingReviewIds
              )
            }
            className="inline-flex items-center justify-between w-full pt-4 border-t border-emerald-100 text-xs font-bold text-[#475569] hover:text-[#182C45] group transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>View supporting reviews ({summary.appreciatedFeatures.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quadrant 2: Common Complaints */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 flex flex-col justify-between space-y-5 hover:border-rose-300 transition-all shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">
                {summary.commonComplaints.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {summary.commonComplaints.points.map((pt, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#475569] leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              onOpenEvidence(
                `${productName} — Common Complaints`,
                'Customer feedback highlighting charging speeds, refresh rate, and ergonomics.',
                summary.commonComplaints.supportingReviewIds
              )
            }
            className="inline-flex items-center justify-between w-full pt-4 border-t border-rose-100 text-xs font-bold text-[#475569] hover:text-[#182C45] group transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              <span>View supporting reviews ({summary.commonComplaints.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-rose-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quadrant 3: Mixed / Conflicting Opinions */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 flex flex-col justify-between space-y-5 hover:border-amber-300 transition-all shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">
                {summary.mixedOpinions.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {summary.mixedOpinions.points.map((pt, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#475569] leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              onOpenEvidence(
                `${productName} — Mixed Opinions`,
                'Reviews showing divergent opinions on software features and design ergonomics.',
                summary.mixedOpinions.supportingReviewIds
              )
            }
            className="inline-flex items-center justify-between w-full pt-4 border-t border-amber-100 text-xs font-bold text-[#475569] hover:text-[#182C45] group transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>View supporting reviews ({summary.mixedOpinions.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quadrant 4: Important Caveats Before Buying */}
        <div className="rounded-2xl border border-[#D5E9FA] bg-[#EAF5FF]/40 p-6 flex flex-col justify-between space-y-5 hover:border-[#8CBCE5] transition-all shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">
                {summary.importantCaveats.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {summary.importantCaveats.points.map((pt, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#475569] leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              onOpenEvidence(
                `${productName} — Critical Caveats`,
                'Essential considerations and trade-offs before finalizing your purchase.',
                summary.importantCaveats.supportingReviewIds
              )
            }
            className="inline-flex items-center justify-between w-full pt-4 border-t border-[#D5E9FA] text-xs font-bold text-[#475569] hover:text-[#182C45] group transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>View supporting reviews ({summary.importantCaveats.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
