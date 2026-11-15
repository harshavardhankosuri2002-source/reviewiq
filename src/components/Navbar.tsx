import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  GitCompare,
  HelpCircle,
  Menu,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { VoxLogo } from './VoxLogo';
import { UserProfile } from '../types';
import { haptics } from '../utils/haptics';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, productId?: string) => void;
  savedCount: number;
  compareCount?: number;
  onSearchSubmit: (query: string) => void;
  currentUser?: UserProfile;
  onOpenAuth: () => void;
  onOpenCommercialization?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  compareCount = 0,
  onSearchSubmit,
  currentUser,
  onOpenAuth,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    setIsAudioMuted(haptics.getIsMuted());
  }, []);

  const handleToggleAudio = () => {
    const nextState = !isAudioMuted;
    haptics.setMuted(nextState);
    setIsAudioMuted(nextState);
    if (!nextState) haptics.play('click');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onSearchSubmit(navSearch.trim());
      setNavSearch('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 frosted-glass-header border-b border-white/80 bg-white/75 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* ============================================================ */}
          {/* 1. LEFT: CLEAN BRAND LOGO                                    */}
          {/* ============================================================ */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="cursor-pointer group select-none shrink-0 transition-transform active:scale-95"
              onClick={() => {
                haptics.play('click');
                onNavigate('discover');
              }}
            >
              <VoxLogo size="md" showTagline={false} />
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. CENTER: PROMINENT SPOTLIGHT SEARCH BAR (⌘K)               */}
          {/* ============================================================ */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2">
            <button
              type="button"
              onClick={() => {
                haptics.play('click');
                onOpenCommandPalette?.();
              }}
              className="w-full flex items-center justify-between bg-slate-100/90 hover:bg-white focus:bg-white text-xs text-slate-500 hover:text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                <span className="truncate font-semibold text-slate-500 group-hover:text-slate-800">
                  Search 112 flagships across Phones, Laptops, Audio...
                </span>
              </div>
              <kbd className="text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-200/90 px-1.5 py-0.5 rounded shadow-2xs shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* ============================================================ */}
          {/* 3. CORE NAVIGATION TABS (Discover, Compare, Saved, Method)  */}
          {/* ============================================================ */}
          <nav className="hidden md:flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                haptics.play('click');
                onNavigate('discover');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'discover'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => {
                haptics.play('click');
                onNavigate('compare');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'compare'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5 text-sky-600" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span
                  className={`w-4 h-4 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                    currentView === 'compare' ? 'bg-sky-400 text-slate-950' : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                haptics.play('click');
                onNavigate('saved');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'saved'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-sky-600" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span
                  className={`w-4 h-4 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                    currentView === 'saved' ? 'bg-sky-400 text-slate-950' : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                haptics.play('click');
                onNavigate('how-it-works');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'how-it-works'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Methodology</span>
            </button>
          </nav>

          {/* ============================================================ */}
          {/* 4. RIGHT: AUDIO TOGGLE & USER AVATAR                         */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className="w-9 h-9 rounded-xl frosted-pill hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              title={isAudioMuted ? 'Unmute Mechanical Haptic Audio' : 'Mute Mechanical Haptic Audio'}
              aria-label={isAudioMuted ? 'Unmute mechanical audio' : 'Mute mechanical audio'}
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-sky-600" />
              )}
            </button>

            {/* Clean User Profile Avatar */}
            <button
              onClick={() => {
                haptics.play('click');
                onOpenAuth();
              }}
              className="h-9 px-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs text-slate-800 transition-all font-bold flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95"
              title={`Signed in as ${currentUser?.name || 'Guest Explorer'}`}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-black shadow-2xs">
                {currentUser?.name?.charAt(0).toUpperCase() || 'G'}
              </div>
              <span className="hidden lg:inline text-xs font-bold text-slate-700">
                {currentUser?.name ? currentUser.name.split(' ')[0] : 'Guest'}
              </span>
            </button>

            {/* Mobile Search & Menu Toggle Buttons */}
            <button
              onClick={() => {
                haptics.play('click');
                onOpenCommandPalette?.();
              }}
              className="sm:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-2xs"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-sky-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-2xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE DROPDOWN MENU                                         */}
        {/* ============================================================ */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200/80 space-y-2 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative w-full pb-1">
              <input
                type="text"
                value={navSearch}
                onChange={e => setNavSearch(e.target.value)}
                placeholder="Search 112 verified flagships..."
                className="w-full bg-white text-xs pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  onNavigate('discover');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left border ${
                  currentView === 'discover'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Discover
              </button>

              <button
                onClick={() => {
                  onNavigate('compare');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left border flex items-center justify-between ${
                  currentView === 'compare'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <span>Compare</span>
                {compareCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {compareCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  onNavigate('saved');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left border flex items-center justify-between ${
                  currentView === 'saved'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <span>Saved Products</span>
                {savedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  onNavigate('how-it-works');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left border ${
                  currentView === 'how-it-works'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
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
