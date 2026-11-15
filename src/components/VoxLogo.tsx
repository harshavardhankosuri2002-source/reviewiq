import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'icon';
  theme?: 'light' | 'dark';
}

export const VoxLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'full',
  theme = 'light',
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
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern ReviewIQ Emblem */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#182C45] via-[#1E3A5F] to-[#0284C7] text-white flex items-center justify-center p-1.5 shadow-soft shrink-0 border border-[#B8DBF7]/40`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Review Speech bubble outline */}
          <path
            d="M6 8C6 6.89543 6.89543 6 8 6H24C25.1046 6 26 6.89543 26 8V20C26 21.1046 25.1046 22 24 22H16L10 26V22H8C6.89543 22 6 21.1046 6 20V8Z"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* IQ Sparkle / Insight Star */}
          <path
            d="M16 10L17.2 13.2L20.4 14L17.2 14.8L16 18L14.8 14.8L11.6 14L14.8 13.2L16 10Z"
            fill="#38BDF8"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center leading-none">
            <span
              className={`${textSizes[size]} font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#182C45]'}`}
              style={{ letterSpacing: '-0.03em' }}
            >
              VOX<span className="text-[#0284C7]">.ai</span>
            </span>
          </div>
          {showTagline && (
            <span
              className={`${taglineSizes[size]} font-bold tracking-[0.14em] uppercase text-[#0284C7] mt-0.5 leading-none`}
            >
              Customer feedback, decoded.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const ReviewIQLogo = VoxLogo;
