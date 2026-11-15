export interface RivalDefinition {
  id: string;
  name: string;
  tagline: string;
}

export const ARCH_RIVALS_MAP: Record<string, RivalDefinition[]> = {
  'iphone-16-pro-max': [
    { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', tagline: 'S-Pen & 5x Optical Periscope' },
    { id: 'pixel-9-pro-xl', name: 'Pixel 9 Pro XL', tagline: 'Google Tensor G4 & Gemini AI' },
  ],
  'galaxy-s24-ultra': [
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', tagline: 'Apple A18 Pro & 4K120 ProRes' },
    { id: 'xiaomi-14-ultra', name: 'Xiaomi 14 Ultra', tagline: 'Quad Leica 50MP 1-inch Optics' },
  ],
  'pixel-9-pro-xl': [
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', tagline: 'Titanium Build & Cinematic Mode' },
    { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', tagline: 'Dynamic AMOLED 2X Anti-Reflective' },
  ],
  'oneplus-12': [
    { id: 'xiaomi-14', name: 'Xiaomi 14', tagline: 'Compact Leica Flagship' },
    { id: 'galaxy-s24', name: 'Galaxy S24', tagline: 'Compact AI Flagship' },
  ],
  'xiaomi-14': [
    { id: 'oneplus-12', name: 'OnePlus 12', tagline: '5,400 mAh Battery & 100W SuperVOOC' },
    { id: 'galaxy-s24', name: 'Galaxy S24', tagline: '7-Year OS Support Guarantee' },
  ],
  'sony-wh1000xm5': [
    { id: 'bose-qc-ultra', name: 'Bose QC Ultra', tagline: 'Immersive Audio & Deep ANC' },
    { id: 'airpods-max', name: 'AirPods Max', tagline: 'Spatial Audio & Stainless Steel Canopy' },
  ],
  'bose-qc-ultra': [
    { id: 'sony-wh1000xm5', name: 'Sony WH-1000XM5', tagline: 'LDAC Hi-Res & Featherlight 250g' },
    { id: 'airpods-max', name: 'AirPods Max', tagline: 'Computational Spatial Acoustics' },
  ],
  'airpods-max': [
    { id: 'sony-wh1000xm5', name: 'Sony WH-1000XM5', tagline: '30-Hour Battery & Auto NC Optimizer' },
    { id: 'bose-qc-ultra', name: 'Bose QC Ultra', tagline: 'World-Class Bose Active Noise Cancellation' },
  ],
};

export function getArchRivals(productId: string): RivalDefinition[] {
  if (ARCH_RIVALS_MAP[productId]) {
    return ARCH_RIVALS_MAP[productId];
  }
  // Default rivals for other models
  if (productId.includes('galaxy') || productId.includes('pixel')) {
    return [
      { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', tagline: 'iOS Flagship Reference' },
      { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', tagline: 'Android Flagship Reference' },
    ];
  }
  return [
    { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', tagline: 'Top Android Rival' },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', tagline: 'Top Apple Rival' },
  ];
}
