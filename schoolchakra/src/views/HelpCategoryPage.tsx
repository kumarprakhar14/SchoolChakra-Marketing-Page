import { ArrowRight, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { Link } from '../router';
import {
  HELP_CATEGORIES,
  getArticlesByCategory,
  type HelpCategoryMeta,
} from '../data/help-center';
import { Badge } from '../components/ui';
import { CATEGORY_ICONS } from '../components/help/HelpIcons';
import { HelpSearchBar } from '../components/help/HelpSearchBar';
import { HelpSidebarNav } from '../components/help/HelpSidebarNav';

interface HelpCategoryPageProps {
  category: HelpCategoryMeta;
}

export function HelpCategoryPage({ category }: HelpCategoryPageProps) {
  const Icon = CATEGORY_ICONS[category.slug];
  const articles = getArticlesByCategory(category.slug);
  const otherCategories = HELP_CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <section className="relative z-10 w-full py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          <HelpSidebarNav currentCategory={category.slug} />

          <div className="min-w-0 max-w-4xl">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-5"
            >
              <Link to="/help" className="hover:text-slate-900 transition-colors">
                Help Center
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-medium">{category.title}</span>
            </nav>

            {/* Role Header */}
            <div className="pb-7 border-b border-slate-200/80">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: 'var(--brand-light, #EFF6FF)',
                    borderColor: 'var(--brand-border, #BFDBFE)',
                    color: 'var(--brand-hex, #2563EB)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <Badge variant="theme" size="xs">
                  {category.roleLabel}
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {category.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed max-w-2xl">
                {category.description}
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
                {category.overviewIntro}
              </p>

              {category.gettingStartedNote && (
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs sm:text-sm text-slate-700 max-w-2xl">
                  <strong className="font-semibold text-slate-900">Tip:</strong>{' '}
                  {category.gettingStartedNote}
                </div>
              )}

              <div className="mt-6 max-w-2xl">
                <HelpSearchBar
                  initialCategory={category.slug}
                  compact
                  placeholder={`Search inside ${category.title} or switch to All Guides...`}
                />
              </div>
            </div>

            {/* Popular Tasks */}
            {category.popularTasks.length > 0 && (
              <div className="py-6 border-b border-slate-200/70">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Popular Tasks</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.popularTasks.map((task) => (
                    <Link
                      key={task.slug}
                      to={`/help/${category.slug}/${task.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-semibold text-slate-800 hover:text-blue-700 transition-colors"
                    >
                      <span>{task.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Grouped Modules & Articles */}
            <div className="py-7 space-y-9">
              {category.groups.map((groupName) => {
                const groupArticles = articles.filter((a) => a.group === groupName);
                if (groupArticles.length === 0) return null;

                return (
                  <div key={groupName}>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                      {groupName}
                    </h2>

                    <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                      {groupArticles.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/help/${article.category}/${article.slug}`}
                          className="flex items-start justify-between gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-colors group"
                        >
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                              {article.summary}
                            </p>
                            <p className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mt-2">
                              <MapPin className="w-3 h-3" />
                              <span>{article.accessPath}</span>
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Other Role Guides */}
            <div className="pt-6 border-t border-slate-200/80">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Explore Other Guides
              </p>
              <div className="flex flex-wrap gap-2">
                {otherCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/help/${cat.slug}`}
                    className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
