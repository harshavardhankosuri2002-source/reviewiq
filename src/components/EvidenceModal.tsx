import React, { useState, useMemo } from 'react';
import { X, Star, ShieldCheck, Filter, Search, ThumbsUp } from 'lucide-react';
import { Review, AttributeKey, ReviewSentiment } from '../types';
import { SAMPLE_REVIEWS } from '../data/mockData';
import { getProductReviews } from '../utils/analytics';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  reviewIds?: string[];
  filterAttribute?: AttributeKey;
  filterSentiment?: ReviewSentiment;
  productId?: string;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  reviewIds,
  filterAttribute,
  filterSentiment,
  productId,
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState<string>(filterSentiment || 'all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const matchedReviews = useMemo(() => {
    let list: Review[] = [];

    if (reviewIds && reviewIds.length > 0) {
      list = SAMPLE_REVIEWS.filter(r => reviewIds.includes(r.id));
      if (list.length === 0 && productId) {
        list = getProductReviews(productId);
      }
    } else if (productId) {
      list = getProductReviews(productId);
      if (filterAttribute) {
        list = list.filter(r => r.attributes.includes(filterAttribute));
      }
      if (filterSentiment) {
        list = list.filter(r => r.sentiment === filterSentiment);
      }
    } else {
      list = SAMPLE_REVIEWS;
    }

    if (selectedSentiment !== 'all') {
      list = list.filter(r => r.sentiment === selectedSentiment);
    }
    if (selectedSource !== 'all') {
      list = list.filter(r => r.source === selectedSource);
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      list = list.filter(
        r =>
          r.originalText.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q)
      );
    }

    return list;
  }, [reviewIds, productId, filterAttribute, filterSentiment, selectedSentiment, selectedSource, localSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#182C45]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-[#D5E9FA] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-[#182C45]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#F5F8FC] px-6 py-4.5 flex items-start justify-between border-b border-[#D5E9FA]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA] uppercase tracking-wider">
                Evidence Inspector
              </span>
              <span className="text-xs text-[#64748B] font-mono">• {matchedReviews.length} Supporting Reviews</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#182C45] tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white text-[#64748B] hover:text-[#182C45] border border-[#D5E9FA] hover:bg-[#EAF5FF] transition-colors"
            aria-label="Close evidence inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#F5F8FC] px-6 py-3 border-b border-[#D5E9FA] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#0284C7]" />
            
            <select
              value={selectedSentiment}
              onChange={e => setSelectedSentiment(e.target.value)}
              className="bg-white text-[#182C45] px-2.5 py-1 rounded-lg border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] cursor-pointer shadow-2xs"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="mixed">Mixed</option>
              <option value="negative">Negative</option>
            </select>

            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              className="bg-white text-[#182C45] px-2.5 py-1 rounded-lg border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] cursor-pointer shadow-2xs"
            >
              <option value="all">All Channels</option>
              <option value="Marketplace">Marketplace</option>
              <option value="Retailer website">Retailer Website</option>
              <option value="Consumer community">Consumer Community</option>
            </select>
          </div>

          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search keyword..."
              className="w-full bg-white text-[#182C45] placeholder-[#94A3B8] text-xs pl-8 pr-3 py-1 rounded-lg border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Reviews List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-white">
          {matchedReviews.length === 0 ? (
            <div className="p-8 text-center bg-[#F5F8FC] rounded-2xl border border-[#D5E9FA] text-[#64748B] text-xs">
              No matching reviews found for this evidence selection.
            </div>
          ) : (
            matchedReviews.map(r => (
              <div
                key={r.id}
                className="bg-[#F5F8FC] rounded-2xl border border-[#D5E9FA] p-5 space-y-3 hover:border-[#8CBCE5] hover:shadow-xs transition-all"
              >
                {/* Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < r.rating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-[#182C45]">{r.rating}.0</span>
                    {r.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-mono">
                    <span className="bg-[#EAF5FF] px-2 py-0.5 rounded border border-[#D5E9FA] text-[#0284C7] font-semibold">
                      {r.source}
                    </span>
                    <span>•</span>
                    <span>{r.date}</span>
                    <span>•</span>
                    <span className="text-[#94A3B8]">{r.id}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-sm font-bold text-[#182C45] mb-1">{r.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed font-normal">{r.originalText}</p>
                  
                  {r.highlightedPhrase && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-white border-l-2 border-[#0284C7] text-xs italic text-[#182C45]">
                      <span className="font-semibold text-[#0284C7] not-italic mr-1">Cited Claim:</span>
                      "{r.highlightedPhrase}"
                    </div>
                  )}
                </div>

                {/* Bottom row */}
                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="font-medium">
                    By <strong className="text-[#182C45]">{r.author}</strong> ({r.productVariant})
                  </span>
                  <span className="flex items-center gap-1 text-[#64748B]">
                    <ThumbsUp className="w-3 h-3 text-[#0284C7]" />
                    <span>{r.helpfulCount} people found helpful</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F5F8FC] px-6 py-3.5 border-t border-[#D5E9FA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0284C7] text-white font-bold text-xs shadow-xs hover:bg-[#0369A1] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
