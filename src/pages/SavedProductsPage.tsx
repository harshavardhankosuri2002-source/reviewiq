import React from 'react';
import { Product } from '../types';
import { Bookmark, Trash2, ArrowRight, GitCompare, Star } from 'lucide-react';
import { getProductSentimentStats } from '../utils/analytics';
import { formatINR } from '../utils/currency';

interface SavedProductsPageProps {
  products: Product[];
  savedIds: string[];
  onRemoveSave: (id: string) => void;
  onSelectProduct: (id: string) => void;
  onCompareSaved: (ids: string[]) => void;
  onBackToDiscover: () => void;
}

export const SavedProductsPage: React.FC<SavedProductsPageProps> = ({
  products,
  savedIds,
  onRemoveSave,
  onSelectProduct,
  onCompareSaved,
  onBackToDiscover,
}) => {
  const savedProducts = products.filter(p => savedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5E9FA] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
              <Bookmark className="w-4 h-4 fill-[#0284C7] text-[#0284C7]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Personal Shortlist
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#182C45] tracking-tight">
            Saved Products ({savedProducts.length})
          </h1>
          <p className="text-xs text-[#64748B]">
            Review and compare shortlisted smartphones across your browsing session.
          </p>
        </div>

        {savedProducts.length >= 2 && (
          <button
            onClick={() => onCompareSaved(savedIds)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-extrabold shadow-2xs transition-all"
          >
            <GitCompare className="w-4 h-4 text-white" />
            <span>Compare Shortlist ({savedProducts.length})</span>
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-[#D5E9FA] p-12 text-center space-y-4 shadow-sm max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF5FF] text-[#0284C7] flex items-center justify-center mx-auto border border-[#D5E9FA]">
            <Bookmark className="w-7 h-7 text-[#0284C7]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#182C45]">Your shortlist is empty</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              When exploring smartphones on the Discover page or Search results, save items to build your personal comparison matrix.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onBackToDiscover}
              className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-xl text-xs font-extrabold transition-colors shadow-2xs"
            >
              Explore 22 Smartphones
            </button>
          </div>
        </div>
      ) : (
        /* Saved Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map(product => {
            const stats = getProductSentimentStats(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="relative aspect-16/10 bg-[#F5F8FC] overflow-hidden cursor-pointer"
                    onClick={() => onSelectProduct(product.id)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-white/95 text-[#0284C7] px-2.5 py-0.5 rounded text-[10px] font-bold border border-[#D5E9FA] shadow-2xs">
                      {product.brand}
                    </span>
                    <span className="absolute top-2 right-2 bg-[#182C45] text-white px-2.5 py-0.5 rounded text-[10px] font-black shadow-2xs">
                      {formatINR(product.priceMSRP)}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product.id)}
                        className="text-base font-bold text-[#182C45] hover:text-[#0284C7] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.sampleRating)
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#182C45]">{product.sampleRating}</span>
                        <span className="text-xs text-[#64748B]">({product.sampleReviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-1 bg-[#F5F8FC] p-3 rounded-xl border border-[#D5E9FA] text-xs">
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-[#64748B]">Customer Sentiment</span>
                        <span className="text-emerald-700 font-bold">{stats.positivePct}% Positive</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden">
                        <div style={{ width: `${stats.positivePct}%` }} className="bg-emerald-500" />
                        <div style={{ width: `${stats.mixedPct}%` }} className="bg-amber-500" />
                        <div style={{ width: `${stats.negativePct}%` }} className="bg-rose-500" />
                      </div>
                    </div>

                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                      {product.quickVerdict}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E2E8F0] mt-2 space-y-2">
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="w-full mt-3 py-2 px-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-2xs"
                  >
                    <span>Inspect Decoded Intelligence</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>

                  <button
                    onClick={() => onRemoveSave(product.id)}
                    className="w-full py-1.5 text-xs text-[#64748B] hover:text-rose-600 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove from Shortlist</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
