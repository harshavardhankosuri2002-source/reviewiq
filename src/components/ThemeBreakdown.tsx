import React from 'react';
import { AttributeThemeInfo, AttributeKey } from '../types';
import { BatteryCharging, Camera, ShieldCheck, Zap, DollarSign, Cpu, FileText, ArrowRight } from 'lucide-react';

interface ThemeBreakdownProps {
  themes: AttributeThemeInfo[];
  productName: string;
  onOpenAttributeEvidence: (attrKey: AttributeKey, label: string) => void;
}

const ICON_MAP: Record<AttributeKey, React.ComponentType<{ className?: string }>> = {
  battery: BatteryCharging,
  camera: Camera,
  reliability: ShieldCheck,
  performance: Zap,
  value: DollarSign,
  software: Cpu,
};

export const ThemeBreakdown: React.FC<ThemeBreakdownProps> = ({
  themes,
  productName,
  onOpenAttributeEvidence,
}) => {
  return (
    <div className="rounded-3xl bg-white border border-[#D5E9FA] p-6 sm:p-10 space-y-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E9FA] pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
            Attribute-by-Attribute Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight">
            Review Theme Analysis
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Sentiment volume and key takeaways across the 6 core consumer purchasing dimensions.
          </p>
        </div>
        <span className="text-[11px] text-[#0284C7] font-mono bg-[#EAF5FF] px-3.5 py-1.5 rounded-xl border border-[#D5E9FA] self-start sm:self-auto font-semibold">
          6 Core Dimensions
        </span>
      </div>

      {/* Grid of 6 Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {themes.map(theme => {
          const IconComponent = ICON_MAP[theme.key] || Zap;

          return (
            <div
              key={theme.key}
              className="rounded-2xl border border-[#D5E9FA] p-6 bg-white hover:border-[#8CBCE5] hover:shadow-md transition-all flex flex-col justify-between space-y-5 shadow-xs group"
            >
              <div className="space-y-4">
                {/* Header: Icon + Title + Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#EAF5FF] border border-[#D5E9FA] text-[#0284C7] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#182C45]">{theme.label}</h4>
                      <span className="text-[11px] text-[#64748B] font-medium">
                        {theme.totalMentions} mentions
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border font-mono ${
                      theme.positiveScore >= 65
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : theme.positiveScore <= 40
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {theme.positiveScore}% Pos
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden">
                  <div
                    style={{ width: `${(theme.positiveMentions / theme.totalMentions) * 100}%` }}
                    className="bg-emerald-500"
                    title={`Positive: ${theme.positiveMentions}`}
                  />
                  <div
                    style={{ width: `${(theme.mixedMentions / theme.totalMentions) * 100}%` }}
                    className="bg-amber-500"
                    title={`Mixed: ${theme.mixedMentions}`}
                  />
                  <div
                    style={{ width: `${(theme.negativeMentions / theme.totalMentions) * 100}%` }}
                    className="bg-rose-500"
                    title={`Negative: ${theme.negativeMentions}`}
                  />
                </div>

                {/* Synthesis Narrative */}
                <p className="text-xs text-[#475569] leading-relaxed font-normal">
                  {theme.explanation}
                </p>

                {/* Highlight Quote Chip */}
                {theme.highlightQuote && (
                  <div className="p-3 rounded-xl bg-[#F5F8FC] border-l-2 border-[#0284C7] text-[#182C45] text-xs italic space-y-1">
                    <p className="leading-snug">"{theme.highlightQuote}"</p>
                  </div>
                )}
              </div>

              {/* Drill-down button */}
              <button
                onClick={() => onOpenAttributeEvidence(theme.key, theme.label)}
                className="inline-flex items-center justify-between w-full pt-3 border-t border-[#E2E8F0] text-xs font-bold text-[#475569] hover:text-[#182C45] transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Inspect {theme.label} reviews</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
