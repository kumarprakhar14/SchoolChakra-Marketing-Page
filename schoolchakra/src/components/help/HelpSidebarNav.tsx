'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Home, Menu, X } from 'lucide-react';
import { Link } from '../../router';
import { useTheme } from '../../contexts';
import {
  HELP_CATEGORIES,
  getArticlesByCategory,
  getCategoryMeta,
  type HelpCategorySlug,
} from '../../data/help-center';
import { CATEGORY_ICONS } from './HelpIcons';

interface HelpSidebarNavProps {
  currentCategory: HelpCategorySlug;
  currentSlug?: string;
}

export function HelpSidebarNav({ currentCategory, currentSlug }: HelpSidebarNavProps) {
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const categoryMeta = getCategoryMeta(currentCategory);
  const categoryArticles = getArticlesByCategory(currentCategory);

  const initialGroups: Record<string, boolean> = {};
  if (categoryMeta) {
    for (const g of categoryMeta.groups) {
      initialGroups[g] = true;
    }
  }
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(initialGroups);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const navContent = (
    <div className="space-y-5">
      {/* Back to Help Center */}
      <div>
        <Link
          to="/help"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>All Help Center Guides</span>
        </Link>
      </div>

      {/* Role Switcher List */}
      <div>
        <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
          Browse by Guide
        </p>
        <div className="space-y-1">
          {HELP_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug];
            const active = cat.slug === currentCategory;
            return (
              <Link
                key={cat.slug}
                to={`/help/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                    style={active ? { color: theme.hex } : undefined}
                  />
                  <span className="truncate">{cat.shortTitle}</span>
                </span>
                {active && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Current Role Article Tree */}
      {categoryMeta && (
        <div className="pt-4 border-t border-slate-200/80">
          <Link
            to={`/help/${categoryMeta.slug}`}
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 hover:underline"
          >
            {categoryMeta.title}
          </Link>

          <div className="space-y-3">
            {categoryMeta.groups.map((groupName) => {
              const articlesInGroup = categoryArticles.filter((a) => a.group === groupName);
              if (articlesInGroup.length === 0) return null;
              const isOpen = expandedGroups[groupName] ?? true;

              return (
                <div key={groupName}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(groupName)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 py-1 cursor-pointer"
                  >
                    <span>{groupName}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                        isOpen ? '' : '-rotate-90'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <ul className="mt-1 space-y-0.5 border-l border-slate-200 ml-1.5 pl-2.5">
                      {articlesInGroup.map((item) => {
                        const isActiveArticle = item.slug === currentSlug;
                        return (
                          <li key={item.slug}>
                            <Link
                              to={`/help/${item.category}/${item.slug}`}
                              onClick={() => setMobileOpen(false)}
                              aria-current={isActiveArticle ? 'page' : undefined}
                              className={`block px-2.5 py-1.5 rounded-lg text-xs leading-snug transition-colors ${
                                isActiveArticle
                                  ? 'font-bold bg-slate-100/90 text-slate-900 border-l-2 -ml-[11px] pl-[19px]'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                              style={
                                isActiveArticle ? { borderLeftColor: theme.hex, color: theme.hex } : undefined
                              }
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile / Tablet Navigation Bar */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Menu className="w-4 h-4 text-slate-500" />
            <span>
              Browse {categoryMeta?.title || 'Help Guides'} ({categoryArticles.length} articles)
            </span>
          </span>
          {mobileOpen ? <X className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {mobileOpen && (
          <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg animate-fadeIn">
            {navContent}
          </div>
        )}
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside
        aria-label="Documentation navigation"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar pr-3"
      >
        {navContent}
      </aside>
    </>
  );
}
