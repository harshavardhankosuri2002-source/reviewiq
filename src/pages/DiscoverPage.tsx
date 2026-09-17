import React, { useState, useMemo, useRef } from 'react';
import { Product } from '../types';
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
} from 'lucide-react';
import { getProductSentimentStats } from '../utils/analytics';
import { FloatingPhonesHero } from '../components/FloatingPhonesHero';
import { formatINR, parsePriceNumber } from '../utils/currency';

interface DiscoverPageProps {
  products: Product[];
  onSelectProduct: (id: string) => void;
  onSearchSubmit: (query: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  comparedIds?: string[];
  onNavigateHowItWorks: () => void;
}

const BRAND_OPTIONS = [
  { label: 'All Brands', value: 'all' },
  { label: 'Apple', value: 'Apple' },
  { label: 'Samsung', value: 'Samsung' },
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
  'Galaxy S24 Ultra',
  'Pixel 9',
  'OnePlus 12',
  'Nothing Phone',
  '120Hz LTPO',
  '200MP Camera',
];

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  products,
  onSelectProduct,
  onSearchSubmit,
  savedIds,
  onToggleSave,
  onCompare,
  onNavigateHowItWorks,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [activePriceTierIndex, setActivePriceTierIndex] = useState<number>(0);
  const [catalogueSearch, setCatalogueSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price-asc' | 'price-desc' | 'newest'>('rating');

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

  // Filter & Sort Logic across all 22+ products
  const filteredProducts = useMemo(() => {
    const q = catalogueSearch.toLowerCase().trim();
    const priceTier = PRICE_TIERS[activePriceTierIndex];

    return products
      .filter(p => {
        // Search query match
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.quickVerdict.toLowerCase().includes(q) ||
          p.specsSummary.chipset.toLowerCase().includes(q) ||
          p.specsSummary.display.toLowerCase().includes(q);

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
        const priceA = parseInt(a.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;
        const priceB = parseInt(b.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;

        if (sortBy === 'rating') return b.sampleRating - a.sampleRating;
        if (sortBy === 'reviews') return b.sampleReviewCount - a.sampleReviewCount;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return b.releaseYear - a.releaseYear;
      });
  }, [products, catalogueSearch, activeBrand, activePriceTierIndex, sortBy]);

  const resetFilters = () => {
    setActiveBrand('all');
    setActivePriceTierIndex(0);
    setCatalogueSearch('');
    setSortBy('rating');
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Minimal Light, Floating Phones Visual)      */}
      {/* ============================================================ */}
      <section className="relative pt-10 sm:pt-16 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glow */}
        <div className="ambient-glow-iceberg w-[600px] h-[320px] top-0 left-1/2 -translate-x-1/2 opacity-70" />

        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF5FF] border border-[#B8DBF7] text-xs font-bold text-[#0284C7] shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse"></span>
            <span>Customer feedback, decoded across 22 smartphone models.</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#182C45] leading-tight">
            Understand the experience <br className="hidden sm:block" />
            <span className="text-[#0284C7]">behind the rating.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            VOX synthesizes thousands of customer opinions across marketplaces, retail portals, and technical forums into evidence-backed, personalized decision intelligence.
          </p>

          {/* Primary Action & Quick Search */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <button
              onClick={scrollToCatalogue}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group"
            >
              <span>Explore Catalogue ({products.length} Phones)</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            <form onSubmit={handleHeroSearchSubmit} className="relative w-full sm:w-80">
              <input
                type="text"
                value={heroSearch}
                onChange={e => setHeroSearch(e.target.value)}
                placeholder="Search phone (e.g. Pixel 9, OnePlus 12)..."
                className="w-full bg-white text-[#182C45] placeholder-[#94A3B8] text-xs sm:text-sm pl-10 pr-4 py-3.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all shadow-soft"
              />
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-4" />
            </form>
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-[#64748B] font-medium">Trending:</span>
            {POPULAR_SEARCHES.map(tag => (
              <button
                key={tag}
                onClick={() => onSearchSubmit(tag)}
                className="px-3 py-1 rounded-lg bg-white hover:bg-[#EAF5FF] border border-[#D5E9FA] hover:border-[#8CBCE5] text-[#475569] hover:text-[#0284C7] font-semibold transition-all text-[11px] shadow-soft"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Floating Smartphone Hero Stage */}
        <FloatingPhonesHero
          onExploreClick={scrollToCatalogue}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* ============================================================ */}
      {/* 2. CORE CAPABILITIES (Minimalist OHAMA Light Cards)          */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#D5E9FA] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
              Product Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight mt-1">
              Built for Confident Purchasing
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-xl">
              How VOX transforms noisy, scattered customer feedback into objective buying confidence.
            </p>
          </div>

          <button
            onClick={onNavigateHowItWorks}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors self-start sm:self-auto"
          >
            <span>Full methodology</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5FF] border border-[#B8DBF7] flex items-center justify-center text-[#0284C7] group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Multi-Source Ingestion</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Aggregates customer feedback across marketplaces, retail portals, and technical enthusiast forums into a single feed.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#D5E9FA] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                <span>Catalogue Coverage</span>
                <span className="text-[#0284C7] font-mono font-bold">22 Models Active</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-medium">
                <div className="bg-white py-1.5 rounded text-[#334155] border border-[#E2E8F0]">Amazon / BestBuy</div>
                <div className="bg-white py-1.5 rounded text-[#334155] border border-[#E2E8F0]">Carrier Stores</div>
                <div className="bg-white py-1.5 rounded text-[#334155] border border-[#E2E8F0]">Reddit / Forums</div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Personalized Insights</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Dynamically scores phones based on your priorities—whether battery endurance, zoom photography, or longevity.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#D5E9FA] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#64748B] uppercase font-semibold">Dynamic Decision Score</span>
                <p className="text-xs font-bold text-[#182C45]">Tailored to User Priorities</p>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#EAF5FF] border border-[#B8DBF7] text-[#0284C7] text-xs font-extrabold font-mono">
                94% FIT
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">4-Quadrant AI Summaries</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Distills positives, complaints, conflicting opinions, and critical caveats with direct evidence links to original reviews.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#D5E9FA] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Consensus Strengths & Standouts</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-rose-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[8px] font-bold">!</span>
                <span>Unvarnished Drawbacks & Caveats</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Multi-Device Comparison</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Compare any 2 to 4 smartphones across the 22-device catalogue side-by-side on specs, verified sentiment, and pros/cons.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#D5E9FA] flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-[#182C45]">Compare Any 22 Models</span>
              </div>
              <span className="text-[#0284C7] text-[11px] font-bold">Side-by-Side &rarr;</span>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all flex flex-col justify-between space-y-5 shadow-card group md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5FF] border border-[#B8DBF7] flex items-center justify-center text-[#0284C7] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Trust, Transparency & Bot Screening</h3>
              <p className="text-xs text-[#475569] leading-relaxed max-w-xl">
                Distinguishes verified customer quotes from AI interpretation, audits duplicate text bot clusters, and provides verifiable citation IDs for every claim.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3.5 rounded-xl border border-[#D5E9FA] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[#334155] text-[11px] font-medium">Evidence-Linked IDs</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ShieldAlert className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span className="text-[#334155] text-[11px] font-medium">Bot Cluster Audits</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Layers className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-[#334155] text-[11px] font-medium">Source Diversity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. EXPANDED PRODUCT CATALOGUE (22 Models, Filter & Search)    */}
      {/* ============================================================ */}
      <section ref={catalogueRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Filter Controls Bar */}
        <div className="space-y-6 border-b border-[#D5E9FA] pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
                Expanded Smartphone Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight mt-1">
                Explore Decoded Reviews ({products.length} Models)
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Search, filter by brand or price, and inspect evidence-backed summaries across flagships and midrangers.
              </p>
            </div>

            {/* Results Counter & Reset */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="text-xs font-mono bg-[#EAF5FF] text-[#0284C7] font-bold px-3.5 py-1.5 rounded-xl border border-[#B8DBF7]">
                Showing <strong className="text-[#182C45]">{filteredProducts.length}</strong> of {products.length} Smartphones
              </div>
              {(activeBrand !== 'all' || activePriceTierIndex !== 0 || catalogueSearch.trim()) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[#64748B] hover:text-[#182C45] bg-white px-3 py-1.5 rounded-xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Search & Sort Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Live Filter Search Input */}
            <div className="relative md:col-span-2">
              <input
                type="text"
                value={catalogueSearch}
                onChange={e => setCatalogueSearch(e.target.value)}
                placeholder="Filter by name, chipset, or specs (e.g., iPhone 16 Pro, Snapdragon 8 Gen 3, Leica)..."
                className="w-full bg-white text-[#182C45] placeholder-[#94A3B8] text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all shadow-soft"
              />
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
              {catalogueSearch && (
                <button
                  onClick={() => setCatalogueSearch('')}
                  className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#182C45]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full bg-white text-[#182C45] text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] appearance-none cursor-pointer shadow-soft font-medium"
              >
                <option value="rating">Sort by: Highest Customer Rating</option>
                <option value="reviews">Sort by: Most Reviews & Mentions</option>
                <option value="price-asc">Sort by: Price: Low to High</option>
                <option value="price-desc">Sort by: Price: High to Low</option>
                <option value="newest">Sort by: Newest Release Generation</option>
              </select>
              <SlidersHorizontal className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Brand Filter Pill Tabs */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
              Filter by Brand:
            </span>
            <div className="flex flex-wrap gap-2">
              {BRAND_OPTIONS.map(b => {
                const isActive = activeBrand === b.value;
                return (
                  <button
                    key={b.value}
                    onClick={() => setActiveBrand(b.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0284C7] text-white shadow-sm'
                        : 'bg-white text-[#475569] border border-[#D5E9FA] hover:bg-[#EAF5FF] hover:text-[#0284C7]'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter Tabs */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
              Filter by Price Segment:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRICE_TIERS.map((tier, idx) => {
                const isActive = activePriceTierIndex === idx;
                return (
                  <button
                    key={tier.label}
                    onClick={() => setActivePriceTierIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7]'
                        : 'bg-white text-[#64748B] border border-[#D5E9FA] hover:text-[#182C45] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PRODUCT GRID (22 Models in Clean OHAMA White Cards)         */}
        {/* ============================================================ */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#D5E9FA] text-center space-y-4 max-w-lg mx-auto shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF5FF] border border-[#B8DBF7] text-[#0284C7] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#182C45]">No matching smartphones found</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              No smartphones match your current filters. Try changing your search query or reset the brand and price filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const isSaved = savedIds.includes(product.id);
              const stats = getProductSentimentStats(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] transition-all flex flex-col justify-between overflow-hidden group shadow-card hover:shadow-card-hover"
                >
                  <div>
                    {/* Image Hero Container */}
                    <div
                      className="relative aspect-16/10 bg-[#F5F8FC] overflow-hidden cursor-pointer"
                      onClick={() => onSelectProduct(product.id)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Floating Brand & Price Badges */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0284C7] px-2.5 py-1 rounded-lg text-xs font-bold border border-[#D5E9FA] shadow-sm">
                        {product.brand}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#182C45] text-white px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm">
                        {formatINR(product.priceMSRP)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3
                          onClick={() => onSelectProduct(product.id)}
                          className="text-lg font-bold text-[#182C45] hover:text-[#0284C7] transition-colors cursor-pointer leading-snug"
                        >
                          {product.name}
                        </h3>

                        {/* Star Rating & Review Count */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.sampleRating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[#182C45]">{product.sampleRating}</span>
                          <span className="text-xs text-[#64748B]">
                            ({product.sampleReviewCount} verified reviews)
                          </span>
                        </div>
                      </div>

                      {/* Specs Summary Pill Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#334155] bg-[#F5F8FC] p-3 rounded-xl border border-[#D5E9FA]">
                        <div>
                          <span className="text-[9px] text-[#64748B] uppercase font-bold block">
                            Chipset
                          </span>
                          <span className="truncate block font-semibold">{product.specsSummary.chipset.split('(')[0]}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#64748B] uppercase font-bold block">
                            Display
                          </span>
                          <span className="truncate block font-semibold">{product.specsSummary.display.split(',')[0]}</span>
                        </div>
                      </div>

                      {/* Customer Sentiment Distribution */}
                      <div className="space-y-2 bg-[#F5F8FC] p-3.5 rounded-xl border border-[#D5E9FA] text-xs">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-[#475569]">Customer Sentiment</span>
                          <span className="text-emerald-700 font-mono font-bold">
                            {stats.positivePct}% Positive
                          </span>
                        </div>

                        <div className="h-2 w-full rounded-full bg-[#E2E8F0] flex overflow-hidden">
                          <div
                            style={{ width: `${stats.positivePct}%` }}
                            className="bg-emerald-500"
                            title={`Positive: ${stats.positivePct}%`}
                          />
                          <div
                            style={{ width: `${stats.mixedPct}%` }}
                            className="bg-amber-500"
                            title={`Mixed: ${stats.mixedPct}%`}
                          />
                          <div
                            style={{ width: `${stats.negativePct}%` }}
                            className="bg-rose-500"
                            title={`Negative: ${stats.negativePct}%`}
                          />
                        </div>

                        <div className="flex justify-between text-[10px] text-[#64748B] pt-0.5 font-medium">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {stats.positivePct}% Pos
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            {stats.mixedPct}% Mix
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            {stats.negativePct}% Neg
                          </span>
                        </div>
                      </div>

                      {/* Decoded Verdict */}
                      <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                        {product.quickVerdict}
                      </p>

                      {/* Verified Retailer Link in Card */}
                      <div className="pt-1 flex items-center justify-between text-xs border-t border-[#E2E8F0]/60">
                        <span className="text-[11px] text-[#64748B] font-mono flex items-center gap-1 truncate">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{product.retailerName}</span>
                        </span>
                        <a
                          href={product.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0284C7] hover:underline shrink-0"
                        >
                          <span>Official Link</span>
                          <ArrowRight className="w-3 h-3 text-[#0284C7]" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 pt-0 border-t border-[#E2E8F0] mt-2 space-y-2.5">
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="w-full mt-4 py-2.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>Inspect Decoded Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onToggleSave(product.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors ${
                          isSaved
                            ? 'bg-[#EAF5FF] text-[#0284C7] border-[#B8DBF7]'
                            : 'bg-white text-[#475569] border-[#D5E9FA] hover:bg-[#F5F8FC] hover:text-[#182C45]'
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isSaved ? 'fill-[#0284C7] text-[#0284C7]' : 'text-[#94A3B8]'
                          }`}
                        />
                        <span>{isSaved ? 'Shortlisted' : 'Shortlist'}</span>
                      </button>

                      <button
                        onClick={() => onCompare(product.id)}
                        className="py-2 px-3 rounded-xl text-xs font-bold bg-white text-[#475569] border border-[#D5E9FA] hover:bg-[#F5F8FC] hover:text-[#182C45] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-[#0284C7]" />
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
