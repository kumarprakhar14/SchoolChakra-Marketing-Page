'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts';

export interface TocHeading {
  id: string;
  label: string;
  level: 2 | 3;
}

interface HelpTableOfContentsProps {
  headings: TocHeading[];
}

export function HelpTableOfContents({ headings }: HelpTableOfContentsProps) {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-96px 0px -65% 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside
      aria-label="On this page"
      className="hidden xl:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar pl-2"
    >
      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
        On This Page
      </p>
      <nav aria-label="Table of contents">
        <ul className="space-y-1.5 border-l border-slate-200">
          {headings.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`block text-xs leading-snug py-1 transition-colors border-l-2 -ml-px ${
                    item.level === 3 ? 'pl-5' : 'pl-3'
                  } ${
                    isActive
                      ? 'font-semibold text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                  style={isActive ? { borderLeftColor: theme.hex, color: theme.hex } : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
