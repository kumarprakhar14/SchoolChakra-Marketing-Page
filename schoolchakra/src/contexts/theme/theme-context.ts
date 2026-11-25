import { createContext, useContext } from 'react';
import type { BrandTheme, BrandThemeKey } from '../../types';

export interface ThemeContextValue {
  activeThemeKey: BrandThemeKey;
  theme: BrandTheme;
  setActiveThemeKey: (key: BrandThemeKey) => void;
  availableThemes: BrandTheme[];
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
