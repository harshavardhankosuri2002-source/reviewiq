import React from 'react';
import {
  Star,
  ShieldCheck,
  Sparkles,
  Check,
  ThumbsUp,
  ChevronRight,
  Zap,
  Camera,
  Shield,
  MessageSquare,
} from 'lucide-react';

interface FloatingPhonesHeroProps {
  onExploreClick?: () => void;
  onSelectProduct?: (id: string) => void;
}

export const FloatingPhonesHero: React.FC<FloatingPhonesHeroProps> = ({
  onExploreClick,
  onSelectProduct,
}) => {
  return (
    <div className="relative w-full overflow-visible py-8 sm:py-16 select-none">
      {/* Ambient Atmospheric Glows */}
      <div className="ambient-glow-iceberg w-[700px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="ambient-glow-blue w-[400px] h-[300px] top-1/3 left-1/4 opacity-50" />

      {/* 3D Viewport Stage */}
      <div className="relative max-w-6xl mx-auto px-4 perspective-1400 flex items-center justify-center min-h-[500px] sm:min-h-[600px] lg:min-h-[660px]">
        {/* ============================================================ */}
        {/* PHONE 1: LEFT (Angled Left, AI Review Summary)               */}
        {/* ============================================================ */}
        <div
          onClick={() => onSelectProduct?.('iphone-16')}
          className="cursor-pointer group absolute -left-6 sm:left-6 lg:left-14 top-10 sm:top-14 z-10 hidden md:block w-[270px] lg:w-[300px] transition-all duration-500 hover:z-30 hover:scale-105"
          style={{
            transform: 'rotateY(18deg) rotateX(8deg) rotateZ(-3deg) translateZ(-20px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating Context Badge Top Left */}
          <div className="absolute -top-5 -left-4 z-40 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#B8DBF7] text-[11px] font-bold text-[#0284C7] shadow-soft flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>AI Review Summary</span>
          </div>

          {/* Phone Hardware Chassis (Clean Silver/Titanium Finish) */}
          <div className="relative bg-gradient-to-b from-[#CBD5E1] via-[#E2E8F0] to-[#94A3B8] p-2.5 rounded-[42px] shadow-phone-3d border border-[#B8DBF7]">
            {/* Side buttons */}
            <div className="absolute -left-1 top-20 w-1 h-8 bg-[#94A3B8] rounded-l-sm" />
            <div className="absolute -left-1 top-32 w-1 h-12 bg-[#94A3B8] rounded-l-sm" />
            <div className="absolute -right-1 top-24 w-1 h-12 bg-[#94A3B8] rounded-r-sm" />

            {/* Screen Bezel & Content */}
            <div className="relative bg-white rounded-[34px] p-4 text-xs text-[#182C45] overflow-hidden border border-[#D5E9FA] space-y-3">
              {/* Dynamic Island */}
              <div className="flex items-center justify-between px-2 pt-0.5 text-[10px] text-[#64748B] font-medium">
                <span>9:41</span>
                <div className="w-20 h-4 bg-[#182C45] rounded-full flex items-center justify-end px-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span>100%</span>
              </div>

              {/* Product Header */}
              <div className="pt-1 flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                <div>
                  <span className="text-[10px] text-[#0284C7] font-bold uppercase tracking-wider">
                    Verified Decoded
                  </span>
                  <h4 className="text-sm font-extrabold text-[#182C45] leading-tight">
                    Apple iPhone 16
                  </h4>
                </div>
                <div className="flex items-center gap-1 bg-[#F5F8FC] px-2.5 py-1 rounded-lg border border-[#D5E9FA]">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#182C45] text-[11px]">4.3</span>
                </div>
              </div>

              {/* Decoded Points (Appreciated vs Complaints) */}
              <div className="space-y-2">
                <div className="bg-[#ECFDF5] p-2.5 rounded-xl border border-[#A7F3D0] space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[10px]">
                    <Check className="w-3 h-3 shrink-0 text-emerald-600" />
                    <span>Key Positives (82% consensus)</span>
                  </div>
                  <p className="text-[11px] text-[#182C45] leading-snug">
                    Snappy A18 Bionic processing and noticeable battery life increase over iPhone 15.
                  </p>
                </div>

                <div className="bg-[#FEF2F2] p-2.5 rounded-xl border border-[#FECACA] space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    <span>Top Drawback</span>
                  </div>
                  <p className="text-[11px] text-[#182C45] leading-snug">
                    60Hz display refresh rate feels dated compared to identically priced competitors.
                  </p>
                </div>
              </div>

              {/* Verified Sources Tag */}
              <div className="pt-1 flex items-center justify-between text-[10px] text-[#64748B]">
                <span>342 verified reviews</span>
                <span className="text-[#0284C7] font-semibold">View evidence &rarr;</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PHONE 2: CENTER (Hero Focal, Personalized Decision Engine)   */}
        {/* ============================================================ */}
        <div
          onClick={() => onSelectProduct?.('galaxy-s24')}
          className="cursor-pointer group relative z-20 w-[290px] sm:w-[320px] lg:w-[350px] transition-all duration-500 hover:scale-105"
          style={{
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating Context Badge Top Center */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#B8DBF7] text-[11px] font-extrabold text-[#0284C7] shadow-soft flex items-center gap-1.5 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>94% Match • Decision Engine</span>
          </div>

          {/* Realistic Phone Outer Frame */}
          <div className="relative bg-gradient-to-b from-[#94A3B8] via-[#CBD5E1] to-[#64748B] p-3 rounded-[46px] shadow-phone-floating border border-[#8CBCE5]">
            {/* Side buttons */}
            <div className="absolute -left-1 top-24 w-1 h-9 bg-[#64748B] rounded-l-sm" />
            <div className="absolute -left-1 top-36 w-1 h-14 bg-[#64748B] rounded-l-sm" />
            <div className="absolute -right-1 top-28 w-1 h-14 bg-[#64748B] rounded-r-sm" />

            {/* Inner Screen */}
            <div className="relative bg-white rounded-[36px] p-5 text-[#182C45] overflow-hidden border border-[#D5E9FA] space-y-4">
              {/* Dynamic Island Header */}
              <div className="flex items-center justify-between px-2 text-[11px] text-[#64748B] font-medium">
                <span className="font-extrabold text-[#182C45]">
                  Review<span className="text-[#0284C7] font-bold">IQ</span>
                </span>
                <div className="w-24 h-4 bg-[#182C45] rounded-full flex items-center justify-center gap-1.5 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-[9px] text-white font-mono font-medium">LIVE ENGINE</span>
                </div>
                <span className="font-mono text-[10px] text-[#0284C7] font-bold">MATCH</span>
              </div>

              {/* Title & Product Target */}
              <div className="text-center pt-1 space-y-0.5">
                <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-widest">
                  Is this phone right for you?
                </span>
                <h3 className="text-lg font-black text-[#182C45] tracking-tight">
                  Samsung Galaxy S24
                </h3>
              </div>

              {/* Center Circular Metric Indicator */}
              <div className="bg-[#F5F8FC] rounded-2xl p-4 border border-[#D5E9FA] text-center space-y-2">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
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
                      className="stroke-[#0284C7]"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="15"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-[#182C45] leading-none">94%</span>
                    <span className="text-[9px] font-bold text-[#0284C7] uppercase tracking-wider mt-0.5">
                      Good Fit
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#475569] font-medium">
                  Matches your selected priority profile
                </p>
              </div>

              {/* Selected Priority Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Active User Priorities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EAF5FF] border border-[#B8DBF7] text-[#0284C7] text-[10px] font-bold">
                    <Zap className="w-2.5 h-2.5" /> 120Hz LTPO
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    <Camera className="w-2.5 h-2.5" /> 3x Telephoto
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 text-[10px] font-bold">
                    <Shield className="w-2.5 h-2.5" /> 7-Yr OS
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  onSelectProduct?.('galaxy-s24');
                }}
                className="w-full py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Full Product Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PHONE 3: RIGHT (Angled Right, Live Review & Evidence Feed)   */}
        {/* ============================================================ */}
        <div
          onClick={() => onSelectProduct?.('pixel-9')}
          className="cursor-pointer group absolute -right-6 sm:right-6 lg:right-14 top-14 sm:top-18 z-10 hidden md:block w-[270px] lg:w-[300px] transition-all duration-500 hover:z-30 hover:scale-105"
          style={{
            transform: 'rotateY(-18deg) rotateX(8deg) rotateZ(3deg) translateZ(-20px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating Context Badge Top Right */}
          <div className="absolute -top-5 -right-4 z-40 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#B8DBF7] text-[11px] font-bold text-[#0284C7] shadow-soft flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Verified Customer Feed</span>
          </div>

          {/* Phone Chassis */}
          <div className="relative bg-gradient-to-b from-[#CBD5E1] via-[#E2E8F0] to-[#94A3B8] p-2.5 rounded-[42px] shadow-phone-3d border border-[#B8DBF7]">
            {/* Side buttons */}
            <div className="absolute -left-1 top-24 w-1 h-12 bg-[#94A3B8] rounded-l-sm" />
            <div className="absolute -right-1 top-20 w-1 h-8 bg-[#94A3B8] rounded-r-sm" />
            <div className="absolute -right-1 top-32 w-1 h-12 bg-[#94A3B8] rounded-r-sm" />

            {/* Screen Content */}
            <div className="relative bg-white rounded-[34px] p-4 text-xs text-[#182C45] overflow-hidden border border-[#D5E9FA] space-y-3">
              {/* Dynamic Island */}
              <div className="flex items-center justify-between px-2 pt-0.5 text-[10px] text-[#64748B] font-medium">
                <span>9:41</span>
                <div className="w-20 h-4 bg-[#182C45] rounded-full flex items-center justify-start px-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </div>
                <span>5G</span>
              </div>

              {/* Feed Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <div>
                  <span className="text-[10px] text-[#0284C7] font-bold uppercase tracking-wider">
                    Evidence Feed
                  </span>
                  <h4 className="text-sm font-extrabold text-[#182C45]">Google Pixel 9</h4>
                </div>
                <span className="text-[10px] bg-[#EAF5FF] text-[#0284C7] px-2 py-0.5 rounded font-mono font-bold border border-[#D5E9FA]">
                  Reddit & Amazon
                </span>
              </div>

              {/* Review Card 1 */}
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#182C45]">David L.</span>
                    <span className="text-emerald-700 text-[9px] font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="flex text-amber-500">{'★'.repeat(5)}</div>
                </div>

                <div className="bg-white p-2 rounded-lg border-l-2 border-[#0284C7] text-[11px] text-[#334155] font-normal leading-snug border border-[#E2E8F0]">
                  "Night Sight camera and clean Android UI are unbeatable. Tensor G4 runs noticeably cooler."
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-0.5">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-2.5 h-2.5 text-[#0284C7]" /> 42 helpful
                  </span>
                  <span>Community</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-2 rounded-lg bg-[#F5F8FC] border border-[#D5E9FA] flex items-center gap-2 text-[10px] text-[#475569]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero duplicate review bot clusters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Evidence Statement Below Hero */}
      <div className="max-w-3xl mx-auto text-center mt-6 sm:mt-12 px-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2.5 rounded-full bg-white border border-[#D5E9FA] text-xs text-[#475569] shadow-soft">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            <span className="text-[#182C45] font-semibold">1,400+ Multi-Source Reviews Filtered</span>
          </div>
          <span className="hidden sm:inline text-[#CBD5E1]">•</span>
          <div className="flex items-center gap-1.5 text-[#475569]">
            <span>22 Flagship & Midrange Models</span>
          </div>
          <span className="hidden sm:inline text-[#CBD5E1]">•</span>
          <div className="flex items-center gap-1.5 text-[#0284C7] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <span>Anti-Bot Authenticity Audited</span>
          </div>
        </div>
      </div>
    </div>
  );
};
