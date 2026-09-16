import React, { useState } from 'react';
import { Product, PrioritySelection, AttributeKey, ReviewSentiment, ReviewSource } from '../types';
import { ProductOverview } from '../components/ProductOverview';
import { AISummaryCard } from '../components/AISummaryCard';
import { ThemeBreakdown } from '../components/ThemeBreakdown';
import { PersonalizedInsights } from '../components/PersonalizedInsights';
import { AskReviewIQ } from '../components/AskReviewIQ';
import { TrustAndQualityCard } from '../components/TrustAndQualityCard';
import { CrossSourceCard } from '../components/CrossSourceCard';
import { ReviewTimelineCard } from '../components/ReviewTimelineCard';
import { EvidenceModal } from '../components/EvidenceModal';
import { getThemeBreakdown } from '../utils/analytics';
import { ArrowLeft, HelpCircle, FileText } from 'lucide-react';

interface ProductAnalysisPageProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  onBackToDiscover: () => void;
  priorities: PrioritySelection;
  onTogglePriority: (key: AttributeKey) => void;
  onNavigateSupportingReviews?: (attribute?: AttributeKey, sentiment?: ReviewSentiment, focusTitle?: string) => void;
  onNavigateCalculation?: () => void;
}

export const ProductAnalysisPage: React.FC<ProductAnalysisPageProps> = ({
  product,
  isSaved,
  onToggleSave,
  onCompare,
  onBackToDiscover,
  priorities,
  onTogglePriority,
  onNavigateSupportingReviews,
  onNavigateCalculation,
}) => {
  const [evidenceModalState, setEvidenceModalState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    reviewIds?: string[];
    filterAttribute?: AttributeKey;
    filterSentiment?: ReviewSentiment;
  }>({
    isOpen: false,
    title: '',
  });

  const themes = getThemeBreakdown(product.id);

  const handleOpenEvidence = (
    title: string,
    subtitle: string,
    reviewIds?: string[],
    attribute?: AttributeKey
  ) => {
    if (onNavigateSupportingReviews) {
      onNavigateSupportingReviews(attribute, undefined, title);
    } else {
      setEvidenceModalState({
        isOpen: true,
        title,
        subtitle,
        reviewIds,
        filterAttribute: attribute,
      });
    }
  };

  const handleOpenAttributeEvidence = (attrKey: AttributeKey, label: string) => {
    if (onNavigateSupportingReviews) {
      onNavigateSupportingReviews(attrKey, undefined, `${product.name} — ${label} Reviews`);
    } else {
      setEvidenceModalState({
        isOpen: true,
        title: `${product.name} — ${label} Reviews`,
        subtitle: `Customer reviews evaluating ${label.toLowerCase()}.`,
        filterAttribute: attrKey,
      });
    }
  };

  const handleOpenSourceReviews = (source: ReviewSource) => {
    if (onNavigateSupportingReviews) {
      onNavigateSupportingReviews(undefined, undefined, `${product.name} — ${source} Channel Reviews`);
    } else {
      setEvidenceModalState({
        isOpen: true,
        title: `${product.name} — ${source} Channel`,
        subtitle: `Feedback collected from ${source}.`,
      });
    }
  };

  const scrollToQA = () => {
    const el = document.getElementById('ask-reviewiq-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top breadcrumb & quick navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBackToDiscover}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#182C45] hover:text-[#0284C7] bg-white px-3.5 py-2 rounded-xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-colors shadow-soft"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Back to Discover</span>
        </button>

        <div className="flex items-center gap-3">
          {onNavigateSupportingReviews && (
            <button
              onClick={() => onNavigateSupportingReviews()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#182C45] hover:text-[#0284C7] bg-white px-3.5 py-2 rounded-xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-colors shadow-soft"
            >
              <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Supporting Reviews</span>
            </button>
          )}

          {onNavigateCalculation && (
            <button
              onClick={onNavigateCalculation}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] bg-[#EAF5FF] px-3.5 py-2 rounded-xl border border-[#B8DBF7] transition-colors shadow-soft"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>How It's Calculated</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748B] font-mono">
            <span>ID:</span>
            <span className="bg-[#EAF5FF] text-[#0284C7] font-bold px-2.5 py-0.5 rounded-lg border border-[#D5E9FA]">
              {product.id}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Product Overview */}
      <ProductOverview
        product={product}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onCompare={onCompare}
        onScrollToQA={scrollToQA}
      />

      {/* 2. Personalized Decision Engine */}
      <PersonalizedInsights
        product={product}
        priorities={priorities}
        onTogglePriority={onTogglePriority}
        onOpenEvidence={handleOpenEvidence}
        onNavigateSupportingReviews={onNavigateSupportingReviews}
        onNavigateCalculation={onNavigateCalculation}
      />

      {/* 3. Evidence-Backed AI Summary */}
      <AISummaryCard
        summary={product.aiSummary}
        productName={product.name}
        onOpenEvidence={handleOpenEvidence}
      />

      {/* 4. Attribute Theme Breakdown */}
      <ThemeBreakdown
        themes={themes}
        productName={product.name}
        onOpenAttributeEvidence={handleOpenAttributeEvidence}
      />

      {/* 5. Natural Language Assistant (Ask ReviewIQ) */}
      <AskReviewIQ
        product={product}
        onOpenEvidence={handleOpenEvidence}
      />

      {/* 6. Cross-Source Intelligence */}
      <CrossSourceCard
        product={product}
        onOpenSourceReviews={handleOpenSourceReviews}
      />

      {/* 7. Trust & Review Quality Indicators */}
      <TrustAndQualityCard product={product} />

      {/* 8. Review Recency & Version Timeline */}
      <ReviewTimelineCard
        product={product}
        onOpenEvidence={handleOpenEvidence}
      />

      {/* Global Evidence Modal (Fallback if modal mode used) */}
      <EvidenceModal
        isOpen={evidenceModalState.isOpen}
        onClose={() => setEvidenceModalState(prev => ({ ...prev, isOpen: false }))}
        title={evidenceModalState.title}
        subtitle={evidenceModalState.subtitle}
        reviewIds={evidenceModalState.reviewIds}
        filterAttribute={evidenceModalState.filterAttribute}
        filterSentiment={evidenceModalState.filterSentiment}
        productId={product.id}
      />
    </div>
  );
};
