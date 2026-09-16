import React, { useState, useMemo } from 'react';
import { Product, AttributeKey } from '../types';
import { Clock, Calendar, AlertCircle, Star, ThumbsUp, ShieldCheck } from 'lucide-react';
import { getProductReviews } from '../utils/analytics';
import { ATTRIBUTE_CONFIG } from '../data/mockData';

interface ReviewTimelineCardProps {
  product: Product;
  onOpenEvidence: (title: string, subtitle: string, reviewIds?: string[]) => void;
}

export const ReviewTimelineCard: React.FC<ReviewTimelineCardProps> = ({ product }) => {
  const [filterSort, setFilterSort] = useState<'recent' | 'older'>('recent');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  const [filterAttribute, setFilterAttribute] = useState<string>('all');

  const allReviews = useMemo(() => getProductReviews(product.id), [product.id]);

  const filteredReviews = useMemo(() => {
    let list = [...allReviews];

    if (filterSentiment !== 'all') {
      list = list.filter(r => r.sentiment === filterSentiment);
    }

    if (filterAttribute !== 'all') {
      list = list.filter(r => r.attributes.includes(filterAttribute as AttributeKey));
    }

    if (filterSort === 'recent') {
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return list;
  }, [allReviews, filterSort, filterSentiment, filterAttribute]);

  return (
    <div className="rounded-3xl bg-white border border-[#D5E9FA] p-6 sm:p-10 space-y-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E9FA] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
              <Clock className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Recency & Version Awareness
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight">
            Customer Feedback Timeline
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Explore how buyer experiences evolve over months of post-launch firmware releases.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#182C45] bg-[#F5F8FC] px-3.5 py-1.5 rounded-xl border border-[#D5E9FA] self-start sm:self-auto font-mono">
          <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Timeline: {product.dateRange.start} → {product.dateRange.end}</span>
        </div>
      </div>

      {/* Recency Context Notice */}
      <div className="p-4 rounded-2xl bg-[#EAF5FF]/60 border border-[#D5E9FA] text-xs text-[#182C45] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-[#182C45]">Temporal Context Notice:</span>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Early launch feedback frequently focuses on initial unboxing or early firmware bugs that may be resolved in subsequent software updates. Check review dates when evaluating battery life or camera stability.
          </p>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F5F8FC] p-4 rounded-2xl border border-[#D5E9FA] text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Order toggle */}
          <div className="flex items-center bg-white rounded-xl border border-[#D5E9FA] p-0.5 shadow-2xs">
            <button
              onClick={() => setFilterSort('recent')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                filterSort === 'recent' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-[#64748B] hover:text-[#182C45]'
              }`}
            >
              Most Recent First
            </button>
            <button
              onClick={() => setFilterSort('older')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                filterSort === 'older' ? 'bg-[#0284C7] text-white shadow-xs' : 'text-[#64748B] hover:text-[#182C45]'
              }`}
            >
              Older Feedback First
            </button>
          </div>

          {/* Sentiment Filter */}
          <select
            value={filterSentiment}
            onChange={e => setFilterSentiment(e.target.value)}
            className="bg-white text-[#182C45] px-3 py-1.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] cursor-pointer shadow-2xs"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive Feedback Only</option>
            <option value="mixed">Mixed Sentiment</option>
            <option value="negative">Critical / Complaints Only</option>
          </select>

          {/* Attribute Filter */}
          <select
            value={filterAttribute}
            onChange={e => setFilterAttribute(e.target.value)}
            className="bg-white text-[#182C45] px-3 py-1.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] cursor-pointer shadow-2xs"
          >
            <option value="all">All Core Attributes</option>
            <option value="battery">Battery Life</option>
            <option value="camera">Camera Quality</option>
            <option value="performance">Performance & Speed</option>
            <option value="reliability">Build & Reliability</option>
            <option value="value">Value for Money</option>
            <option value="software">Software & OS</option>
          </select>
        </div>

        <span className="text-[#64748B] font-mono text-[11px]">
          Showing <strong className="text-[#182C45]">{filteredReviews.length}</strong> of {allReviews.length} verified reviews
        </span>
      </div>

      {/* Review Cards Stream */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-[#F5F8FC] rounded-2xl border border-[#D5E9FA] text-[#64748B] text-xs">
            No reviews match the current filter selection.
          </div>
        ) : (
          filteredReviews.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-[#D5E9FA] p-6 space-y-4 hover:border-[#8CBCE5] hover:shadow-md transition-all shadow-xs"
            >
              {/* Top Meta Row: Rating, Verified status, Platform, Date */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#182C45] text-xs">{review.rating}.0 / 5.0</span>
                  
                  {review.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[#64748B] text-[11px] font-mono">
                  <span className="bg-[#EAF5FF] text-[#0284C7] px-2 py-0.5 rounded border border-[#D5E9FA] font-semibold">
                    {review.source}
                  </span>
                  <span>{product.name}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>

              {/* Title & Review Text */}
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-[#182C45]">
                  {review.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  {review.originalText}
                </p>

                {/* Highlighted Quote Callout */}
                {review.highlightedPhrase && (
                  <div className="p-3 rounded-xl bg-[#F5F8FC] border-l-2 border-[#0284C7] text-xs italic text-[#182C45]">
                    <span className="font-semibold text-[#0284C7] not-italic mr-1">Key Insight:</span>
                    "{review.highlightedPhrase}"
                  </div>
                )}
              </div>

              {/* Footer Meta: Author, Attributes, Helpful Count */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-[#64748B] border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Author:</span>
                  <span className="font-bold text-[#182C45]">{review.author}</span>
                  <span className="text-[#94A3B8]">({review.productVariant})</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {review.attributes.map(attr => (
                      <span
                        key={attr}
                        className="px-2 py-0.5 rounded bg-[#F5F8FC] border border-[#D5E9FA] text-[#64748B] text-[10px]"
                      >
                        {ATTRIBUTE_CONFIG[attr]?.label || attr}
                      </span>
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-[#64748B] font-medium">
                    <ThumbsUp className="w-3 h-3 text-[#0284C7]" />
                    <span>{review.helpfulCount} helpful</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
