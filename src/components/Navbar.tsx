import React, { useState } from 'react';
import { Search, Bookmark, GitCompare, HelpCircle, Menu, X, User, Lock, TrendingUp, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-50 frosted-glass-header transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Brand Logo & Executive Label */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="cursor-pointer group select-none shrink-0"
              onClick={() => onNavigate('discover')}
            >
              <ReviewIQLogo size="md" showTagline={false} />
            </div>

            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/5 text-slate-700 border border-slate-200/80 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>MBA Intelligence • 23 Models</span>
            </span>
          </div>

          {/* Center: Frosted Inline Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                placeholder="Search catalog (e.g. iPhone, Sony, S24)..."
                className="w-full bg-white/70 hover:bg-white focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-8 pr-12 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-800 transition-all shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 pointer-events-none">
                ⌘K
              </span>
            </form>
          </div>

          {/* Right: Scannable Navigation & Action Cluster */}
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            <button
              onClick={() => onNavigate('discover')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                currentView === 'discover'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/80 hover:border-slate-200'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                currentView === 'compare'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/80 hover:border-slate-200'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5 text-sky-600" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => onNavigate('saved')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                currentView === 'saved'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/80 hover:border-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-sky-600" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                currentView === 'how-it-works'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/80 hover:border-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Methodology</span>
            </button>

            {/* MBA Deck Pill */}
            {onOpenCommercialization && (
              <button
                onClick={onOpenCommercialization}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-900 border border-amber-300 hover:bg-amber-500/20 transition-all ml-1 shadow-2xs cursor-pointer"
                title="ReviewIQ MBA Unit Economics & Commercialization Deck"
              >
                <TrendingUp className="w-3 h-3 text-amber-600" />
                <span>MBA Deck</span>
              </button>
            )}

            {/* User Session Profile Pill */}
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-slate-200 text-xs text-slate-800 transition-all font-semibold ml-1 shadow-2xs cursor-pointer"
              title="Private User Profile & Session"
            >
              <Lock className="w-3 h-3 text-emerald-600" />
              <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[9px] font-bold">
                {currentUser?.name?.charAt(0).toUpperCase() || 'G'}
              </div>
              <span className="max-w-[80px] truncate">{currentUser?.name || 'Guest'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenCommercialization && (
              <button
                onClick={onOpenCommercialization}
                className="p-2 text-amber-700 bg-amber-50 rounded-lg border border-amber-200 text-xs font-bold"
              >
                MBA Deck
              </button>
            )}
            <button
              onClick={() => onNavigate('saved')}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-white border border-slate-200"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-white border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200/80 space-y-2">
            <form onSubmit={handleSearch} className="relative w-full pb-2">
              <input
                type="text"
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                placeholder="Search 23 products..."
                className="w-full bg-white text-xs pl-8 pr-4 py-2 rounded-lg border border-slate-200"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </form>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { onNavigate('discover'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-white border text-left font-bold"
              >
                Discover
              </button>
              <button
                onClick={() => { onNavigate('compare'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-white border text-left font-bold flex items-center justify-between"
              >
                <span>Compare</span>
                <GitCompare className="w-3.5 h-3.5 text-sky-600" />
              </button>
              <button
                onClick={() => { onNavigate('saved'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-white border text-left font-bold flex items-center justify-between"
              >
                <span>Saved</span>
                {savedCount > 0 && <span className="font-bold text-sky-600">({savedCount})</span>}
              </button>
              <button
                onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }}
                className="p-2 rounded-lg bg-white border text-left font-bold"
              >
                Methodology
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
