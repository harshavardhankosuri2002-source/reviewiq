import React, { useState, useEffect } from 'react';
import { Volume2, Square, Sparkles } from 'lucide-react';
import { voxSpeech } from '../utils/speech';
import { haptics } from '../utils/haptics';

interface VoxAudioBriefingButtonProps {
  text: string;
  className?: string;
  variant?: 'pill' | 'button';
}

export const VoxAudioBriefingButton: React.FC<VoxAudioBriefingButtonProps> = ({
  text,
  className = '',
  variant = 'pill',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = voxSpeech.subscribe(speaking => {
      setIsPlaying(speaking);
    });
    return () => {
      unsubscribe();
      voxSpeech.stop();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptics.play('click');
    voxSpeech.toggle(text);
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          isPlaying
            ? 'bg-sky-600 text-white shadow-md animate-pulse'
            : 'frosted-pill text-slate-800 hover:text-sky-700 hover:bg-white border border-white/80'
        } ${className}`}
      >
        {isPlaying ? (
          <>
            <Square className="w-3 h-3 fill-current" />
            <span>Stop Audio Briefing</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Listen to VOX Briefing</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
        isPlaying
          ? 'bg-sky-600 text-white shadow-xs'
          : 'bg-white/80 hover:bg-white text-slate-700 hover:text-sky-700 border border-slate-200/80 shadow-2xs'
      } ${className}`}
      title={isPlaying ? 'Click to stop audio synthesis' : 'Listen to spoken AI synthesis summary'}
    >
      {isPlaying ? (
        <>
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
          <span>Playing Audio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3 h-3 text-sky-600" />
          <span>Listen to Summary</span>
        </>
      )}
    </button>
  );
};
