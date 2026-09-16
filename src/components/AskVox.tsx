import React, { useState } from 'react';
import { Product, QAItem } from '../types';
import { MessageSquare, Send, Sparkles, FileText, Info } from 'lucide-react';
import { PREDEFINED_QA_ITEMS } from '../data/mockData';

interface AskVoxProps {
  product: Product;
  onOpenEvidence: (title: string, subtitle: string, reviewIds: string[]) => void;
}

export const AskVox: React.FC<AskVoxProps> = ({ product, onOpenEvidence }) => {
  const [selectedQA, setSelectedQA] = useState<QAItem | null>(null);
  const [customQuery, setCustomQuery] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [noMatchFound, setNoMatchFound] = useState(false);

  // Get predefined Q&As or generate dynamic questions based on product data
  const defaultQuestions: QAItem[] = [
    {
      id: `qa-${product.id}-battery`,
      productId: product.id,
      question: `Is the ${product.name} good for someone who prioritizes battery life?`,
      answer: `Based on customer feedback and hardware specifications (${product.specsSummary.battery}), the ${product.name} provides ${product.quickVerdict.includes('battery') ? 'solid day-to-day stamina' : 'dependable all-day usage'}. Key takeaway: ${product.aiSummary.appreciatedFeatures.points[0] || 'Battery endurance is well-rated for daily use.'}`,
      category: 'battery',
      supportingReviewIds: product.aiSummary.appreciatedFeatures.supportingReviewIds,
      confidenceNote: `Synthesized from verified customer reviews and ${product.specsSummary.battery}.`
    },
    {
      id: `qa-${product.id}-complaints`,
      productId: product.id,
      question: `What are the most common complaints for the ${product.name}?`,
      answer: `The primary recurring complaints from customer reviews are: (1) ${product.aiSummary.commonComplaints.points[0] || 'High pricing relative to segment competitors.'}; (2) ${product.aiSummary.commonComplaints.points[1] || 'Moderate charging speed.'}; and (3) ${product.aiSummary.importantCaveats.points[0] || 'Ensure the form factor and specs match your priorities.'}`,
      category: 'general',
      supportingReviewIds: product.aiSummary.commonComplaints.supportingReviewIds,
      confidenceNote: 'Extracted from common complaints and caveats sections.'
    },
    {
      id: `qa-${product.id}-camera`,
      productId: product.id,
      question: `How is the camera performance on the ${product.name}?`,
      answer: `The camera setup (${product.specsSummary.camera}) receives praise for daylight sharpness and color science: "${product.aiSummary.appreciatedFeatures.points.find(p => p.toLowerCase().includes('camera') || p.toLowerCase().includes('sensor')) || product.aiSummary.appreciatedFeatures.points[0]}".`,
      category: 'camera',
      supportingReviewIds: product.aiSummary.appreciatedFeatures.supportingReviewIds,
      confidenceNote: `Derived from camera optics (${product.specsSummary.camera}) and reviews.`
    },
    {
      id: `qa-${product.id}-worth`,
      productId: product.id,
      question: `Is the ${product.name} worth buying at ${product.priceMSRP}?`,
      answer: `At ${product.priceMSRP}, the ${product.name} represents strong value for users wanting ${product.specsSummary.chipset}. ${product.quickVerdict}`,
      category: 'recommendation',
      supportingReviewIds: product.aiSummary.appreciatedFeatures.supportingReviewIds,
      confidenceNote: `Based on pricing MSRP (${product.priceMSRP}) and verified sentiment.`
    }
  ];

  const matchedExisting = PREDEFINED_QA_ITEMS.filter(qa => qa.productId === product.id);
  const displayQAs = matchedExisting.length > 0 ? matchedExisting : defaultQuestions;

  const handleSelectQuestion = (qa: QAItem) => {
    setIsSynthesizing(true);
    setNoMatchFound(false);
    setSelectedQA(null);

    setTimeout(() => {
      setSelectedQA(qa);
      setIsSynthesizing(false);
    }, 250);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setIsSynthesizing(true);
    setSelectedQA(null);
    setNoMatchFound(false);

    const qLower = customQuery.toLowerCase();

    setTimeout(() => {
      let match: QAItem | undefined;

      if (qLower.includes('battery') || qLower.includes('charging') || qLower.includes('endurance') || qLower.includes('power')) {
        match = displayQAs.find(q => q.category === 'battery') || defaultQuestions[0];
      } else if (qLower.includes('complaint') || qLower.includes('problem') || qLower.includes('issue') || qLower.includes('bad') || qLower.includes('worst') || qLower.includes('drawback')) {
        match = displayQAs.find(q => q.category === 'general') || defaultQuestions[1];
      } else if (qLower.includes('camera') || qLower.includes('photo') || qLower.includes('picture') || qLower.includes('lens') || qLower.includes('zoom')) {
        match = displayQAs.find(q => q.category === 'camera') || defaultQuestions[2];
      } else if (qLower.includes('worth') || qLower.includes('buy') || qLower.includes('should') || qLower.includes('price') || qLower.includes('cost')) {
        match = displayQAs.find(q => q.category === 'recommendation') || defaultQuestions[3];
      } else {
        // Fallback dynamic synthesis
        match = {
          id: `qa-${product.id}-dynamic`,
          productId: product.id,
          question: customQuery,
          answer: `Regarding "${customQuery}": Customer reviews for the ${product.name} emphasize ${product.aiSummary.appreciatedFeatures.points[0]} while noting ${product.aiSummary.commonComplaints.points[0]}`,
          category: 'general',
          supportingReviewIds: product.aiSummary.appreciatedFeatures.supportingReviewIds,
          confidenceNote: `Synthesized dynamically across ${product.sampleReviewCount} verified reviews.`
        };
      }

      if (match) {
        setSelectedQA(match);
      } else {
        setNoMatchFound(true);
      }
      setIsSynthesizing(false);
    }, 300);
  };

  return (
    <div id="ask-vox-section" className="bg-white rounded-3xl border border-[#D5E9FA] shadow-sm p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D5E9FA] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
              <MessageSquare className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              Natural Language Assistant
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#182C45] tracking-tight">
            Ask VOX About This Phone
          </h2>
          <p className="text-xs text-[#64748B]">
            Ask questions about real-world battery endurance, common complaints, or camera behavior.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#0284C7] bg-[#EAF5FF] border border-[#D5E9FA] px-3.5 py-1.5 rounded-xl font-mono font-semibold">
          <Info className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Grounded in {product.sampleReviewCount} reviews</span>
        </div>
      </div>

      {/* Suggested Question Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#182C45] block">
          Frequent Questions for {product.name}:
        </label>
        <div className="flex flex-wrap gap-2">
          {displayQAs.map(qa => (
            <button
              key={qa.id}
              onClick={() => handleSelectQuestion(qa)}
              className={`text-left text-xs px-3.5 py-2 rounded-xl border transition-all ${
                selectedQA?.id === qa.id
                  ? 'bg-[#0284C7] text-white font-bold shadow-xs border-[#0284C7]'
                  : 'bg-[#F5F8FC] text-[#475569] border-[#D5E9FA] hover:bg-[#EAF5FF] hover:text-[#182C45]'
              }`}
            >
              {qa.question}
            </button>
          ))}
        </div>
      </div>

      {/* Freeform Question Input Form */}
      <form onSubmit={handleCustomSubmit} className="relative">
        <input
          type="text"
          value={customQuery}
          onChange={e => setCustomQuery(e.target.value)}
          placeholder={`Ask anything about the ${product.name} (e.g., How long does battery last? Any heating issues?)...`}
          className="w-full bg-[#F5F8FC] text-[#182C45] placeholder-[#94A3B8] text-xs sm:text-sm pl-4 pr-12 py-3.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all shadow-xs"
        />
        <button
          type="submit"
          disabled={!customQuery.trim() || isSynthesizing}
          className="absolute right-2 top-2 p-2 bg-[#0284C7] text-white rounded-lg hover:bg-[#0369A1] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
          title="Submit question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Loading Animation */}
      {isSynthesizing && (
        <div className="p-6 rounded-2xl bg-[#F5F8FC] border border-[#D5E9FA] flex items-center justify-center gap-3 text-[#0284C7] text-xs animate-pulse font-medium">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Searching verified review corpus and synthesizing response...</span>
        </div>
      )}

      {/* No Match Notification */}
      {noMatchFound && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
          <p className="font-bold">No direct consensus match found for this question.</p>
          <p className="text-amber-700">Try selecting one of the frequent questions above or ask about battery, camera, price, or complaints.</p>
        </div>
      )}

      {/* Synthesized Answer Card */}
      {selectedQA && !isSynthesizing && (
        <div className="bg-[#F5F8FC] rounded-2xl border border-[#8CBCE5] p-6 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2 text-[#0284C7] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>VOX Synthesized Answer</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#182C45]">
            "{selectedQA.question}"
          </h3>

          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
            {selectedQA.answer}
          </p>

          <div className="pt-3 border-t border-[#D5E9FA] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#64748B]">
            <span className="italic text-[#64748B]">{selectedQA.confidenceNote}</span>

            {selectedQA.supportingReviewIds && selectedQA.supportingReviewIds.length > 0 && (
              <button
                onClick={() =>
                  onOpenEvidence(
                    selectedQA.question,
                    selectedQA.confidenceNote,
                    selectedQA.supportingReviewIds
                  )
                }
                className="text-[#0284C7] hover:text-[#0369A1] font-bold inline-flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View supporting reviews ({selectedQA.supportingReviewIds.length}) &rarr;</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Also export as AskReviewIQ for backward compatibility
export const AskReviewIQ = AskVox;
