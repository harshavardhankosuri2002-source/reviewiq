import {
  Review,
  AttributeKey,
  AttributeThemeInfo,
  SourceComparisonItem,
  PrioritySelection,
  ReviewSentiment,
  AttributeCalculation,
  PersonalizedRecommendationAudit,
  RecommendationVerdict,
} from '../types';
import { SAMPLE_REVIEWS, ATTRIBUTE_CONFIG, SAMPLE_PRODUCTS } from '../data/mockData';

export function getProductReviews(productId: string): Review[] {
  const matched = SAMPLE_REVIEWS.filter(r => r.productId === productId);
  if (matched.length >= 5) return matched;

  // Enhance or generate a rich, realistic review dataset for catalogue items
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
  if (!product) return matched;

  const baseRating = product.sampleRating;
  const sources: ('Marketplace' | 'Retailer website' | 'Consumer community')[] = [
    'Consumer community',
    'Marketplace',
    'Retailer website',
  ];

  const variants = product.variants.length > 0 ? product.variants : [product.defaultVariant];

  const syntheticReviews: Review[] = [
    {
      id: `rev-${productId}-01`,
      productId,
      productVariant: variants[0] || product.defaultVariant,
      author: 'TechAnalyst_Pro',
      source: sources[0],
      rating: Math.min(5, Math.max(1, Math.round(baseRating + 0.3))),
      date: '2024-10-14',
      sentiment: 'positive',
      attributes: ['performance', 'battery', 'camera'],
      title: product.aiSummary.appreciatedFeatures.points[0] || 'Superb daily experience and solid build',
      originalText: `The ${product.name} delivers strong performance. ${product.aiSummary.appreciatedFeatures.points[0] || 'Battery life and display clarity are standout highlights.'} After 4 weeks of testing across heavy apps, the hardware is dependable and responsive. ${product.quickVerdict}`,
      helpfulCount: 54,
      verifiedPurchase: true,
      highlightedPhrase: product.aiSummary.appreciatedFeatures.points[0] || 'strong daily performance and display clarity',
    },
    {
      id: `rev-${productId}-02`,
      productId,
      productVariant: variants[0] || product.defaultVariant,
      author: 'CriticalConsumer_99',
      source: sources[1],
      rating: Math.min(5, Math.max(1, Math.round(baseRating - 1.2))),
      date: '2024-10-28',
      sentiment: 'negative',
      attributes: ['value', 'reliability', 'battery'],
      title: product.aiSummary.commonComplaints.points[0] || 'Notable trade-offs to keep in mind',
      originalText: `While the device works reasonably well for basic tasks, potential buyers should note: ${product.aiSummary.commonComplaints.points[0] || 'Charging velocity and size require consideration.'} Under heavy 5G data and GPS navigation, battery stamina drains noticeably faster than advertised.`,
      helpfulCount: 42,
      verifiedPurchase: true,
      highlightedPhrase: product.aiSummary.commonComplaints.points[0] || 'notable trade-offs to keep in mind',
    },
    {
      id: `rev-${productId}-03`,
      productId,
      productVariant: variants[1] || variants[0] || product.defaultVariant,
      author: 'DailyUser_Reviewer',
      source: sources[2],
      rating: Math.min(5, Math.max(1, Math.round(baseRating))),
      date: '2024-11-12',
      sentiment: 'positive',
      attributes: ['software', 'value', 'performance'],
      title: product.aiSummary.appreciatedFeatures.points[1] || 'Reliable software and everyday ergonomics',
      originalText: `After three weeks of continuous use, the hardware is dependable. ${product.aiSummary.appreciatedFeatures.points[1] || 'Display fluidity and software features provide a smooth experience.'} Great daily driver for messaging and media streaming.`,
      helpfulCount: 37,
      verifiedPurchase: true,
      highlightedPhrase: product.aiSummary.appreciatedFeatures.points[1] || 'dependable hardware and fluid software',
    },
    {
      id: `rev-${productId}-04`,
      productId,
      productVariant: variants[0] || product.defaultVariant,
      author: 'CameraEnthusiast_Elena',
      source: sources[0],
      rating: Math.min(5, Math.max(1, Math.round(baseRating + 0.2))),
      date: '2024-11-20',
      sentiment: 'positive',
      attributes: ['camera', 'software'],
      title: 'Crisp optics and natural color reproduction in daylight',
      originalText: `Taking photos with the ${product.name} has been a pleasant surprise. Daytime color calibration is natural, portrait depth isolation is accurate, and the camera app opens instantly without lag. Low light night photography is solid with minimal noise.`,
      helpfulCount: 29,
      verifiedPurchase: true,
      highlightedPhrase: 'daytime color calibration is natural and portrait depth isolation is accurate',
    },
    {
      id: `rev-${productId}-05`,
      productId,
      productVariant: variants[variants.length - 1] || product.defaultVariant,
      author: 'ErgonomicFocus_Marc',
      source: sources[1],
      rating: 3,
      date: '2024-12-05',
      sentiment: 'mixed',
      attributes: ['reliability', 'camera', 'value'],
      title: product.aiSummary.mixedOpinions.points[0] || 'Mixed feelings on grip comfort and pricing',
      originalText: `The ${product.name} looks stunning out of the box. However: ${product.aiSummary.mixedOpinions.points[0] || 'Ergonomics in single-handed use require adjustment.'} At this price point, you get good hardware, but check if the form factor matches your hand size.`,
      helpfulCount: 31,
      verifiedPurchase: true,
      highlightedPhrase: product.aiSummary.mixedOpinions.points[0] || 'ergonomics in single-handed use require adjustment',
    },
    {
      id: `rev-${productId}-06`,
      productId,
      productVariant: variants[0] || product.defaultVariant,
      author: 'BatteryTester_Jay',
      source: sources[2],
      rating: 4,
      date: '2024-12-18',
      sentiment: 'positive',
      attributes: ['battery', 'reliability'],
      title: 'Reliable all-day stamina for work and commuting',
      originalText: `Testing the ${product.specsSummary.battery}. It comfortably reaches the end of my 14-hour workday with 25-35% remaining. Standby battery drain overnight is minimal at around 3-4%. Overall a dependable battery companion.`,
      helpfulCount: 48,
      verifiedPurchase: true,
      highlightedPhrase: 'comfortably reaches the end of my 14-hour workday with 25-35% remaining',
    },
    {
      id: `rev-${productId}-07`,
      productId,
      productVariant: variants[0] || product.defaultVariant,
      author: 'BudgetAuditor_Sam',
      source: sources[1],
      rating: Math.min(5, Math.max(1, Math.round(baseRating - 0.5))),
      date: '2025-01-04',
      sentiment: 'mixed',
      attributes: ['value', 'performance'],
      title: 'Good core specs but evaluate retail discounts',
      originalText: `Priced at ${product.priceMSRP}. It handles day-to-day apps with ease, but look out for promotional bundles or seasonal discounts to maximize total value for money.`,
      helpfulCount: 22,
      verifiedPurchase: false,
      highlightedPhrase: 'look out for promotional bundles or seasonal discounts',
    },
    {
      id: `rev-${productId}-08`,
      productId,
      productVariant: variants[0] || product.defaultVariant,
      author: 'PowerUser_Dev',
      source: sources[0],
      rating: 5,
      date: '2025-01-15',
      sentiment: 'positive',
      attributes: ['performance', 'software', 'reliability'],
      title: 'Smooth multi-tasking and responsive thermals',
      originalText: `The ${product.specsSummary.chipset} handles multiple background apps, heavy browsing tabs, and spreadsheet editing with zero hiccups. Thermals stay cool under normal indoor room temperatures.`,
      helpfulCount: 35,
      verifiedPurchase: true,
      highlightedPhrase: 'thermals stay cool under normal indoor room temperatures',
    },
  ];

  // Merge any explicitly handwritten reviews with synthetic reviews without duplicate IDs
  const existingIds = new Set(matched.map(r => r.id));
  const combined = [...matched, ...syntheticReviews.filter(r => !existingIds.has(r.id))];
  return combined;
}

export function getProductSentimentStats(productId: string) {
  const reviews = getProductReviews(productId);
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);

  if (reviews.length === 0) {
    return {
      total: product?.sampleReviewCount || 12,
      avgRating: product?.sampleRating || 4.3,
      positiveCount: 10,
      negativeCount: 1,
      mixedCount: 1,
      positivePct: 83,
      negativePct: 8,
      mixedPct: 9,
      starCounts: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 },
    };
  }

  let totalRating = 0;
  let pos = 0;
  let neg = 0;
  let mix = 0;
  const starCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach(r => {
    totalRating += r.rating;
    starCounts[r.rating] = (starCounts[r.rating] || 0) + 1;
    if (r.sentiment === 'positive') pos++;
    else if (r.sentiment === 'negative') neg++;
    else mix++;
  });

  const total = reviews.length;
  const avgRating = Number((totalRating / total).toFixed(1));
  const positivePct = Math.round((pos / total) * 100);
  const negativePct = Math.round((neg / total) * 100);
  const mixedPct = Math.max(0, 100 - positivePct - negativePct);

  return {
    total: product?.sampleReviewCount || total,
    avgRating: product?.sampleRating || avgRating,
    positiveCount: pos,
    negativeCount: neg,
    mixedCount: mix,
    positivePct: positivePct > 0 ? positivePct : 85,
    negativePct,
    mixedPct,
    starCounts,
  };
}

/**
 * Calculates attribute-level consensus statistics using the exact formulas:
 * Positive consensus = positive relevant reviews / total relevant reviews * 100
 * Negative consensus = negative relevant reviews / total relevant reviews * 100
 * Mixed consensus = mixed relevant reviews / total relevant reviews * 100
 * All 3 categories use the same denominator and sum to 100%.
 */
export function calculateAttributeConsensus(
  productId: string,
  attributeKey: AttributeKey
): AttributeCalculation {
  const allReviews = getProductReviews(productId);
  const relevantReviews = allReviews.filter(r => r.attributes.includes(attributeKey));
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);

  const total = relevantReviews.length;
  const label = ATTRIBUTE_CONFIG[attributeKey]?.label || attributeKey;

  if (total === 0) {
    // Insufficient evidence fallback
    return {
      attributeKey,
      label,
      totalRelevantReviews: 0,
      positiveReviews: 0,
      negativeReviews: 0,
      mixedReviews: 0,
      positiveConsensusPct: 0,
      negativeConsensusPct: 0,
      mixedConsensusPct: 0,
      verdict: 'Not enough evidence',
      supportingReviewIds: [],
      conflictingReviewIds: [],
      summaryNote: `No sample customer reviews directly evaluated ${label.toLowerCase()} for this model.`,
      isSufficientEvidence: false,
    };
  }

  let pos = 0;
  let neg = 0;
  let mix = 0;
  const supportingIds: string[] = [];
  const conflictingIds: string[] = [];

  relevantReviews.forEach(r => {
    if (r.sentiment === 'positive') {
      pos++;
      supportingIds.push(r.id);
    } else if (r.sentiment === 'negative') {
      neg++;
      conflictingIds.push(r.id);
    } else {
      mix++;
      conflictingIds.push(r.id);
    }
  });

  // Calculate percentages using common denominator N
  const positiveConsensusPct = Math.round((pos / total) * 100);
  const negativeConsensusPct = Math.round((neg / total) * 100);
  // Ensure sum equals 100%
  const mixedConsensusPct = Math.max(0, 100 - positiveConsensusPct - negativeConsensusPct);

  // Verdict determination based on academic prototype thresholds
  const isSufficientEvidence = total >= 4; // Prototype minimum sample size
  let verdict: RecommendationVerdict = 'Not enough evidence';

  if (!isSufficientEvidence) {
    verdict = 'Not enough evidence';
  } else if (positiveConsensusPct >= 70 && negativeConsensusPct < 20) {
    verdict = 'Good fit';
  } else if (positiveConsensusPct >= 40) {
    verdict = 'Mixed fit';
  } else {
    verdict = 'Potential mismatch';
  }

  let summaryNote = '';
  if (verdict === 'Good fit') {
    summaryNote = `Strong ${positiveConsensusPct}% positive consensus across ${total} sample reviews evaluating ${label.toLowerCase()}.`;
  } else if (verdict === 'Mixed fit') {
    summaryNote = `Moderate ${positiveConsensusPct}% positive consensus with meaningful conflicting opinions (${mixedConsensusPct}% mixed, ${negativeConsensusPct}% negative).`;
  } else if (verdict === 'Potential mismatch') {
    summaryNote = `Low ${positiveConsensusPct}% positive consensus; ${negativeConsensusPct}% of relevant reviews report notable dissatisfaction.`;
  } else {
    summaryNote = `Fewer than 4 sample reviews mention ${label.toLowerCase()}; insufficient data to establish a reliable verdict.`;
  }

  return {
    attributeKey,
    label,
    totalRelevantReviews: total,
    positiveReviews: pos,
    negativeReviews: neg,
    mixedReviews: mix,
    positiveConsensusPct,
    negativeConsensusPct,
    mixedConsensusPct,
    verdict,
    supportingReviewIds: supportingIds,
    conflictingReviewIds: conflictingIds,
    summaryNote,
    isSufficientEvidence,
  };
}

/**
 * Calculates a full transparent personalized recommendation audit across all user-selected priorities.
 */
export function calculatePersonalizedRecommendationAudit(
  productId: string,
  priorities: PrioritySelection
): PersonalizedRecommendationAudit {
  const selectedKeys = (Object.keys(priorities) as AttributeKey[]).filter(k => priorities[k]);
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);

  if (selectedKeys.length === 0) {
    return {
      overallVerdict: 'Mixed fit',
      averagePositiveScore: product ? Math.round(product.sampleRating * 20) : 75,
      totalSelectedPriorities: 0,
      selectedAttributeKeys: [],
      attributeCalculations: [],
      conflicts: [],
      verdictRationale:
        'Select one or more purchasing priorities above (e.g. Battery life, Camera quality) to view exact attribute calculations and personalized recommendation logic.',
      isSampleAdequate: true,
    };
  }

  const attributeCalculations = selectedKeys.map(key => calculateAttributeConsensus(productId, key));

  // Compute average positive score across selected attributes
  const totalPositiveScore = attributeCalculations.reduce(
    (sum, calc) => sum + calc.positiveConsensusPct,
    0
  );
  const averagePositiveScore = Math.round(totalPositiveScore / selectedKeys.length);

  // Check for insufficient evidence
  const insufficientCount = attributeCalculations.filter(c => !c.isSufficientEvidence).length;
  const isSampleAdequate = insufficientCount < selectedKeys.length;

  // Detect conflicts between selected priorities (e.g. one >= 70% and another <= 45%)
  const conflicts: { attributeA: string; attributeB: string; description: string }[] = [];
  for (let i = 0; i < attributeCalculations.length; i++) {
    for (let j = i + 1; j < attributeCalculations.length; j++) {
      const a = attributeCalculations[i];
      const b = attributeCalculations[j];
      if (Math.abs(a.positiveConsensusPct - b.positiveConsensusPct) >= 30) {
        conflicts.push({
          attributeA: a.label,
          attributeB: b.label,
          description: `${a.label} has ${a.positiveConsensusPct}% positive consensus, whereas ${b.label} has ${b.positiveConsensusPct}% (${a.positiveConsensusPct > b.positiveConsensusPct ? 'stronger' : 'weaker'}).`,
        });
      }
    }
  }

  // Determine overall verdict
  let overallVerdict: RecommendationVerdict = 'Not enough evidence';
  let verdictRationale = '';

  if (!isSampleAdequate) {
    overallVerdict = 'Not enough evidence';
    verdictRationale =
      'There is insufficient sample feedback across your selected priorities to generate a conclusive recommendation.';
  } else if (conflicts.length > 0) {
    overallVerdict = 'Mixed fit';
    verdictRationale = `Your selected priorities show conflicting customer experiences: ${conflicts[0].description} Review the individual attribute breakdowns below before deciding.`;
  } else if (averagePositiveScore >= 70) {
    overallVerdict = 'Good fit';
    verdictRationale = `Customer feedback demonstrates consistently high positive consensus (${averagePositiveScore}%) across all your selected priorities (${selectedKeys.map(k => ATTRIBUTE_CONFIG[k].label).join(', ')}).`;
  } else if (averagePositiveScore >= 40) {
    overallVerdict = 'Mixed fit';
    verdictRationale = `Customer reviews indicate moderate satisfaction (${averagePositiveScore}% positive consensus) with notable trade-offs across your selected priorities.`;
  } else {
    overallVerdict = 'Potential mismatch';
    verdictRationale = `Customer reviews report recurring dissatisfaction (${averagePositiveScore}% positive consensus) regarding one or more of your primary purchasing criteria.`;
  }

  return {
    overallVerdict,
    averagePositiveScore,
    totalSelectedPriorities: selectedKeys.length,
    selectedAttributeKeys: selectedKeys,
    attributeCalculations,
    conflicts,
    verdictRationale,
    isSampleAdequate,
  };
}

export function getThemeBreakdown(productId: string): AttributeThemeInfo[] {
  const reviews = getProductReviews(productId);
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
  const keys: AttributeKey[] = ['battery', 'camera', 'reliability', 'performance', 'value', 'software'];

  return keys.map(key => {
    const matchingReviews = reviews.filter(r => r.attributes.includes(key));
    const total = matchingReviews.length;
    let pos = 0;
    let neg = 0;
    let mix = 0;

    matchingReviews.forEach(r => {
      if (r.sentiment === 'positive') pos++;
      else if (r.sentiment === 'negative') neg++;
      else mix++;
    });

    let posScore = 75;
    if (total > 0) {
      posScore = Math.round((pos / total) * 100);
    } else if (product) {
      if (key === 'battery') {
        posScore = product.specsSummary.battery.includes('5,') || product.specsSummary.battery.includes('4,') ? 86 : 72;
      } else if (key === 'camera') {
        posScore = product.specsSummary.camera.includes('Leica') || product.specsSummary.camera.includes('200MP') || product.specsSummary.camera.includes('5x') ? 92 : 80;
      } else if (key === 'performance') {
        posScore = product.specsSummary.chipset.includes('Snapdragon 8') || product.specsSummary.chipset.includes('A18') ? 94 : 82;
      } else if (key === 'value') {
        posScore = parseInt(product.priceMSRP.replace(/[^0-9]/g, '')) < 600 ? 88 : 74;
      } else {
        posScore = Math.round(product.sampleRating * 18);
      }
    }

    const sentimentSummary: ReviewSentiment =
      posScore >= 70 ? 'positive' : posScore <= 40 ? 'negative' : 'mixed';

    const topQuote =
      matchingReviews.find(r => r.highlightedPhrase)?.highlightedPhrase ||
      matchingReviews[0]?.originalText.slice(0, 80) ||
      product?.aiSummary.appreciatedFeatures.points[0] ||
      'Consistent satisfaction reflected across customer feedback.';

    let explanation = `Customer feedback indicates ${sentimentSummary} consensus for ${ATTRIBUTE_CONFIG[key].label.toLowerCase()}.`;
    if (key === 'battery' && product) {
      explanation = `Features ${product.specsSummary.battery}. Reviewers note dependable day-to-day stamina and charging speed.`;
    } else if (key === 'camera' && product) {
      explanation = `Equipped with ${product.specsSummary.camera}. Praised for daylight color science and autofocus accuracy.`;
    } else if (key === 'performance' && product) {
      explanation = `Powered by ${product.specsSummary.chipset}. Multitasking and app launch velocity maintain fluid frame rates.`;
    } else if (key === 'value' && product) {
      explanation = `Priced at ${product.priceMSRP}. Represents competitive feature balance within the ${product.brand} lineup.`;
    }

    return {
      key,
      label: ATTRIBUTE_CONFIG[key].label,
      totalMentions: Math.max(1, total),
      positiveMentions: Math.max(1, pos),
      negativeMentions: neg,
      mixedMentions: mix,
      positiveScore: posScore,
      sentimentSummary,
      explanation,
      highlightQuote: topQuote,
    };
  });
}

export function getSourceBreakdown(productId: string): SourceComparisonItem[] {
  const reviews = getProductReviews(productId);
  const sources: ('Marketplace' | 'Retailer website' | 'Consumer community')[] = [
    'Marketplace',
    'Retailer website',
    'Consumer community',
  ];

  return sources.map(source => {
    const matched = reviews.filter(r => r.source === source);
    const count = matched.length;

    let avgRating = 4.4;
    let positivePct = 86;
    let negativePct = 8;
    let mixedPct = 6;

    if (count > 0) {
      let totalRating = 0;
      let pos = 0;
      let neg = 0;
      let mix = 0;

      matched.forEach(r => {
        totalRating += r.rating;
        if (r.sentiment === 'positive') pos++;
        else if (r.sentiment === 'negative') neg++;
        else mix++;
      });

      avgRating = Number((totalRating / count).toFixed(1));
      positivePct = Math.round((pos / count) * 100);
      negativePct = Math.round((neg / count) * 100);
      mixedPct = Math.max(0, 100 - positivePct - negativePct);
    }

    let keyObservation = 'Balanced sentiment reflected across general purchase feedback.';
    if (source === 'Consumer community') {
      keyObservation =
        'Community users offer deep technical critique regarding thermal throttling and display specs.';
    } else if (source === 'Retailer website') {
      keyObservation =
        'Verified retail buyers emphasize build quality, unboxing aesthetics, and initial setup ease.';
    } else if (source === 'Marketplace') {
      keyObservation =
        'Marketplace reviews focus on day-to-day delivery, durability, and practical value for dollar.';
    }

    return {
      source,
      count: Math.max(1, count),
      avgRating,
      positivePct,
      negativePct,
      mixedPct,
      keyObservation,
    };
  });
}

export function calculatePersonalizedMatch(productId: string, priorities: PrioritySelection) {
  const audit = calculatePersonalizedRecommendationAudit(productId, priorities);
  const selectedKeys = audit.selectedAttributeKeys;
  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
  if (!product) return { score: 75, summary: 'No product data found.' };

  if (selectedKeys.length === 0) {
    return {
      score: Math.round(product.sampleRating * 20),
      summary:
        'Select your personal purchasing priorities above (e.g. Battery Life, Camera Quality) to calculate a tailored fit score.',
      topMatches: [],
    };
  }

  const matchDetails = audit.attributeCalculations.map(c => ({
    key: c.attributeKey,
    label: c.label,
    score: c.positiveConsensusPct,
    sentiment:
      c.positiveConsensusPct >= 70
        ? ('positive' as ReviewSentiment)
        : c.positiveConsensusPct <= 40
        ? ('negative' as ReviewSentiment)
        : ('mixed' as ReviewSentiment),
    verdict: c.verdict,
  }));

  return {
    score: audit.averagePositiveScore,
    summary: audit.verdictRationale,
    matchDetails,
    audit,
  };
}

export function filterAndSortReviews(
  reviews: Review[],
  options: {
    sentiment?: string;
    source?: string;
    attribute?: string;
    searchQuery?: string;
    sortBy?: 'highest' | 'lowest' | 'recent' | 'oldest' | 'helpful';
  }
): Review[] {
  let filtered = [...reviews];

  if (options.sentiment && options.sentiment !== 'all') {
    filtered = filtered.filter(r => r.sentiment === options.sentiment);
  }

  if (options.source && options.source !== 'all') {
    filtered = filtered.filter(r => r.source === options.source);
  }

  if (options.attribute && options.attribute !== 'all') {
    filtered = filtered.filter(r => r.attributes.includes(options.attribute as AttributeKey));
  }

  if (options.searchQuery && options.searchQuery.trim()) {
    const q = options.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      r =>
        r.title.toLowerCase().includes(q) ||
        r.originalText.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.productVariant.toLowerCase().includes(q)
    );
  }

  if (options.sortBy === 'highest') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (options.sortBy === 'lowest') {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (options.sortBy === 'recent') {
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (options.sortBy === 'oldest') {
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else {
    // default: helpful
    filtered.sort((a, b) => b.helpfulCount - a.helpfulCount);
  }

  return filtered;
}
