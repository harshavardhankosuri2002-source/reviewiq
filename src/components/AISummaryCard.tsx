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
    <div className="rounded-3xl frosted-modal p-5 sm:p-7 space-y-5 border border-white/80 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3.5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="p-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
              Evidence-Backed AI Summary
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Decoded Review Summary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective customer consensus separated into praises (Do's), complaints (Don'ts), and purchasing caveats.
          </p>
        </div>

        <div className="text-[10px] font-mono text-sky-800 bg-sky-50/80 px-2.5 py-1 rounded-lg border border-sky-200 self-start sm:self-auto font-semibold">
          Grounded in Verified Dataset
        </div>
      </div>

      {/* 4 Quadrants Grid - Balanced & Uniform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Quadrant 1: Most Appreciated Features (The Do's) */}
        <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/60 p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-2xs hover:border-emerald-300 transition-all">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ThumbsUp className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {summary.appreciatedFeatures.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {summary.appreciatedFeatures.points.map((pt, i) => (
                <li key={i} className="text-xs text-slate-700 leading-snug flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
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
            className="inline-flex items-center justify-between w-full pt-2.5 border-t border-emerald-200/80 text-[11px] font-bold text-emerald-900 hover:text-emerald-950 group transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-emerald-600" />
              <span>View supporting reviews ({summary.appreciatedFeatures.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3 h-3 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quadrant 2: Common Complaints (The Don'ts) */}
        <div className="rounded-2xl border border-rose-200/90 bg-rose-50/60 p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-2xs hover:border-rose-300 transition-all">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {summary.commonComplaints.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {summary.commonComplaints.points.map((pt, i) => (
                <li key={i} className="text-xs text-slate-700 leading-snug flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
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
            className="inline-flex items-center justify-between w-full pt-2.5 border-t border-rose-200/80 text-[11px] font-bold text-rose-900 hover:text-rose-950 group transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-rose-600" />
              <span>View supporting reviews ({summary.commonComplaints.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3 h-3 text-rose-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quadrant 3: Mixed / Conflicting Opinions */}
        <div className="rounded-2xl border border-amber-200/90 bg-amber-50/60 p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-2xs hover:border-amber-300 transition-all">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {summary.mixedOpinions.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {summary.mixedOpinions.points.map((pt, i) => (
                <li key={i} className="text-xs text-slate-700 leading-snug flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
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
            className="inline-flex items-center justify-between w-full pt-2.5 border-t border-amber-200/80 text-[11px] font-bold text-amber-900 hover:text-amber-950 group transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-amber-600" />
              <span>View supporting reviews ({summary.mixedOpinions.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quadrant 4: Important Caveats Before Buying */}
        <div className="rounded-2xl border border-sky-200/90 bg-sky-50/60 p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-2xs hover:border-sky-300 transition-all">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-100 text-sky-800 border border-sky-200">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {summary.importantCaveats.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {summary.importantCaveats.points.map((pt, i) => (
                <li key={i} className="text-xs text-slate-700 leading-snug flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
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
            className="inline-flex items-center justify-between w-full pt-2.5 border-t border-sky-200/80 text-[11px] font-bold text-sky-900 hover:text-sky-950 group transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-sky-600" />
              <span>View supporting reviews ({summary.importantCaveats.supportingReviewIds.length})</span>
            </span>
            <ArrowRight className="w-3 h-3 text-sky-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
