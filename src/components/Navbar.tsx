import React, { useState } from 'react';
import { Search, Bookmark, GitCompare, HelpCircle, Menu, X, User, Lock, TrendingUp } from 'lucide-react';
import { ReviewIQLogo } from './ReviewIQLogo';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, productId?: string) => void;
  savedCount: number;
  onSearchSubmit: (query: string) => void;
  currentUser?: UserProfile;
  onOpenAuth: () => void;
  onOpenCommercialization?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onSearchSubmit,
  currentUser,
  onOpenAuth,
  onOpenCommercialization,
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/80 shadow-xs">
      {/* Top Academic & Privacy Banner */}
      <div className="bg-slate-50 border-b border-slate-200/60 px-4 py-1 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white uppercase tracking-wider">
              MBA Prototype
            </span>
            <span className="text-[11px] text-slate-600 truncate">
              ReviewIQ 2.0 • 23 Multi-Category Verified Records
            </span>
          </div>
          <div className="flex items-center gap-3 hidden sm:flex">
            {onOpenCommercialization && (
              <button
                onClick={onOpenCommercialization}
                className="text-[11px] text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 transition-colors cursor-pointer"
              >
                <TrendingUp className="w-3 h-3 text-amber-600" />
                <span>MBA Business Deck</span>
              </button>
            )}
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Private Session Active</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ReviewIQ Logo & Tagline */}
          <div
            className="cursor-pointer group select-none shrink-0"
            onClick={() => onNavigate('discover')}
          >
            <ReviewIQLogo size="md" showTagline={true} />
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                placeholder="Search 23 products (e.g. iPhone 16 Pro, Sony XM5, Bose Ultra)..."
                className="w-full bg-[#F5F8FC] text-sm text-[#182C45] placeholder-[#94A3B8] pl-10 pr-4 py-2 rounded-md border border-[#D5E9FA] focus:outline-none focus:border-[#182C45] focus:bg-white focus:ring-1 focus:ring-[#182C45] transition-all"
              />
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
            </form>
          </div>

          {/* Desktop Navigation Links (Nordic Sharp) */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('discover')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                currentView === 'discover'
                  ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                  : 'text-[#475569] border-transparent hover:text-[#182C45] hover:bg-[#F5F8FC] hover:border-[#DCE6F0]'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                currentView === 'compare'
                  ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                  : 'text-[#475569] border-transparent hover:text-[#182C45] hover:bg-[#F5F8FC] hover:border-[#DCE6F0]'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => onNavigate('saved')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                currentView === 'saved'
                  ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                  : 'text-[#475569] border-transparent hover:text-[#182C45] hover:bg-[#F5F8FC] hover:border-[#DCE6F0]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded bg-[#0284C7] text-white font-bold text-[10px] flex items-center justify-center ml-0.5">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                currentView === 'how-it-works'
                  ? 'bg-[#182C45] text-white border-[#182C45] shadow-xs'
                  : 'text-[#475569] border-transparent hover:text-[#182C45] hover:bg-[#F5F8FC] hover:border-[#DCE6F0]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>How It Works</span>
            </button>

            {onOpenCommercialization && (
              <button
                onClick={onOpenCommercialization}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-all shadow-2xs ml-1"
                title="ReviewIQ MBA Commercialization & Unit Economics Deck"
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                <span>MBA Deck</span>
              </button>
            )}

            {/* User Session Profile Pill */}
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F8FC] hover:bg-[#EAF5FF] border border-[#D5E9FA] text-xs text-[#182C45] transition-all font-bold ml-1 active:translate-y-0.5"
            >
              <div className="w-5 h-5 rounded bg-[#EAF5FF] text-[#0284C7] flex items-center justify-center text-[10px] font-bold border border-[#B8DBF7]">
                {currentUser?.name?.charAt(0).toUpperCase() || 'G'}
              </div>
              <span className="max-w-[100px] truncate">{currentUser?.name || 'Guest'}</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="p-2 text-[#475569] hover:text-[#182C45] relative rounded-lg bg-[#F5F8FC] border border-[#D5E9FA]"
              aria-label="User Profile"
            >
              <User className="w-4 h-4 text-[#0284C7]" />
            </button>
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
              placeholder="Search 23 products..."
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
            {onOpenCommercialization && (
              <button
                onClick={() => {
                  onOpenCommercialization();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-xl text-sm font-bold flex items-center justify-between bg-amber-50 text-amber-800 border border-amber-200"
              >
                <span>MBA Commercialization & Pitch Deck</span>
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </button>
            )}
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between bg-[#F5F8FC] border border-[#D5E9FA] text-[#182C45] mt-2"
            >
              <span>Account / Private Session</span>
              <span className="text-xs font-bold text-[#0284C7]">
                {currentUser?.isGuest ? 'Guest' : currentUser?.name}
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
