import type { BrandTheme, BrandThemeKey } from '../types';

export const BRAND_THEMES: Record<string, BrandTheme> = {
  blue: {
    id: 'blue',
    name: 'Cobalt Blue',
    hex: '#2563EB',
    hoverHex: '#1D4ED8',
    lightBg: '#EFF6FF',
    borderLight: '#BFDBFE',
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-600',
    bgSoftClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    ringClass: 'ring-blue-600',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    hex: '#059669',
    hoverHex: '#047857',
    lightBg: '#ECFDF5',
    borderLight: '#A7F3D0',
    textClass: 'text-emerald-600',
    bgClass: 'bg-emerald-600',
    bgSoftClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    ringClass: 'ring-emerald-600',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    hex: '#7C3AED',
    hoverHex: '#6D28D9',
    lightBg: '#F5F3FF',
    borderLight: '#DDD6FE',
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-600',
    bgSoftClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
    ringClass: 'ring-violet-600',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  crimson: {
    id: 'crimson',
    name: 'Heritage Crimson',
    hex: '#E11D48',
    hoverHex: '#BE123C',
    lightBg: '#FFF1F2',
    borderLight: '#FECDD3',
    textClass: 'text-rose-600',
    bgClass: 'bg-rose-600',
    bgSoftClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    ringClass: 'ring-rose-600',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
} as const;

export type { BrandThemeKey };
export const BRAND_THEME_KEYS = Object.keys(BRAND_THEMES) as BrandThemeKey[];

export function getTheme(key: string): BrandTheme {
  return BRAND_THEMES[key] || BRAND_THEMES.blue;
}