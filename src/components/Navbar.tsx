import React, { useState } from 'react';
import { Search, Bookmark, GitCompare, HelpCircle, Menu, X } from 'lucide-react';
import { VoxLogo } from './VoxLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, productId?: string) => void;
  savedCount: number;
  onSearchSubmit: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onSearchSubmit(navSearch.trim());
      setNavSearch('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-[#182C45] border-b border-[#D5E9FA] shadow-soft">
      {/* Top Academic Banner */}
      <div className="bg-[#EAF5FF] border-b border-[#D5E9FA] px-4 py-1.5 text-xs text-[#325682]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#0284C7] text-white uppercase tracking-wider">
              MBA Prototype
            </span>
            <span className="text-[11px] text-[#325682] truncate">
              Simulated demonstration dataset. Ratings and AI summaries are simulated for academic illustration.
            </span>
          </div>
          <span className="text-[11px] text-[#0284C7] hidden lg:inline font-mono font-semibold">
            VOX • HEAR WHAT MATTERS • Transparent Decision Engine
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* VOX Logo & Tagline */}
          <div
            className="cursor-pointer group select-none"
            onClick={() => onNavigate('discover')}
          >
            <VoxLogo size="md" showTagline={true} />
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                placeholder="Search 22 smartphones (e.g., iPhone 16, Pixel 9, OnePlus 12)..."
                className="w-full bg-[#F5F8FC] text-sm text-[#182C45] placeholder-[#94A3B8] pl-10 pr-4 py-2 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7] focus:bg-white focus:ring-1 focus:ring-[#0284C7] transition-all"
              />
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('discover')}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'discover'
                  ? 'bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7] font-bold'
                  : 'text-[#475569] hover:text-[#182C45] hover:bg-[#F5F8FC]'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'compare'
                  ? 'bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7] font-bold'
                  : 'text-[#475569] hover:text-[#182C45] hover:bg-[#F5F8FC]'
              }`}
            >
              <GitCompare className="w-4 h-4 text-[#0284C7]" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => onNavigate('saved')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'saved'
                  ? 'bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7] font-bold'
                  : 'text-[#475569] hover:text-[#182C45] hover:bg-[#F5F8FC]'
              }`}
            >
              <Bookmark className="w-4 h-4 text-[#0284C7]" />
              <span>Shortlist</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-[#0284C7] text-white">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                currentView === 'how-it-works'
                  ? 'bg-[#EAF5FF] text-[#0284C7] border border-[#B8DBF7] font-bold'
                  : 'text-[#475569] hover:text-[#182C45] hover:bg-[#F5F8FC]'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#0284C7]" />
              <span>Methodology</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('saved')}
              className="p-2 text-[#475569] hover:text-[#182C45] relative"
              aria-label="Saved Shortlist"
            >
              <Bookmark className="w-5 h-5 text-[#0284C7]" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#0284C7] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#475569] hover:text-[#182C45] hover:bg-[#F5F8FC]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D5E9FA] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <form onSubmit={handleSearch} className="relative w-full mb-3">
            <input
              type="text"
              value={navSearch}
              onChange={e => setNavSearch(e.target.value)}
              placeholder="Search 22 smartphones..."
              className="w-full bg-[#F5F8FC] text-sm text-[#182C45] placeholder-[#94A3B8] pl-10 pr-4 py-2.5 rounded-xl border border-[#D5E9FA] focus:outline-none focus:border-[#0284C7]"
            />
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
          </form>

          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => {
                onNavigate('discover');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-xl text-sm font-semibold ${
                currentView === 'discover' ? 'bg-[#EAF5FF] text-[#0284C7]' : 'text-[#475569] hover:bg-[#F5F8FC]'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => {
                onNavigate('compare');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'compare' ? 'bg-[#EAF5FF] text-[#0284C7]' : 'text-[#475569] hover:bg-[#F5F8FC]'
              }`}
            >
              <span>Compare Models</span>
              <GitCompare className="w-4 h-4 text-[#0284C7]" />
            </button>
            <button
              onClick={() => {
                onNavigate('saved');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'saved' ? 'bg-[#EAF5FF] text-[#0284C7]' : 'text-[#475569] hover:bg-[#F5F8FC]'
              }`}
            >
              <span>Shortlist</span>
              {savedCount > 0 && (
                <span className="bg-[#0284C7] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onNavigate('how-it-works');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'how-it-works' ? 'bg-[#EAF5FF] text-[#0284C7]' : 'text-[#475569] hover:bg-[#F5F8FC]'
              }`}
            >
              <span>Methodology & Transparency</span>
              <HelpCircle className="w-4 h-4 text-[#0284C7]" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
