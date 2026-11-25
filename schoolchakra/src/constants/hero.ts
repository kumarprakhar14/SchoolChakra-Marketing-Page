import type { BrandTheme, BrandThemeKey, RotatingWordItem } from '../types';
import { BRAND_THEMES } from './brand';

/**
 * Configuration source for the Hero rotating words.
 *
 * Sequence & assigned accent colors:
 * 1. Unified   — purple (Royal Violet: #7C3AED)
 * 2. Connected — blue   (Cobalt Blue:   #2563EB)
 * 3. Organized — green  (Emerald Green: #059669)
 * 4. Managed   — pink   (Heritage Crimson / Pink: #E11D48)
 *
 * To adjust wording, ordering, or color assignments, modify this array directly.
 */
export const HERO_ROTATING_WORDS: readonly RotatingWordItem[] = [
  { text: 'Connected', color: 'blue' },
  { text: 'Organized', color: 'green' },
  { text: 'Unified', color: 'purple' },
  { text: 'Managed', color: 'pink' },
] as const;

/**
 * Timing constants for the rotating-word animation:
 * - Interval: 2800ms per word (2.8 seconds)
 * - Transition: 450ms smooth slide & fade
 */
export const HERO_ROTATION_INTERVAL_MS = 2800;
export const HERO_TRANSITION_DURATION_MS = 450;

/**
 * Resolves a rotating word color key to the established BrandTheme tokens.
 * Only reuses existing four brand colors (blue, emerald/green, violet/purple, crimson/pink).
 */
export function resolveRotatingWordTheme(color: RotatingWordItem['color']): BrandTheme {
  const normalized = color.toLowerCase();
  switch (normalized) {
    case 'blue':
      return BRAND_THEMES.blue;
    case 'purple':
    case 'violet':
      return BRAND_THEMES.violet;
    case 'green':
    case 'emerald':
      return BRAND_THEMES.emerald;
    case 'pink':
    case 'crimson':
    case 'rose':
      return BRAND_THEMES.crimson;
    default:
      return BRAND_THEMES[color as BrandThemeKey] || BRAND_THEMES.blue;
  }
}
