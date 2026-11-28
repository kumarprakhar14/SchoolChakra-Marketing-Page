'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { Link } from '../../router';
import { useTheme } from '../../contexts';
import {
  HELP_CATEGORIES,
  searchHelpArticles,
  type HelpCategorySlug,
} from '../../data/help-center';
import { Badge } from '../ui';
import { CATEGORY_ICONS } from './HelpIcons';

const SUGGESTED_QUERIES = [
  'How do I mark attendance?',
  'Where can I see pending fees?',
  'How do I submit an assignment?',
  'Pay via UPI',
  'Import students',
];

function highlightMatches(text: string, tokens: string[]): ReactNode {
  if (tokens.length === 0) return text;
  const escaped = tokens
    .filter((t) => t.length >= 2)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (escaped.length === 0) return text;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    regex.test(part) ? (
      <mark
        key={idx}
        className="bg-amber-100/80 text-slate-900 rounded-xs px-0.5 font-semibold"
      >
        {part}
      </mark>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

interface HelpSearchBarProps {
  initialCategory?: HelpCategorySlug | 'all';
  compact?: boolean;
  placeholder?: string;
}

export function HelpSearchBar({
  initialCategory = 'all',
  compact = false,
  placeholder = 'Search by task, module, or question (e.g., How do I mark attendance?)',
}: HelpSearchBarProps) {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<HelpCategorySlug | 'all'>(initialCategory);

  const hasQuery = query.trim().length > 0;

  const results = useMemo(() => {
    if (!hasQuery) return [];
    return searchHelpArticles(query, selectedRole);
  }, [hasQuery, query, selectedRole]);

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search SchoolChakra Help Center"
          className={`w-full pl-11 sm:pl-12 pr-10 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
            compact ? 'py-2.5 text-xs sm:text-sm' : 'py-3.5 sm:py-4 text-sm sm:text-base'
          }`}
          style={{
            boxShadow: hasQuery ? '0 10px 30px -12px rgba(15, 23, 42, 0.12)' : undefined,
          }}
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role Filter Pills */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => setSelectedRole('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
            selectedRole === 'all'
              ? 'text-white border-transparent'
              : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
          }`}
          style={selectedRole === 'all' ? { backgroundColor: theme.hex } : undefined}
        >
          All Guides
        </button>
        {HELP_CATEGORIES.map((cat) => {
          const active = selectedRole === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedRole(cat.slug)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                active
                  ? 'text-white border-transparent'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
              }`}
              style={active ? { backgroundColor: theme.hex } : undefined}
            >
              {cat.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Popular Questions Quick Chips (only when search is empty and not compact) */}
      {!hasQuery && !compact && (
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">Try:</span>
          {SUGGESTED_QUERIES.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setQuery(sample)}
              className="px-2.5 py-1 rounded-lg bg-slate-100/90 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Panel */}
      {hasQuery && (
        <div
          className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.14)] overflow-hidden text-left animate-fadeIn"
          role="region"
          aria-live="polite"
          aria-label="Search results"
        >
          <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <span>
              {results.length === 0
                ? 'No matching articles'
                : `${results.length} ${results.length === 1 ? 'article' : 'articles'} found`}
              {selectedRole !== 'all' &&
                ` in ${HELP_CATEGORIES.find((c) => c.slug === selectedRole)?.shortTitle}`}
            </span>
            {selectedRole !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedRole('all')}
                className="font-semibold hover:underline cursor-pointer"
                style={{ color: theme.hex }}
              >
                Search all roles
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <p className="text-sm font-semibold text-slate-900">
                No guides matched &ldquo;{query.trim()}&rdquo;.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Try simpler keywords like <strong>attendance</strong>, <strong>fees</strong>,{' '}
                <strong>UPI</strong>, <strong>assignment</strong>, or <strong>timetable</strong>.
              </p>
              {selectedRole !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedRole('all')}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer"
                >
                  Search across all roles
                </button>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto custom-scrollbar">
              {results.slice(0, 10).map(({ article, categoryMeta, matchedTokens }) => {
                const Icon = CATEGORY_ICONS[categoryMeta.slug];
                return (
                  <li key={`${article.category}-${article.slug}`}>
                    <Link
                      to={`/help/${article.category}/${article.slug}`}
                      className="flex items-start justify-between gap-4 px-4 sm:px-5 py-3.5 hover:bg-slate-50/90 transition-colors group"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="theme" size="xs" leftIcon={<Icon className="w-3 h-3" />}>
                            {categoryMeta.shortTitle}
                          </Badge>
                          <span className="text-[11px] font-mono text-slate-400">
                            {article.group}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {highlightMatches(article.title, matchedTokens)}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                          {highlightMatches(article.summary, matchedTokens)}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
