import React from 'react';
import { getProductColorOptions } from '../utils/productColors';
import { haptics } from '../utils/haptics';

interface ProductColorSwatchesProps {
  productId: string;
  selectedIndex: number;
  onSelectColor: (index: number) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const ProductColorSwatches: React.FC<ProductColorSwatchesProps> = ({
  productId,
  selectedIndex,
  onSelectColor,
  className = '',
  size = 'sm',
}) => {
  const options = getProductColorOptions(productId);
  const activeColor = options[selectedIndex] || options[0];

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
  }[size];

  const buttonSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
  }[size];

  return (
    <div
      className={`flex items-center gap-0.5 frosted-pill px-1.5 py-0.5 rounded-full shadow-2xs z-10 ${className}`}
      onClick={e => e.stopPropagation()}
    >
      {options.map((swatch, idx) => {
        const isSelected = selectedIndex === idx;
        return (
          <button
            key={swatch.name}
            type="button"
            title={`${swatch.name}${isSelected ? ' (Selected)' : ''}`}
            aria-label={`Select color finish: ${swatch.name}`}
            onClick={() => {
              haptics.play('slide');
              onSelectColor(idx);
            }}
            className={`${buttonSizes} flex items-center justify-center rounded-full hover:bg-white/80 active:scale-90 transition-all cursor-pointer group/swatch relative`}
          >
            <span
              className={`${dotSizes} rounded-full ${swatch.bgClass} border border-white/80 shadow-2xs transition-all duration-200 ${
                isSelected
                  ? 'ring-2 ring-sky-500 ring-offset-1 scale-125'
                  : 'group-hover/swatch:scale-115 opacity-80 group-hover/swatch:opacity-100'
              }`}
            />
          </button>
        );
      })}

      {/* Selected Color Name Label (Shown on medium size or hover) */}
      {size === 'md' && activeColor && (
        <span className="text-[10px] font-semibold text-slate-700 ml-1.5 pr-1 truncate max-w-[110px]">
          {activeColor.name}
        </span>
      )}
    </div>
  );
};
