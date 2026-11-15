import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, Layers, ShieldCheck, CheckCircle2, ArrowRight, BarChart3, Users, Building2, ShoppingBag } from 'lucide-react';

interface CommercializationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommercializationModal: React.FC<CommercializationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'model' | 'streams' | 'economics' | 'projections'>('model');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-midnight/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-bordergray w-full max-w-4xl max-h-[92vh] overflow-hidden text-midnight flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-midnight text-white px-6 py-5 flex items-start justify-between border-b border-midnight-light">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-glacier/20 text-glacier border border-glacier/30 uppercase tracking-wide">
                MBA Capstone Presentation
              </span>
              <span className="text-xs text-slate-300">• Commercial Strategy & Financial Architecture</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              VOX: Business Model & Unit Economics
            </h3>
            <p className="text-xs text-sky/70 mt-0.5">
              Decoded customer feedback as a dual B2C decision engine and high-margin B2B data intelligence platform.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-midnight-light transition-colors"
            aria-label="Close business model modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-iceberg px-6 py-3 border-b border-bordergray flex flex-wrap items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('model')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'model'
                ? 'bg-midnight text-white shadow-2xs'
                : 'bg-white text-midnight border border-bordergray hover:bg-lightgray'
            }`}
          >
            1. Market Problem & TAM
          </button>
          <button
            onClick={() => setActiveTab('streams')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'streams'
                ? 'bg-midnight text-white shadow-2xs'
                : 'bg-white text-midnight border border-bordergray hover:bg-lightgray'
            }`}
          >
            2. Monetization Architecture
          </button>
          <button
            onClick={() => setActiveTab('economics')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'economics'
                ? 'bg-midnight text-white shadow-2xs'
                : 'bg-white text-midnight border border-bordergray hover:bg-lightgray'
            }`}
          >
            3. Unit Economics & LTV/CAC
          </button>
          <button
            onClick={() => setActiveTab('projections')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'projections'
                ? 'bg-midnight text-white shadow-2xs'
                : 'bg-white text-midnight border border-bordergray hover:bg-lightgray'
            }`}
          >
            4. 3-Year Projections
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-lightgray">
          {/* TAB 1: Market Problem & TAM */}
          {activeTab === 'model' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-bordergray shadow-card space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-glacier-deep block">Total Addressable Market</span>
                  <div className="text-3xl font-extrabold text-midnight">$8.2B</div>
                  <p className="text-xs text-slateSecondary leading-relaxed">
                    Global consumer review management & product intelligence software market by 2028 (CAGR: 14.8%).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-bordergray shadow-card space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-glacier-deep block">Consumer Friction Cost</span>
                  <div className="text-3xl font-extrabold text-midnight">74%</div>
                  <p className="text-xs text-slateSecondary leading-relaxed">
                    Of online consumers report feeling overwhelmed by conflicting 4.5-star ratings and astroturfed reviews.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-bordergray shadow-card space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-glacier-deep block">Retailer Return Rate</span>
                  <div className="text-3xl font-extrabold text-midnight">16.5%</div>
                  <p className="text-xs text-slateSecondary leading-relaxed">
                    E-commerce return rate driven by unmet product expectations and masked hardware flaws.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-bordergray p-6 shadow-card space-y-4">
                <h4 className="text-sm font-bold text-midnight uppercase tracking-wider">
                  The Dual-Sided Market Opportunity
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-midnight">
                  <div className="p-4 rounded-xl bg-iceberg border border-bordergray space-y-2">
                    <div className="flex items-center gap-2 font-bold text-midnight">
                      <ShoppingBag className="w-4 h-4 text-glacier-deep" />
                      <span>For Consumers (B2C Side)</span>
                    </div>
                    <p className="text-slateSecondary leading-relaxed">
                      Converts 500+ scattered reviews into 5 personalized priority match points in under 10 seconds. Eliminates the cognitive fatigue of cross-tab browser research.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-iceberg border border-bordergray space-y-2">
                    <div className="flex items-center gap-2 font-bold text-midnight">
                      <Building2 className="w-4 h-4 text-glacier-deep" />
                      <span>For Retailers & Brands (B2B Side)</span>
                    </div>
                    <p className="text-slateSecondary leading-relaxed">
                      Provides structured, tamper-proof review intelligence APIs that improve checkout conversion by +14% while reducing costly return rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Monetization Architecture */}
          {activeTab === 'streams' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-bordergray shadow-card space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-midnight bg-iceberg px-2 py-0.5 rounded border border-bordergray">
                      Stream 1 (B2C)
                    </span>
                    <h4 className="text-base font-extrabold text-midnight">Affiliate Commerce</h4>
                    <p className="text-xs text-slateSecondary leading-relaxed">
                      Consumers click verified buy links after reviewing personalized fit. VOX earns <strong>1.5% to 3.5%</strong> high-intent affiliate commission on completed transactions.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-bordergray/60 text-xs font-bold text-feedback-positive">
                    Zero consumer friction • High conversion
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-bordergray shadow-card space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-midnight bg-iceberg px-2 py-0.5 rounded border border-bordergray">
                      Stream 2 (B2B API)
                    </span>
                    <h4 className="text-base font-extrabold text-midnight">Enterprise PDP API</h4>
                    <p className="text-xs text-slateSecondary leading-relaxed">
                      E-commerce marketplaces license VOX's decoded theme badges directly onto product detail pages (PDPs) on a <strong>$0.004 / call</strong> consumption model.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-bordergray/60 text-xs font-bold text-glacier-deep">
                    Recurring developer revenue • Sticky contract
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-bordergray shadow-card space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-midnight bg-iceberg px-2 py-0.5 rounded border border-bordergray">
                      Stream 3 (SaaS)
                    </span>
                    <h4 className="text-base font-extrabold text-midnight">Brand Pulse SaaS</h4>
                    <p className="text-xs text-slateSecondary leading-relaxed">
                      Hardware manufacturers subscribe at <strong>$499 to $1,999/mo</strong> to monitor cross-channel defect spikes, competitor sentiment vulnerabilities, and firmware drift.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-bordergray/60 text-xs font-bold text-midnight">
                    High ACV • 12-month enterprise billing
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-iceberg border border-bordergray text-xs text-midnight flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-glacier-deep shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Synergistic Flywheel:</strong> Free B2C consumer traffic powers organic search SEO, which generates review mention data assets that feed high-margin B2B data licensing and brand intelligence contracts.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Unit Economics */}
          {activeTab === 'economics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white border border-bordergray shadow-card text-center space-y-1">
                  <span className="text-[10px] font-bold text-slateSecondary uppercase">Blended CAC</span>
                  <div className="text-2xl font-extrabold text-midnight">$4.20</div>
                  <span className="text-[10px] text-feedback-positive font-bold">SEO & Chrome ext</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-bordergray shadow-card text-center space-y-1">
                  <span className="text-[10px] font-bold text-slateSecondary uppercase">Consumer LTV</span>
                  <div className="text-2xl font-extrabold text-midnight">$26.80</div>
                  <span className="text-[10px] text-midnight font-bold">3.2 purchases/yr</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-bordergray shadow-card text-center space-y-1">
                  <span className="text-[10px] font-bold text-slateSecondary uppercase">LTV : CAC Ratio</span>
                  <div className="text-2xl font-extrabold text-feedback-positive">6.4x</div>
                  <span className="text-[10px] text-slateSecondary">Target: &gt; 3.0x</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-bordergray shadow-card text-center space-y-1">
                  <span className="text-[10px] font-bold text-slateSecondary uppercase">Gross Margin</span>
                  <div className="text-2xl font-extrabold text-midnight">86%</div>
                  <span className="text-[10px] text-slateSecondary">Low LLM inference cost</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-bordergray p-5 shadow-card space-y-3">
                <h4 className="text-xs font-bold text-midnight uppercase tracking-wider">
                  Cost Structure & Margin Defense
                </h4>
                <div className="space-y-2 text-xs text-midnight">
                  <div className="flex justify-between py-1.5 border-b border-bordergray/60">
                    <span className="text-slateSecondary">Inference & Vector Caching Cost (per product dossier)</span>
                    <span className="font-mono font-bold">$0.008</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-bordergray/60">
                    <span className="text-slateSecondary">Average Affiliate Basket Size</span>
                    <span className="font-mono font-bold">$680.00</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-bordergray/60">
                    <span className="text-slateSecondary">Average Commission per Attributed Sale (2.2% net)</span>
                    <span className="font-mono font-bold text-feedback-positive">$14.96</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold">
                    <span>Net Contribution Margin per Attributed Sale</span>
                    <span className="font-mono text-feedback-positive">93.2%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 3-Year Projections */}
          {activeTab === 'projections' && (
            <div className="bg-white rounded-2xl border border-bordergray shadow-card overflow-hidden animate-fadeIn">
              <div className="p-5 border-b border-bordergray/60">
                <h4 className="text-sm font-bold text-midnight">
                  3-Year Financial & Operational Projections
                </h4>
                <p className="text-xs text-slateSecondary">
                  Modeled on organic consumer search expansion and enterprise B2B partner rollouts.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-iceberg text-midnight font-bold border-b border-bordergray">
                      <th className="p-3.5">Metric</th>
                      <th className="p-3.5">Year 1</th>
                      <th className="p-3.5">Year 2</th>
                      <th className="p-3.5 text-glacier-deep">Year 3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bordergray text-slateSecondary font-medium">
                    <tr>
                      <td className="p-3.5 font-bold text-midnight">Monthly Active Shoppers (MAU)</td>
                      <td className="p-3.5 font-mono text-midnight">250,000</td>
                      <td className="p-3.5 font-mono text-midnight">1,400,000</td>
                      <td className="p-3.5 font-mono text-midnight font-bold">4,800,000</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-midnight">Active B2B SaaS Subscriptions</td>
                      <td className="p-3.5 font-mono text-midnight">40</td>
                      <td className="p-3.5 font-mono text-midnight">220</td>
                      <td className="p-3.5 font-mono text-midnight font-bold">750</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-midnight">B2C Affiliate Revenue</td>
                      <td className="p-3.5 font-mono text-midnight">$480,000</td>
                      <td className="p-3.5 font-mono text-midnight">$2,640,000</td>
                      <td className="p-3.5 font-mono text-midnight font-bold">$8,900,000</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-midnight">B2B API & SaaS Revenue</td>
                      <td className="p-3.5 font-mono text-midnight">$320,000</td>
                      <td className="p-3.5 font-mono text-midnight">$1,850,000</td>
                      <td className="p-3.5 font-mono text-midnight font-bold">$5,400,000</td>
                    </tr>
                    <tr className="bg-lightgray font-bold text-midnight">
                      <td className="p-3.5">Total Revenue</td>
                      <td className="p-3.5 font-mono">$800,000</td>
                      <td className="p-3.5 font-mono">$4,490,000</td>
                      <td className="p-3.5 font-mono text-feedback-positive font-extrabold">$14,300,000</td>
                    </tr>
                    <tr className="bg-emerald-50/50 font-bold text-feedback-positive">
                      <td className="p-3.5">EBITDA (Margin %)</td>
                      <td className="p-3.5 font-mono">-$120,000 (-15%)</td>
                      <td className="p-3.5 font-mono">+$920,000 (+20%)</td>
                      <td className="p-3.5 font-mono">+$4,860,000 (+34%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-bordergray flex flex-col sm:flex-row items-center justify-between text-xs text-slateSecondary gap-3">
          <p className="text-[11px]">
            VOX MBA Capstone Business Deck • Prepared for Evaluators & Investors.
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-midnight hover:bg-midnight-light text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Close Deck
          </button>
        </div>
      </div>
    </div>
  );
};

