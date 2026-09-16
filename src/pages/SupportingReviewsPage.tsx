import React, { useState, useMemo } from 'react';
import {
  Product,
  PrioritySelection,
  AttributeKey,
  ReviewSentiment,
} from '../types';
import {
  getProductReviews,
  getProductSentimentStats,
  filterAndSortReviews,
} from '../utils/analytics';
import { ATTRIBUTE_CONFIG } from '../data/mockData';
import {
  ArrowLeft,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  MinusCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  ThumbsUp,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SupportingReviewsPageProps {
  product: Product;
  selectedVariant?: string;
  priorities: PrioritySelection;
  initialAttribute?: AttributeKey | 'all';
  initialSentiment?: ReviewSentiment | 'all';
  focusInsightTitle?: string;
  onBackToProduct: () => void;
  onNavigateCalculation: () => void;
  onSelectProductVariant?: (variant: string) => void;
}

export const SupportingReviewsPage: React.FC<SupportingReviewsPageProps> = ({
  product,
  selectedVariant,
  priorities,
  initialAttribute = 'all',
  initialSentiment = 'all',
  focusInsightTitle,
  onBackToProduct,
  onNavigateCalculation,
}) => {
  // Filter States
  const [selectedSentiment, setSelectedSentiment] = useState<string>(initialSentiment);
  const [selectedAttribute, setSelectedAttribute] = useState<string>(initialAttribute);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'oldest' | 'highest' | 'lowest'>('helpful');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedReviewIds, setExpandedReviewIds] = useState<Set<string>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  // Active priorities list
  const activePriorityKeys = (Object.keys(priorities) as AttributeKey[]).filter(k => priorities[k]);
  const currentVariant = selectedVariant || product.defaultVariant;

  // Base reviews from dataset
  const allProductReviews = useMemo(() => getProductReviews(product.id), [product.id]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return filterAndSortReviews(allProductReviews, {
      sentiment: selectedSentiment,
      attribute: selectedAttribute,
      source: selectedSource,
      searchQuery,
      sortBy,
    });
  }, [allProductReviews, selectedSentiment, selectedAttribute, selectedSource, searchQuery, sortBy]);

  // Dynamic summary figures for current attribute / scope
  const scopedStats = useMemo(() => {
    let pool = allProductReviews;
    if (selectedAttribute !== 'all') {
      pool = pool.filter(r => r.attributes.includes(selectedAttribute as AttributeKey));
    }
    const total = pool.length;
    let pos = 0;
    let neg = 0;
    let mix = 0;
    pool.forEach(r => {
      if (r.sentiment === 'positive') pos++;
      else if (r.sentiment === 'negative') neg++;
      else mix++;
    });

    const posPct = total > 0 ? Math.round((pos / total) * 100) : 0;
    const negPct = total > 0 ? Math.round((neg / total) * 100) : 0;
    const mixPct = total > 0 ? Math.max(0, 100 - posPct - negPct) : 0;

    return { total, pos, neg, mix, posPct, negPct, mixPct };
  }, [allProductReviews, selectedAttribute]);

  // Toggle review expansion
  const toggleExpand = (id: string) => {
    setExpandedReviewIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Upvote helpful review
  const handleHelpfulClick = (id: string, initialCount: number) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : initialCount + 1,
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSentiment('all');
    setSelectedAttribute('all');
    setSelectedSource('all');
    setSortBy('helpful');
    setSearchQuery('');
  };

  const isFiltersActive =
    selectedSentiment !== 'all' ||
    selectedAttribute !== 'all' ||
    selectedSource !== 'all' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'helpful';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={onBackToProduct}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#182C45] hover:text-[#0284C7] bg-white px-4 py-2 rounded-xl border border-[#D5E9FA] hover:bg-[#EAF5FF] transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
            <span>Back to {product.name}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-wider bg-[#EAF5FF] px-3 py-1 rounded-lg border border-[#D5E9FA]">
              Academic Prototype Dataset
            </span>
          </div>
        </div>

        {/* Title & Product Identity Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D5E9FA] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAF5FF] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest bg-[#EAF5FF] px-2.5 py-0.5 rounded-md border border-[#D5E9FA]">
                  {product.brand}
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="text-xs text-[#64748B] font-medium">{product.category}</span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="text-xs text-[#64748B] font-medium">{currentVariant}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#182C45] tracking-tight">
                Supporting Reviews
              </h1>
              <p className="text-sm sm:text-base text-[#475569] max-w-2xl font-normal leading-relaxed">
                Explore the genuine customer experiences and evidence behind ReviewIQ’s personalized recommendation for the <strong className="text-[#182C45] font-semibold">{product.name}</strong>.
              </p>
            </div>

            {/* Quick jump to transparent calculation */}
            <button
              onClick={onNavigateCalculation}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0284C7] hover:text-white bg-[#EAF5FF] hover:bg-[#0284C7] px-4 py-3 rounded-2xl border border-[#D5E9FA] transition-all self-start md:self-center shadow-2xs shrink-0"
            >
              <HelpCircle className="w-4 h-4" />
              <span>How is this calculated?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Focus Insight Context Banner (if opened from an insight link) */}
      {focusInsightTitle && (
        <div className="p-4 rounded-2xl bg-[#EAF5FF] border border-[#8CBCE5] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span className="text-xs sm:text-sm text-[#182C45]">
              Examining evidence connected to: <strong className="text-[#182C45] font-bold">{focusInsightTitle}</strong>
            </span>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-[#0284C7] hover:underline"
          >
            Show all product reviews
          </button>
        </div>
      )}

      {/* Review Summary Header Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#D5E9FA] space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5E9FA] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider block">
              Sample Dataset Sentiment Breakdown
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#182C45]">
                {scopedStats.total}
              </span>
              <span className="text-xs sm:text-sm text-[#64748B]">
                {selectedAttribute !== 'all'
                  ? `relevant reviews mentioning ${ATTRIBUTE_CONFIG[selectedAttribute as AttributeKey]?.label || selectedAttribute}`
                  : `total customer reviews in sample dataset`}
              </span>
            </div>
          </div>

          {/* Active Priorities Indicator */}
          {activePriorityKeys.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#64748B] font-medium mr-1">Your Priorities:</span>
              {activePriorityKeys.map(key => (
                <span
                  key={key}
                  onClick={() => setSelectedAttribute(key)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                    selectedAttribute === key
                      ? 'bg-[#0284C7] text-white'
                      : 'bg-[#F5F8FC] text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF]'
                  }`}
                >
                  {ATTRIBUTE_CONFIG[key].label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3-Tier Distribution Summary Bar */}
        <div className="space-y-2.5">
          <div className="h-3 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden p-0.5 border border-[#D5E9FA]">
            <div
              style={{ width: `${scopedStats.posPct}%` }}
              className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
              title={`Positive: ${scopedStats.pos} (${scopedStats.posPct}%)`}
            />
            <div
              style={{ width: `${scopedStats.mixPct}%` }}
              className="h-full bg-amber-500 transition-all duration-500"
              title={`Mixed: ${scopedStats.mix} (${scopedStats.mixPct}%)`}
            />
            <div
              style={{ width: `${scopedStats.negPct}%` }}
              className="h-full bg-rose-500 rounded-r-full transition-all duration-500"
              title={`Negative: ${scopedStats.neg} (${scopedStats.negPct}%)`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium">
            <div
              onClick={() => setSelectedSentiment(selectedSentiment === 'positive' ? 'all' : 'positive')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                selectedSentiment === 'positive'
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-[#F5F8FC] border-[#D5E9FA] text-[#182C45] hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{scopedStats.posPct}% Positive</span>
              </div>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                {scopedStats.pos} sample reviews
              </span>
            </div>

            <div
              onClick={() => setSelectedSentiment(selectedSentiment === 'mixed' ? 'all' : 'mixed')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                selectedSentiment === 'mixed'
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-2xs'
                  : 'bg-[#F5F8FC] border-[#D5E9FA] text-[#182C45] hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-bold text-amber-700">
                <MinusCircle className="w-3.5 h-3.5" />
                <span>{scopedStats.mixPct}% Mixed</span>
              </div>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                {scopedStats.mix} sample reviews
              </span>
            </div>

            <div
              onClick={() => setSelectedSentiment(selectedSentiment === 'negative' ? 'all' : 'negative')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                selectedSentiment === 'negative'
                  ? 'bg-rose-100 border-rose-300 text-rose-900 shadow-2xs'
                  : 'bg-[#F5F8FC] border-[#D5E9FA] text-[#182C45] hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-bold text-rose-700">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{scopedStats.negPct}% Negative</span>
              </div>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                {scopedStats.neg} sample reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Facet Interactive Filter Suite */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#D5E9FA] space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#182C45] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Filter & Sort Customer Feedback</span>
          </div>

          {isFiltersActive && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#0284C7] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* 1. Attribute / Priority Filter Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Product Attribute / Priority Area:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedAttribute('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedAttribute === 'all'
                  ? 'bg-[#0284C7] text-white shadow-2xs'
                  : 'bg-[#F5F8FC] text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF]'
              }`}
            >
              All Attributes ({allProductReviews.length})
            </button>
            {(Object.keys(ATTRIBUTE_CONFIG) as AttributeKey[]).map(key => {
              const count = allProductReviews.filter(r => r.attributes.includes(key)).length;
              const isSelected = selectedAttribute === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAttribute(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0284C7] text-white shadow-2xs'
                      : 'bg-[#F5F8FC] text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF] hover:text-[#182C45]'
                  }`}
                >
                  <span>{ATTRIBUTE_CONFIG[key].label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Sentiment + Source + Sort Dropdowns & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Sentiment Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#64748B] block">Sentiment:</label>
            <select
              value={selectedSentiment}
              onChange={e => setSelectedSentiment(e.target.value)}
              className="w-full bg-[#F5F8FC] text-xs text-[#182C45] border border-[#D5E9FA] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0284C7]"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive Experiences</option>
              <option value="mixed">Mixed / Nuanced</option>
              <option value="negative">Negative / Complaints</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#64748B] block">Source Platform:</label>
            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              className="w-full bg-[#F5F8FC] text-xs text-[#182C45] border border-[#D5E9FA] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0284C7]"
            >
              <option value="all">All Source Channels</option>
              <option value="Marketplace">Marketplace Verified</option>
              <option value="Retailer website">Retailer Website</option>
              <option value="Consumer community">Consumer Community</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#64748B] block">Sort Order:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full bg-[#F5F8FC] text-xs text-[#182C45] border border-[#D5E9FA] rounded-xl px-3 py-2 focus:outline-none focus:border-[#0284C7]"
            >
              <option value="helpful">Most Helpful First</option>
              <option value="recent">Most Recent Date</option>
              <option value="oldest">Oldest Date</option>
              <option value="highest">Highest Star Rating</option>
              <option value="lowest">Lowest Star Rating</option>
            </select>
          </div>

          {/* Text Search */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#64748B] block">Search Keywords:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., battery, heat, zoom..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F8FC] text-xs text-[#182C45] border border-[#D5E9FA] rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#0284C7] placeholder-[#94A3B8]"
              />
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#64748B] border-t border-[#E2E8F0] pt-3">
          <span>
            Displaying <strong className="text-[#182C45]">{filteredReviews.length}</strong> of{' '}
            <strong className="text-[#182C45]">{allProductReviews.length}</strong> sample customer reviews
          </span>
          {isFiltersActive && (
            <span className="text-[11px] text-[#0284C7] font-semibold">Filters applied</span>
          )}
        </div>
      </div>

      {/* Individual Review Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          /* Honest Empty State */
          <div className="p-12 text-center rounded-3xl bg-white border border-[#D5E9FA] space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#EAF5FF] border border-[#D5E9FA] text-[#0284C7] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 text-[#0284C7]" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-[#182C45]">No Matching Customer Reviews Found</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                There are no reviews in this sample dataset that match your exact combination of sentiment, attribute, and keyword filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          filteredReviews.map(review => {
            const isExpanded = expandedReviewIds.has(review.id);
            const isLongText = review.originalText.length > 180;
            const currentHelpful = helpfulVotes[review.id] ?? review.helpfulCount;

            // Sentiment styling
            let sentimentBadge = (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Positive Experience
              </span>
            );
            if (review.sentiment === 'negative') {
              sentimentBadge = (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Critical Feedback
                </span>
              );
            } else if (review.sentiment === 'mixed') {
              sentimentBadge = (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  <MinusCircle className="w-3 h-3 text-amber-600" /> Mixed / Nuanced
                </span>
              );
            }

            // Supporting vs Conflicting evidence classification
            const isSupportingRecommendation = review.sentiment === 'positive';

            return (
              <div
                key={review.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all space-y-3.5 shadow-2xs"
              >
                {/* Review Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Star Rating */}
                    <div className="flex items-center text-amber-500 text-xs font-bold bg-[#F5F8FC] px-2 py-0.5 rounded-md border border-[#D5E9FA]">
                      <span>★</span>
                      <span className="ml-1 text-[#182C45]">{review.rating}.0</span>
                    </div>

                    {sentimentBadge}

                    {/* Evidence Connection Tag */}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isSupportingRecommendation
                          ? 'bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]'
                          : 'bg-[#F5F8FC] text-[#64748B] border border-[#E2E8F0]'
                      }`}
                    >
                      {isSupportingRecommendation ? 'Supporting Evidence' : 'Conflicting / Alternative View'}
                    </span>
                  </div>

                  {/* Date & Source */}
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#94A3B8]" />
                      {review.date}
                    </span>
                    <span>•</span>
                    <span className="bg-[#EAF5FF] px-2 py-0.5 rounded text-[11px] font-medium text-[#0284C7] border border-[#D5E9FA]">
                      {review.source}
                    </span>
                  </div>
                </div>

                {/* Review Title & Author */}
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#182C45] leading-snug">
                    {review.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] flex-wrap">
                    <span className="font-semibold text-[#182C45]">{review.author}</span>
                    {review.verifiedPurchase && (
                      <span className="text-emerald-800 text-[11px] font-semibold flex items-center gap-1 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-200">
                        ✓ Verified Purchase
                      </span>
                    )}
                    <span>•</span>
                    <span className="text-[#64748B]">Variant: {review.productVariant}</span>
                  </div>
                </div>

                {/* Highlighted Quote Callout if present */}
                {review.highlightedPhrase && (
                  <div className="p-3 rounded-xl bg-[#F5F8FC] border-l-2 border-[#0284C7] text-xs text-[#182C45] italic">
                    "{review.highlightedPhrase}"
                  </div>
                )}

                {/* Main Review Body */}
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  {isLongText && !isExpanded
                    ? `${review.originalText.slice(0, 180)}...`
                    : review.originalText}
                </p>

                {isLongText && (
                  <button
                    onClick={() => toggleExpand(review.id)}
                    className="text-xs text-[#0284C7] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Show less' : 'Read full review'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}

                {/* Card Footer: Attribute Badges & Helpful Upvote */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mr-1">
                      Attributes:
                    </span>
                    {review.attributes.map(attr => (
                      <button
                        key={attr}
                        onClick={() => setSelectedAttribute(attr)}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                          selectedAttribute === attr
                            ? 'bg-[#0284C7] text-white font-bold'
                            : 'bg-[#F5F8FC] text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF]'
                        }`}
                      >
                        {ATTRIBUTE_CONFIG[attr]?.label || attr}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleHelpfulClick(review.id, review.helpfulCount)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#182C45] bg-[#F5F8FC] px-3 py-1.5 rounded-xl border border-[#D5E9FA] hover:bg-[#EAF5FF] transition-colors self-start sm:self-auto"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Helpful ({currentHelpful})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Educational Callout & Navigation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0284C7]">
            <HelpCircle className="w-4 h-4" />
            <span>Calculation Transparency</span>
          </div>
          <h3 className="text-lg font-bold text-[#182C45]">
            Curious how ReviewIQ converts these reviews into percentages?
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Inspect our open formula audit and prototype decision thresholds on the Transparent Calculation screen.
          </p>
        </div>

        <button
          onClick={onNavigateCalculation}
          className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3 rounded-2xl transition-all shadow-2xs shrink-0"
        >
          <span>View Transparent Calculations &rarr;</span>
        </button>
      </div>
    </div>
  );
};
