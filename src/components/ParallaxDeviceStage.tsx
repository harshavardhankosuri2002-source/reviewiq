import React, { useState, useRef } from 'react';

interface ParallaxDeviceStageProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default 7)
  showGlare?: boolean;
}

/**
 * ParallaxDeviceStage implements:
 * - Principle 11: Solid Drawing in 3D (Physical depth & perspective tilt)
 * - Principle 8: Secondary Action (Specular light reflection moving across surface)
 * - Principle 6: Slow in & Slow out (Smooth spring return on mouse leave)
 */
export const ParallaxDeviceStage: React.FC<ParallaxDeviceStageProps> = ({
  children,
  className = '',
  maxTilt = 7,
  showGlare = true,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    // Invert Y for standard natural 3D tilt perspective
    const tiltX = -(yPct - 0.5) * (maxTilt * 2);
    const tiltY = (xPct - 0.5) * (maxTilt * 2);

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: xPct * 100, y: yPct * 100, opacity: 0.32 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        perspective: '900px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center relative"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(10px) scale(1.03)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
          transition: isHovered
            ? 'transform 75ms ease-out'
            : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {/* Dynamic Specular Glare Layer (Moves with cursor across device) */}
        {showGlare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 overflow-hidden mix-blend-overlay z-20"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.15) 45%, transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
