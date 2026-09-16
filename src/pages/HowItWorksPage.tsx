import React from 'react';
import { Sparkles, Database, Filter, Cpu, Sliders, FileText, GitCompare, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksPageProps {
  onBackToDiscover: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBackToDiscover }) => {
  const pipelineSteps = [
    {
      step: '01',
      title: 'Target Entity Identification',
      icon: Database,
      description: 'The consumer queries a product, service, or brand. ReviewIQ maps the query to verified product SKUs, hardware variants, and model revisions.',
    },
    {
      step: '02',
      title: 'Multi-Channel Ingestion',
      icon: Sparkles,
      description: 'Reviews are collected across authorized external sources: e-commerce marketplaces, specialized retail websites, and verified consumer enthusiast forums.',
    },
    {
      step: '03',
      title: 'Normalization & Deduplication',
      icon: Filter,
      description: 'Raw feedback is standardized. ReviewIQ flags syndication duplicates, removes bot spam, and extracts verifiable metadata (variant, purchase verification, date).',
    },
    {
      step: '04',
      title: 'Theme & Sentiment Extraction',
      icon: Cpu,
      description: 'Natural language models identify recurring topics (battery stamina, camera shutter speed, thermal throttling) and isolate sentiment per individual attribute.',
    },
    {
      step: '05',
      title: 'Cross-Source Disparity Audit',
      icon: Shield,
      description: 'Feedback is contrasted across platforms to highlight divergence—such as tech enthusiast forums scoring a phone lower due to display specs than general retail buyers.',
    },
    {
      step: '06',
      title: 'Priority-Weighted Personalization',
      icon: Sliders,
      description: 'Consumers configure their personal decision factors (e.g., Battery + Reliability). ReviewIQ re-ranks insights and surfaces recommendations tailored to their routine.',
    },
    {
      step: '07',
      title: 'Evidence Linking & Attributions',
      icon: FileText,
      description: 'Every high-level conclusion and complaint is coupled with verifiable source citations and original quotes to guarantee complete auditability.',
    },
    {
      step: '08',
      title: 'Side-by-Side Informed Decision',
      icon: GitCompare,
      description: 'The shopper compares contenders without forced artificial winners, understanding genuine trade-offs before committing their money.',
    },
  ];

  const deploymentRequirements = [
    {
      title: 'Authorized Data Access & Syndication APIs',
      desc: 'Commercial deployment requires formal API access agreements with major retailers and platform marketplaces, respecting terms of service and robots.txt policies.',
    },
    {
      title: 'Privacy Safeguards & PII Stripping',
      desc: 'Strict stripping of personal identifiable information, usernames, and geo-identifiers before processing text through summarization pipelines.',
    },
    {
      title: 'Probabilistic Anomaly Detection',
      desc: 'Distinguishing between natural review bursts (e.g. viral holiday deals) and automated promotional astroturfing using temporal clustering algorithms.',
    },
    {
      title: 'Continuous Uncertainty Quantification',
      desc: 'Transparently communicating low confidence when sample volume is small or when product variants have conflicting user feedback.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      {/* Hero */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA] text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse"></span>
          <span>Architecture & Product Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#182C45] tracking-tight">
          How ReviewIQ Decodes the Customer Experience
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
          Behind our minimal interface lies a rigorous multi-stage review intelligence architecture designed to turn scattered consumer feedback into transparent purchasing clarity.
        </p>
      </div>

      {/* 8-Step Pipeline */}
      <div className="space-y-6">
        <div className="border-b border-[#D5E9FA] pb-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#182C45] tracking-tight">
            The 8-Stage Intelligence Pipeline
          </h2>
          <p className="text-xs text-[#64748B]">
            From raw consumer feedback ingestion to evidence-backed decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pipelineSteps.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white rounded-2xl border border-[#D5E9FA] p-5 shadow-xs hover:border-[#8CBCE5] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-mono text-[#0284C7] bg-[#EAF5FF] px-2.5 py-1 rounded-md border border-[#D5E9FA]">
                      STAGE {step.step}
                    </span>
                    <div className="p-2 rounded-xl bg-[#EAF5FF] text-[#0284C7] border border-[#D5E9FA]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#182C45]">{step.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commercial Deployment Blueprint */}
      <div className="bg-white text-[#182C45] rounded-3xl p-8 space-y-6 border border-[#D5E9FA] shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
            Commercial Deployment Blueprint
          </span>
          <h2 className="text-2xl font-extrabold text-[#182C45] tracking-tight">
            Real-World Requirements & Safeguards
          </h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Transitioning from this demonstration prototype to a commercial multi-category deployment requires four core infrastructural capabilities:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {deploymentRequirements.map((req, i) => (
            <div
              key={i}
              className="bg-[#F5F8FC] p-5 rounded-xl border border-[#D5E9FA] space-y-2"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#0284C7]">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
                <span>{req.title}</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">{req.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prototype Scope vs Commercial Platform Matrix */}
      <div className="bg-white rounded-3xl border border-[#D5E9FA] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="border-b border-[#D5E9FA] pb-3">
          <h3 className="text-lg font-bold text-[#182C45]">
            Prototype Scope vs. Full Production Vision
          </h3>
          <p className="text-xs text-[#64748B]">
            Clear academic transparency regarding current capabilities versus future commercial implementation.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#D5E9FA] bg-[#F5F8FC] text-[#182C45]">
                <th className="p-3 font-bold">Dimension</th>
                <th className="p-3 font-bold text-[#182C45]">Current Academic Prototype</th>
                <th className="p-3 font-bold text-[#0284C7]">Future Commercial Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
              <tr>
                <td className="p-3 font-bold text-[#182C45]">Data Sourcing</td>
                <td className="p-3 text-[#64748B]">Pre-indexed realistic simulated dataset (22 flagships, 250+ reviews).</td>
                <td className="p-3">Automated API pipeline across verified global retailers & forums.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#182C45]">Backend Infrastructure</td>
                <td className="p-3 text-[#64748B]">100% Client-Side React + TypeScript with zero external server dependencies.</td>
                <td className="p-3">Distributed cloud streaming, vector stores, and embeddings database.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#182C45]">AI Inference</td>
                <td className="p-3 text-[#64748B]">Rule-grounded synthesis and exact ID citations.</td>
                <td className="p-3">Live LLM extraction with fine-tuned domain sentiment models.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[#182C45]">Review Integrity</td>
                <td className="p-3 text-[#64748B]">Illustrative anomaly markers and cluster warnings.</td>
                <td className="p-3">Proprietary statistical bot detection and cluster triangulation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onBackToDiscover}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-extrabold transition-colors shadow-2xs"
          >
            <span>Explore Smartphone Intelligence</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
