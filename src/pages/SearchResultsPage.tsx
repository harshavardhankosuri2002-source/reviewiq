import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, Star, Filter, ArrowLeft, Bookmark, GitCompare } from 'lucide-react';
import { getProductSentimentStats } from '../utils/analytics';
import { formatINR } from '../utils/currency';

interface SearchResultsPageProps {
  products: Product[];
  initialQuery: string;
  onSelectProduct: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onCompare: (id: string) => void;
  onBackToDiscover: () => void;
}

const BRANDS = ['all', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing', 'Motorola', 'Realme'];

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  products,
  initialQuery,
  onSelectProduct,
  savedIds,
  onToggleSave,
  onCompare,
  onBackToDiscover,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price-asc' | 'price-desc'>('rating');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return products
      .filter(p => {
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.quickVerdict.toLowerCase().includes(q) ||
          p.specsSummary.chipset.toLowerCase().includes(q) ||
          p.specsSummary.display.toLowerCase().includes(q) ||
          p.aiSummary.appreciatedFeatures.points.some(pt => pt.toLowerCase().includes(q)) ||
          p.aiSummary.commonComplaints.points.some(pt => pt.toLowerCase().includes(q));

        let matchesBrand = true;
        if (selectedBrand !== 'all') {
          if (selectedBrand === 'Xiaomi') {
            matchesBrand = p.brand.toLowerCase().includes('xiaomi') || p.brand.toLowerCase().includes('redmi');
          } else {
            matchesBrand = p.brand.toLowerCase() === selectedBrand.toLowerCase();
          }
        }

        const matchesRating = p.sampleRating >= minRating;
        const numPrice = parseInt(p.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;
        const matchesPrice = numPrice <= maxPrice;

        return matchesQuery && matchesBrand && matchesRating && matchesPrice;
      })
      .sort((a, b) => {
        const priceA = parseInt(a.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;
        const priceB = parseInt(b.priceMSRP.replace(/[^0-9]/g, ''), 10) || 0;

        if (sortBy === 'rating') return b.sampleRating - a.sampleRating;
        if (sortBy === 'reviews') return b.sampleReviewCount - a.sampleReviewCount;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return 0;
      });
  }, [products, searchQuery, selectedBrand, minRating, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('all');
    setMinRating(0);
    setMaxPrice(150000);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5E9FA] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDiscover}
            className="p-2.5 rounded-xl bg-white border border-[#D5E9FA] hover:bg-[#EAF5FF] text-[#182C45] transition-colors shadow-2xs"
            aria-label="Back to Discover"
          >
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#182C45] tracking-tight">
              Search & Filter Catalogue
            </h1>
            <p className="text-xs text-[#64748B]">
              Showing <strong className="text-[#0284C7]">{filteredProducts.length}</strong> matching models for query: <strong className="text-[#182C45]">"{searchQuery || 'All'}"</strong>
            </p>
          </div>
        </div>

        {/* Search Refinement Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search brand, model, or feature..."
            className="w-full bg-white border border-[#D5E9FA] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#182C45] placeholder-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
        </div>
      </div>

      {/* Grid Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar */}
        <aside className="bg-white p-5 rounded-2xl border border-[#D5E9FA] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#D5E9FA] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#182C45] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#0284C7]" /> Filters
            </span>
            {(selectedBrand !== 'all' || minRating > 0 || maxPrice < 150000) && (
              <button
                onClick={resetFilters}
                className="text-[10px] text-[#0284C7] hover:underline font-semibold"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#182C45] block">Brand</label>
            <div className="space-y-1">
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedBrand === brand
                      ? 'bg-[#EAF5FF] text-[#0284C7] font-bold border border-[#D5E9FA]'
                      : 'text-[#475569] hover:text-[#182C45] hover:bg-[#F5F8FC]'
                  }`}
                >
                  <span>{brand === 'all' ? 'All Brands' : brand}</span>
                  {selectedBrand === brand && <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Min Rating Filter */}
          <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#182C45]">Minimum Rating</label>
              <span className="text-xs font-mono text-[#0284C7] font-bold">{minRating > 0 ? `${minRating} ★` : 'Any'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4.5"
              step="0.5"
              value={minRating}
              onChange={e => setMinRating(parseFloat(e.target.value))}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
          </div>

          {/* Max Price Filter */}
          <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#182C45]">Max Budget</label>
              <span className="text-xs font-mono text-[#0284C7] font-bold">{formatINR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="150000"
              step="5000"
              value={maxPrice}
              onChange={e => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
          </div>

          {/* Sort Selector */}
          <div className="space-y-2 border-t border-[#E2E8F0] pt-4">
            <label className="text-xs font-bold text-[#182C45] block">Sort Results</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full bg-[#F5F8FC] text-[#182C45] text-xs p-2.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] cursor-pointer"
            >
              <option value="rating">Highest Customer Rating</option>
              <option value="reviews">Most Verified Reviews</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Results List */}
        <main className="lg:col-span-3 space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#D5E9FA] text-center space-y-3 shadow-sm">
              <p className="text-sm font-semibold text-[#182C45]">No matching smartphones match your criteria.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#0284C7] text-white rounded-xl text-xs font-bold shadow-2xs hover:bg-[#0369A1]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => {
                const stats = getProductSentimentStats(product.id);
                const isSaved = savedIds.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#D5E9FA] hover:border-[#8CBCE5] p-5 transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row gap-5 items-start md:items-center justify-between group"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80';
                        }}
                        className="w-20 h-20 object-cover rounded-xl border border-[#D5E9FA] shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#0284C7] uppercase">{product.brand}</span>
                          <span className="text-xs font-black text-[#182C45]">{formatINR(product.priceMSRP)}</span>
                        </div>
                        <h3
                          onClick={() => onSelectProduct(product.id)}
                          className="text-base font-bold text-[#182C45] hover:text-[#0284C7] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.sampleRating)
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-[#182C45] text-xs">{product.sampleRating}</span>
                          <span className="text-[#64748B] text-[11px]">({product.sampleReviewCount} reviews)</span>
                          <span className="text-emerald-700 font-bold font-mono text-[11px] bg-emerald-100 px-2 py-0.2 rounded">
                            {stats.positivePct}% Pos
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] line-clamp-1 max-w-xl">
                          {product.quickVerdict}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E8F0]">
                      <button
                        onClick={() => onSelectProduct(product.id)}
                        className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-2xs"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onCompare(product.id)}
                        className="px-3 py-2 rounded-xl bg-[#F5F8FC] border border-[#D5E9FA] text-[#475569] hover:text-[#182C45] text-xs font-semibold"
                        title="Add to Compare"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-[#0284C7]" />
                      </button>
                      <button
                        onClick={() => onToggleSave(product.id)}
                        className={`px-3 py-2 rounded-xl border text-xs font-semibold ${
                          isSaved ? 'bg-[#EAF5FF] text-[#0284C7] border-[#0284C7]' : 'bg-[#F5F8FC] text-[#475569] border-[#D5E9FA]'
                        }`}
                        title="Save to Shortlist"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#0284C7] text-[#0284C7]' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
