'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { BrandThemeKey } from '../../types';
import { BRAND_THEMES, BRAND_THEME_KEYS, getTheme } from '../../constants';
import { ThemeContext } from './theme-context';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeThemeKey, setActiveThemeKey] = useState<BrandThemeKey>('blue');

  const theme = getTheme(activeThemeKey);
  const availableThemes = BRAND_THEME_KEYS.map((k) => BRAND_THEMES[k]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-hex', theme.hex);
    root.style.setProperty('--brand-hover', theme.hoverHex);
    root.style.setProperty('--brand-light', theme.lightBg);
    root.style.setProperty('--brand-border', theme.borderLight);
    root.style.setProperty('--brand-ring', `${theme.hex}45`);
    root.style.setProperty('--brand-shadow', `${theme.hex}60`);
    root.style.setProperty('--brand-glow', `${theme.hex}D9`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ activeThemeKey, theme, setActiveThemeKey, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}
