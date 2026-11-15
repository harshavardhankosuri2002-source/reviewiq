export interface RivalDefinition {
  id: string;
  name: string;
  tagline: string;
}

export const ARCH_RIVALS_MAP: Record<string, RivalDefinition[]> = {
  // --- Smartphones ---
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

  // --- Laptops ---
  'macbook-pro-16': [
    { id: 'dell-xps-16', name: 'Dell XPS 16', tagline: 'Intel Core Ultra 9 & 4K+ OLED' },
    { id: 'rog-zephyrus-g14', name: 'ROG Zephyrus G14', tagline: 'AMD Ryzen 9 & RTX 4070 Gaming' },
  ],
  'dell-xps-16': [
    { id: 'macbook-pro-16', name: 'MacBook Pro 16', tagline: 'Apple M3 Max & 22-Hour Battery' },
    { id: 'thinkpad-x1-carbon', name: 'ThinkPad X1 Carbon', tagline: '1.09kg Carbon Fiber Durability' },
  ],
  'rog-zephyrus-g14': [
    { id: 'macbook-pro-16', name: 'MacBook Pro 16', tagline: 'M3 Max 16-inch Liquid Retina XDR' },
    { id: 'dell-xps-16', name: 'Dell XPS 16', tagline: '16.3-inch 4K+ InfinityEdge Touch' },
  ],
  'thinkpad-x1-carbon': [
    { id: 'dell-xps-16', name: 'Dell XPS 16', tagline: 'Futuristic Edge-to-Edge Glass' },
    { id: 'macbook-pro-16', name: 'MacBook Pro 16', tagline: 'M3 Max Computing Powerhouse' },
  ],

  // --- Wearables ---
  'apple-watch-ultra-2': [
    { id: 'galaxy-watch-ultra', name: 'Galaxy Watch Ultra', tagline: 'Grade 4 Titanium & Wear OS 5' },
    { id: 'garmin-fenix-8', name: 'Garmin Fenix 8', tagline: '29-Day AMOLED Battery & Offline Maps' },
  ],
  'galaxy-watch-ultra': [
    { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2', tagline: '49mm Titanium & 3,000 Nits LTPO' },
    { id: 'garmin-fenix-8', name: 'Garmin Fenix 8', tagline: '40m Diving & TopoActive Mapping' },
  ],
  'garmin-fenix-8': [
    { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2', tagline: 'Action Button & Oceanic+ Dive Computer' },
    { id: 'galaxy-watch-ultra', name: 'Galaxy Watch Ultra', tagline: 'Galaxy AI Health & Energy Score' },
  ],

  // --- Tablets ---
  'ipad-pro-13-m4': [
    { id: 'galaxy-tab-s9-ultra', name: 'Galaxy Tab S9 Ultra', tagline: '14.6-inch Dynamic AMOLED & Bundled S-Pen' },
    { id: 'macbook-pro-16', name: 'MacBook Pro 16', tagline: 'Full macOS Workstation' },
  ],
  'galaxy-tab-s9-ultra': [
    { id: 'ipad-pro-13-m4', name: 'iPad Pro 13 (M4)', tagline: 'Ultra Retina XDR Tandem OLED & Apple M4' },
    { id: 'dell-xps-16', name: 'Dell XPS 16', tagline: 'Windows 11 Laptop Convertible' },
  ],

  // --- Headphones ---
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
  // Category-specific fallbacks
  if (productId.includes('macbook') || productId.includes('xps') || productId.includes('thinkpad') || productId.includes('zephyrus')) {
    return [
      { id: 'macbook-pro-16', name: 'MacBook Pro 16', tagline: 'Apple Silicon Reference' },
      { id: 'dell-xps-16', name: 'Dell XPS 16', tagline: 'Windows Flagship Reference' },
    ];
  }
  if (productId.includes('watch') || productId.includes('fenix')) {
    return [
      { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2', tagline: 'iOS Flagship Wearable' },
      { id: 'galaxy-watch-ultra', name: 'Galaxy Watch Ultra', tagline: 'Android Flagship Wearable' },
    ];
  }
  if (productId.includes('tab') || productId.includes('ipad')) {
    return [
      { id: 'ipad-pro-13-m4', name: 'iPad Pro 13 (M4)', tagline: 'iPadOS Flagship Reference' },
      { id: 'galaxy-tab-s9-ultra', name: 'Galaxy Tab S9 Ultra', tagline: 'Android Tablet Reference' },
    ];
  }
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
