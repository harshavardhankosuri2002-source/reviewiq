import React, { useState, useRef, useEffect } from 'react';
import { Product, PrioritySelection, AttributeKey } from '../types';
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
  Smartphone,
  Headphones,
} from 'lucide-react';
import { getProductSentimentStats, calculatePersonalizedMatch } from '../utils/analytics';
import { ATTRIBUTE_CONFIG } from '../data/mockData';
import { formatINR } from '../utils/currency';
import { ParallaxDeviceStage } from '../components/ParallaxDeviceStage';
import { ProductColorSwatches } from '../components/ProductColorSwatches';
import { getProductColorOptions } from '../utils/productColors';
import { haptics } from '../utils/haptics';

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
  const [productColors, setProductColors] = useState<Record<string, number>>({});
  const addModalRef = useRef<HTMLDialogElement | null>(null);

  const activeProducts = products.filter(p => selectedProductIds.includes(p.id));

  // Chrome Guidance native dialog sync for Add Device modal
  useEffect(() => {
    const dialog = addModalRef.current;
    if (!dialog) return;
    if (isAddModalOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isAddModalOpen]);

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
    haptics.play('pop');
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
      return 'Select at least two smartphones or headphones from the 25-model verified catalogue below to generate an automated comparative consensus synthesis.';
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

  // Helper to test if a spec row differs between active products
  const isSpecDifferent = (getter: (p: Product) => string | undefined) => {
    if (activeProducts.length < 2) return false;
    const firstVal = getter(activeProducts[0]) || '';
    return activeProducts.some(p => (getter(p) || '') !== firstVal);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 animate-fadeIn">
      {/* ============================================================ */}
      {/* 1. TOP NAVIGATION & WORKSPACE HEADER                         */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              haptics.play('click');
              onBackToDiscover();
            }}
            className="p-2.5 rounded-xl frosted-pill hover:bg-white text-slate-700 hover:text-slate-900 border border-white/80 transition-all active:scale-95 shadow-2xs cursor-pointer"
            aria-label="Back to Overview"
          >
            <ArrowLeft className="w-4 h-4 text-sky-600" />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-sky-100/80 border border-sky-300/60 text-sky-700">
                <GitCompare className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700">
                Comparison Workspace
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-semibold text-slate-500">
                {activeProducts.length} Models Selected
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Side-by-Side Review Intelligence Matrix
            </h1>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {activeProducts.length >= 2 && onSaveComparison && (
            <button
              onClick={handleSaveCurrentComparison}
              className="btn-interactive-secondary py-2 px-3.5 text-xs cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${saveSuccessMsg ? 'fill-sky-700 text-sky-700' : 'text-slate-500'}`} />
              <span>{saveSuccessMsg ? 'Saved to Research!' : 'Save Comparison'}</span>
            </button>
          )}

          <button
            onClick={() => {
              haptics.play('click');
              setIsAddModalOpen(true);
            }}
            className="btn-interactive-primary py-2 px-4 text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Device ({products.length})</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. AUTOMATED COMPARATIVE CONSENSUS SYNTHESIS CARD             */}
      {/* ============================================================ */}
      <div className="frosted-panel rounded-3xl p-5 sm:p-6 border border-white/90 shadow-lg space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-sky-800">
              Automated Comparative Consensus Synthesis
            </h2>
          </div>

          {activeProducts.length >= 2 && onOpenAskVoxCompare && (
            <button
              onClick={() => {
                haptics.play('click');
                onOpenAskVoxCompare(selectedProductIds);
              }}
              className="btn-interactive-secondary py-1.5 px-3 text-xs font-semibold text-slate-800 hover:text-sky-700 border-sky-300 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span>Ask VOX to analyze trade-offs</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal border-l-2 border-sky-400 pl-3">
          {renderComparisonSummary()}
        </p>
      </div>

      {/* ============================================================ */}
      {/* 3. PRIORITY WEIGHTING & DIFFERENCE FILTER BAR                 */}
      {/* ============================================================ */}
      <div className="frosted-panel p-3.5 sm:p-4 rounded-2xl border border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-600 font-bold">Priority Weighting:</span>
          {(Object.keys(ATTRIBUTE_CONFIG) as AttributeKey[]).map(key => {
            const isSelected = !!priorities[key];
            return (
              <button
                key={key}
                onClick={() => {
                  haptics.play('pop');
                  onTogglePriority(key);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'frosted-pill text-slate-700 hover:text-slate-900 hover:bg-white/80 border border-white/80'
                }`}
              >
                {ATTRIBUTE_CONFIG[key].label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-semibold select-none shrink-0">
          <input
            type="checkbox"
            checked={highlightDifferences}
            onChange={e => {
              haptics.play('pop');
              setHighlightDifferences(e.target.checked);
            }}
            className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
          />
          <span>Highlight Spec Differences</span>
        </label>
      </div>

      {/* ============================================================ */}
      {/* 4. COMPARISON MATRIX STAGE                                    */}
      {/* ============================================================ */}
      {activeProducts.length === 0 ? (
        <div className="frosted-modal rounded-3xl border border-white/90 p-12 text-center space-y-4 max-w-md mx-auto shadow-2xl">
          <div className="w-14 h-14 rounded-2xl frosted-pill text-sky-600 flex items-center justify-center mx-auto border border-sky-200">
            <GitCompare className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900">No products selected for comparison</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Select smartphones or headphones from the 25-model verified catalogue to view side-by-side specs, trade-offs, and decoded customer consensus.
          </p>
          <button
            onClick={() => {
              haptics.play('click');
              setIsAddModalOpen(true);
            }}
            className="btn-interactive-primary px-6 py-2.5 text-xs font-bold cursor-pointer"
          >
            Browse 25 Models
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
              const colorIndex = productColors[product.id] || 0;
              const colorOptions = getProductColorOptions(product.id);
              const activeColor = colorOptions[colorIndex] || colorOptions[0];

              return (
                <div
                  key={product.id}
                  className="frosted-glass-card rounded-3xl p-5 space-y-4 relative flex flex-col justify-between border border-white/90 shadow-xl group"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => {
                      haptics.play('pop');
                      onToggleProductInCompare(product.id);
                    }}
                    className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100/90 hover:bg-rose-100 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-all z-20 cursor-pointer shadow-2xs"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3.5">
                    {/* Device Presentation Stage with 3D Parallax Tilt */}
                    <div className="relative h-44 w-full frosted-panel rounded-2xl p-3 flex flex-col items-center justify-between border border-white/80 overflow-hidden">
                      {/* Top Badges */}
                      <div className="w-full flex items-center justify-between z-10">
                        <span className="frosted-pill text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                          {product.brand}
                        </span>
                        <span className="bg-slate-900/85 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-bold border border-white/20 shadow-xs">
                          {formatINR(product.priceMSRP)}
                        </span>
                      </div>

                      {/* Parallax Image */}
                      <div className="my-auto flex items-center justify-center w-full h-28">
                        <ParallaxDeviceStage maxTilt={8} showGlare={true} className="w-full h-full">
                          <img
                            src={product.imageUrl}
                            alt={`${product.name} in ${activeColor.name}`}
                            onError={e => {
                              (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                            }}
                            className="max-h-28 max-w-full object-contain mx-auto drop-shadow-md select-none pointer-events-none transition-all duration-300"
                            style={{ filter: activeColor.filterStyle || 'none' }}
                          />
                        </ParallaxDeviceStage>
                      </div>

                      {/* Interactive Color Swatch Switcher */}
                      <ProductColorSwatches
                        productId={product.id}
                        selectedIndex={colorIndex}
                        onSelectColor={idx => setProductColors(prev => ({ ...prev, [product.id]: idx }))}
                        size="sm"
                      />
                    </div>

                    {/* Product Identity */}
                    <div>
                      <h3
                        onClick={() => {
                          haptics.play('click');
                          onSelectProduct(product.id);
                        }}
                        className="text-base sm:text-lg font-black text-slate-900 hover:text-sky-600 transition-colors cursor-pointer leading-tight"
                      >
                        {product.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        Finish: <span className="font-semibold text-slate-800">{activeColor.name}</span>
                      </span>
                    </div>

                    {/* Rating & Match Pill */}
                    <div className="flex items-center justify-between frosted-panel p-2.5 rounded-xl border border-white/80">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span className="font-bold text-slate-900">{product.sampleRating}</span>
                        <span className="text-slate-400 text-[11px]">({product.sampleReviewCount} reviews)</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300/80">
                        {match.score}% Fit
                      </span>
                    </div>

                    {/* Sentiment Bar */}
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Customer Sentiment</span>
                        <span className="text-emerald-700 font-mono font-bold">{stats.positivePct}% Positive</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 flex overflow-hidden border border-slate-200">
                        <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
                        <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-400" />
                        <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-400" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        haptics.play('click');
                        onSelectProduct(product.id);
                      }}
                      className="btn-interactive-primary py-2 text-xs font-bold cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        haptics.play('pop');
                        onToggleSave(product.id);
                      }}
                      className={`btn-interactive-secondary py-2 text-xs font-semibold cursor-pointer ${
                        isSaved ? 'bg-sky-50 text-sky-800 border-sky-300' : ''
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-700 text-sky-700' : 'text-slate-400'}`} />
                      <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* 5. SIDE-BY-SIDE DETAILED SPECS & CONSENSUS TABLE             */}
          {/* ============================================================ */}
          <div className="frosted-modal rounded-3xl border border-white/90 overflow-hidden shadow-2xl">
            <div className="p-4 frosted-panel border-b border-white/80 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Detailed Technical & Consensus Comparison Matrix
              </span>
              <span className="text-xs font-semibold text-slate-500 frosted-pill px-2.5 py-0.5 rounded-full">
                {activeProducts.length} Models Side-by-Side
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-800">
                <tbody className="divide-y divide-slate-200/60">
                  {/* Row: Chipset */}
                  {(() => {
                    const isDiff = isSpecDifferent(p => p.specsSummary.chipset);
                    return (
                      <tr className={`transition-colors ${highlightDifferences && isDiff ? 'bg-sky-50/40' : 'hover:bg-white/40'}`}>
                        <td className="p-4 font-bold text-slate-900 bg-white/50 w-52 shrink-0 border-r border-slate-200/60">
                          Processor / Audio Engine
                        </td>
                        {activeProducts.map(p => (
                          <td key={p.id} className="p-4 font-medium leading-relaxed text-slate-700 border-r border-slate-200/40 last:border-r-0">
                            {p.specsSummary.chipset || 'Integrated OEM Audio Processor'}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* Row: Display / Driver */}
                  {(() => {
                    const isDiff = isSpecDifferent(p => p.specsSummary.display || p.specsSummary.driver);
                    return (
                      <tr className={`transition-colors ${highlightDifferences && isDiff ? 'bg-sky-50/40' : 'hover:bg-white/40'}`}>
                        <td className="p-4 font-bold text-slate-900 bg-white/50 border-r border-slate-200/60">
                          Display / Acoustic Driver
                        </td>
                        {activeProducts.map(p => (
                          <td key={p.id} className="p-4 leading-relaxed text-slate-700 border-r border-slate-200/40 last:border-r-0">
                            {p.specsSummary.display || p.specsSummary.driver}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* Row: Battery & Charging */}
                  {(() => {
                    const isDiff = isSpecDifferent(p => p.specsSummary.battery);
                    return (
                      <tr className={`transition-colors ${highlightDifferences && isDiff ? 'bg-sky-50/40' : 'hover:bg-white/40'}`}>
                        <td className="p-4 font-bold text-slate-900 bg-white/50 border-r border-slate-200/60">
                          Battery & Charging Stamina
                        </td>
                        {activeProducts.map(p => (
                          <td key={p.id} className="p-4 leading-relaxed text-slate-700 border-r border-slate-200/40 last:border-r-0">
                            {p.specsSummary.battery}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* Row: Camera / Connectivity */}
                  {(() => {
                    const isDiff = isSpecDifferent(p => p.specsSummary.camera || p.specsSummary.connectivity);
                    return (
                      <tr className={`transition-colors ${highlightDifferences && isDiff ? 'bg-sky-50/40' : 'hover:bg-white/40'}`}>
                        <td className="p-4 font-bold text-slate-900 bg-white/50 border-r border-slate-200/60">
                          Camera Optics / Wireless & ANC
                        </td>
                        {activeProducts.map(p => (
                          <td key={p.id} className="p-4 leading-relaxed text-slate-700 border-r border-slate-200/40 last:border-r-0">
                            {p.specsSummary.camera || p.specsSummary.connectivity || 'Multipoint Bluetooth 5.3 • ANC'}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* Row: Chassis Weight */}
                  {(() => {
                    const isDiff = isSpecDifferent(p => p.specsSummary.weight);
                    return (
                      <tr className={`transition-colors ${highlightDifferences && isDiff ? 'bg-sky-50/40' : 'hover:bg-white/40'}`}>
                        <td className="p-4 font-bold text-slate-900 bg-white/50 border-r border-slate-200/60">
                          Chassis Weight
                        </td>
                        {activeProducts.map(p => (
                          <td key={p.id} className="p-4 font-mono font-bold text-slate-900 border-r border-slate-200/40 last:border-r-0">
                            {p.specsSummary.weight}
                          </td>
                        ))}
                      </tr>
                    );
                  })()}

                  {/* Row: Top Appreciated Feature */}
                  <tr className="bg-emerald-50/70 border-t border-emerald-200/80">
                    <td className="p-4 font-bold text-emerald-900 bg-emerald-100/50 border-r border-emerald-200/60">
                      ✓ Top Consensus Strength
                    </td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-emerald-950 font-medium leading-relaxed border-r border-emerald-200/40 last:border-r-0">
                        {p.aiSummary?.appreciatedFeatures?.points?.[0] || 'Flagship verified build and verified battery life.'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Top Complaint */}
                  <tr className="bg-rose-50/70 border-t border-rose-200/80">
                    <td className="p-4 font-bold text-rose-900 bg-rose-100/50 border-r border-rose-200/60">
                      ! Verified Drawback & Caveat
                    </td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-rose-950 font-medium leading-relaxed border-r border-rose-200/40 last:border-r-0">
                        {p.aiSummary?.commonComplaints?.points?.[0] || 'MSRP premium reflects import duties & flagship positioning.'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Uncertainty & Evidence Limitations */}
                  <tr className="bg-slate-50/60 border-t border-slate-200/80">
                    <td className="p-4 font-bold text-slate-600 bg-slate-100/50 border-r border-slate-200/60">
                      Evidence Limitations
                    </td>
                    {activeProducts.map(p => (
                      <td key={p.id} className="p-4 text-slate-500 text-[11px] leading-relaxed border-r border-slate-200/40 last:border-r-0">
                        Evaluated across {p.sampleReviewCount} verified reviews ({p.dateRange.start} to {p.dateRange.end}). Long-term endurance beyond 12 months remains unverified.
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
      {/* 6. ADD PRODUCT MODAL (Google Chrome Native Dialog Guideline)  */}
      {/* ============================================================ */}
      <dialog
        ref={addModalRef}
        onCancel={e => {
          e.preventDefault();
          haptics.play('pop');
          setIsAddModalOpen(false);
        }}
        onClick={e => {
          if (e.target === addModalRef.current) {
            haptics.play('pop');
            setIsAddModalOpen(false);
          }
        }}
        className="frosted-native-dialog p-0 bg-transparent border-none max-w-2xl w-[calc(100%-2rem)] m-auto animate-scaleUp text-slate-900"
      >
        <div className="frosted-modal rounded-3xl border border-white/90 max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
          {/* Modal Header */}
          <div className="p-5 border-b border-white/80 frosted-panel flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Add Device to Compare</h3>
              <p className="text-xs text-slate-500 font-medium">Choose from all 25 verified smartphones and ANC headphones</p>
            </div>
            <button
              onClick={() => {
                haptics.play('click');
                setIsAddModalOpen(false);
              }}
              className="w-9 h-9 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Tabs & Search Input */}
          <div className="p-4 border-b border-white/80 frosted-panel space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  haptics.play('pop');
                  setModalCategory('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'frosted-pill text-slate-700 hover:text-slate-900 hover:bg-white/80 border border-white/80'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  setModalCategory('Smartphones');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalCategory === 'Smartphones'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'frosted-pill text-slate-700 hover:text-slate-900 hover:bg-white/80 border border-white/80'
                }`}
              >
                📱 Smartphones (22)
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  setModalCategory('Headphones');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalCategory === 'Headphones'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'frosted-pill text-slate-700 hover:text-slate-900 hover:bg-white/80 border border-white/80'
                }`}
              >
                🎧 Headphones (3)
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={modalSearch}
                onChange={e => setModalSearch(e.target.value)}
                placeholder="Search brand or model (e.g. Sony, Bose, Apple, Samsung)..."
                className="w-full bg-white/80 text-slate-900 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Modal Products List */}
          <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
            {filteredCatalogueForModal.map(p => {
              const isSelected = selectedProductIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="pt-2 flex items-center justify-between p-3 rounded-2xl hover:bg-white/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-white rounded-xl p-1 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        onError={e => {
                          (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                        }}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wide">{p.brand}</span>
                        <span className="text-[10px] text-slate-500 font-mono font-semibold">{formatINR(p.priceMSRP)}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{p.sampleRating}</span>
                        <span className="text-slate-400 font-normal">({p.sampleReviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      haptics.play(isSelected ? 'pop' : 'click');
                      onToggleProductInCompare(p.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        : 'btn-interactive-primary'
                    }`}
                  >
                    {isSelected ? 'Remove' : 'Add to Compare'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-white/80 frosted-panel flex justify-end">
            <button
              onClick={() => {
                haptics.play('click');
                setIsAddModalOpen(false);
              }}
              className="btn-interactive-primary px-5 py-2 text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
