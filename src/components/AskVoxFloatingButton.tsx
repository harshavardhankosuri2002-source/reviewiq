import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageSquareCode } from 'lucide-react';
import { InteractiveVoxAvatar } from './InteractiveVoxAvatar';
import { haptics } from '../utils/haptics';

interface AskVoxFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AskVoxFloatingButton: React.FC<AskVoxFloatingButtonProps> = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isOpen) return null;

  return (
    <aside
      aria-label="Personal VOX AI Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none"
    >
      {/* Dynamic Hover Thought Bubble / Hint */}
      {isHovered && (
        <div className="absolute -top-12 right-0 sm:right-1 z-50 pointer-events-none animate-fadeIn whitespace-nowrap">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/95 backdrop-blur-xl text-white text-[11px] font-semibold flex items-center gap-2 shadow-2xl border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-200">
              Ask about real-world battery, display flaws & specs
            </span>
            <span className="text-cyan-400 font-bold">↵</span>
            {/* Downward pointer caret */}
            <div className="absolute right-6 -bottom-1 w-2 h-2 bg-slate-900/95 rotate-45 border-r border-b border-white/20" />
          </div>
        </div>
      )}

      {/* Main Floating Copilot Launcher Pill */}
      <button
        id="ask-vox-global-trigger"
        onClick={() => {
          haptics.play('pop');
          onClick();
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          haptics.play('hover');
        }}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
        aria-label="Open VOX AI Assistant (Shortcut: ⌘J)"
        className="group relative flex items-center gap-2.5 sm:gap-3 pl-2 pr-4 sm:pr-4.5 py-2 sm:py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 text-white backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
      >
        {/* Iridescent Aurora Ambient Backlight */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-indigo-500/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Neural AI Core Orb */}
        <InteractiveVoxAvatar size="sm" isTyping={false} showBubble={false} />

        {/* Label & Contextual Badge */}
        <div className="relative flex flex-col items-start leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black tracking-tight text-white group-hover:text-cyan-200 transition-colors">
              Ask VOX
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 px-1.5 py-0.5 rounded-full shadow-xs">
              AI
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Copilot • 314 Reviews</span>
          </span>
        </div>

        {/* Desktop Keyboard Shortcut Badge */}
        <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white/10 rounded-md border border-white/10 group-hover:text-cyan-200 group-hover:border-cyan-400/40 transition-colors">
          <span className="text-[9px]">⌘</span>J
        </kbd>
      </button>
    </aside>
  );
};
