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

  // Laptop is open if hovered, forceOpen is true, or AI is currently typing
  const isLaptopOpen = isHovered || forceOpen || isTyping;

  // Size dimensions
  const dims = {
    sm: { container: 'w-14 h-16', avatar: 'w-12 h-12', laptopW: 46, laptopH: 28 },
    md: { container: 'w-20 h-22', avatar: 'w-16 h-16', laptopW: 62, laptopH: 36 },
    lg: { container: 'w-28 h-32', avatar: 'w-24 h-24', laptopW: 84, laptopH: 50 },
  }[size];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${dims.container} ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        haptics.play('laptop');
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        haptics.play('click');
        onClick?.();
      }}
    >
      {/* Speech Thought Bubble on Hover */}
      {showBubble && isHovered && (
        <div className="absolute -top-12 -left-40 sm:-left-48 z-50 pointer-events-none animate-fadeIn">
          <div className="frosted-modal px-3 py-1.5 rounded-2xl shadow-xl border border-white/90 text-slate-800 text-[11px] font-semibold flex items-center gap-2 whitespace-nowrap">
            <Bot className="w-3.5 h-3.5 text-sky-600 animate-bounce" />
            <span>{isTyping ? 'VOX Bot is analyzing reviews...' : 'VOX Bot is online • Ask me! 🤖'}</span>
            <div className="absolute right-3 -bottom-1.5 w-3 h-3 bg-white/90 rotate-45 border-r border-b border-white/80" />
          </div>
        </div>
      )}

      {/* Main Robot Avatar Stage */}
      <div className="relative flex items-center justify-center">
        {/* Cyber Neon Backlight Glow (Expands & pulses when laptop opens) */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 pointer-events-none ${
            isLaptopOpen
              ? 'bg-gradient-to-tr from-cyan-400/50 via-sky-500/40 to-blue-600/45 scale-130'
              : 'bg-sky-400/20 scale-95'
          }`}
        />

        {/* Circular Robot Avatar Frame */}
        <div
          className={`relative rounded-full overflow-hidden border-2 transition-all duration-300 shadow-md ${
            dims.avatar
          } ${
            isLaptopOpen
              ? 'border-cyan-400 shadow-cyan-300/60 scale-102 ring-2 ring-sky-300/40'
              : 'border-white/80 group-hover:border-sky-300'
          }`}
        >
          {/* Working Robot with Headset */}
          <img
            src="/images/vox-robot.jpg"
            alt="VOX AI Review Assistant"
            className="w-full h-full object-cover object-[32%_15%]"
          />

          {/* Cyan Screen Light Reflection onto Robot Visor & Body when Laptop is open */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-cyan-400/35 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
              isLaptopOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Robot Online Indicator Light */}
        <div className="absolute bottom-1 right-0 z-20 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-white shadow-2xs" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3D INTERACTIVE LAPTOP (Closed by default, Opens on hover/text) */}
      {/* ============================================================ */}
      <div
        className="relative -mt-4 z-30 transition-transform duration-300 perspective-[600px]"
        style={{ width: `${dims.laptopW}px` }}
      >
        {/* SVG Detailed Laptop Component */}
        <div className="relative w-full flex flex-col items-center">
          {/* 1. LAPTOP LID / SCREEN */}
          <div
            className="w-full transition-all duration-400 origin-bottom ease-out"
            style={{
              transform: isLaptopOpen
                ? 'rotateX(0deg) translateY(0px)'
                : 'rotateX(82deg) translateY(6px) scaleY(0.4)',
              transformStyle: 'preserve-3d',
            }}
          >
            {isLaptopOpen ? (
              /* OPEN SCREEN */
              <div className="w-full h-8 sm:h-9 bg-slate-900 rounded-t-md p-1 border-t border-x border-slate-700 shadow-lg relative flex flex-col justify-between overflow-hidden">
                {/* Glowing Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/25 to-blue-600/35 pointer-events-none" />
                <div className="flex items-center justify-between z-10">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-rose-500/80" />
                    <span className="w-1 h-1 rounded-full bg-amber-500/80" />
                    <span className="w-1 h-1 rounded-full bg-emerald-500/80" />
                  </div>
                  <Sparkles className="w-2 h-2 text-cyan-300 animate-pulse" />
                </div>

                {/* Animated Chat / Typing Wave on Screen */}
                <div className="space-y-0.5 z-10 px-0.5">
                  <div className="h-0.5 w-3/4 bg-cyan-300/90 rounded-full animate-pulse" />
                  <div className="h-0.5 w-1/2 bg-sky-200/70 rounded-full" />
                </div>

                {/* Screen Bezel Notch / Webcam */}
                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-slate-800 rounded-b-xs" />
              </div>
            ) : (
              /* CLOSED LAPTOP LID (Back of metallic screen showing Logo) */
              <div className="w-full h-3 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-t-sm border-t border-slate-200 shadow-xs flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300/80 shadow-xs animate-pulse" />
              </div>
            )}
          </div>

          {/* 2. LAPTOP BASE / KEYBOARD & TRACKPAD */}
          <div className="w-full h-3.5 sm:h-4 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-sm border-t border-slate-400 shadow-md relative flex flex-col items-center justify-between px-1 py-0.5">
            {/* Keyboard Keys Strip */}
            <div className="w-full h-1.5 bg-slate-700/80 rounded-xs flex items-center justify-around px-0.5">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`w-1 h-1 rounded-2xs transition-colors ${
                    isLaptopOpen && (isTyping || isHovered)
                      ? 'animate-pulse bg-cyan-400'
                      : 'bg-slate-800'
                  }`}
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>

            {/* Trackpad */}
            <div className="w-3 h-1 bg-slate-400/60 rounded-2xs border border-slate-400/50 mt-0.5" />

            {/* Animated Metallic Robot Typing Fingers Effect when Open */}
            {isLaptopOpen && (
              <div className="absolute -top-1 w-full flex justify-around px-1 pointer-events-none">
                <span className="w-1.5 h-1 rounded-full bg-cyan-100/90 shadow-xs animate-bounce" style={{ animationDuration: '500ms' }} />
                <span className="w-1.5 h-1 rounded-full bg-cyan-100/90 shadow-xs animate-bounce" style={{ animationDuration: '500ms', animationDelay: '120ms' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
