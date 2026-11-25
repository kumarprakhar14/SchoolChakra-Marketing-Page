import { useEffect, useRef, useState } from 'react';
import type { RotatingWordItem } from '../../types';
import {
  HERO_ROTATING_WORDS,
  HERO_ROTATION_INTERVAL_MS,
  HERO_TRANSITION_DURATION_MS,
  resolveRotatingWordTheme,
} from '../../constants/hero';
import './HeroRotatingPill.css';

export interface HeroRotatingPillProps {
  className?: string;
  words?: readonly RotatingWordItem[];
  intervalMs?: number;
  transitionDurationMs?: number;
}

export function HeroRotatingPill({
  className = '',
  words = HERO_ROTATING_WORDS,
  intervalMs = HERO_ROTATION_INTERVAL_MS,
  transitionDurationMs = HERO_TRANSITION_DURATION_MS,
}: HeroRotatingPillProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [wordWidths, setWordWidths] = useState<number[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Listen to prefers-reduced-motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Measure word widths dynamically across responsive breakpoints and font loading
  useEffect(() => {
    const measure = () => {
      const widths = words.map((_, i) => {
        const el = measureRefs.current[i];
        return el ? Math.ceil(el.getBoundingClientRect().width) : 0;
      });
      setWordWidths(widths);
    };

    measure();

    // Re-measure once web fonts (Plus Jakarta Sans) are fully loaded
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(measure);
    }

    const handleResize = () => {
      requestAnimationFrame(measure);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [words]);

  // Handle automatic rotation cycle
  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        return; // Pause cycling when tab is inactive to prevent catch-up jumps
      }

      setCurrentIndex((curr) => {
        const next = (curr + 1) % words.length;
        setPrevIndex(curr);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  // Clear previous word state once the slide transition completes
  useEffect(() => {
    if (prevIndex === null) return;
    const timeout = setTimeout(() => {
      setPrevIndex(null);
    }, transitionDurationMs);
    return () => clearTimeout(timeout);
  }, [prevIndex, transitionDurationMs]);

  const currentItem = words[currentIndex] || words[0];
  const currentTheme = resolveRotatingWordTheme(currentItem.color);

  const prevItem = prevIndex !== null ? words[prevIndex] : null;
  const prevTheme = prevItem ? resolveRotatingWordTheme(prevItem.color) : null;

  const currentWidth = wordWidths[currentIndex];

  return (
    <span
      className={`inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-0.5 sm:py-1 rounded-full border align-middle text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight shadow-2xs transition-colors duration-500 ease-out select-none ${className}`.trim()}
      style={{
        backgroundColor: currentTheme.lightBg,
        borderColor: currentTheme.borderLight,
        color: currentTheme.hex,
      }}
    >
      {/* Visual circular dot indicator */}
      <span
        className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full inline-block shrink-0 transition-colors duration-500 ease-out"
        style={{ backgroundColor: currentTheme.hex }}
        aria-hidden="true"
      />

      {/* Rotating word slot with smooth width expansion/contraction and comfortable safety clearance */}
      <span
        className="relative inline-flex items-center justify-center overflow-hidden h-[1.32em] px-1"
        style={{
          width: currentWidth ? `${currentWidth + 10}px` : 'auto',
          transition: prefersReducedMotion
            ? 'none'
            : `width ${transitionDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {/* Outgoing word */}
        {prevItem && (
          <span
            key={`prev-${prevIndex}`}
            className="hero-word-slide-out absolute inset-0 flex items-center justify-center whitespace-nowrap px-1"
            style={{ color: prevTheme?.hex }}
            aria-hidden="true"
          >
            {prevItem.text}
          </span>
        )}

        {/* Incoming / Active word */}
        <span
          key={`curr-${currentIndex}`}
          className={`flex items-center justify-center whitespace-nowrap px-1 ${
            prevItem ? 'hero-word-slide-in absolute inset-0' : 'relative'
          }`}
          style={{ color: currentTheme.hex }}
        >
          {currentItem.text}
        </span>
      </span>

      {/* Invisible measurement elements: using flex-col items-start w-max so words are never compressed horizontally */}
      <span
        className="absolute top-0 left-0 -z-50 invisible pointer-events-none select-none font-bold tracking-tight text-3xl sm:text-5xl lg:text-[52px] flex flex-col items-start w-max max-w-none"
        aria-hidden="true"
      >
        {words.map((w, i) => (
          <span
            key={i}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className="whitespace-nowrap px-1 shrink-0"
          >
            {w.text}
          </span>
        ))}
      </span>
    </span>
  );
}

export default HeroRotatingPill;
