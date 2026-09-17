import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

interface AskVoxFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AskVoxFloatingButton: React.FC<AskVoxFloatingButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <aside aria-label="Personal VOX AI Assistant Trigger" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <button
        onClick={onClick}
        id="ask-vox-global-trigger"
        aria-label="Open Ask VOX AI Assistant"
        aria-haspopup="dialog"
        className="group flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#182C45] hover:bg-[#0F1E31] text-white rounded-full shadow-lg hover:shadow-xl border border-[#3B82F6]/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#0284C7] focus:ring-offset-2 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0284C7]" />
        </span>

        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#38BDF8] group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-extrabold text-xs sm:text-sm tracking-wide">Ask VOX</span>
        </div>

        <span className="hidden md:inline-block text-[10px] font-semibold uppercase tracking-wider bg-[#0284C7]/30 text-[#E0F2FE] px-2 py-0.5 rounded-full">
          AI
        </span>
      </button>
    </aside>
  );
};
