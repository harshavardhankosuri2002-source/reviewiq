import React, { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { haptics } from '../utils/haptics';

interface InteractiveVoxAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  isTyping?: boolean;
  forceOpen?: boolean;
  showBubble?: boolean;
  className?: string;
  onClick?: () => void;
}

export const InteractiveVoxAvatar: React.FC<InteractiveVoxAvatarProps> = ({
  size = 'md',
  isTyping = false,
  forceOpen = false,
  showBubble = true,
  className = '',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Active state when hovered, forced open, or typing
  const isActive = isHovered || forceOpen || isTyping;

  // Size dimensions
  const dims = {
    sm: {
      outer: 'w-9 h-9',
      icon: 'w-4 h-4',
      badge: 'w-2 h-2',
      bars: 'h-2 w-0.5',
    },
    md: {
      outer: 'w-14 h-14',
      icon: 'w-6 h-6',
      badge: 'w-3 h-3',
      bars: 'h-3 w-1',
    },
    lg: {
      outer: 'w-20 h-20',
      icon: 'w-9 h-9',
      badge: 'w-3.5 h-3.5',
      bars: 'h-4 w-1.5',
    },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${dims.outer} ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        haptics.play('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        haptics.play('click');
        onClick?.();
      }}
    >
      {/* Speech / Action Bubble on Hover */}
      {showBubble && isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn whitespace-nowrap">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-2 shadow-xl border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>
              {isTyping
                ? 'Synthesizing evidence across reviews...'
                : 'VOX Copilot • Grounded in 314 reviews ✦'}
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-slate-900/95 rotate-45 border-r border-b border-white/20" />
          </div>
        </div>
      )}

      {/* 1. Ambient Background Neural Glow Aura */}
      <div
        className={`absolute inset-0 rounded-full blur-md transition-all duration-500 pointer-events-none ${
          isActive
            ? 'bg-gradient-to-tr from-cyan-400/60 via-sky-500/50 to-indigo-600/55 scale-125 opacity-100'
            : 'bg-cyan-500/25 scale-100 opacity-60 group-hover:opacity-90'
        }`}
      />

      {/* 2. Rotating Orbital Gradient Ring */}
      <div
        className={`absolute -inset-0.5 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
          isActive
            ? 'border-cyan-300/80 animate-[spin_6s_linear_infinite] scale-105'
            : 'border-cyan-400/30 group-hover:border-cyan-300/60'
        }`}
      />

      {/* 3. Main Neural Core Sphere */}
      <div
        className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-300 flex items-center justify-center border shadow-inner ${
          isActive
            ? 'border-cyan-300 shadow-cyan-400/40 bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950 scale-102'
            : 'border-white/30 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 group-hover:border-cyan-400/50'
        }`}
      >
        {/* Shimmering Internal Aurora Wave */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-cyan-500/40 via-blue-600/30 to-purple-600/40 transition-opacity duration-300 pointer-events-none ${
            isActive ? 'opacity-100 animate-pulse' : 'opacity-60'
          }`}
        />

        {/* Central Luminous AI Glyph */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Sparkles
            className={`${dims.icon} text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-transform duration-300 ${
              isActive ? 'scale-110 text-cyan-200 rotate-6' : 'group-hover:scale-105'
            }`}
          />

          {/* Dynamic Equalizer / Neural Activity Bars (visible when active or typing) */}
          {size !== 'sm' && (
            <div className="flex items-center gap-0.5 mt-0.5 pointer-events-none">
              {[0, 1, 2, 3].map(i => (
                <span
                  key={i}
                  className={`${dims.bars} rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-300 animate-pulse'
                      : 'bg-cyan-500/40'
                  }`}
                  style={{
                    animationDuration: `${400 + i * 150}ms`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Live Grounded Online Indicator Dot */}
      <div className={`absolute bottom-0 right-0 z-20 flex ${dims.badge}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border border-white shadow-xs" />
      </div>
    </div>
  );
};
