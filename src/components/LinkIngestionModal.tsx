import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/mockData';
import { Sparkles, Globe, ArrowRight, CheckCircle2, ShieldCheck, Loader2, X, ExternalLink, Cpu } from 'lucide-react';

interface LinkIngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  initialUrl?: string;
}

const SAMPLE_URLS = [
  {
    label: 'Amazon: iPhone 16 Pro Max',
    url: 'https://www.amazon.in/dp/B0DGJ9N27C/ref=sr_1_1?keywords=iphone+16+pro+max',
    productId: 'iphone-16-pro-max'
  },
  {
    label: 'Best Buy: Sony WH-1000XM5',
    url: 'https://www.bestbuy.com/site/sony-wh-1000xm5-wireless-noise-canceling-headphones/6505727.p',
    productId: 'sony-wh1000xm5'
  },
  {
    label: 'Target: Bose QC Ultra',
    url: 'https://www.target.com/p/bose-quietcomfort-ultra-wireless-noise-cancelling-headphones/-/A-89467794',
    productId: 'bose-qc-ultra'
  }
];

const SCAN_STAGES = [
  { step: 1, title: 'Entity SKU Resolution', desc: 'Parsing URL structure, domain headers, and retail SKU identifier.' },
  { step: 2, title: 'Multi-Channel Harvest', desc: 'Fetching cross-source reviews from marketplaces, retailer portals, and enthusiast forums.' },
  { step: 3, title: 'Deduplication & Bot Scrub', desc: 'Running lexical clustering to flag astroturfing bursts and syndicated duplicate reviews.' },
  { step: 4, title: 'Theme & Sentiment Extraction', desc: 'Isolating attribute sentiment across battery, camera, ANC, and ergonomics.' },
  { step: 5, title: 'Consensus & Caveat Synthesis', desc: 'Generating evidence-backed summary with direct source review links.' },
];

export const LinkIngestionModal: React.FC<LinkIngestionModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  initialUrl = ''
}) => {
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [resolvedProduct, setResolvedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (initialUrl) {
      setInputUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleStartScan = (urlToUse?: string) => {
    const url = (urlToUse || inputUrl).trim();
    if (!url) return;

    // Resolve matching product in catalogue
    let matched: Product | undefined;
    if (url.toLowerCase().includes('sony') || url.toLowerCase().includes('xm5')) {
      matched = SAMPLE_PRODUCTS.find(p => p.id === 'sony-wh1000xm5');
    } else if (url.toLowerCase().includes('bose') || url.toLowerCase().includes('quietcomfort')) {
      matched = SAMPLE_PRODUCTS.find(p => p.id === 'bose-qc-ultra');
    } else if (url.toLowerCase().includes('airpods') || url.toLowerCase().includes('max')) {
      matched = SAMPLE_PRODUCTS.find(p => p.id === 'airpods-max');
    } else if (url.toLowerCase().includes('galaxy') || url.toLowerCase().includes('s24')) {
      matched = SAMPLE_PRODUCTS.find(p => p.id === 'galaxy-s24');
    } else if (url.toLowerCase().includes('pixel') || url.toLowerCase().includes('pixel-9')) {
      matched = SAMPLE_PRODUCTS.find(p => p.id === 'pixel-9');
    } else {
      matched = SAMPLE_PRODUCTS.find(p => p.id === 'iphone-16-pro-max') || SAMPLE_PRODUCTS[0];
    }

    setIsScanning(true);
    setCurrentStage(1);
    setResolvedProduct(matched || SAMPLE_PRODUCTS[0]);

    // Step-by-step progress simulation
    const t1 = setTimeout(() => setCurrentStage(2), 700);
    const t2 = setTimeout(() => setCurrentStage(3), 1500);
    const t3 = setTimeout(() => setCurrentStage(4), 2200);
    const t4 = setTimeout(() => {
      setCurrentStage(5);
      setIsScanning(false);
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-midnight/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-bordergray w-full max-w-2xl overflow-hidden text-midnight flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-midnight text-white px-6 py-4.5 flex items-start justify-between border-b border-midnight-light">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-glacier text-midnight flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Live Review Ingestion Simulator
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-glacier/20 text-glacier border border-glacier/30 uppercase">
                  8-Stage Pipeline
                </span>
              </div>
              <p className="text-xs text-sky/70">
                Paste any retail link to simulate ReviewIQ multi-source deduplication and decoding.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-midnight-light transition-colors"
            aria-label="Close ingestion simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 bg-lightgray">
          {/* URL Input Form */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-midnight block">
              Product Page URL or Retailer Link:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={e => setInputUrl(e.target.value)}
                placeholder="https://www.amazon.in/dp/B0DGJ9N27C/..."
                disabled={isScanning}
                className="flex-1 bg-white border border-bordergray rounded-xl px-4 py-2.5 text-xs text-midnight placeholder-slateSecondary focus:outline-none focus:ring-2 focus:ring-glacier shadow-2xs font-mono"
              />
              <button
                onClick={() => handleStartScan()}
                disabled={!inputUrl.trim() || isScanning}
                className="px-5 py-2.5 bg-midnight hover:bg-midnight-light text-white rounded-xl text-xs font-bold transition-colors shadow-xs disabled:opacity-40 flex items-center gap-1.5 shrink-0"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-glacier" />
                    <span>Decoding...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-glacier" />
                    <span>Audit Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Links */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-slateSecondary font-medium">Quick sample links:</span>
              {SAMPLE_URLS.map(sample => (
                <button
                  key={sample.productId}
                  onClick={() => {
                    setInputUrl(sample.url);
                    handleStartScan(sample.url);
                  }}
                  disabled={isScanning}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-iceberg text-midnight border border-bordergray font-semibold transition-colors shadow-2xs"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Timeline */}
          {currentStage > 0 && (
            <div className="bg-white rounded-2xl border border-bordergray p-5 shadow-card space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-bordergray/60 pb-2.5">
                <span className="text-xs font-bold text-midnight uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-glacier-deep" /> Pipeline Execution Progress
                </span>
                <span className="text-xs font-mono font-bold text-midnight bg-iceberg px-2.5 py-0.5 rounded border border-bordergray">
                  Stage {currentStage} of 5
                </span>
              </div>

              <div className="space-y-2.5">
                {SCAN_STAGES.map(st => {
                  const isDone = currentStage > st.step;
                  const isCurrent = currentStage === st.step && isScanning;
                  const isPending = currentStage < st.step;

                  return (
                    <div
                      key={st.step}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-iceberg border border-glacier/60 shadow-2xs'
                          : isDone
                          ? 'bg-lightgray/60'
                          : 'opacity-40'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-feedback-positive" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-glacier-deep animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-bordergray flex items-center justify-center text-[10px] font-mono text-slateSecondary">
                            {st.step}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs font-bold ${isCurrent ? 'text-midnight' : isDone ? 'text-midnight' : 'text-slateSecondary'}`}>
                            {st.title}
                          </h5>
                          {isDone && <span className="text-[10px] text-feedback-positive font-bold">Verified</span>}
                          {isCurrent && <span className="text-[10px] text-glacier-deep font-bold animate-pulse">Running</span>}
                        </div>
                        <p className="text-[11px] text-slateSecondary leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Resolved Product Banner */}
              {currentStage === 5 && resolvedProduct && (
                <div className="mt-4 p-4 rounded-xl bg-iceberg border border-glacier space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={resolvedProduct.imageUrl}
                        alt={resolvedProduct.name}
                        className="w-12 h-12 rounded-lg object-cover bg-white border border-bordergray"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-glacier-deep block">
                          Entity Decoded Successfully
                        </span>
                        <h4 className="text-sm font-extrabold text-midnight">
                          {resolvedProduct.name}
                        </h4>
                        <span className="text-xs text-slateSecondary">
                          {resolvedProduct.priceMSRP} • {resolvedProduct.sampleReviewCount} reviews analyzed
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(resolvedProduct.id);
                      }}
                      className="px-4 py-2 bg-midnight hover:bg-midnight-light text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                    >
                      <span>Open Report</span>
                      <ArrowRight className="w-3.5 h-3.5 text-glacier" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-bordergray flex items-center justify-between text-xs text-slateSecondary">
          <p className="text-[11px]">
            In production, ReviewIQ ingests live customer feeds via retailer API syndication.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-midnight hover:bg-lightgray transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

