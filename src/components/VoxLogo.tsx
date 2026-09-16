import React from 'react';

interface VoxLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'icon';
}

export const VoxLogo: React.FC<VoxLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'full',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const taglineSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Geometric VOX Emblem */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#0284C7] to-[#182C45] text-white flex items-center justify-center p-2 shadow-sm shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stylized Modern Soundwave / V Glyph */}
          <path
            d="M5 9L12.5 24L16 16.5L19.5 24L27 9"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="8" r="2.5" fill="#38BDF8" />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1 leading-none">
            <span
              className={`${textSizes[size]} font-black tracking-tight text-[#182C45]`}
              style={{ letterSpacing: '-0.03em' }}
            >
              VOX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mb-1" />
          </div>
          {showTagline && (
            <span
              className={`${taglineSizes[size]} font-bold tracking-[0.16em] uppercase text-[#0284C7] mt-0.5 leading-none`}
            >
              HEAR WHAT MATTERS
            </span>
          )}
        </div>
      )}
    </div>
  );
};
