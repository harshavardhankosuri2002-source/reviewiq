import React, { useState } from 'react';
import { Product, PrioritySelection, AttributeKey } from '../types';
import { 
  Star, GitCompare, Sparkles, ArrowLeft, Bookmark, 
  Plus, X, Search, ArrowRight 
} from 'lucide-react';
import { getProductSentimentStats, calculatePersonalizedMatch } from '../utils/analytics';

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
}

export const ComparePage: React.FC<ComparePageProps> = ({
  products,
  selectedProductIds,
  onToggleProductInCompare,
  onSelectProduct,
  priorities,
  onBackToDiscover,
  savedIds,
  onToggleSave,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');

  const activeProducts = products.filter(p => selectedProductIds.includes(p.id));

  const filteredCatalogueForModal = products.filter(p =>
    p.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(modalSearch.toLowerCase())
  );

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

    return `Comparing ${activeProducts.length} devices (${names}): ${highestRated.name} leads in overall verified buyer satisfaction (${highestRated.sampleRating} ★ with ${highestRated.quickVerdict.slice(0, 100)}...). For budget-conscious value, ${lowestPrice.name} delivers strong essentials at ${lowestPrice.priceMSRP}. VOX's consensus analysis reveals that trade-offs primarily hinge on display refresh rates, optical zoom reach vs form-factor weight, and fast-charging capabilities.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5E9FA] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDiscover}
            className="p-2.5 rounded-xl bg-white border border-[#D5E9FA] hover:bg-[#EAF5FF] text-[#182C45] transition-colors shadow-2xs"
            aria-label="Back to Discover"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
                <GitCompare className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                Multi-Product Comparison
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#182C45] tracking-tight">
              Side-by-Side Review Intelligence
            </h1>
          </div>
        </div>

        {/* Add Device Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-extrabold transition-all shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Phone from Catalogue ({products.length})</span>
        </button>
      </div>

      {/* Dynamic AI Executive Consensus Delta */}
      <div className="bg-[#EAF5FF] p-6 rounded-2xl border border-[#8CBCE5] space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 text-[#0284C7]">
          <Sparkles className="w-5 h-5 fill-current" />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Automated Multi-Device Comparison Verdict
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
          {renderComparisonSummary()}
        </p>
      </div>

      {/* Comparison Grid Stage */}
      {activeProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#D5E9FA] text-center space-y-4 max-w-md mx-auto shadow-sm">
          <GitCompare className="w-10 h-10 text-[#0284C7] mx-auto" />
          <h3 className="text-base font-bold text-[#182C45]">No products selected for comparison</h3>
          <p className="text-xs text-[#64748B]">
            Select smartphones from the 22-model catalogue to view side-by-side specs and customer sentiment.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-[#0284C7] text-white font-bold text-xs shadow-2xs hover:bg-[#0369A1]"
          >
            Browse 22 Smartphones
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Product Cards Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProducts.map(product => {
              const stats = getProductSentimentStats(product.id);
              const isSaved = savedIds.includes(product.id);
              const match = calculatePersonalizedMatch(product.id, priorities);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#D5E9FA] p-5 space-y-4 relative flex flex-col justify-between shadow-sm hover:border-[#8CBCE5] transition-all"
                >
                  {/* Remove pill */}
                  <button
                    onClick={() => onToggleProductInCompare(product.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#F5F8FC] text-[#64748B] hover:text-rose-600 border border-[#D5E9FA] transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-xl border border-[#D5E9FA]"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h3
                          onClick={() => onSelectProduct(product.id)}
                          className="text-base font-extrabold text-[#182C45] hover:text-[#0284C7] transition-colors cursor-pointer leading-tight"
                        >
                          {product.name}
                        </h3>
                        <span className="text-xs font-bold text-[#475569]">{product.priceMSRP}</span>
                      </div>
                    </div>

                    {/* Rating & Match Pill */}
                    <div className="flex items-center justify-between bg-[#F5F8FC] p-2.5 rounded-xl border border-[#D5E9FA]">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span className="font-bold text-[#182C45]">{product.sampleRating}</span>
                        <span className="text-[#64748B] text-[11px]">({product.sampleReviewCount} reviews)</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#0284C7] bg-[#EAF5FF] px-2 py-0.5 rounded border border-[#D5E9FA]">
                        {match.score}% Fit
                      </span>
                    </div>

                    {/* Sentiment Bar */}
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#64748B]">Customer Sentiment</span>
                        <span className="text-emerald-700">{stats.positivePct}% Positive</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden">
                        <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
                        <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-500" />
                        <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-500" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onToggleSave(product.id)}
                      className={`py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-colors ${
                        isSaved
                          ? 'bg-[#EAF5FF] text-[#0284C7] border-[#0284C7]'
                          : 'bg-[#F5F8FC] text-[#475569] border-[#D5E9FA] hover:text-[#182C45]'
                      }`}
                    >
                      <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-[#0284C7] text-[#0284C7]' : ''}`} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side-by-Side Detailed Specs & Consensus Table */}
          <div className="bg-white rounded-2xl border border-[#D5E9FA] overflow-hidden shadow-sm">
            <div className="p-4 bg-[#F5F8FC] border-b border-[#D5E9FA] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#182C45]">
                Detailed Technical & Review Comparison
              </span>
              <span className="text-xs text-[#64748B]">
                {activeProducts.length} Phones Compared
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#475569]">
                <tbody className="divide-y divide-[#E2E8F0]">
                  {/* Row: Chipset */}
                  <tr className="hover:bg-[#F5F8FC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#182C45] bg-[#F5F8FC] w-48 shrink-0">Processor / Chipset</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 font-medium leading-relaxed text-[#182C45]">
                        {p.specsSummary.chipset}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Display */}
                  <tr className="hover:bg-[#F5F8FC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#182C45] bg-[#F5F8FC]">Display Quality</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 leading-relaxed">
                        {p.specsSummary.display}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Battery & Charging */}
                  <tr className="hover:bg-[#F5F8FC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#182C45] bg-[#F5F8FC]">Battery & Charging</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 leading-relaxed">
                        {p.specsSummary.battery}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Camera Array */}
                  <tr className="hover:bg-[#F5F8FC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#182C45] bg-[#F5F8FC]">Camera Optics</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 leading-relaxed">
                        {p.specsSummary.camera}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Weight */}
                  <tr className="hover:bg-[#F5F8FC]/50 transition-colors">
                    <td className="p-4 font-bold text-[#182C45] bg-[#F5F8FC]">Chassis Weight</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 font-mono font-bold text-[#182C45]">
                        {p.specsSummary.weight}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Top Appreciated Feature */}
                  <tr className="hover:bg-emerald-50/40 transition-colors bg-emerald-50/20">
                    <td className="p-4 font-bold text-emerald-800 bg-[#F5F8FC]">Top Consensus Strength</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-emerald-900 leading-relaxed">
                        ✓ {p.aiSummary.appreciatedFeatures.points[0]}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Top Complaint */}
                  <tr className="hover:bg-rose-50/40 transition-colors bg-rose-50/20">
                    <td className="p-4 font-bold text-rose-800 bg-[#F5F8FC]">Top Consensus Drawback</td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-rose-900 leading-relaxed">
                        ! {p.aiSummary.commonComplaints.points[0]}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#182C45]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#D5E9FA] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#D5E9FA] bg-[#F5F8FC] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#182C45]">Add Smartphone to Compare</h3>
                <p className="text-xs text-[#64748B]">Choose from all 22 available smartphones</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-white text-[#64748B] hover:text-[#182C45] border border-[#D5E9FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-[#D5E9FA]">
              <div className="relative">
                <input
                  type="text"
                  value={modalSearch}
                  onChange={e => setModalSearch(e.target.value)}
                  placeholder="Search brand or model (e.g. Apple, Samsung, Xiaomi, Nothing)..."
                  className="w-full bg-[#F5F8FC] text-[#182C45] placeholder-[#94A3B8] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7]"
                />
                <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Modal Products List */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-[#E2E8F0]">
              {filteredCatalogueForModal.map(p => {
                const isSelected = selectedProductIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="pt-2 flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F8FC] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg border border-[#D5E9FA]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#0284C7] uppercase">{p.brand}</span>
                          <span className="text-[10px] text-[#64748B] font-mono">{p.priceMSRP}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#182C45]">{p.name}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{p.sampleRating}</span>
                          <span className="text-[#64748B]">({p.sampleReviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleProductInCompare(p.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-2xs'
                      }`}
                    >
                      {isSelected ? 'Remove' : 'Add to Compare'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#D5E9FA] bg-[#F5F8FC] flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#0284C7] text-white text-xs font-bold shadow-2xs hover:bg-[#0369A1]"
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
