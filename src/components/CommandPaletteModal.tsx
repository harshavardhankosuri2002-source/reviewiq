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
  Check,
} from 'lucide-react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/mockData';
import { formatINR } from '../utils/currency';
import { haptics } from '../utils/haptics';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (id: string) => void;
  onCompareProducts: (ids: string[]) => void;
  onOpenAskVox: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

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
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      if (!dialog.open) dialog.showModal();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  // Quick Action presets
  const quickActions = [
    {
      id: 'action-vox',
      type: 'action',
      title: 'Ask VOX AI Assistant',
      subtitle: 'Open the contextual review intelligence agent',
      icon: Sparkles,
      run: () => onOpenAskVox(),
    },
    {
      id: 'action-compare-flagships',
      type: 'action',
      title: 'Compare iPhone 16 Pro Max vs Galaxy S24 Ultra',
      subtitle: 'Side-by-side flagship camera & battery showdown',
      icon: GitCompare,
      run: () => onCompareProducts(['iphone-16-pro-max', 'galaxy-s24-ultra']),
    },
    {
      id: 'action-audio-toggle',
      type: 'action',
      title: isMuted ? 'Unmute Synthetic Haptic Audio' : 'Mute Synthetic Haptic Audio',
      subtitle: isMuted ? 'Enable mechanical clicks & laptop audio' : 'Silence interface audio transients',
      icon: isMuted ? VolumeX : Volume2,
      run: () => onToggleMute(),
    },
  ];

  // Filtered products matching query
  const matchingProducts = useMemo(() => {
    if (!query.trim()) return SAMPLE_PRODUCTS.slice(0, 6);
    const q = query.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.specsSummary.chipset && p.specsSummary.chipset.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  // Combined flat list of selectable items
  const allItems = useMemo(() => {
    const items: Array<{
      id: string;
      type: 'product' | 'action';
      title: string;
      subtitle: string;
      data?: Product;
      run: () => void;
    }> = [];

    // Add matching products
    matchingProducts.forEach(p => {
      items.push({
        id: `prod-${p.id}`,
        type: 'product',
        title: p.name,
        subtitle: `${p.brand} • ${formatINR(p.priceMSRP)} • ${p.sampleRating} ★`,
        data: p,
        run: () => onSelectProduct(p.id),
      });
    });

    // Add quick actions if query matches action or is empty
    quickActions.forEach(a => {
      if (!query.trim() || a.title.toLowerCase().includes(query.toLowerCase())) {
        items.push({
          id: a.id,
          type: 'action',
          title: a.title,
          subtitle: a.subtitle,
          run: a.run,
        });
      }
    });

    return items;
  }, [matchingProducts, quickActions, query, onSelectProduct]);

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
      className="frosted-native-dialog p-0 bg-transparent border-none max-w-2xl w-[calc(100%-2rem)] m-auto animate-scaleUp text-slate-900"
    >
      <div
        className="frosted-modal rounded-3xl border border-white/90 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
        onKeyDown={handleKeyDown}
      >
        {/* Spotlight Search Header */}
        <div className="p-4 border-b border-white/80 frosted-panel flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a phone, brand, or command (e.g. S24 Ultra, Pixel, Compare)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-white/60 border border-slate-200 rounded-md shadow-2xs">
            ESC
          </kbd>
          <button
            onClick={() => {
              haptics.play('click');
              onClose();
            }}
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 flex-1">
          {allItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-medium">
              No matching products or commands found for "{query}"
            </div>
          ) : (
            allItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    haptics.play('click');
                    item.run();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'hover:bg-white/60 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.type === 'product' && item.data ? (
                      <div
                        className={`w-9 h-11 rounded-lg p-0.5 flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/10' : 'bg-white border border-slate-200/80 shadow-2xs'
                        }`}
                      >
                        <img
                          src={item.data.imageUrl}
                          alt={item.data.name}
                          className="max-h-full max-w-full object-contain pointer-events-none"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-sky-500 text-slate-950' : 'bg-sky-100 text-sky-700'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold truncate leading-snug">
                        {item.title}
                      </h4>
                      <p
                        className={`text-[11px] truncate ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      ↵
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="p-3 border-t border-white/80 frosted-panel flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/60 border border-slate-200 rounded font-mono text-[9px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/60 border border-slate-200 rounded font-mono text-[9px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/60 border border-slate-200 rounded font-mono text-[9px]">↵</kbd>
              Select
            </span>
          </div>

          <span className="font-semibold text-sky-700">ReviewIQ Spotlight</span>
        </div>
      </div>
    </dialog>
  );
};
