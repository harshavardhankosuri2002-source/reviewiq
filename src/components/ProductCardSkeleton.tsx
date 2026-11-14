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
          className="bg-white rounded-2xl border border-[#D5E9FA] shadow-card overflow-hidden flex flex-col justify-between"
        >
          <div>
            {/* Image Placeholder */}
            <div className="relative aspect-16/10 bg-[#F5F8FC] border-b border-[#EAF5FF] p-4 flex items-center justify-center overflow-hidden">
              <div className="w-24 h-32 rounded-lg skeleton-shimmer border border-[#D5E9FA]/60" />
              
              {/* Top Floating Badge Skeletons */}
              <div className="absolute top-3 left-3 w-16 h-6 rounded-md skeleton-shimmer border border-[#D5E9FA]/60" />
              <div className="absolute top-3 right-3 w-20 h-6 rounded-md skeleton-shimmer border border-[#D5E9FA]/60" />
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Title & Rating */}
              <div className="space-y-2">
                <div className="h-5 w-4/5 rounded skeleton-shimmer" />
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-24 rounded skeleton-shimmer" />
                  <div className="h-3.5 w-16 rounded skeleton-shimmer" />
                </div>
              </div>

              {/* Specs Summary Pill Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl border border-[#D5E9FA] bg-[#F5F8FC]">
                <div className="space-y-1.5">
                  <div className="h-2 w-12 rounded skeleton-shimmer" />
                  <div className="h-3.5 w-24 rounded skeleton-shimmer" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-12 rounded skeleton-shimmer" />
                  <div className="h-3.5 w-24 rounded skeleton-shimmer" />
                </div>
              </div>

              {/* Customer Sentiment Bar */}
              <div className="p-3.5 rounded-xl border border-[#D5E9FA] bg-[#F5F8FC] space-y-2.5">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-28 rounded skeleton-shimmer" />
                  <div className="h-3 w-16 rounded skeleton-shimmer" />
                </div>
                <div className="h-2 w-full rounded-full skeleton-shimmer" />
                <div className="flex justify-between">
                  <div className="h-2 w-14 rounded skeleton-shimmer" />
                  <div className="h-2 w-14 rounded skeleton-shimmer" />
                  <div className="h-2 w-14 rounded skeleton-shimmer" />
                </div>
              </div>

              {/* Decoded Verdict Lines */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3 w-full rounded skeleton-shimmer" />
                <div className="h-3 w-5/6 rounded skeleton-shimmer" />
              </div>

              {/* Retailer Footer */}
              <div className="pt-2 flex items-center justify-between border-t border-[#E2E8F0]/60">
                <div className="h-3 w-24 rounded skeleton-shimmer" />
                <div className="h-3 w-16 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* Card Actions Footer */}
          <div className="p-6 pt-0 border-t border-[#E2E8F0] mt-2 space-y-2">
            <div className="w-full h-10 rounded-md skeleton-shimmer mt-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-9 rounded-md skeleton-shimmer" />
              <div className="h-9 rounded-md skeleton-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
