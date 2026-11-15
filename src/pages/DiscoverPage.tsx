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
  Laptop as LaptopIcon,
  Watch as WatchIcon,
  Tablet as TabletIcon,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
} from 'lucide-react';
import { getProductSentimentStats, calculatePersonalizedMatch } from '../utils/analytics';
import { SHOPPER_PERSONAS, ATTRIBUTE_CONFIG } from '../data/mockData';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { ProductQuickPreviewModal } from '../components/ProductQuickPreviewModal';
import { ParallaxDeviceStage } from '../components/ParallaxDeviceStage';
import { ProductColorSwatches } from '../components/ProductColorSwatches';
import { getProductColorOptions } from '../utils/productColors';
import { haptics } from '../utils/haptics';
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
  const [activeCategory, setActiveCategory] = useState<'all' | 'Smartphones' | 'Headphones' | 'Laptops' | 'Wearables' | 'Tablets'>('all');
  const [activeBrand, setActiveBrand] = useState<string>('all');
  const [activePriceTierIndex, setActivePriceTierIndex] = useState<number>(0);
  const [catalogueSearch, setCatalogueSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'fit' | 'reviews' | 'price-asc' | 'price-desc' | 'newest'>('rating');
  const [showExtendedFilters, setShowExtendedFilters] = useState<boolean>(false);

  // Dynamic category counts
  const categoryCounts = useMemo(() => ({
    all: products.length,
    Smartphones: products.filter(p => p.category === 'Smartphones').length,
    Laptops: products.filter(p => p.category === 'Laptops').length,
    Wearables: products.filter(p => p.category === 'Wearables').length,
    Tablets: products.filter(p => p.category === 'Tablets').length,
    Headphones: products.filter(p => p.category === 'Headphones').length,
  }), [products]);

  // Delight Factor: Interactive Pop-up Mobile Preview Modal
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  // Interactive Color Swatch Selections per Product
  const [productColors, setProductColors] = useState<Record<string, number>>({});

  // Accordion Disclosures for Secondary Content (Order of Operations)
  const [expandedAccordion, setExpandedAccordion] = useState<'capabilities' | 'ingestion' | 'trust' | null>(null);

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
    }, 320);
  };

  // Category switch with Iceberg Shimmer transition
  const handleCategorySwitch = (cat: 'all' | 'Smartphones' | 'Headphones' | 'Laptops' | 'Wearables' | 'Tablets') => {
    setIsLoadingSkeletons(true);
    setActiveCategory(cat);
    setTimeout(() => {
      setIsLoadingSkeletons(false);
    }, 280);
  };

  // Simulated AI Refresh
  const triggerSimulatedRefresh = () => {
    setIsLoadingSkeletons(true);
    setTimeout(() => {
      setIsLoadingSkeletons(false);
    }, 380);
  };

  const toggleAccordion = (key: 'capabilities' | 'ingestion' | 'trust') => {
    setExpandedAccordion(prev => (prev === key ? null : key));
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
    <>
      {/* Homepage Main Content - Automatically defocused and blurred when interactive modal is open */}
      <div
        className={`space-y-12 sm:space-y-16 pb-24 relative overflow-hidden transition-all duration-300 ${
          previewProduct
            ? 'filter blur-md brightness-90 contrast-95 scale-[0.99] select-none pointer-events-none'
            : ''
        }`}
      >
      {/* Background Subtle Gradient Mesh for Frosted Glass See-Through Effect */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[350px] bg-indigo-200/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ============================================================ */}
      {/* 1. HERO SECTION: INTENT & PERSONA ARCHETYPES FIRST          */}
      {/* ============================================================ */}
      <section className="relative pt-10 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full frosted-panel shadow-2xs text-xs font-semibold text-slate-700">
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
          {/* ELEVATED PERSONA SWITCHER (Sleek Frosted Segmented Control)*/}
          {/* ========================================================== */}
          <div className="pt-2 max-w-3xl mx-auto space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Step 1: Choose Your Buyer Archetype</span>
            </div>

            <div className="p-1.5 frosted-panel rounded-xl shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-center gap-1">
              {/* Default All */}
              <button
                onClick={() => handleSelectPersona(null)}
                className={`flex-1 min-w-[120px] px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activePersona === null
                    ? 'bg-slate-900 text-white shadow-sm scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
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
                        ? 'bg-slate-900 text-white shadow-sm scale-[1.01]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
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
                  className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* OMNI-SEARCH BAR (Clean Frosted Search)                     */}
          {/* ========================================================== */}
          <div className="pt-2 max-w-xl mx-auto space-y-3">
            <form onSubmit={handleHeroSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={heroSearch}
                onChange={e => setHeroSearch(e.target.value)}
                placeholder={`Search ${products.length} products (e.g. iPhone 16 Pro, MacBook M3, Sony XM5)...`}
                className="w-full frosted-panel bg-white/80 text-slate-900 placeholder-slate-400 text-sm pl-11 pr-28 py-3.5 rounded-xl border border-slate-200/80 shadow-md focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4" />
              <button
                type="submit"
                className="btn-interactive-primary absolute right-1.5 py-2 px-3.5 text-xs cursor-pointer"
              >
                <span>Search</span>
                <span className="text-slate-400 font-mono text-[10px] hidden sm:inline">[Enter]</span>
              </button>
            </form>

            {/* Trending Links */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Trending:</span>
              {POPULAR_SEARCHES.map(tag => (
                <button
                  key={tag}
                  onClick={() => onSearchSubmit(tag)}
                  className="px-2 py-0.5 rounded-md hover:bg-slate-200/50 text-slate-600 hover:text-slate-900 transition-colors font-medium text-[11px] cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. ORDER OF OPERATIONS: THE VERIFIED PRODUCT CATALOGUE       */}
      {/* ============================================================ */}
      <section ref={catalogueRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Filter Controls Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Primary Step 2: Catalog Exploration
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Explore Decoded Reviews ({products.length} Products)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Click any device to pop up the interactive mobile stage and progressively inspect customer consensus.
              </p>
            </div>

            {/* Simulated Refresh & Counter */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <button
                onClick={triggerSimulatedRefresh}
                className="btn-interactive-secondary text-xs py-1.5 cursor-pointer"
                title="Trigger simulated AI loading shimmer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
                <span>Simulate Refresh</span>
              </button>

              <div className="text-xs font-mono bg-slate-100/90 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                Showing {filteredProducts.length} of {products.length}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="btn-interactive-secondary text-xs py-1.5 text-rose-600 hover:text-rose-700 hover:border-rose-300 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Persona Banner if selected */}
          {activePersona && (
            <div className="bg-sky-50/90 border border-sky-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs backdrop-blur-sm animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="text-lg">{activePersona.emoji}</span>
                <span className="font-bold text-slate-900">Personalized Ranking Active:</span>
                <span className="font-semibold text-sky-800">{activePersona.name}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 text-[11px]">
                  Priorities: {activePersona.priorities.map(k => ATTRIBUTE_CONFIG[k]?.label || k).join(', ')}
                </span>
              </div>
              <button
                onClick={() => handleSelectPersona(null)}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline self-start sm:self-auto cursor-pointer"
              >
                Clear Persona
              </button>
            </div>
          )}

          {/* ========================================================== */}
          {/* UNIFIED COMMAND TOOLBAR: CATEGORIES, SEARCH, SORT         */}
          {/* ========================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 frosted-panel p-2 rounded-2xl">
            {/* Category Segmented Tabs */}
            <div className="p-1 bg-slate-200/50 rounded-xl flex items-center gap-1 text-xs font-semibold overflow-x-auto scrollbar-none max-w-full">
              <button
                onClick={() => {
                  haptics.play('pop');
                  handleCategorySwitch('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({categoryCounts.all})
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  handleCategorySwitch('Smartphones');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'Smartphones'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <SmartphoneIcon className="w-3.5 h-3.5" />
                <span>Smartphones ({categoryCounts.Smartphones})</span>
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  handleCategorySwitch('Laptops');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'Laptops'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LaptopIcon className="w-3.5 h-3.5" />
                <span>Laptops ({categoryCounts.Laptops})</span>
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  handleCategorySwitch('Wearables');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'Wearables'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <WatchIcon className="w-3.5 h-3.5" />
                <span>Wearables ({categoryCounts.Wearables})</span>
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  handleCategorySwitch('Tablets');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'Tablets'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TabletIcon className="w-3.5 h-3.5" />
                <span>Tablets ({categoryCounts.Tablets})</span>
              </button>
              <button
                onClick={() => {
                  haptics.play('pop');
                  handleCategorySwitch('Headphones');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'Headphones'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HeadphonesIcon className="w-3.5 h-3.5" />
                <span>Headphones ({categoryCounts.Headphones})</span>
              </button>
            </div>

            {/* Search & Sort & Filter Toggle */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  value={catalogueSearch}
                  onChange={e => setCatalogueSearch(e.target.value)}
                  placeholder="Filter by name or spec..."
                  className="w-full bg-white/90 text-slate-900 placeholder-slate-400 text-xs pl-8 pr-7 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-800 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                {catalogueSearch && (
                  <button
                    onClick={() => setCatalogueSearch('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-white/90 text-slate-900 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-800 cursor-pointer font-medium"
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
                className={`btn-interactive-secondary text-xs py-2 px-2.5 cursor-pointer ${showExtendedFilters ? 'bg-slate-200/80 border-slate-400' : ''}`}
                title="Filter by Brand & Price"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Collapsible Extended Filters (Brand & Price) */}
          {showExtendedFilters && (
            <div className="frosted-panel p-4 rounded-xl border border-slate-200 space-y-3 animate-fadeIn">
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
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
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
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
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
        {/* SKELETON SHIMMER / FROSTED PRODUCT CARDS GRID               */}
        {/* ============================================================ */}
        {isLoadingSkeletons ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCardSkeleton count={6} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              No products found matching your current filter combination.
            </p>
            <button
              onClick={resetFilters}
              className="btn-interactive-primary text-xs cursor-pointer"
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
              const colorIndex = productColors[product.id] || 0;
              const colorOptions = getProductColorOptions(product.id);
              const activeColor = colorOptions[colorIndex] || colorOptions[0];

              return (
                <div
                  key={product.id}
                  className="frosted-glass-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
                  onClick={() => setPreviewProduct(product)}
                >
                  <div>
                    {/* Apple Store-Inspired Product Stage (Image 4 Inspiration) */}
                    <div className="relative h-48 sm:h-52 w-full bg-white/40 backdrop-blur-sm p-4 flex flex-col items-center justify-between border-b border-white/60 overflow-hidden">
                      {/* Top Badges */}
                      <div className="w-full flex items-center justify-between z-10">
                        <span className="frosted-pill text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                          {product.brand}
                        </span>
                        <span className="bg-slate-900/85 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-bold border border-white/20 shadow-xs">
                          {formatINR(product.priceMSRP)}
                        </span>
                      </div>

                      {/* Balanced Center Image with Principle 11: 3D Parallax Tilt */}
                      <div className="my-auto flex items-center justify-center w-full h-36">
                        <ParallaxDeviceStage maxTilt={8} showGlare={true} className="w-full h-full">
                          <img
                            src={product.imageUrl}
                            alt={`${product.name} in ${activeColor.name}`}
                            onError={e => {
                              (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                            }}
                            className="max-h-32 sm:max-h-36 max-w-full object-contain mx-auto drop-shadow-md select-none pointer-events-none transition-all duration-300"
                            style={{ filter: activeColor.filterStyle || 'none' }}
                            loading="lazy"
                          />
                        </ParallaxDeviceStage>
                      </div>

                      {/* Interactive Color Swatch Selector (Option 2) */}
                      <ProductColorSwatches
                        productId={product.id}
                        selectedIndex={colorIndex}
                        onSelectColor={(idx) => setProductColors(prev => ({ ...prev, [product.id]: idx }))}
                        size="sm"
                      />
                    </div>

                    {/* Card Content - Clean Apple Typography */}
                    <div className="p-4 sm:p-5 space-y-2.5">
                      {/* Category Label & Fit Match */}
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-600 tracking-wider uppercase text-[10px]">
                          {product.category === 'Headphones'
                            ? 'Premium Audio'
                            : product.category === 'Laptops'
                            ? 'Pro Workstation'
                            : product.category === 'Wearables'
                            ? 'Adventure Wearable'
                            : product.category === 'Tablets'
                            ? 'Flagship Tablet'
                            : 'Verified Flagship'}
                        </span>
                        {personaMatch && (
                          <span className="font-mono text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 doherty-fast-transition animate-in fade-in zoom-in-95 duration-150">
                            {personaMatch.score}% Match
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                          {product.name}
                        </h3>

                        {/* Star Rating & Review Count */}
                        <div className="flex items-center gap-1.5 mt-1">
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
                            • {product.sampleReviewCount} reviews
                          </span>
                        </div>
                      </div>

                      {/* Specs Line */}
                      <div className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">
                          {product.category === 'Headphones'
                            ? 'Acoustic Driver:'
                            : product.category === 'Wearables'
                            ? 'Processor / GPS:'
                            : 'Chipset:'}
                        </span>
                        <span className="truncate">
                          {(product.specsSummary.chipset || product.specsSummary.driver || product.specsSummary.sensors || 'Integrated').split('(')[0]}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="truncate">
                          {(product.specsSummary.display || product.specsSummary.anc || product.specsSummary.battery || 'Pro Display').split(',')[0]}
                        </span>
                      </div>

                      {/* Slim Sentiment Meter */}
                      <div className="space-y-1 pt-0.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400 font-medium">Consensus Sentiment</span>
                          <span className="text-emerald-700 font-bold font-mono">
                            {stats.positivePct}% Positive
                          </span>
                        </div>

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

                      {/* Decoded Verdict */}
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 border-l-2 border-sky-400/40 pl-2.5">
                        {product.quickVerdict}
                      </p>

                      {/* Price Row with Circular Action Arrow (Image 4 Inspiration) */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">
                            MSRP
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {formatINR(product.priceMSRP)}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-normal">
                            (Incl. of all taxes)
                          </span>
                        </div>
                        {/* Principle 8: Secondary Action - Animated Action Arrow Button */}
                        <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white group-hover:translate-x-1 group-hover:scale-105 flex items-center justify-center text-slate-600 transition-all duration-300 shadow-2xs">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        haptics.play('click');
                        setPreviewProduct(product);
                      }}
                      className="btn-interactive-primary w-full py-2 text-xs cursor-pointer"
                    >
                      <span>Inspect Decoded Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          haptics.play('pop');
                          onToggleSave(product.id);
                        }}
                        className={`btn-interactive-secondary w-full py-1.5 text-xs cursor-pointer ${
                          isSaved ? 'bg-sky-50 text-sky-800 border-sky-300' : ''
                        }`}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isSaved ? 'fill-sky-700 text-sky-700' : 'text-slate-400'
                          }`}
                        />
                        <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
                      </button>

                      <button
                        onClick={() => {
                          haptics.play('click');
                          onCompare(product.id);
                        }}
                        className="btn-interactive-secondary w-full py-1.5 text-xs cursor-pointer"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-sky-700" />
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

      {/* ============================================================ */}
      {/* 3. SECONDARY CONTENT FOLDED INTO ELEGANT ACCORDIONS         */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-6">
        <div className="border-t border-slate-200/80 pt-8 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Secondary Architecture & Deep Systems
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Methodology, Tools & Engine Capabilities
              </h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Click to expand deep modules
            </span>
          </div>
        </div>

        {/* Accordion 1: Core Engine Capabilities */}
        <div className="frosted-panel rounded-2xl overflow-hidden border border-slate-200/80">
          <button
            onClick={() => toggleAccordion('capabilities')}
            className="w-full p-5 text-left flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  5 Core Review Intelligence Engines
                </h4>
                <p className="text-xs text-slate-500">
                  Cross-source aggregation, 4-quadrant sentiment distilling, and bot cluster screening.
                </p>
              </div>
            </div>
            {expandedAccordion === 'capabilities' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedAccordion === 'capabilities' && (
            <div className="p-6 pt-2 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs animate-fadeIn">
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-900 block">1. Multi-Source Normalization</span>
                <p className="text-slate-500 leading-relaxed">
                  Aggregates ratings from Amazon, BestBuy, carrier stores, and Reddit forums to eliminate single-retailer bias.
                </p>
              </div>
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-900 block">2. Personalized Decision Engine</span>
                <p className="text-slate-500 leading-relaxed">
                  Dynamically calculates deterministic match scores according to specific buyer priorities.
                </p>
              </div>
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-900 block">3. Evidence-Backed Summaries</span>
                <p className="text-slate-500 leading-relaxed">
                  Every bullet point cites exact review IDs back to verified customer testimonials.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Live Link Ingestion Simulator */}
        <div className="frosted-panel rounded-2xl overflow-hidden border border-slate-200/80">
          <button
            onClick={() => toggleAccordion('ingestion')}
            className="w-full p-5 text-left flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  External Retail Link Ingestion Simulator
                </h4>
                <p className="text-xs text-slate-500">
                  Paste Amazon, Flipkart, or BestBuy product links to test our 8-Stage NLP parser.
                </p>
              </div>
            </div>
            {expandedAccordion === 'ingestion' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedAccordion === 'ingestion' && (
            <div className="p-6 pt-2 border-t border-slate-200/80 space-y-4 animate-fadeIn">
              <p className="text-xs text-slate-600 leading-relaxed">
                Test how ReviewIQ processes unverified external URLs through HTML sanitization, bot clustering, sentiment scoring, and cross-reference verification in real time.
              </p>
              {onOpenLinkIngestion && (
                <button
                  onClick={onOpenLinkIngestion}
                  className="btn-interactive-primary text-xs py-2 px-4 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Ingestion Simulator Modal</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Accordion 3: Authenticity & Bot Screening */}
        <div className="frosted-panel rounded-2xl overflow-hidden border border-slate-200/80">
          <button
            onClick={() => toggleAccordion('trust')}
            className="w-full p-5 text-left flex items-center justify-between hover:bg-white/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Trust, Bot Purging & Manipulation Stress-Testing
                </h4>
                <p className="text-xs text-slate-500">
                  Inspect how ReviewIQ detects duplicate review text and coordinated astroturfing campaigns.
                </p>
              </div>
            </div>
            {expandedAccordion === 'trust' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedAccordion === 'trust' && (
            <div className="p-6 pt-2 border-t border-slate-200/80 space-y-3 animate-fadeIn text-xs text-slate-600">
              <p className="leading-relaxed">
                ReviewIQ screens for artificial bot clusters, sudden burst velocity, and promotional sponsor bias.
                You can run live stress-test scenarios in the full product analysis page.
              </p>
              <button
                onClick={onNavigateHowItWorks}
                className="btn-interactive-secondary text-xs py-1.5 px-3 cursor-pointer"
              >
                <span>Read Full Methodology & Audit Formula</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* DELIGHT FACTOR: INTERACTIVE DEVICE POP-UP MODAL             */}
      {/* ============================================================ */}
      </div>

      {previewProduct && (
        <ProductQuickPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onOpenFullAnalysis={productId => {
            setPreviewProduct(null);
            onSelectProduct(productId);
          }}
          isSaved={savedIds.includes(previewProduct.id)}
          onToggleSave={onToggleSave}
          onCompare={onCompare}
          activePriorities={activePriorities}
        />
      )}
    </>
  );
};
