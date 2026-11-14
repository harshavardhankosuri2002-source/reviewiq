import React, { useState } from 'react';
import { Product, PrioritySelection, AttributeKey, SavedComparison } from '../types';
import {
  Star,
  GitCompare,
  Sparkles,
  ArrowLeft,
  Bookmark,
  Plus,
  X,
  Search,
  ArrowRight,
  ShieldCheck,
  Check,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Copy,
} from 'lucide-react';
import { getProductSentimentStats, calculatePersonalizedMatch, calculateAttributeConsensus } from '../utils/analytics';
import { ATTRIBUTE_CONFIG } from '../data/mockData';
import { formatINR } from '../utils/currency';

interface ComparePageProps {
  products: Product[];
  selectedProductIds: string[];
  onToggleProductInCompare: (id: string) => void;
  onSelectProduct: (id: string) => void;
  priorities: PrioritySelection;
  onTogglePriority: (key: AttributeKey) => void;
  onBackToDiscover: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenAskVoxCompare?: (productIds: string[]) => void;
  onSaveComparison?: (title: string, productIds: string[]) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  products,
  selectedProductIds,
  onToggleProductInCompare,
  onSelectProduct,
  priorities,
  onTogglePriority,
  onBackToDiscover,
  savedIds,
  onToggleSave,
  onOpenAskVoxCompare,
  onSaveComparison,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [modalCategory, setModalCategory] = useState<'all' | 'Smartphones' | 'Headphones'>('all');
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const activeProducts = products.filter(p => selectedProductIds.includes(p.id));

  const filteredCatalogueForModal = products.filter(p => {
    if (modalCategory !== 'all' && p.category !== modalCategory) return false;
    return (
      p.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(modalSearch.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(modalSearch.toLowerCase()))
    );
  });

  const handleSaveCurrentComparison = () => {
    if (activeProducts.length < 2) return;
    const title = activeProducts.map(p => p.name.split(' ')[0] + ' ' + (p.name.split(' ')[1] || '')).join(' vs ');
    if (onSaveComparison) {
      onSaveComparison(title, activeProducts.map(p => p.id));
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    }
  };

  // Dynamic AI Comparison Summary Synthesis
  const renderComparisonSummary = () => {
    if (activeProducts.length < 2) {
      return 'Select at least two smartphones from the 22-model catalogue below to generate an automated comparison synthesis.';
    }

    const names = activeProducts.map(p => p.name).join(', ');
    const highestRated = [...activeProducts].sort((a, b) => b.sampleRating - a.sampleRating)[0];
    const lowestPrice = [...activeProducts].sort((a, b) => {
      const pA = parseInt(a.priceMSRP.replace(/[^0-9]/g, ''), 10);
      const pB = parseInt(b.priceMSRP.replace(/[^0-9]/g, ''), 10);
      return pA - pB;
    })[0];

    return `Comparing ${activeProducts.length} devices (${names}): ${highestRated.name} leads verified buyer satisfaction (${highestRated.sampleRating} ★, ${highestRated.quickVerdict.slice(0, 85)}...). For budget efficiency, ${lowestPrice.name} delivers core fundamentals at ${lowestPrice.priceMSRP}. Trade-offs primarily center on charging velocity vs sustained thermals, telephoto reach vs weight, and software update duration.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDiscover}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors shadow-sm"
            aria-label="Back to Overview"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="p-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <GitCompare className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Comparison Workspace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Side-by-Side Review Intelligence Matrix
            </h1>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {activeProducts.length >= 2 && onSaveComparison && (
            <button
              onClick={handleSaveCurrentComparison}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>{saveSuccessMsg ? 'Saved to Research!' : 'Save Comparison'}</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all shadow-glow-cyan"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Add Phone ({products.length})</span>
          </button>
        </div>
      </div>

      {/* Dynamic AI Executive Consensus Delta Banner */}
      <div className="rounded-2xl glass-panel p-6 border border-cyan-500/25 space-y-4 shadow-glass-card">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-4 h-4 fill-current" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Automated Comparative Consensus Synthesis
            </h2>
          </div>
          {activeProducts.length >= 2 && onOpenAskVoxCompare && (
            <button
              onClick={() => onOpenAskVoxCompare(selectedProductIds)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-card hover:glass-chip text-white font-bold text-xs shadow-sm transition-all cursor-pointer border border-cyan-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask VOX to analyze trade-offs</span>
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {renderComparisonSummary()}
        </p>
      </div>

      {/* Controls Bar: Priority Weighting & Difference Highlighter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-white/[0.08] text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">Priority Weighting:</span>
          {(Object.keys(ATTRIBUTE_CONFIG) as AttributeKey[]).map(key => {
            const isSelected = !!priorities[key];
            return (
              <button
                key={key}
                onClick={() => onTogglePriority(key)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${isSelected
                    ? 'glass-chip-active'
                    : 'glass-chip text-slate-300 hover:text-white'
                  }`}
              >
                {ATTRIBUTE_CONFIG[key].label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium select-none">
          <input
            type="checkbox"
            checked={highlightDifferences}
            onChange={e => setHighlightDifferences(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0 cursor-pointer"
          />
          <span>Highlight Spec Differences</span>
        </label>
      </div>

      {/* Comparison Grid Stage */}
      {activeProducts.length === 0 ? (
        <div className="rounded-3xl glass-card border border-white/[0.08] p-12 text-center space-y-4 max-w-md mx-auto shadow-glass-card">
          <div className="w-12 h-12 rounded-2xl glass-chip text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
            <GitCompare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No products selected for comparison</h3>
          <p className="text-xs text-slate-400">
            Select smartphones from the 22-model catalogue to view side-by-side specs, trade-offs, and customer consensus.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:from-sky-400 hover:to-cyan-400 transition-colors shadow-glow-cyan"
          >
            Browse 22 Smartphones
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Product Cards Header Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(activeProducts.length, 3)} gap-6`}>
            {activeProducts.map(product => {
              const stats = getProductSentimentStats(product.id);
              const isSaved = savedIds.includes(product.id);
              const match = calculatePersonalizedMatch(product.id, priorities);

              return (
                <div
                  key={product.id}
                  className="rounded-2xl glass-card border border-white/[0.08] p-5 space-y-4 relative flex flex-col justify-between shadow-glass-card hover:border-cyan-400/40 transition-all"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => onToggleProductInCompare(product.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg glass-nested text-slate-400 hover:text-rose-400 border border-white/[0.08] transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-16 bg-slate-950 rounded-xl border border-slate-800 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                          }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h3
                          onClick={() => onSelectProduct(product.id)}
                          className="text-base font-extrabold text-white hover:text-cyan-300 transition-colors cursor-pointer leading-tight"
                        >
                          {product.name}
                        </h3>
                        <span className="text-xs font-bold text-slate-300">{formatINR(product.priceMSRP)}</span>
                      </div>
                    </div>

                    {/* Rating & Match Pill */}
                    <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span className="font-bold text-white">{product.sampleRating}</span>
                        <span className="text-slate-500 text-[11px]">({product.sampleReviewCount} reviews)</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                        {match.score}% Fit
                      </span>
                    </div>

                    {/* Sentiment Bar */}
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-400">Customer Sentiment</span>
                        <span className="text-emerald-400">{stats.positivePct}% Positive</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-950 flex overflow-hidden border border-slate-800">
                        <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
                        <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-500" />
                        <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-500" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onToggleSave(product.id)}
                      className={`py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-colors ${isSaved
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                    >
                      <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-current' : ''}`} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side-by-Side Detailed Specs & Consensus Table */}
          <div className="rounded-2xl glass-card border border-white/[0.08] overflow-hidden shadow-glass-card">
            <div className="p-4 glass-panel border-b border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Detailed Technical & Review Comparison Matrix
              </span>
              <span className="text-xs text-slate-400">
                {activeProducts.length} Phones Compared
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <tbody className="divide-y divide-white/[0.06]">
                  {/* Row: Chipset */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white glass-nested w-48 shrink-0">Processor / Audio Engine</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 font-medium leading-relaxed text-slate-200">
                        {p.specsSummary.chipset}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Display / Driver */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white glass-nested">Display / Acoustic Driver</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 leading-relaxed text-slate-300">
                        {p.specsSummary.display}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Battery & Charging */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white glass-nested">Battery & Charging</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 leading-relaxed text-slate-300">
                        {p.specsSummary.battery}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Camera Optics / Wireless Connectivity */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white glass-nested">Camera Optics / Wireless & ANC</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 leading-relaxed text-slate-300">
                        {p.specsSummary.camera || p.specsSummary.connectivity || 'Multipoint Bluetooth 5.3 • ANC'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Chassis Weight */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white glass-nested">Chassis Weight</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 font-mono font-bold text-cyan-300">
                        {p.specsSummary.weight}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Top Appreciated Feature */}
                  <tr className="hover:bg-emerald-500/10 transition-colors bg-emerald-500/[0.05]">
                    <td className="p-4 font-bold text-emerald-400 glass-nested">Top Consensus Strength</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-emerald-300 leading-relaxed">
                        ✓ {p.aiSummary.appreciatedFeatures.points[0]}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Top Complaint */}
                  <tr className="hover:bg-rose-500/10 transition-colors bg-rose-500/[0.05]">
                    <td className="p-4 font-bold text-rose-400 glass-nested">Top Consensus Drawback</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-rose-300 leading-relaxed">
                        ! {p.aiSummary.commonComplaints.points[0]}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Uncertainty & Evidence Limitations */}
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-slate-400 glass-nested">Evidence Limitations</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-slate-400 text-[11px] leading-relaxed">
                        Evaluated across {p.sampleReviewCount} reviews ({p.dateRange.start} to {p.dateRange.end}). Long-term battery degradation beyond 12 months remains unverified.
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD PRODUCT MODAL (Browse all 22 Models)                     */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="rounded-3xl glass-drawer border border-white/[0.12] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/[0.08] glass-panel flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Add Device to Compare</h3>
                <p className="text-xs text-slate-400">Choose from all 23 verified smartphones and ANC headphones</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl glass-nested text-slate-400 hover:text-white border border-white/[0.08]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs & Search Input */}
            <div className="p-4 border-b border-white/[0.08] glass-panel space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setModalCategory('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${modalCategory === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                >
                  All ({products.length})
                </button>
                <button
                  onClick={() => setModalCategory('Smartphones')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${modalCategory === 'Smartphones'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                >
                  📱 Smartphones (20)
                </button>
                <button
                  onClick={() => setModalCategory('Headphones')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${modalCategory === 'Headphones'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                >
                  🎧 ANC Headphones (3)
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={modalSearch}
                  onChange={e => setModalSearch(e.target.value)}
                  placeholder="Search brand or model (e.g. Sony, Bose, Apple, Samsung)..."
                  className="w-full glass-input text-white placeholder-slate-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.10] focus:outline-none focus:border-cyan-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Modal Products List */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-white/[0.06]">
              {filteredCatalogueForModal.map(p => {
                const isSelected = selectedProductIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="pt-2 flex items-center justify-between p-3 rounded-xl hover:bg-slate-950 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-950 p-1 border border-slate-800 flex items-center justify-center shrink-0">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                          }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-sky-400 uppercase">{p.brand}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{formatINR(p.priceMSRP)}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{p.name}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{p.sampleRating}</span>
                          <span className="text-slate-500">({p.sampleReviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleProductInCompare(p.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${isSelected
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                        }`}
                    >
                      {isSelected ? 'Remove' : 'Add to Compare'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
