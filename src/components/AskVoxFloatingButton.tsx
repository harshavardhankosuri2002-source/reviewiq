import React from 'react';
import { InteractiveVoxAvatar } from './InteractiveVoxAvatar';

interface AskVoxFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AskVoxFloatingButton: React.FC<AskVoxFloatingButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <aside
      aria-label="Personal VOX AI Assistant Trigger"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
    >
      <div
        id="ask-vox-global-trigger"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Open VOX AI Assistant"
        className="group relative flex flex-col items-center p-2 rounded-2xl frosted-glass-card shadow-2xl hover:shadow-sky-400/20 border border-white/90 hover:border-sky-300 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Interactive Character Avatar with Laptop */}
        <InteractiveVoxAvatar size="md" showBubble={true} />

        {/* Small Bottom Status Label */}
        <div className="mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white border border-white/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-wide">Ask VOX</span>
          <span className="text-[8px] font-extrabold uppercase bg-sky-500/30 text-sky-200 px-1 rounded">AI</span>
        </div>
      </div>
    </aside>
  );
};
