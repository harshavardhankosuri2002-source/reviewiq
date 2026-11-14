import React from 'react';
import { ShopperPersona, AttributeKey } from '../types';
import { SHOPPER_PERSONAS, ATTRIBUTE_CONFIG } from '../data/mockData';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface PersonaPresetsProps {
  activePersonaId?: string;
  onSelectPersona: (persona: ShopperPersona) => void;
  variant?: 'compact' | 'full';
}

export const PersonaPresets: React.FC<PersonaPresetsProps> = ({
  activePersonaId,
  onSelectPersona,
  variant = 'compact'
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-iceberg text-midnight">
            <Sparkles className="w-3.5 h-3.5 text-glacier-deep" />
          </span>
          <span className="text-xs font-bold text-midnight uppercase tracking-wider">
            Quick Persona Match
          </span>
        </div>
        <span className="text-[11px] text-slateSecondary">1-Click Priority Presets</span>
      </div>

      <div className={`grid ${variant === 'compact' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} gap-2.5`}>
        {SHOPPER_PERSONAS.map(persona => {
          const isSelected = activePersonaId === persona.id;

          return (
            <button
              key={persona.id}
              onClick={() => onSelectPersona(persona)}
              className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-midnight text-white border-midnight shadow-card'
                  : 'bg-white text-midnight border-bordergray hover:border-glacier hover:bg-lightgray shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl" role="img" aria-label={persona.name}>{persona.emoji}</span>
                  {isSelected ? (
                    <span className="w-4 h-4 rounded-full bg-glacier text-midnight flex items-center justify-center text-[10px] font-bold">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-[10px] text-slateSecondary font-mono">{persona.priorities.length} tags</span>
                  )}
                </div>

                <h4 className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-midnight'}`}>
                  {persona.name}
                </h4>
                <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-sky' : 'text-slateSecondary'}`}>
                  {persona.tagline}
                </p>
              </div>

              {variant === 'full' && (
                <div className="mt-2.5 pt-2 border-t border-bordergray/40">
                  <div className="flex flex-wrap gap-1">
                    {persona.priorities.map(pKey => (
                      <span
                        key={pKey}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          isSelected ? 'bg-deepnavy text-glacier' : 'bg-iceberg text-midnight'
                        }`}
                      >
                        {ATTRIBUTE_CONFIG[pKey]?.label || pKey}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

