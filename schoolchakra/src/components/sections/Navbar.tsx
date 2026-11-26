import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useTheme, useUI } from '../../contexts';
import { BRAND_THEMES } from '../../constants';
import { HEADER_NAV_GROUPS, OPEN_APP_URL } from '../../data/navigation';
import { Link, useRouter } from '../../router';
import { Button } from '../ui';

function ChakraLogoMark() {
  return (
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
  );
}

export function Navbar() {
  const { activeThemeKey, theme } = useTheme();
  const { openPilotModal } = useUI();
  const { pathname } = useRouter();

  const [openDropdownState, setOpenDropdownState] = useState<{ id: string; path: string } | null>(null);
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    product: true,
    solutions: true,
    resources: false,
    company: false,
  });

  const openDropdown =
    openDropdownState && openDropdownState.path === pathname ? openDropdownState.id : null;
  const mobileOpen = mobileOpenPath === pathname;

  const setOpenDropdown = (id: string | null) => {
    setOpenDropdownState(id ? { id, path: pathname } : null);
  };

  const setMobileOpen = (open: boolean) => {
    setMobileOpenPath(open ? pathname : null);
  };

  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdownState(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownState(null);
        setMobileOpenPath(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const toggleMobileSection = (id: string) => {
    setMobileExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header ref={navRef} className="sticky top-4 z-40 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto rounded-full border border-slate-200/90 bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgb(15,23,42,0.06)] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 transition-all">
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: BRAND_THEMES[activeThemeKey].hex }}
            >
              <ChakraLogoMark />
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-sm sm:text-base">
              SchoolChakra
            </span>
          </Link>
        </div>

        {/* Desktop Grouped Navigation */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
          {HEADER_NAV_GROUPS.map((group) => {
            if (group.to && !group.items) {
              const active = pathname === group.to;
              return (
                <Link
                  key={group.id}
                  to={group.to}
                  className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    active
                      ? 'text-slate-900 font-semibold bg-slate-100/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {group.label}
                </Link>
              );
            }

            const isOpen = openDropdown === group.id;
            const hasActiveChild = group.items?.some((item) => {
              const basePath = item.to.split('#')[0] || '/';
              return basePath === pathname;
            });

            return (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : group.id)}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    isOpen || hasActiveChild
                      ? 'text-slate-900 font-semibold bg-slate-100/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-slate-700' : ''
                    }`}
                  />
                </button>

                {isOpen && group.items && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.14)] p-2 z-50 animate-fadeIn"
                  >
                    {group.items.map((item) => {
                      const basePath = item.to.split('#')[0] || '/';
                      const itemActive = basePath === pathname && !item.to.includes('#');
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          className={`block rounded-xl px-3 py-2.5 transition-colors ${
                            itemActive ? 'bg-slate-50' : 'hover:bg-slate-50/90'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="text-xs font-bold"
                              style={itemActive ? { color: theme.hex } : { color: '#0F172A' }}
                            >
                              {item.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {item.description}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={OPEN_APP_URL}
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

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[86vw] bg-white h-full shadow-2xl border-r border-slate-200 flex flex-col animate-slideIn">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.hex }}
                >
                  <ChakraLogoMark />
                </div>
                <span className="font-bold text-slate-900 text-sm">SchoolChakra</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
              {HEADER_NAV_GROUPS.map((group) => {
                if (group.to && !group.items) {
                  return (
                    <Link
                      key={group.id}
                      to={group.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50"
                    >
                      {group.label}
                    </Link>
                  );
                }

                const expanded = Boolean(mobileExpanded[group.id]);
                return (
                  <div key={group.id} className="rounded-xl border border-slate-200/70 bg-slate-50/50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(group.id)}
                      aria-expanded={expanded}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-900 cursor-pointer"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          expanded ? 'rotate-180 text-slate-700' : ''
                        }`}
                      />
                    </button>
                    {expanded && group.items && (
                      <div className="border-t border-slate-200/70 bg-white py-1.5 px-2 space-y-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className="block px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200 space-y-2.5 bg-slate-50/60">
              <Button
                fullWidth
                size="md"
                onClick={() => {
                  setMobileOpen(false);
                  openPilotModal();
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                style={{ backgroundColor: theme.hex }}
              >
                Apply for Founding Pilot
              </Button>
              <a
                href={OPEN_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5"
              >
                Open App
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
