import React from 'react';
import { Shield, Info, TrendingUp } from 'lucide-react';
import { VoxLogo } from './VoxLogo';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenCommercialization?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCommercialization }) => {
  return (
    <footer className="bg-white text-[#475569] border-t border-[#D5E9FA] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="cursor-pointer" onClick={() => onNavigate('discover')}>
              <VoxLogo size="md" showTagline={true} />
            </div>
            <p className="text-[#182C45] font-semibold text-sm">
              "Understand the experience behind the rating."
            </p>
            <p className="text-xs text-[#64748B] leading-relaxed max-w-md">
              VOX decodes fragmented customer feedback across marketplaces, retailers, and tech communities into transparent, evidence-backed, and personalized purchasing intelligence.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EAF5FF] border border-[#D5E9FA] text-xs text-[#0284C7] font-medium">
                <Shield className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Uniform-Denominator Standard • 110+ Flagship Records</span>
              </div>
              {onOpenCommercialization && (
                <button
                  onClick={onOpenCommercialization}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs text-amber-800 font-bold transition-colors cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>MBA Commercialization Strategy & Pitch Deck</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-[#182C45] uppercase tracking-wider mb-3">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  Discover Catalogue (23 Models)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  Product Comparison Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('saved')}
                  className="text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  Saved Shortlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="text-[#64748B] hover:text-[#0284C7] transition-colors"
                >
                  Architecture & Methodology
                </button>
              </li>
              {onOpenCommercialization && (
                <li>
                  <button
                    onClick={onOpenCommercialization}
                    className="text-amber-700 hover:text-amber-900 font-bold transition-colors flex items-center gap-1"
                  >
                    <TrendingUp className="w-3 h-3 text-amber-600" />
                    <span>MBA Unit Economics & Deck</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Academic Disclosure */}
          <div>
            <h4 className="text-xs font-bold text-[#182C45] uppercase tracking-wider mb-3">
              Academic Notice
            </h4>
            <div className="p-3.5 rounded-xl bg-[#F5F8FC] border border-[#D5E9FA] text-xs space-y-2 text-[#475569]">
              <div className="flex items-start gap-1.5 text-[#0284C7] font-semibold">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Simulated Research Dataset</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#64748B]">
                All customer reviews, ratings, sources, and AI summaries across all 110+ products are simulated for demonstration purposes. Customer review sentiment adheres strictly to positive + mixed + negative = 100%.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© {new Date().getFullYear()} VOX — Customer feedback, decoded. Academic Demonstration Prototype.</p>
          <div className="flex items-center gap-4">
            <span
              className="hover:text-[#0284C7] cursor-pointer"
              onClick={() => onNavigate('how-it-works')}
            >
              Data Transparency
            </span>
            <span>•</span>
            <span
              className="hover:text-[#0284C7] cursor-pointer"
              onClick={() => onNavigate('how-it-works')}
            >
              Uncertainty Handling
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
