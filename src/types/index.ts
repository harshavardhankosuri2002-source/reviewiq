export type AttributeKey = 
  | 'battery' 
  | 'camera' 
  | 'reliability' 
  | 'performance' 
  | 'value' 
  | 'software'
  | 'sound'
  | 'anc'
  | 'comfort'
  | 'callquality';

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
  imageVerified?: boolean;
  colorVariant?: string;
  officialUrl: string;
  retailerName: string;
  category: string;
  specsSummary: {
    display?: string;
    chipset?: string;
    battery: string;
    camera?: string;
    weight: string;
    anc?: string;
    driver?: string;
    connectivity?: string;
    [key: string]: string | undefined;
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isGuest: boolean;
  createdAt: string;
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

export type ContextualActionType =
  | 'summarize_reviews'
  | 'check_priorities'
  | 'pros_and_cons'
  | 'compare_devices'
  | 'custom_query';

export interface VoxAiCitation {
  reviewId: string;
  author: string;
  sentiment: ReviewSentiment;
  headline: string;
  quoteSnippet: string;
  source: string;
  attributeKey?: AttributeKey;
}

export interface VoxAiMessage {
  id: string;
  sender: 'user' | 'vox';
  text: string;
  timestamp: string;
  actionType?: ContextualActionType;
  contextSummary?: string;
  activePrioritiesUsed?: AttributeKey[];
  verifiedSpecs?: { label: string; value: string }[];
  reviewEvidence?: {
    themeName: string;
    consensusPct: number;
    sampleCount: number;
    citations: VoxAiCitation[];
    supportingReviewIds: string[];
  }[];
  isInsufficientEvidence?: boolean;
  insufficientEvidenceReason?: string;
}

export interface VoxAiContext {
  type: 'general' | 'product' | 'compare';
  productId?: string;
  compareProductIds?: string[];
  initialAction?: ContextualActionType;
  initialPrompt?: string;
}

export interface SavedComparison {
  id: string;
  title: string;
  createdAt: string;
  productIds: string[];
  note?: string;
}

export interface SentimentTimelinePoint {
  month: string;
  dateKey: string;
  positiveCount: number;
  mixedCount: number;
  negativeCount: number;
  totalCount: number;
  positivePct: number;
}

export interface RecurringComplaintItem {
  id: string;
  title: string;
  category: AttributeKey | 'hardware' | 'pricing' | 'general';
  frequencyCount: number;
  percentageOfReviews: number;
  severity: 'Critical' | 'Moderate' | 'Minor';
  affectedProducts: string[];
  exampleQuotes: string[];
}

export interface ExtractedUrlProduct {
  sourceUrl: string;
  domain: string;
  extractedTitle: string;
  matchedCatalogueProduct?: Product;
  isSimulatedDemo: boolean;
  specsDetected: {
    display?: string;
    chipset?: string;
    battery?: string;
    camera?: string;
  };
}

export interface ShopperPersona {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  category: 'smartphones' | 'headphones' | 'all';
  priorities: AttributeKey[];
  description: string;
}

export type StressScenarioId = 'baseline' | 'sponsored_surge' | 'review_bomb';

export interface StressScenario {
  id: StressScenarioId;
  label: string;
  badge: string;
  description: string;
  injectedCount: number;
  syntheticRating: number;
  syntheticSentiment: ReviewSentiment;
  flagTriggered: boolean;
  anomalyTitle: string;
  anomalyExplanation: string;
  confidencePenaltyPct: number;
}

