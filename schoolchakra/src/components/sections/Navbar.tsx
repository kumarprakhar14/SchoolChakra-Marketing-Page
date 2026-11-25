import { ArrowRight } from 'lucide-react';
import { useTheme, useUI } from '../../contexts';
import { Button } from '../ui';
import { BRAND_THEMES } from '../../constants';

const NAV_ITEMS = [
  { label: 'For Every Role', href: '#roles' },
  { label: 'Day-One Workflows', href: '#bento' },
  { label: 'Security & Data', href: '#architecture' },
  { label: 'Pilot Cohort', href: '#pilot' },
];

export function Navbar() {
  const { activeThemeKey } = useTheme();
  const { openPilotModal } = useUI();

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto rounded-full border border-slate-200/90 bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgb(15,23,42,0.06)] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 transition-all">
        <a href="#top" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
            style={{ backgroundColor: BRAND_THEMES[activeThemeKey].hex }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2.5" />
              <line x1="12" y1="4" x2="12" y2="9.5" />
              <line x1="12" y1="14.5" x2="12" y2="20" />
              <line x1="4" y1="12" x2="9.5" y2="12" />
              <line x1="14.5" y1="12" x2="20" y2="12" />
              <line x1="6.34" y1="6.34" x2="10.2" y2="10.2" />
              <line x1="13.8" y1="13.8" x2="17.66" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="13.8" y2="10.2" />
              <line x1="10.2" y1="13.8" x2="6.34" y2="17.66" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold tracking-tight text-slate-900 text-sm sm:text-base">SchoolChakra</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://erp.kumarprakhar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors hidden sm:inline-block"
          >
            Open App
          </a>
          <Button
            onClick={openPilotModal}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            size="sm"
            className="px-2.5 sm:px-3"
            style={{ backgroundColor: BRAND_THEMES[activeThemeKey].hex }}
          >
            Apply for Pilot
          </Button>
        </div>
      </div>
    </header>
  );
}