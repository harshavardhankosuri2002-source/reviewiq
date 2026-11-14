import React, { useState, useMemo, useRef } from 'react';
import { Product, ShopperPersona, PrioritySelection } from '../types';
import {
  Search,
  Star,
  ArrowRight,
  Bookmark,
  GitCompare,
  ShieldCheck,
  ChevronRight,
  Check,
  Database,
  UserCheck,
  FileText,
  Scale,
  ShieldAlert,
  Layers,
  SlidersHorizontal,
  X,
  Sparkles,
  Headphones as HeadphonesIcon,
  Smartphone as SmartphoneIcon,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { getProductSentimentStats, calculatePersonalizedMatch } from '../utils/analytics';
import { SHOPPER_PERSONAS, ATTRIBUTE_CONFIG } from '../data/mockData';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { formatINR } from '../utils/currency';

interface DiscoverPageProps {
  products: Product[];
  onSelectProduct: (id: string) => void;
  onSearchSubmit: (query: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  comparedIds?: string[];
  onNavigateHowItWorks: () => void;
  onOpenLinkIngestion?: () => void;
  onSelectPersonaPreset?: (persona: ShopperPersona) => void;
}

const BRAND_OPTIONS = [
  { label: 'All Brands', value: 'all' },
  { label: 'Apple', value: 'Apple' },
  { label: 'Samsung', value: 'Samsung' },
  { label: 'Sony', value: 'Sony' },
  { label: 'Bose', value: 'Bose' },
  { label: 'Google Pixel', value: 'Google' },
  { label: 'OnePlus', value: 'OnePlus' },
  { label: 'Xiaomi / Redmi', value: 'Xiaomi' },
  { label: 'Nothing', value: 'Nothing' },
  { label: 'Motorola', value: 'Motorola' },
  { label: 'Realme', value: 'Realme' },
];

const PRICE_TIERS = [
  { label: 'All Prices', min: 0, max: 999999 },
  { label: 'Budget (<₹30,000)', min: 0, max: 30000 },
  { label: 'Midrange (₹30,000–₹50,000)', min: 30001, max: 50000 },
  { label: 'Flagship (₹50,000–₹1,00,000)', min: 50001, max: 100000 },
  { label: 'Ultra-Premium (₹1,00,000+)', min: 100001, max: 999999 },
];

const POPULAR_SEARCHES = [
  'iPhone 16 Pro Max',
  'Sony WH-1000XM5',
  'Galaxy S24 Ultra',
  'Bose QC Ultra',
  'Pixel 9 Pro',
  'OnePlus 12',
];

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  products,
  onSelectProduct,
  onSearchSubmit,
  savedIds,
  onToggleSave,
  onCompare,
  onNavigateHowItWorks,
  onOpenLinkIngestion,
  onSelectPersonaPreset,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [activePersona, setActivePersona] = useState<ShopperPersona | null>(null);
  const [isLoadingSkeletons, setIsLoadingSkeletons] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Smartphones' | 'Headphones'>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [activePriceTierIndex, setActivePriceTierIndex] = useState<number>(0);
  const [catalogueSearch, setCatalogueSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'fit' | 'reviews' | 'price-asc' | 'price-desc' | 'newest'>('rating');
  const [showExtendedFilters, setShowExtendedFilters] = useState<boolean>(false);

  const catalogueRef = useRef<HTMLDivElement>(null);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onSearchSubmit(heroSearch.trim());
    }
  };

  const scrollToCatalogue = () => {
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Select Persona from Hero C with tactile Iceberg Shimmer transition
  const handleSelectPersona = (persona: ShopperPersona | null) => {
    setIsLoadingSkeletons(true);
    setActivePersona(persona);

    if (persona && onSelectPersonaPreset) {
      onSelectPersonaPreset(persona);
      setSortBy('fit');
    } else {
      setSortBy('rating');
    }

    setTimeout(() => {
      setIsLoadingSkeletons(false);
    }, 350);
  };

  // Category switch with Iceberg Shimmer transition
  const handleCategorySwitch = (cat: 'all' | 'Smartphones' | 'Headphones') => {
    setIsLoadingSkeletons(true);
    setActiveCategory(cat);
    setTimeout(() => {
      setIsLoadingSkeletons(false);
    }, 300);
  };

  // Simulated AI Refresh
  const triggerSimulatedRefresh = () => {
    setIsLoadingSkeletons(true);
    setTimeout(() => {
      setIsLoadingSkeletons(false);
    }, 400);
  };

  // Calculate persona priority object
  const activePriorities = useMemo<PrioritySelection>(() => {
    if (!activePersona) return {};
    const p: PrioritySelection = {};
    activePersona.priorities.forEach(key => {
      p[key] = true;
    });
    return p;
  }, [activePersona]);

  // Filter & Sort Logic across all 23 products
  const filteredProducts = useMemo(() => {
    const q = catalogueSearch.toLowerCase().trim();
    const priceTier = PRICE_TIERS[activePriceTierIndex];

    return products
      .filter(p => {
        // Category match
        if (activeCategory !== 'all') {
          if (p.category !== activeCategory) return false;
        }

        // Search query match
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.quickVerdict.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.specsSummary?.chipset && p.specsSummary.chipset.toLowerCase().includes(q)) ||
          (p.specsSummary?.display && p.specsSummary.display.toLowerCase().includes(q));

        // Brand match
        let matchesBrand = true;
        if (activeBrand !== 'all') {
          if (activeBrand === 'Xiaomi') {
            matchesBrand =
              p.brand.toLowerCase().includes('xiaomi') ||
              p.brand.toLowerCase().includes('redmi');
          } else {
            matchesBrand = p.brand.toLowerCase() === activeBrand.toLowerCase();
          }
        }

        // Price match
        const numPrice = parseInt(p.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;
        const matchesPrice = numPrice >= priceTier.min && numPrice <= priceTier.max;

        return matchesQuery && matchesBrand && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'fit' && activePersona) {
          const matchA = calculatePersonalizedMatch(a.id, activePriorities).score;
          const matchB = calculatePersonalizedMatch(b.id, activePriorities).score;
          if (matchB !== matchA) return matchB - matchA;
        }

        const priceA = parseInt(a.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;
        const priceB = parseInt(b.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;

        if (sortBy === 'rating') return b.sampleRating - a.sampleRating;
        if (sortBy === 'reviews') return b.sampleReviewCount - a.sampleReviewCount;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return b.releaseYear - a.releaseYear;
      });
  }, [products, catalogueSearch, activeCategory, activeBrand, activePriceTierIndex, sortBy, activePersona, activePriorities]);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveBrand('all');
    setActivePriceTierIndex(0);
    setCatalogueSearch('');
    setSortBy(activePersona ? 'fit' : 'rating');
  };

  const hasActiveFilters = activeCategory !== 'all' || activeBrand !== 'all' || activePriceTierIndex !== 0 || catalogueSearch.trim() || activePersona !== null;

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* ============================================================ */}
      {/* 1. HERO SECTION: ELEVATED EDITORIAL & PERSONA CONTROLS       */}
      {/* ============================================================ */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-[#F8FAFC] border-b border-slate-200/80">
        {/* Subtle Ambient Radial Wash */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-sky-200/30 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-7 relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span>ReviewIQ • Customer feedback, decoded</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Understand the experience <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              behind the rating.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Synthesizing thousands of verified customer opinions across retail channels and forums into transparent, evidence-backed purchasing intelligence.
          </p>

          {/* ========================================================== */}
          {/* ELEVATED PERSONA SWITCHER (Sleek Segmented Pill Group)     */}
          {/* ========================================================== */}
          <div className="pt-2 max-w-3xl mx-auto space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Personalize by Buyer Archetype:</span>
            </div>

            <div className="p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-center gap-1">
              {/* Default All */}
              <button
                onClick={() => handleSelectPersona(null)}
                className={`flex-1 min-w-[120px] px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activePersona === null
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>🌐</span>
                <span>All Shoppers</span>
              </button>

              {SHOPPER_PERSONAS.map(p => {
                const isSelected = activePersona?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPersona(p)}
                    className={`flex-1 min-w-[120px] px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{p.emoji}</span>
                    <span>{p.name.split('/')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Persona Helper String */}
            {activePersona && (
              <div className="text-xs text-slate-500 font-medium flex items-center justify-center gap-2 animate-fadeIn">
                <span className="text-sky-700 font-semibold">{activePersona.tagline}:</span>
                <span>Prioritizing {activePersona.priorities.map(k => ATTRIBUTE_CONFIG[k]?.label || k).join(', ')}</span>
                <button
                  onClick={() => handleSelectPersona(null)}
                  className="text-[11px] text-slate-400 hover:text-slate-700 underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* OMNI-SEARCH BAR (Clean, Shadow-elevated)                   */}
          {/* ========================================================== */}
          <div className="pt-2 max-w-xl mx-auto space-y-3">
            <form onSubmit={handleHeroSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={heroSearch}
                onChange={e => setHeroSearch(e.target.value)}
                placeholder="Search 23 products (e.g. iPhone 16 Pro, Sony XM5, Bose Ultra)..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 text-sm pl-11 pr-28 py-3.5 rounded-xl border border-slate-200 shadow-md focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4" />
              <button
                type="submit"
                className="btn-nordic-primary absolute right-1.5 py-2 px-3.5 text-xs"
              >
                <span>Search</span>
                <span className="text-slate-400 font-mono text-[10px] hidden sm:inline">[Enter]</span>
              </button>
            </form>

            {/* Clean Trending Searches Row */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Trending:</span>
              {POPULAR_SEARCHES.map(tag => (
                <button
                  key={tag}
                  onClick={() => onSearchSubmit(tag)}
                  className="px-2.5 py-0.5 rounded-md hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CORE CAPABILITIES (Clean Editorial Layout)                */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
              System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Built for Confident Purchasing
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              How ReviewIQ transforms noisy, scattered customer feedback into objective buying confidence.
            </p>
          </div>

          <button
            onClick={onNavigateHowItWorks}
            className="btn-nordic-secondary self-start sm:self-auto text-xs"
          >
            <span>Full Methodology</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="card-elevated p-6 rounded-2xl flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Cross-Source Review Ingestion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aggregates customer feedback across marketplaces, retail portals, and technical enthusiast forums into a single normalized intelligence stream.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Catalog Coverage</span>
              <span className="text-slate-700 font-mono font-bold">23 Verified Models</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card-elevated p-6 rounded-2xl flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Personalized Decision Engine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dynamically weights products based on your priorities—whether battery stamina, zoom photography, ANC isolation, or build longevity.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Priority Matching</span>
              <span className="text-emerald-700 font-mono font-bold">Deterministic Scoring</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card-elevated p-6 rounded-2xl flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Evidence-Backed AI Summaries</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Distills positive consensus, recurring complaints, conflicting opinions, and critical trade-offs with verifiable citation IDs back to raw reviews.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Transparency</span>
              <span className="text-indigo-700 font-mono font-bold">Direct Citation Links</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="card-elevated p-6 rounded-2xl flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Multi-Device Comparison</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare any 2 to 4 devices across our 23-product matrix side-by-side on verified hardware specs, customer sentiment, and user-priority fit scores.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Comparison Matrix</span>
              <span className="text-sky-700 font-bold">Side-by-Side</span>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="card-elevated p-6 rounded-2xl flex flex-col justify-between space-y-5 md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Trust, Bot Purging & Review Stress-Testing</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                Audits duplicate text bot campaigns, penalizes sudden review bursts, and maintains an interactive stress-test tool to inspect how ReviewIQ resists coordinated manipulation.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Authenticity Auditing</span>
              <span className="text-purple-700 font-mono font-bold">3 Bot Screening Models Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2.5 LIVE PRODUCT LINK INGESTION SCANNER BANNER               */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Live Ingestion Pipeline Simulator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Have an external product link? Test our 8-Stage Parser
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Paste an Amazon, Flipkart, or BestBuy link to simulate real-time HTML parsing, cross-retailer deduplication, bot cluster filtering, and consensus decoding.
            </p>
          </div>
          {onOpenLinkIngestion && (
            <button
              onClick={onOpenLinkIngestion}
              className="btn-nordic-accent py-3 px-5 text-xs font-bold shrink-0 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Ingestion Simulator</span>
            </button>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. EXPANDED PRODUCT CATALOGUE & UNIFIED TOOLBAR              */}
      {/* ============================================================ */}
      <section ref={catalogueRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Filter Controls Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Verified Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Explore Decoded Reviews ({products.length} Products)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Inspect evidence-backed summaries across 20 smartphones and 3 flagship ANC headphones.
              </p>
            </div>

            {/* Simulated Refresh & Counter */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <button
                onClick={triggerSimulatedRefresh}
                className="btn-nordic-secondary text-xs py-1.5"
                title="Trigger simulated AI loading shimmer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
                <span>Simulate Refresh</span>
              </button>

              <div className="text-xs font-mono bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                Showing {filteredProducts.length} of {products.length}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="btn-nordic-secondary text-xs py-1.5 text-rose-600 hover:text-rose-700 hover:border-rose-300"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Persona Banner if selected */}
          {activePersona && (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">{activePersona.emoji}</span>
                <span className="font-bold text-slate-900">Personalized Ranking:</span>
                <span className="font-semibold text-sky-800">{activePersona.name}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 text-[11px]">
                  Priorities: {activePersona.priorities.map(k => ATTRIBUTE_CONFIG[k]?.label || k).join(', ')}
                </span>
              </div>
              <button
                onClick={() => handleSelectPersona(null)}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline self-start sm:self-auto"
              >
                Clear Persona
              </button>
            </div>
          )}

          {/* ========================================================== */}
          {/* UNIFIED COMMAND TOOLBAR: CATEGORIES, SEARCH, SORT         */}
          {/* ========================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Segmented Tabs */}
            <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => handleCategorySwitch('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => handleCategorySwitch('Smartphones')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeCategory === 'Smartphones'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <SmartphoneIcon className="w-3.5 h-3.5" />
                <span>Smartphones (20)</span>
              </button>
              <button
                onClick={() => handleCategorySwitch('Headphones')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeCategory === 'Headphones'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HeadphonesIcon className="w-3.5 h-3.5" />
                <span>Headphones (3)</span>
              </button>
            </div>

            {/* Search & Sort & Filter Toggle */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={catalogueSearch}
                  onChange={e => setCatalogueSearch(e.target.value)}
                  placeholder="Filter by name or spec..."
                  className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs pl-8 pr-7 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                {catalogueSearch && (
                  <button
                    onClick={() => setCatalogueSearch('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white text-slate-900 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 cursor-pointer font-medium"
              >
                {activePersona && <option value="fit">Sort: Persona Fit Score</option>}
                <option value="rating">Sort: Highest Rating</option>
                <option value="reviews">Sort: Most Reviews</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
                <option value="newest">Sort: Newest</option>
              </select>

              {/* Filter Drawer Toggle */}
              <button
                onClick={() => setShowExtendedFilters(!showExtendedFilters)}
                className={`btn-nordic-secondary text-xs py-2 px-2.5 ${showExtendedFilters ? 'bg-slate-100 border-slate-400' : ''}`}
                title="Filter by Brand & Price"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Collapsible Extended Filters (Brand & Price) */}
          {showExtendedFilters && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 animate-fadeIn">
              {/* Brand Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Brand:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BRAND_OPTIONS.map(b => (
                    <button
                      key={b.value}
                      onClick={() => setActiveBrand(b.value)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        activeBrand === b.value
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Chips */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Price Tier:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRICE_TIERS.map((tier, idx) => (
                    <button
                      key={tier.label}
                      onClick={() => setActivePriceTierIndex(idx)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        activePriceTierIndex === idx
                          ? 'bg-sky-600 text-white font-bold'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* SKELETON SHIMMER / ELEVATED PRODUCT CARDS GRID               */}
        {/* ============================================================ */}
        {isLoadingSkeletons ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardSkeleton count={6} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              No products found matching your current filter combination.
            </p>
            <button
              onClick={resetFilters}
              className="btn-nordic-primary text-xs"
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const stats = getProductSentimentStats(product.id);
              const isSaved = savedIds.includes(product.id);
              const personaMatch = activePersona
                ? calculatePersonalizedMatch(product.id, activePriorities)
                : null;

              return (
                <div
                  key={product.id}
                  className="card-elevated rounded-2xl overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Clean Image Container */}
                    <div
                      className="relative aspect-16/10 bg-gradient-to-b from-slate-50/80 to-slate-100/30 p-6 flex items-center justify-center cursor-pointer border-b border-slate-100"
                      onClick={() => onSelectProduct(product.id)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                        }}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                      />

                      {/* Brand Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-bold border border-slate-200 shadow-2xs">
                        {product.brand}
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 bg-slate-900 text-white px-2.5 py-0.5 rounded-md text-xs font-bold shadow-xs">
                        {formatINR(product.priceMSRP)}
                      </div>

                      {/* Persona Fit Score Overlay Badge if active */}
                      {personaMatch && (
                        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>{personaMatch.score}% Fit Match</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3.5">
                      <div>
                        <h3
                          onClick={() => onSelectProduct(product.id)}
                          className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer leading-snug"
                        >
                          {product.name}
                        </h3>

                        {/* Star Rating & Review Count */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.sampleRating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-slate-800">{product.sampleRating}</span>
                          <span className="text-xs text-slate-400">
                            • {product.sampleReviewCount} verified reviews
                          </span>
                        </div>
                      </div>

                      {/* Sleek Specs Strip (Inline, No Heavy Gray Box) */}
                      <div className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">
                          {product.category === 'Headphones' ? 'Engine:' : 'Chipset:'}
                        </span>
                        <span className="truncate">
                          {(product.specsSummary.chipset || 'Integrated').split('(')[0]}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="truncate">
                          {(product.specsSummary.display || 'Acoustic Driver').split(',')[0]}
                        </span>
                      </div>

                      {/* Slim Minimalist Sentiment Meter */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-400 font-medium">Customer Consensus</span>
                          <span className="text-emerald-700 font-bold font-mono">
                            {stats.positivePct}% Positive
                          </span>
                        </div>

                        {/* 4px Slim Segmented Bar */}
                        <div className="h-1.5 w-full rounded-full bg-slate-100 flex overflow-hidden">
                          <div
                            style={{ width: `${stats.positivePct}%` }}
                            className="bg-emerald-500"
                            title={`Positive: ${stats.positivePct}%`}
                          />
                          <div
                            style={{ width: `${stats.mixedPct}%` }}
                            className="bg-amber-400"
                            title={`Mixed: ${stats.mixedPct}%`}
                          />
                          <div
                            style={{ width: `${stats.negativePct}%` }}
                            className="bg-rose-400"
                            title={`Negative: ${stats.negativePct}%`}
                          />
                        </div>
                      </div>

                      {/* Decoded Verdict (Editorial Quote Style) */}
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 border-l-2 border-sky-400/40 pl-3">
                        {product.quickVerdict}
                      </p>

                      {/* Source & Verified Indicator */}
                      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 text-slate-400">
                        <span className="text-[11px] font-mono flex items-center gap-1 truncate">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{product.retailerName}</span>
                        </span>
                        <a
                          href={product.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700"
                        >
                          <span>Official Link</span>
                          <ArrowRight className="w-3 h-3 text-sky-600" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="btn-nordic-primary w-full text-xs"
                    >
                      <span>Inspect Decoded Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onToggleSave(product.id)}
                        className={`btn-nordic-secondary w-full text-xs ${
                          isSaved ? 'bg-sky-50 text-sky-700 border-sky-200' : ''
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isSaved ? 'fill-sky-600 text-sky-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
                      </button>

                      <button
                        onClick={() => onCompare(product.id)}
                        className="btn-nordic-secondary w-full text-xs"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-sky-600" />
                        <span>Compare</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
