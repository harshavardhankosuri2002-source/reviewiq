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
  'Nothing Phone (2)',
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
    }, 380);
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
    }, 450);
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

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* ============================================================ */}
      {/* 1. HERO C: PERSONA ARCHETYPES FIRST (Optivo Clean Tech)      */}
      {/* ============================================================ */}
      <section className="relative pt-8 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#EAF5FF]/80 via-[#F5F8FC] to-[#F5F8FC] border-b border-[#D5E9FA]">
        {/* Ambient Glow */}
        <div className="ambient-glow-iceberg w-[700px] h-[350px] top-0 left-1/2 -translate-x-1/2 opacity-60" />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-[#D5E9FA] text-xs font-bold text-[#182C45] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-ping"></span>
            <span>Persona-First Review Intelligence • 23 Multi-Category Devices</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#182C45] leading-tight">
            Understand the experience <br className="hidden sm:block" />
            <span className="text-[#0284C7]">behind the rating.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Every buyer values different things. Select your purchasing archetype below to instantly re-rank all 23 flagship smartphones and headphones by what verified customers say about battery stamina, camera fidelity, ANC isolation, or durability.
          </p>

          {/* ========================================================== */}
          {/* HERO C: LIVE PERSONA ARCHETYPES GRID                       */}
          {/* ========================================================== */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 max-w-4xl mx-auto px-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#182C45] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Step 1: Choose Your Buyer Archetype</span>
              </span>
              {activePersona && (
                <button
                  onClick={() => handleSelectPersona(null)}
                  className="text-xs font-bold text-[#64748B] hover:text-[#182C45] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Organic Market Rating</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
              {/* Archetype 1: Business Traveler */}
              {SHOPPER_PERSONAS.map(persona => {
                const isSelected = activePersona?.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className={`p-3.5 rounded-md border text-left transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#182C45] text-white border-[#182C45] shadow-md scale-[1.02]'
                        : 'bg-white text-[#182C45] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{persona.emoji}</span>
                        {isSelected ? (
                          <span className="w-4 h-4 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px] font-bold">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#64748B] font-mono">
                            {persona.priorities.length} specs
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-black leading-tight ${isSelected ? 'text-white' : 'text-[#182C45]'}`}>
                        {persona.name}
                      </h4>
                      <p className={`text-[10px] mt-1 line-clamp-2 leading-tight ${isSelected ? 'text-sky-200' : 'text-[#64748B]'}`}>
                        {persona.tagline}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#DCE6F0]/50 flex flex-wrap gap-1">
                      {persona.priorities.slice(0, 2).map(pKey => (
                        <span
                          key={pKey}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-[#EAF5FF] text-[#0284C7]'
                          }`}
                        >
                          {ATTRIBUTE_CONFIG[pKey]?.label || pKey}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}

              {/* Archetype 5: All Shoppers / Neutral */}
              <button
                onClick={() => handleSelectPersona(null)}
                className={`p-3.5 rounded-md border text-left transition-all duration-150 flex flex-col justify-between ${
                  activePersona === null
                    ? 'bg-[#182C45] text-white border-[#182C45] shadow-md scale-[1.02]'
                    : 'bg-white text-[#182C45] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F8FAFC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">🌐</span>
                    {activePersona === null ? (
                      <span className="w-4 h-4 rounded bg-[#0284C7] text-white flex items-center justify-center text-[10px] font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#64748B] font-mono">All Specs</span>
                    )}
                  </div>
                  <h4 className={`text-xs font-black leading-tight ${activePersona === null ? 'text-white' : 'text-[#182C45]'}`}>
                    Organic Consensus
                  </h4>
                  <p className={`text-[10px] mt-1 line-clamp-2 leading-tight ${activePersona === null ? 'text-sky-200' : 'text-[#64748B]'}`}>
                    Standard unweighted customer score across all 540 verified reviews.
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#DCE6F0]/50">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold block text-center ${
                    activePersona === null ? 'bg-white/20 text-white' : 'bg-[#EAF5FF] text-[#0284C7]'
                  }`}>
                    Unweighted Rating
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Search & Explore Row with Nordic Sharp Action */}
          <div className="pt-2 max-w-2xl mx-auto space-y-3">
            <form onSubmit={handleHeroSearchSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  placeholder="Search 23 products (e.g. iPhone 16 Pro, Sony XM5, Bose Ultra, S24 Ultra)..."
                  className="w-full bg-white text-[#182C45] placeholder-[#94A3B8] text-xs sm:text-sm pl-10 pr-4 py-3 rounded-md border border-[#DCE6F0] focus:outline-none focus:border-[#182C45] focus:ring-1 focus:ring-[#182C45] transition-all shadow-2xs"
                />
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
              </div>
              <button
                type="submit"
                className="btn-nordic-primary shrink-0 py-3 px-6 cursor-pointer"
              >
                <span>Search Decoded Reviews</span>
                <span className="text-slate-400 font-mono text-[10px]">[Enter]</span>
              </button>
            </form>

            {/* Trending Searches with Nordic Sharp Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-[#64748B] font-bold text-[11px]">Trending:</span>
              {POPULAR_SEARCHES.map(tag => (
                <button
                  key={tag}
                  onClick={() => onSearchSubmit(tag)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F5F8FC] border border-[#DCE6F0] hover:border-[#182C45] text-[#182C45] font-semibold transition-all text-[11px] active:translate-y-0.5"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CORE CAPABILITIES (Trust, Multi-Source & Intelligence)     */}
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
              How ReviewIQ transforms noisy, scattered customer feedback into objective buying confidence.
            </p>
          </div>

          <button
            onClick={onNavigateHowItWorks}
            className="btn-nordic-secondary self-start sm:self-auto"
          >
            <span>Full Methodology</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Core Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#182C45] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#EAF5FF] border border-[#B8DBF7] flex items-center justify-center text-[#0284C7] group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Multi-Source Ingestion</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Aggregates customer feedback across marketplaces, retail portals, and technical enthusiast forums into a single normalized intelligence stream.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-md border border-[#D5E9FA] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                <span>Catalogue Coverage</span>
                <span className="text-[#0284C7] font-mono font-bold">23 Models Active</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-medium">
                <div className="bg-white py-1.5 rounded text-[#334155] border border-[#E2E8F0]">Amazon / BestBuy</div>
                <div className="bg-white py-1.5 rounded text-[#334155] border border-[#E2E8F0]">Carrier Stores</div>
                <div className="bg-white py-1.5 rounded text-[#334155] border border-[#E2E8F0]">Reddit / Forums</div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#182C45] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Personalized Decision Engine</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Dynamically weights products based on your priorities—whether battery stamina, zoom photography, ANC isolation, or build longevity.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-md border border-[#D5E9FA] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#64748B] uppercase font-semibold">Dynamic Decision Score</span>
                <p className="text-xs font-bold text-[#182C45]">Tailored to User Priorities</p>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#182C45] text-white text-xs font-extrabold font-mono">
                94% FIT
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#182C45] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Evidence-Backed Summaries</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Distills positive consensus, recurring complaints, conflicting opinions, and critical trade-offs with verifiable citation IDs back to raw reviews.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-md border border-[#D5E9FA] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Consensus Strengths & Standouts</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-rose-800 font-bold">
                <span className="w-2.5 h-2.5 rounded bg-rose-200 text-rose-800 flex items-center justify-center text-[8px] font-bold">!</span>
                <span>Unvarnished Drawbacks & Caveats</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#182C45] transition-all flex flex-col justify-between space-y-5 shadow-card group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Multi-Device Comparison</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Compare any 2 to 4 devices across our 23-product matrix side-by-side on verified hardware specs, customer sentiment, and user-priority fit scores.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-md border border-[#D5E9FA] flex items-center justify-between text-xs font-semibold">
              <span className="text-[#182C45]">Compare Any 23 Models</span>
              <span className="text-[#0284C7] text-[11px] font-bold">Side-by-Side &rarr;</span>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-2xl border border-[#D5E9FA] hover:border-[#182C45] transition-all flex flex-col justify-between space-y-5 shadow-card group md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#EAF5FF] border border-[#B8DBF7] flex items-center justify-center text-[#0284C7] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#182C45]">Trust, Bot Purging & Review Stress-Testing</h3>
              <p className="text-xs text-[#475569] leading-relaxed max-w-xl">
                Audits duplicate text bot campaigns, penalizes sudden review bursts, and maintains an interactive stress-test tool to inspect how ReviewIQ resists coordinated manipulation.
              </p>
            </div>

            <div className="bg-[#F5F8FC] p-3.5 rounded-md border border-[#D5E9FA] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[#334155] text-[11px] font-medium">Evidence-Linked IDs</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ShieldAlert className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span className="text-[#334155] text-[11px] font-medium">Bot Cluster Screening</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Layers className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-[#334155] text-[11px] font-medium">Source Diversity Index</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2.5 LIVE PRODUCT LINK INGESTION SCANNER BANNER               */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#182C45] via-[#1E3A5F] to-[#0F1D30] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Live Ingestion Pipeline Simulator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Have a retail link? Test our 8-Stage Real-Time Parser
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Paste an Amazon, Flipkart, or BestBuy link to simulate real-time HTML scraping, cross-retailer deduplication, bot cluster filtering, and consensus decoding.
            </p>
          </div>
          {onOpenLinkIngestion && (
            <button
              onClick={onOpenLinkIngestion}
              className="btn-nordic-accent py-3.5 px-6 text-sm shrink-0 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Ingestion Simulator</span>
            </button>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. EXPANDED PRODUCT CATALOGUE (Phones & Headphones)          */}
      {/* ============================================================ */}
      <section ref={catalogueRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Filter Controls Bar */}
        <div className="space-y-6 border-b border-[#D5E9FA] pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
                Multi-Category Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182C45] tracking-tight mt-1">
                Explore Decoded Reviews ({products.length} Products)
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Inspect evidence-backed summaries across 20 smartphones and 3 flagship ANC headphones with active persona matching.
              </p>
            </div>

            {/* Results Counter, Persona Indicator & Refresh */}
            <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
              <button
                onClick={triggerSimulatedRefresh}
                className="btn-nordic-secondary text-xs"
                title="Trigger simulated AI loading shimmer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Simulate Refresh</span>
              </button>

              <div className="text-xs font-mono bg-[#EAF5FF] text-[#0284C7] font-bold px-3 py-1.5 rounded-md border border-[#B8DBF7]">
                Showing <strong className="text-[#182C45]">{filteredProducts.length}</strong> of {products.length}
              </div>

              {(activeCategory !== 'all' || activeBrand !== 'all' || activePriceTierIndex !== 0 || catalogueSearch.trim()) && (
                <button
                  onClick={resetFilters}
                  className="btn-nordic-secondary text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Persona Banner if selected */}
          {activePersona && (
            <div className="bg-[#EAF5FF] border border-[#B8DBF7] rounded-md p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{activePersona.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#182C45]">Active Persona Match:</span>
                    <span className="font-bold text-[#0284C7]">{activePersona.name}</span>
                  </div>
                  <span className="text-[#64748B] text-[11px]">
                    Products ranked by fit for: {activePersona.priorities.map(k => ATTRIBUTE_CONFIG[k]?.label || k).join(', ')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSelectPersona(null)}
                className="btn-nordic-secondary text-xs py-1.5 px-3 self-start sm:self-auto shrink-0"
              >
                <span>Clear Persona</span>
              </button>
            </div>
          )}

          {/* Multi-Category Selector Tabs (Nordic Sharp) */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
              Filter by Category:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategorySwitch('all')}
                className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeCategory === 'all'
                    ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                    : 'bg-white text-[#475569] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F5F8FC]'
                }`}
              >
                <span>All Categories</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeCategory === 'all' ? 'bg-white/20' : 'bg-slate-100 text-slate-700'}`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => handleCategorySwitch('Smartphones')}
                className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeCategory === 'Smartphones'
                    ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                    : 'bg-white text-[#475569] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F5F8FC]'
                }`}
              >
                <SmartphoneIcon className="w-3.5 h-3.5" />
                <span>Smartphones</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeCategory === 'Smartphones' ? 'bg-white/20' : 'bg-slate-100 text-slate-700'}`}>
                  20
                </span>
              </button>

              <button
                onClick={() => handleCategorySwitch('Headphones')}
                className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeCategory === 'Headphones'
                    ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                    : 'bg-white text-[#475569] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F5F8FC]'
                }`}
              >
                <HeadphonesIcon className="w-3.5 h-3.5" />
                <span>Flagship Wireless ANC Headphones</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold">
                  3 Flagships
                </span>
              </button>
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
                placeholder="Filter by name, chipset, or specs (e.g., iPhone 16 Pro, Snapdragon 8 Gen 3, Sony XM5)..."
                className="w-full bg-white text-[#182C45] placeholder-[#94A3B8] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-md border border-[#DCE6F0] focus:outline-none focus:border-[#182C45] focus:ring-1 focus:ring-[#182C45] transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
              {catalogueSearch && (
                <button
                  onClick={() => setCatalogueSearch('')}
                  className="absolute right-3.5 top-3 text-[#94A3B8] hover:text-[#182C45]"
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
                className="w-full bg-white text-[#182C45] text-xs sm:text-sm px-4 py-2.5 rounded-md border border-[#DCE6F0] focus:outline-none focus:border-[#182C45] appearance-none cursor-pointer shadow-2xs font-semibold"
              >
                {activePersona && <option value="fit">Sort by: Persona Fit Score (Highest First)</option>}
                <option value="rating">Sort by: Highest Customer Rating</option>
                <option value="reviews">Sort by: Most Reviews & Mentions</option>
                <option value="price-asc">Sort by: Price: Low to High</option>
                <option value="price-desc">Sort by: Price: High to Low</option>
                <option value="newest">Sort by: Newest Release Generation</option>
              </select>
              <SlidersHorizontal className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Brand Filter Tabs (Nordic Sharp) */}
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
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-[#182C45] text-white border-[#182C45]'
                        : 'bg-white text-[#475569] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter Tabs (Nordic Sharp) */}
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
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-[#0284C7] text-white border-[#0284C7]'
                        : 'bg-white text-[#475569] border-[#DCE6F0] hover:border-[#182C45] hover:bg-[#F5F8FC]'
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
        {/* SKELETON SHIMMER / PRODUCT GRID DISPLAY                      */}
        {/* ============================================================ */}
        {isLoadingSkeletons ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardSkeleton count={6} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#D5E9FA] space-y-4">
            <p className="text-sm font-semibold text-[#182C45]">
              No products found matching your current filters.
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
                  className="bg-white rounded-2xl border border-[#D5E9FA] hover:border-[#182C45] transition-all duration-200 shadow-card hover:shadow-lg flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Hero Container */}
                    <div
                      className="relative aspect-16/10 bg-[#F8FAFC] overflow-hidden cursor-pointer flex items-center justify-center p-3"
                      onClick={() => onSelectProduct(product.id)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                        }}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Floating Brand & Price Badges */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0284C7] px-2.5 py-1 rounded-md text-xs font-bold border border-[#DCE6F0] shadow-sm">
                        {product.brand}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#182C45] text-white px-2.5 py-1 rounded-md text-xs font-extrabold shadow-sm">
                        {formatINR(product.priceMSRP)}
                      </div>

                      {/* Persona Fit Score Overlay Badge if active */}
                      {personaMatch && (
                        <div className="absolute bottom-3 left-3 bg-[#182C45]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 border border-white/20 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>{personaMatch.score}% Fit Match</span>
                        </div>
                      )}
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
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#334155] bg-[#F5F8FC] p-3 rounded-md border border-[#DCE6F0]">
                        <div>
                          <span className="text-[9px] text-[#64748B] uppercase font-bold block">
                            {product.category === 'Headphones' ? 'Engine' : 'Chipset'}
                          </span>
                          <span className="truncate block font-semibold">
                            {(product.specsSummary.chipset || 'Integrated Processor').split('(')[0]}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#64748B] uppercase font-bold block">
                            {product.category === 'Headphones' ? 'Acoustics' : 'Display'}
                          </span>
                          <span className="truncate block font-semibold">
                            {(product.specsSummary.display || 'Acoustic Driver').split(',')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Customer Sentiment Distribution */}
                      <div className="space-y-2 bg-[#F5F8FC] p-3.5 rounded-md border border-[#DCE6F0] text-xs">
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

                  {/* Card Actions Footer with Nordic Sharp Buttons */}
                  <div className="p-6 pt-0 border-t border-[#E2E8F0] mt-2 space-y-2.5">
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="btn-nordic-primary w-full mt-4"
                    >
                      <span>Inspect Decoded Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onToggleSave(product.id)}
                        className={`btn-nordic-secondary w-full ${
                          isSaved ? 'bg-[#EAF5FF] text-[#0284C7] border-[#B8DBF7]' : ''
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isSaved ? 'fill-[#0284C7] text-[#0284C7]' : 'text-[#94A3B8]'
                          }`}
                        />
                        <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
                      </button>

                      <button
                        onClick={() => onCompare(product.id)}
                        className="btn-nordic-secondary w-full"
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
