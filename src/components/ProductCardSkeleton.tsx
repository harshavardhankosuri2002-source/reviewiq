import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between"
        >
          <div>
            {/* Image Placeholder */}
            <div className="relative aspect-16/10 bg-slate-50/70 border-b border-slate-100 p-6 flex items-center justify-center overflow-hidden">
              <div className="w-28 h-36 rounded-xl skeleton-shimmer" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 w-16 h-5 rounded-md skeleton-shimmer" />
              <div className="absolute top-4 right-4 w-20 h-5 rounded-md skeleton-shimmer" />
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Title & Star Rating */}
              <div className="space-y-2">
                <div className="h-5 w-4/5 rounded skeleton-shimmer" />
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-24 rounded skeleton-shimmer" />
                  <div className="h-3.5 w-20 rounded skeleton-shimmer" />
                </div>
              </div>

              {/* Specs Strip */}
              <div className="flex items-center gap-2 py-1">
                <div className="h-3 w-28 rounded skeleton-shimmer" />
                <span className="text-slate-300">•</span>
                <div className="h-3 w-28 rounded skeleton-shimmer" />
              </div>

              {/* Customer Sentiment Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-28 rounded skeleton-shimmer" />
                  <div className="h-3 w-16 rounded skeleton-shimmer" />
                </div>
                <div className="h-1.5 w-full rounded-full skeleton-shimmer" />
              </div>

              {/* Decoded Verdict Lines */}
              <div className="space-y-2 pt-2 border-l-2 border-slate-200 pl-3">
                <div className="h-3 w-full rounded skeleton-shimmer" />
                <div className="h-3 w-5/6 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* Card Actions Footer */}
          <div className="p-6 pt-0 space-y-2.5">
            <div className="w-full h-10 rounded-lg skeleton-shimmer mt-2" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-9 rounded-lg skeleton-shimmer" />
              <div className="h-9 rounded-lg skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
