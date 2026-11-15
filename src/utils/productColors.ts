export interface ProductColorOption {
  name: string;
  hex: string;
  bgClass: string;
  filterStyle?: string;
}

export const PRODUCT_COLOR_MAP: Record<string, ProductColorOption[]> = {
  'iphone-16-pro-max': [
    { name: 'Desert Titanium', hex: '#C4A582', bgClass: 'bg-[#C4A582]', filterStyle: 'none' },
    { name: 'Natural Titanium', hex: '#9E9B97', bgClass: 'bg-[#9E9B97]', filterStyle: 'saturate(0.5) brightness(1.05)' },
    { name: 'White Titanium', hex: '#EBEAE6', bgClass: 'bg-[#E5E4E0]', filterStyle: 'brightness(1.15) contrast(0.95) saturate(0.2)' },
    { name: 'Black Titanium', hex: '#2E2D2B', bgClass: 'bg-[#252422]', filterStyle: 'brightness(0.65) contrast(1.1) saturate(0.3)' },
  ],
  'iphone-16': [
    { name: 'Ultramarine', hex: '#4A69BD', bgClass: 'bg-[#4A69BD]', filterStyle: 'none' },
    { name: 'Teal', hex: '#38ADA9', bgClass: 'bg-[#38ADA9]', filterStyle: 'hue-rotate(200deg)' },
    { name: 'Pink', hex: '#F8A5C2', bgClass: 'bg-[#F8A5C2]', filterStyle: 'hue-rotate(60deg) saturate(1.2)' },
    { name: 'Black', hex: '#2C3A47', bgClass: 'bg-[#2C3A47]', filterStyle: 'brightness(0.5) saturate(0.1)' },
  ],
  'galaxy-s24-ultra': [
    { name: 'Titanium Gray', hex: '#7E7C79', bgClass: 'bg-[#7E7C79]', filterStyle: 'none' },
    { name: 'Titanium Black', hex: '#262626', bgClass: 'bg-[#222222]', filterStyle: 'brightness(0.7) contrast(1.1) saturate(0.2)' },
    { name: 'Titanium Violet', hex: '#584F66', bgClass: 'bg-[#584F66]', filterStyle: 'hue-rotate(220deg) saturate(1.1)' },
    { name: 'Titanium Yellow', hex: '#E5DDCB', bgClass: 'bg-[#E5DDCB]', filterStyle: 'hue-rotate(20deg) brightness(1.08)' },
  ],
  'galaxy-s24': [
    { name: 'Cobalt Violet', hex: '#494459', bgClass: 'bg-[#494459]', filterStyle: 'none' },
    { name: 'Amber Yellow', hex: '#E6DECD', bgClass: 'bg-[#E6DECD]', filterStyle: 'hue-rotate(180deg) brightness(1.1)' },
    { name: 'Onyx Black', hex: '#242424', bgClass: 'bg-[#202020]', filterStyle: 'brightness(0.6) saturate(0.1)' },
    { name: 'Marble Gray', hex: '#C5C7CA', bgClass: 'bg-[#C5C7CA]', filterStyle: 'saturate(0.1) brightness(1.1)' },
  ],
  'pixel-9-pro-xl': [
    { name: 'Obsidian', hex: '#26282A', bgClass: 'bg-[#26282A]', filterStyle: 'none' },
    { name: 'Porcelain', hex: '#F0ECE6', bgClass: 'bg-[#EAE6DF]', filterStyle: 'invert(0.7) brightness(1.2) contrast(0.85)' },
    { name: 'Hazel', hex: '#7C837C', bgClass: 'bg-[#7C837C]', filterStyle: 'hue-rotate(80deg) brightness(1.05)' },
    { name: 'Rose Quartz', hex: '#E8C5BE', bgClass: 'bg-[#E8C5BE]', filterStyle: 'hue-rotate(300deg) saturate(1.2)' },
  ],
  'pixel-9': [
    { name: 'Obsidian', hex: '#2A2C2E', bgClass: 'bg-[#2A2C2E]', filterStyle: 'none' },
    { name: 'Porcelain', hex: '#EFECE6', bgClass: 'bg-[#EAE6DF]', filterStyle: 'invert(0.7) brightness(1.2)' },
    { name: 'Wintergreen', hex: '#C2DBD0', bgClass: 'bg-[#BAD5CA]', filterStyle: 'hue-rotate(100deg) brightness(1.1)' },
    { name: 'Peony', hex: '#EAA4B8', bgClass: 'bg-[#EAA4B8]', filterStyle: 'hue-rotate(310deg) saturate(1.3)' },
  ],
  'oneplus-12': [
    { name: 'Flowy Emerald', hex: '#264E44', bgClass: 'bg-[#264E44]', filterStyle: 'none' },
    { name: 'Silky Black', hex: '#202123', bgClass: 'bg-[#202123]', filterStyle: 'brightness(0.65) saturate(0.2)' },
    { name: 'Glacial White', hex: '#E8E8E8', bgClass: 'bg-[#E0E0E0]', filterStyle: 'brightness(1.2) saturate(0.1)' },
  ],
  'xiaomi-14': [
    { name: 'Jade Green', hex: '#4A6757', bgClass: 'bg-[#4A6757]', filterStyle: 'none' },
    { name: 'White', hex: '#ECECEC', bgClass: 'bg-[#E4E4E4]', filterStyle: 'brightness(1.18) saturate(0.15)' },
    { name: 'Black', hex: '#222325', bgClass: 'bg-[#202020]', filterStyle: 'brightness(0.6) saturate(0.1)' },
  ],
};

const DEFAULT_COLOR_OPTIONS: ProductColorOption[] = [
  { name: 'Obsidian / Midnight', hex: '#0F172A', bgClass: 'bg-slate-900', filterStyle: 'none' },
  { name: 'Silver / White', hex: '#CBD5E1', bgClass: 'bg-slate-300', filterStyle: 'brightness(1.12) saturate(0.2)' },
  { name: 'Emerald / Green', hex: '#047857', bgClass: 'bg-emerald-700', filterStyle: 'hue-rotate(120deg)' },
  { name: 'Blue / Violet', hex: '#0284C7', bgClass: 'bg-sky-600', filterStyle: 'hue-rotate(200deg)' },
];

export function getProductColorOptions(productId: string): ProductColorOption[] {
  return PRODUCT_COLOR_MAP[productId] || DEFAULT_COLOR_OPTIONS;
}

