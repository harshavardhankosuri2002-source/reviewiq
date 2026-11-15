import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  GitCompare,
  Sparkles,
  Bookmark,
  Volume2,
  VolumeX,
  X,
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Tablet,
  Star,
  Zap,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/mockData';
import { formatINR } from '../utils/currency';
import { haptics } from '../utils/haptics';
import { getProductSentimentStats } from '../utils/analytics';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (id: string) => void;
  onCompareProducts: (ids: string[]) => void;
  onOpenAskVox: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

type PaletteCategory = 'all' | 'Smartphones' | 'Laptops' | 'Wearables' | 'Tablets' | 'Headphones' | 'actions';

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onCompareProducts,
  onOpenAskVox,
  onToggleMute,
  isMuted,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setQuery('');
      setSelectedCategory('all');
      setSelectedIndex(0);
      if (!dialog.open) dialog.showModal();
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  // Quick Action presets
  const quickActions = useMemo(() => [
    {
      id: 'action-vox',
      type: 'action' as const,
      title: 'Ask VOX AI Intelligence Assistant',
      subtitle: 'Contextual review synthesis agent with voice synthesis & trade-off breakdown',
      category: 'actions' as const,
      icon: Sparkles,
      iconColor: 'text-sky-500 bg-sky-100',
      run: () => onOpenAskVox(),
    },
    {
      id: 'action-compare-flagships',
      type: 'action' as const,
      title: 'Compare iPhone 16 Pro Max vs Galaxy S24 Ultra',
      subtitle: 'Flagship camera, titanium chassis, and generative AI showdown',
      category: 'actions' as const,
      icon: GitCompare,
      iconColor: 'text-indigo-500 bg-indigo-100',
      run: () => onCompareProducts(['iphone-16-pro-max', 'galaxy-s24-ultra']),
    },
    {
      id: 'action-compare-laptops',
      type: 'action' as const,
      title: 'Compare MacBook Pro 16 vs Dell XPS 16',
      subtitle: 'Apple M3 Max vs Intel Core Ultra 9 workstation clash',
      category: 'actions' as const,
      icon: GitCompare,
      iconColor: 'text-purple-500 bg-purple-100',
      run: () => onCompareProducts(['macbook-pro-16', 'dell-xps-16']),
    },
    {
      id: 'action-compare-wearables',
      type: 'action' as const,
      title: 'Compare Apple Watch Ultra 2 vs Galaxy Watch Ultra',
      subtitle: 'Extreme adventure smartwatches with titanium enclosures',
      category: 'actions' as const,
      icon: GitCompare,
      iconColor: 'text-amber-500 bg-amber-100',
      run: () => onCompareProducts(['apple-watch-ultra-2', 'galaxy-watch-ultra']),
    },
    {
      id: 'action-audio-toggle',
      type: 'action' as const,
      title: isMuted ? 'Unmute Mechanical Haptic Audio' : 'Mute Mechanical Haptic Audio',
      subtitle: isMuted ? 'Enable mechanical key clicks & audio transients' : 'Silence interface audio feedback',
      category: 'actions' as const,
      icon: isMuted ? VolumeX : Volume2,
      iconColor: 'text-rose-500 bg-rose-100',
      run: () => onToggleMute(),
    },
  ], [isMuted, onOpenAskVox, onCompareProducts, onToggleMute]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: SAMPLE_PRODUCTS.length + quickActions.length,
      Smartphones: SAMPLE_PRODUCTS.filter(p => p.category === 'Smartphones').length,
      Laptops: SAMPLE_PRODUCTS.filter(p => p.category === 'Laptops').length,
      Wearables: SAMPLE_PRODUCTS.filter(p => p.category === 'Wearables').length,
      Tablets: SAMPLE_PRODUCTS.filter(p => p.category === 'Tablets').length,
      Headphones: SAMPLE_PRODUCTS.filter(p => p.category === 'Headphones').length,
      actions: quickActions.length,
    };
  }, [quickActions]);

  // Filtered items based on query and selected category
  const filteredProducts = useMemo(() => {
    let prods = SAMPLE_PRODUCTS;
    if (selectedCategory !== 'all' && selectedCategory !== 'actions') {
      prods = prods.filter(p => p.category === selectedCategory);
    }

    if (!query.trim()) {
      return prods.slice(0, 10);
    }

    const q = query.toLowerCase().trim();
    return prods.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.specsSummary.chipset && p.specsSummary.chipset.toLowerCase().includes(q)) ||
        (p.quickVerdict && p.quickVerdict.toLowerCase().includes(q))
    ).slice(0, 15);
  }, [query, selectedCategory]);

  const filteredActions = useMemo(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'actions') {
      return [];
    }
    if (!query.trim()) return quickActions;
    const q = query.toLowerCase().trim();
    return quickActions.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q)
    );
  }, [query, selectedCategory, quickActions]);

  // Combined selectable list
  const allItems = useMemo(() => {
    const items: Array<{
      id: string;
      type: 'product' | 'action';
      title: string;
      subtitle: string;
      categoryBadge: string;
      data?: Product;
      actionData?: typeof quickActions[0];
      run: () => void;
    }> = [];

    filteredProducts.forEach(p => {
      items.push({
        id: `prod-${p.id}`,
        type: 'product',
        title: p.name,
        subtitle: `${p.brand} • ${formatINR(p.priceMSRP)} • ${p.sampleRating} ★`,
        categoryBadge: p.category,
        data: p,
        run: () => onSelectProduct(p.id),
      });
    });

    filteredActions.forEach(a => {
      items.push({
        id: a.id,
        type: 'action',
        title: a.title,
        subtitle: a.subtitle,
        categoryBadge: 'Action',
        actionData: a,
        run: a.run,
      });
    });

    return items;
  }, [filteredProducts, filteredActions, onSelectProduct]);

  // Keep selected index in bounds
  useEffect(() => {
    if (selectedIndex >= allItems.length) {
      setSelectedIndex(0);
    }
  }, [allItems.length, selectedIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      haptics.play('slide');
      setSelectedIndex(prev => (prev + 1) % Math.max(allItems.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      haptics.play('slide');
      setSelectedIndex(prev => (prev - 1 + allItems.length) % Math.max(allItems.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = allItems[selectedIndex];
      if (selected) {
        haptics.play('click');
        selected.run();
        onClose();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      haptics.play('pop');
      const tabs: PaletteCategory[] = ['all', 'Smartphones', 'Laptops', 'Wearables', 'Tablets', 'Headphones', 'actions'];
      const nextIdx = (tabs.indexOf(selectedCategory) + 1) % tabs.length;
      setSelectedCategory(tabs[nextIdx]);
      setSelectedIndex(0);
    }
  };

  // Currently focused item for the live inspector panel
  const focusedItem = allItems[selectedIndex] || allItems[0];
  const focusedProduct = focusedItem?.type === 'product' ? focusedItem.data : null;
  const focusedSentiment = focusedProduct ? getProductSentimentStats(focusedProduct.id) : null;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Smartphones':
        return <Smartphone className="w-3.5 h-3.5 text-sky-600" />;
      case 'Laptops':
        return <Laptop className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Wearables':
        return <Watch className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Tablets':
        return <Tablet className="w-3.5 h-3.5 text-purple-600" />;
      case 'Headphones':
        return <Headphones className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-sky-600" />;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={e => {
        e.preventDefault();
        haptics.play('pop');
        onClose();
      }}
      onClick={e => {
        if (e.target === dialogRef.current) {
          haptics.play('pop');
          onClose();
        }
      }}
      className="frosted-native-dialog p-0 bg-transparent border-none max-w-4xl w-[calc(100%-2rem)] m-auto animate-scaleUp text-slate-900"
    >
      <div
        className="frosted-modal rounded-3xl border border-white/95 overflow-hidden shadow-[0_25px_70px_-15px_rgba(15,23,42,0.28)] flex flex-col max-h-[85vh] bg-white/90 backdrop-blur-2xl"
        onKeyDown={handleKeyDown}
      >
        {/* ============================================================ */}
        {/* 1. TOP SPOTLIGHT SEARCH BAR & QUICK FILTERS                  */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-white/80 space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center shrink-0 border border-sky-200">
              <Search className="w-4 h-4 text-sky-700" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search 112 flagships across Phones, Laptops, Wearables, Audio, or Commands..."
              className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 placeholder-slate-400 focus:outline-none"
            />

            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-md shadow-2xs">
              ESC
            </kbd>

            <button
              onClick={() => {
                haptics.play('click');
                onClose();
              }}
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Horizontal Scrollbar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Filter:
            </span>

            {[
              { id: 'all', label: 'All Flagships', count: categoryCounts.all },
              { id: 'Smartphones', label: 'Smartphones', count: categoryCounts.Smartphones },
              { id: 'Laptops', label: 'Laptops', count: categoryCounts.Laptops },
              { id: 'Wearables', label: 'Wearables', count: categoryCounts.Wearables },
              { id: 'Tablets', label: 'Tablets', count: categoryCounts.Tablets },
              { id: 'Headphones', label: 'Headphones', count: categoryCounts.Headphones },
              { id: 'actions', label: '⚡ Commands', count: categoryCounts.actions },
            ].map(tab => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    haptics.play('pop');
                    setSelectedCategory(tab.id as PaletteCategory);
                    setSelectedIndex(0);
                  }}
                  className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white/80 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. DUAL-PANE BODY: SEARCH LIST + LIVE INTELLIGENCE INSPECTOR */}
        {/* ============================================================ */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {/* Left Column: Results List (7 cols on md) */}
          <div className="md:col-span-7 overflow-y-auto p-3 space-y-1.5 max-h-[50vh] md:max-h-[55vh]">
            {allItems.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-sm font-extrabold text-slate-800">No matching products or commands</h4>
                <p className="text-xs text-slate-500">
                  Try searching for brand names like "Apple", "Samsung", "Garmin", or processors like "M3" or "Snapdragon".
                </p>
              </div>
            ) : (
              allItems.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const isProd = item.type === 'product' && item.data;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      haptics.play('click');
                      item.run();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all group ${
                      isSelected
                        ? 'bg-slate-900 shadow-md ring-1 ring-slate-800'
                        : 'hover:bg-slate-100/90 text-slate-800 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Thumbnail / Icon */}
                      {isProd ? (
                        <div
                          className={`w-11 h-12 rounded-xl p-1 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-white/15' : 'bg-white border border-slate-200 shadow-2xs'
                          }`}
                        >
                          <img
                            src={item.data!.imageUrl}
                            alt={item.data!.name}
                            onError={e => {
                              (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                            }}
                            className="max-h-full max-w-full object-contain pointer-events-none select-none"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-sky-500 text-slate-950 font-bold'
                              : item.actionData?.iconColor || 'bg-sky-100 text-sky-700'
                          }`}
                        >
                          {item.actionData?.icon ? (
                            <item.actionData.icon className="w-5 h-5" />
                          ) : (
                            <Sparkles className="w-5 h-5" />
                          )}
                        </div>
                      )}

                      {/* Info Titles & Badges */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4
                            className={`text-xs sm:text-sm font-extrabold truncate leading-tight transition-colors ${
                              isSelected ? '!text-white' : 'text-slate-900 group-hover:text-sky-700'
                            }`}
                          >
                            {item.title}
                          </h4>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                              isSelected
                                ? 'bg-white/20 text-sky-200 border border-white/20'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {item.categoryBadge}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] truncate">
                          <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Enter Shortcut Button */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-sky-400 text-slate-950 shadow-xs'
                            : 'text-slate-400 bg-slate-100 opacity-60 group-hover:opacity-100'
                        }`}
                      >
                        <span>Select</span>
                        <span>↵</span>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Live Intelligence Inspector (5 cols on md) */}
          <div className="hidden md:flex md:col-span-5 p-5 bg-slate-50/70 flex-col justify-between overflow-y-auto max-h-[55vh]">
            {focusedProduct ? (
              <div className="space-y-4">
                {/* Product Stage */}
                <div className="relative h-40 w-full rounded-2xl bg-white border border-slate-200/90 flex flex-col items-center justify-center p-3 shadow-2xs overflow-hidden">
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                    {focusedProduct.brand}
                  </span>

                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-black font-mono bg-sky-50 text-sky-800 border border-sky-200">
                    {formatINR(focusedProduct.priceMSRP)}
                  </span>

                  <img
                    src={focusedProduct.imageUrl}
                    alt={focusedProduct.name}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = '/images/products/device-placeholder.svg';
                    }}
                    className="max-h-28 max-w-full object-contain select-none drop-shadow-md my-auto"
                  />
                </div>

                {/* Identity & Rating */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-extrabold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{focusedProduct.sampleRating}</span>
                    <span className="text-slate-400 font-normal">({focusedProduct.sampleReviewCount} verified reviews)</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {focusedProduct.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {focusedProduct.quickVerdict}
                  </p>
                </div>

                {/* Sentiment Breakdown */}
                {focusedSentiment && (
                  <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-600">Buyer Sentiment</span>
                      <span className="text-emerald-700 font-mono">{focusedSentiment.positivePct}% Positive</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 flex overflow-hidden border border-slate-200">
                      <div style={{ width: `${focusedSentiment.positivePct}%` }} className="bg-emerald-500" />
                      <div style={{ width: `${focusedSentiment.mixedPct}%` }} className="bg-amber-400" />
                      <div style={{ width: `${focusedSentiment.negativePct}%` }} className="bg-rose-400" />
                    </div>
                  </div>
                )}

                {/* Quick Hardware Specs */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold">Processor:</span>
                    <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                      {focusedProduct.specsSummary.chipset || 'Standard Flagship'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold">Display:</span>
                    <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                      {focusedProduct.specsSummary.display || 'High Refresh Panel'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold">Battery:</span>
                    <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                      {focusedProduct.specsSummary.battery}
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      haptics.play('click');
                      onSelectProduct(focusedProduct.id);
                      onClose();
                    }}
                    className="btn-interactive-primary py-2 text-xs font-bold justify-center"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      haptics.play('pop');
                      onCompareProducts([focusedProduct.id]);
                      onClose();
                    }}
                    className="btn-interactive-secondary py-2 text-xs font-bold justify-center"
                  >
                    <GitCompare className="w-3.5 h-3.5 text-sky-600" />
                    <span>Compare</span>
                  </button>
                </div>
              </div>
            ) : focusedItem?.actionData ? (
              <div className="space-y-4 my-auto p-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto border border-sky-200 shadow-2xs">
                  {focusedItem.actionData.icon ? (
                    <focusedItem.actionData.icon className="w-7 h-7" />
                  ) : (
                    <Sparkles className="w-7 h-7" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Quick System Action
                  </span>
                  <h4 className="text-base font-black text-slate-900">{focusedItem.actionData.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {focusedItem.actionData.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => {
                    haptics.play('click');
                    focusedItem.actionData?.run();
                    onClose();
                  }}
                  className="btn-interactive-primary px-6 py-2.5 text-xs font-bold mx-auto"
                >
                  <span>Execute Action</span>
                  <span>↵</span>
                </button>
              </div>
            ) : (
              <div className="my-auto text-center p-6 space-y-2 text-slate-400">
                <Layers className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-medium">Use arrow keys ↑ ↓ to inspect devices</p>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. FOOTER SHORTCUT LEGEND & CREDITS                          */}
        {/* ============================================================ */}
        <div className="p-3 border-t border-slate-200/90 bg-white/90 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[9px] font-bold text-slate-600">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[9px] font-bold text-slate-600">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1 font-medium">
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[9px] font-bold text-slate-600">↵</kbd>
              Select
            </span>
            <span className="hidden sm:flex items-center gap-1 font-medium">
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[9px] font-bold text-slate-600">Tab</kbd>
              Cycle Category
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-[10px]">
              VOX Spotlight
            </span>
          </div>
        </div>
      </div>
    </dialog>
  );
};
