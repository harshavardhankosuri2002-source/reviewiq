export type AttributeKey = 'battery' | 'camera' | 'reliability' | 'performance' | 'value' | 'software';

export type ReviewSentiment = 'positive' | 'negative' | 'mixed';

export type ReviewSource = 'Marketplace' | 'Retailer website' | 'Consumer community';

export interface Review {
  id: string;
  productId: string;
  productVariant: string;
  author: string;
  source: ReviewSource;
  rating: number; // 1 to 5
  date: string; // ISO date 'YYYY-MM-DD'
  sentiment: ReviewSentiment;
  attributes: AttributeKey[];
  title: string;
  originalText: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
  highlightedPhrase?: string;
}

export interface AttributeThemeInfo {
  key: AttributeKey;
  label: string;
  totalMentions: number;
  positiveMentions: number;
  negativeMentions: number;
  mixedMentions: number;
  positiveScore: number; // 0 to 100
  sentimentSummary: 'positive' | 'negative' | 'mixed';
  explanation: string;
  highlightQuote: string;
}

export interface AISummaryQuadrant {
  appreciatedFeatures: {
    title: string;
    points: string[];
    supportingReviewIds: string[];
  };
  commonComplaints: {
    title: string;
    points: string[];
    supportingReviewIds: string[];
  };
  mixedOpinions: {
    title: string;
    points: string[];
    supportingReviewIds: string[];
  };
  importantCaveats: {
    title: string;
    points: string[];
    supportingReviewIds: string[];
  };
}

export interface TrustSignal {
  id: string;
  label: string;
  status: 'optimal' | 'warning' | 'moderate';
  value: string;
  description: string;
  auditExplanation: string;
}

export interface SourceComparisonItem {
  source: ReviewSource;
  count: number;
  avgRating: number;
  positivePct: number;
  negativePct: number;
  mixedPct: number;
  keyObservation: string;
}

export interface QAItem {
  id: string;
  productId: string; // or 'all'
  question: string;
  answer: string;
  category: AttributeKey | 'general' | 'recommendation';
  supportingReviewIds: string[];
  confidenceNote: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  releaseYear: number;
  variants: string[];
  defaultVariant: string;
  priceMSRP: string;
  imageUrl: string;
  category: string;
  specsSummary: {
    display: string;
    chipset: string;
    battery: string;
    camera: string;
    weight: string;
  };
  sampleRating: number;
  sampleReviewCount: number;
  dateRange: {
    start: string;
    end: string;
  };
  quickVerdict: string;
  aiSummary: AISummaryQuadrant;
  trustIndicators: {
    sourceCoverageScore: number;
    duplicatePatternFlag: boolean;
    duplicatePatternNote: string;
    variantCompletenessScore: number;
    variantNote: string;
    recencyConfidence: 'High' | 'Moderate' | 'Limited';
    recencyNote: string;
  };
}

export type PrioritySelection = {
  [key in AttributeKey]?: boolean;
};

export type RecommendationVerdict = 'Good fit' | 'Mixed fit' | 'Potential mismatch' | 'Not enough evidence';

export interface AttributeCalculation {
  attributeKey: AttributeKey;
  label: string;
  totalRelevantReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  mixedReviews: number;
  positiveConsensusPct: number;
  negativeConsensusPct: number;
  mixedConsensusPct: number;
  verdict: RecommendationVerdict;
  supportingReviewIds: string[];
  conflictingReviewIds: string[];
  summaryNote: string;
  isSufficientEvidence: boolean; // >= 5 reviews
}

export interface PersonalizedRecommendationAudit {
  overallVerdict: RecommendationVerdict;
  averagePositiveScore: number;
  totalSelectedPriorities: number;
  selectedAttributeKeys: AttributeKey[];
  attributeCalculations: AttributeCalculation[];
  conflicts: {
    attributeA: string;
    attributeB: string;
    description: string;
  }[];
  verdictRationale: string;
  isSampleAdequate: boolean;
}

