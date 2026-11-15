import React from 'react';
import { Product } from '../types';

interface RadarComparisonChartProps {
  products: Product[];
  className?: string;
  size?: number; // default 280
}

interface AxisDef {
  key: string;
  label: string;
  angle: number; // in radians
}

export const RadarComparisonChart: React.FC<RadarComparisonChartProps> = ({
  products,
  className = '',
  size = 280,
}) => {
  if (products.length === 0) return null;

  const center = size / 2;
  const radius = (size / 2) - 42; // Leave margin for labels

  // 5 Strategic Axes
  const axes: AxisDef[] = [
    { key: 'battery', label: 'Battery', angle: -Math.PI / 2 }, // Top
    { key: 'camera', label: 'Camera', angle: -Math.PI / 2 + (2 * Math.PI / 5) },
    { key: 'performance', label: 'Performance', angle: -Math.PI / 2 + (4 * Math.PI / 5) },
    { key: 'value', label: 'Value', angle: -Math.PI / 2 + (6 * Math.PI / 5) },
    { key: 'display', label: 'Display', angle: -Math.PI / 2 + (8 * Math.PI / 5) },
  ];

  // Derive scores from product specifications & ratings (0 - 100)
  const getProductScores = (p: Product) => {
    const batteryNum = parseInt(p.specsSummary.battery.replace(/[^0-9]/g, ''), 10) || 4000;
    const batteryScore = Math.min(Math.max(Math.round(((batteryNum - 3000) / 2500) * 40 + 60), 55), 98);

    const priceNum = parseInt(p.priceMSRP.replace(/[^0-9]/g, ''), 10) || 70000;
    // Lower price = higher value for money
    const valueScore = Math.min(Math.max(Math.round(100 - (priceNum / 160000) * 55), 45), 96);

    const ratingScore = Math.round(p.sampleRating * 20); // 4.5 * 20 = 90
    const perfScore = p.specsSummary.chipset?.includes('Pro') || p.specsSummary.chipset?.includes('Gen 3') ? 95 : 85;
    const cameraScore = p.specsSummary.camera?.includes('1-inch') || p.specsSummary.camera?.includes('Periscope') || p.specsSummary.camera?.includes('Leica') ? 96 : 88;

    return {
      battery: batteryScore,
      camera: cameraScore,
      performance: perfScore,
      value: valueScore,
      display: ratingScore,
    };
  };

  // Color schemes for up to 3 compared products
  const productColors = [
    { stroke: '#0284C7', fill: 'rgba(2, 132, 199, 0.25)', dot: '#0284C7' }, // Sky Blue
    { stroke: '#059669', fill: 'rgba(5, 150, 105, 0.25)', dot: '#059669' }, // Emerald
    { stroke: '#7C3AED', fill: 'rgba(124, 58, 237, 0.25)', dot: '#7C3AED' }, // Violet
  ];

  // Generate concentric polygon grid points for background circles (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        className="overflow-visible filter drop-shadow-xs"
      >
        {/* Concentric Grid Pentagons */}
        {gridLevels.map((lvl, lIdx) => {
          const pts = axes
            .map(axis => {
              const r = radius * lvl;
              const x = center + r * Math.cos(axis.angle);
              const y = center + r * Math.sin(axis.angle);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');

          return (
            <polygon
              key={lIdx}
              points={pts}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth={lIdx === gridLevels.length - 1 ? '1.5' : '1'}
              strokeDasharray={lIdx === gridLevels.length - 1 ? undefined : '3,3'}
              className="opacity-70"
            />
          );
        })}

        {/* Axis Spokes from center */}
        {axes.map(axis => {
          const x = center + radius * Math.cos(axis.angle);
          const y = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#E2E8F0"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Product Overlaid Polygons */}
        {products.slice(0, 3).map((prod, pIdx) => {
          const scores = getProductScores(prod);
          const color = productColors[pIdx];

          const polygonPoints = axes
            .map(axis => {
              const val = (scores as Record<string, number>)[axis.key] || 75;
              const r = (radius * val) / 100;
              const x = center + r * Math.cos(axis.angle);
              const y = center + r * Math.sin(axis.angle);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');

          return (
            <g key={prod.id} className="transition-all duration-500">
              <polygon
                points={polygonPoints}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth="2.5"
                className="transition-all duration-300"
              />
              {axes.map(axis => {
                const val = (scores as Record<string, number>)[axis.key] || 75;
                const r = (radius * val) / 100;
                const x = center + r * Math.cos(axis.angle);
                const y = center + r * Math.sin(axis.angle);
                return (
                  <circle
                    key={axis.key}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill={color.dot}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="shadow-xs"
                  />
                );
              })}
            </g>
          );
        })}

        {/* Axis Text Labels */}
        {axes.map(axis => {
          const labelDist = radius + 22;
          const x = center + labelDist * Math.cos(axis.angle);
          const y = center + labelDist * Math.sin(axis.angle) + 4;

          return (
            <text
              key={axis.key}
              x={x}
              y={y}
              textAnchor="middle"
              className="text-[10px] font-extrabold fill-slate-700 uppercase tracking-wider"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      {/* Legend Below Chart */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        {products.slice(0, 3).map((prod, pIdx) => {
          const color = productColors[pIdx];
          return (
            <div key={prod.id} className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-2xs"
                style={{ backgroundColor: color.stroke }}
              />
              <span className="truncate max-w-[120px]">{prod.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
