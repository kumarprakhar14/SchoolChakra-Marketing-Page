import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  Lock,
  MapPin,
} from 'lucide-react';
import { Link } from '../../router';
import {
  getAdjacentArticles,
  getArticle,
  getCategoryMeta,
  type CalloutNote,
  type HelpArticle,
} from '../../data/help-center';
import { Badge } from '../ui';
import { HelpTableOfContents, type TocHeading } from './HelpTableOfContents';

function slugifyId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function CalloutBlock({ note }: { note: CalloutNote }) {
  const styles = {
    info: {
      container: 'bg-slate-50 border-slate-200',
      iconColor: 'text-blue-600',
      Icon: Info,
      label: 'Note',
    },
    warning: {
      container: 'bg-amber-50/70 border-amber-200/90',
      iconColor: 'text-amber-700',
      Icon: AlertTriangle,
      label: 'Important',
    },
    restriction: {
      container: 'bg-rose-50/60 border-rose-200/90',
      iconColor: 'text-rose-700',
      Icon: Lock,
      label: 'Access & Rule',
    },
  }[note.type];

  const Icon = styles.Icon;

  return (
    <div
      role="note"
      className={`rounded-xl border p-4 flex items-start gap-3 ${styles.container}`}
    >
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${styles.iconColor}`} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            {styles.label}
          </span>
          <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{note.body}</p>
      </div>
    </div>
  );
}

function buildArticleToc(article: HelpArticle): TocHeading[] {
  const headings: TocHeading[] = [
    { id: 'understanding-feature', label: 'Understanding the Feature', level: 2 },
    { id: 'interface-overview', label: 'Interface Overview', level: 2 },
    { id: 'step-by-step-instructions', label: 'Step-by-Step Instructions', level: 2 },
  ];

  article.instructions.forEach((section, idx) => {
    if (section.groupTitle) {
      headings.push({
        id: `steps-${slugifyId(section.groupTitle) || idx}`,
        label: section.groupTitle,
        level: 3,
      });
    }
  });

  if (article.notes && article.notes.length > 0) {
    headings.push({ id: 'important-notes', label: 'Important Notes & Warnings', level: 2 });
  }

  headings.push({ id: 'expected-outcome', label: 'Expected Outcome', level: 2 });

  if (article.relatedSlugs && article.relatedSlugs.length > 0) {
    headings.push({ id: 'related-articles', label: 'Related Articles', level: 2 });
  }

  return headings;
}

export function HelpArticleRenderer({ article }: { article: HelpArticle }) {
  const categoryMeta = getCategoryMeta(article.category);
  const { prev, next } = getAdjacentArticles(article.category, article.slug);
  const tocHeadings = buildArticleToc(article);

  const resolvedRelated = (article.relatedSlugs || [])
    .map((ref) => {
      const target = getArticle(ref.category, ref.slug);
      const targetCat = getCategoryMeta(ref.category);
      if (!target || !targetCat) return null;
      return { target, targetCat, reason: ref.reason };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] gap-10 items-start">
      <article className="min-w-0 max-w-3xl">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-5">
          <Link to="/help" className="hover:text-slate-900 transition-colors">
            Help Center
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {categoryMeta && (
            <>
              <Link
                to={`/help/${categoryMeta.slug}`}
                className="hover:text-slate-900 transition-colors"
              >
                {categoryMeta.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </>
          )}
          <span className="text-slate-800 font-medium truncate">{article.title}</span>
        </nav>

        {/* A. Article Introduction */}
        <header className="pb-6 border-b border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {article.audience.map((role) => (
              <Badge key={role} variant="theme" size="xs">
                {role}
              </Badge>
            ))}
            <span className="text-[11px] font-mono text-slate-500">{article.group}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {article.summary}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>
              <strong className="font-semibold text-slate-900">Where to find it:</strong>{' '}
              {article.accessPath}
            </span>
          </div>

          {article.prerequisites && article.prerequisites.length > 0 && (
            <div className="mt-4 rounded-xl bg-slate-50/90 border border-slate-200/80 p-3.5">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Before You Start
              </p>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-disc pl-4">
                {article.prerequisites.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* B. Understanding the Feature */}
        <section id="understanding-feature" className="scroll-mt-24 py-7 border-b border-slate-200/70">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Understanding the Feature
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-3 leading-relaxed">
            {article.understanding.whatItIs}
          </p>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            {article.understanding.whyYouNeedIt}
          </p>

          <div className="mt-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
              What You Can Do Here
            </p>
            <ul className="space-y-2">
              {article.understanding.whatItProvides.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-1"
                    style={{ color: 'var(--brand-hex, #2563EB)' }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* C. Interface Overview */}
        <section id="interface-overview" className="scroll-mt-24 py-7 border-b border-slate-200/70">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Interface Overview</h2>
          {article.interfaceOverview.intro && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {article.interfaceOverview.intro}
            </p>
          )}

          {/* Verified Annotated Screenshots Slot (renders only when real screenshots exist) */}
          {article.interfaceOverview.screenshots &&
            article.interfaceOverview.screenshots.length > 0 && (
              <div className="mt-5 space-y-5">
                {article.interfaceOverview.screenshots.map((shot) => (
                  <figure
                    key={shot.src}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 overflow-hidden"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="w-full h-auto block border-b border-slate-200"
                    />
                    {(shot.caption || (shot.annotations && shot.annotations.length > 0)) && (
                      <figcaption className="p-4 space-y-2">
                        {shot.caption && (
                          <p className="text-xs font-medium text-slate-600">{shot.caption}</p>
                        )}
                        {shot.annotations && shot.annotations.length > 0 && (
                          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {shot.annotations.map((ann) => (
                              <li key={ann.number} className="flex items-start gap-2 text-xs text-slate-700">
                                <span
                                  className="w-5 h-5 rounded-full text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                                  style={{ backgroundColor: 'var(--brand-hex, #2563EB)' }}
                                >
                                  {ann.number}
                                </span>
                                <span>
                                  <strong className="text-slate-900">{ann.label}:</strong> {ann.detail}
                                </span>
                              </li>
                            ))}
                          </ol>
                        )}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="divide-y divide-slate-100">
              {article.interfaceOverview.elements.map((el) => (
                <div
                  key={el.name}
                  className="p-3.5 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4"
                >
                  <div className="sm:w-56 shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{el.name}</span>
                    <span className="ml-2 inline-block text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {el.kind}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{el.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* D. Step-by-Step Instructions */}
        <section id="step-by-step-instructions" className="scroll-mt-24 py-7 border-b border-slate-200/70">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Step-by-Step Instructions
          </h2>

          <div className="mt-5 space-y-8">
            {article.instructions.map((group, gIdx) => {
              const groupId = group.groupTitle
                ? `steps-${slugifyId(group.groupTitle) || gIdx}`
                : undefined;

              return (
                <div key={group.groupTitle || gIdx}>
                  {group.groupTitle && (
                    <h3
                      id={groupId}
                      className="scroll-mt-24 text-base font-bold text-slate-900 mb-4"
                    >
                      {group.groupTitle}
                    </h3>
                  )}

                  <ol className="space-y-4">
                    {group.steps.map((step, sIdx) => (
                      <li
                        key={`${step.title}-${sIdx}`}
                        className="relative pl-10 pb-4 last:pb-0 border-l border-slate-200 ml-3.5 last:border-l-transparent"
                      >
                        <span
                          className="absolute -left-3.5 top-0 w-7 h-7 rounded-full text-white font-mono text-xs font-bold flex items-center justify-center shadow-2xs"
                          style={{ backgroundColor: 'var(--brand-hex, #2563EB)' }}
                        >
                          {sIdx + 1}
                        </span>

                        <div className="pt-0.5">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            Step {sIdx + 1} — {step.title}
                          </h4>

                          {step.location && (
                            <p className="text-xs font-mono text-slate-500 mt-1">
                              Location: {step.location}
                            </p>
                          )}

                          <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">
                            {step.instruction}
                          </p>

                          {step.requiredInfo && (
                            <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2">
                              <strong className="font-semibold text-slate-800">Required:</strong>{' '}
                              {step.requiredInfo}
                            </p>
                          )}

                          {step.expectedResult && (
                            <p className="text-xs sm:text-sm text-emerald-800 mt-2 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>
                                <strong>Result:</strong> {step.expectedResult}
                              </span>
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* E. Important Notes & Warnings */}
        {article.notes && article.notes.length > 0 && (
          <section id="important-notes" className="scroll-mt-24 py-7 border-b border-slate-200/70">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Important Notes &amp; Warnings
            </h2>
            <div className="space-y-3">
              {article.notes.map((note) => (
                <CalloutBlock key={note.title} note={note} />
              ))}
            </div>
          </section>
        )}

        {/* F. Expected Outcome */}
        <section id="expected-outcome" className="scroll-mt-24 py-7 border-b border-slate-200/70">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Expected Outcome</h2>
          <div className="mt-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 p-4 space-y-1.5">
            <p className="text-sm text-slate-800 leading-relaxed">
              {article.expectedOutcome.summary}
            </p>
            <p className="text-xs sm:text-sm text-emerald-900 font-medium">
              <strong>How to verify:</strong> {article.expectedOutcome.verifyAt}
            </p>
          </div>
        </section>

        {/* G. Related Articles */}
        {resolvedRelated.length > 0 && (
          <section id="related-articles" className="scroll-mt-24 py-7 border-b border-slate-200/70">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3.5">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resolvedRelated.map(({ target, targetCat, reason }) => (
                <Link
                  key={`${target.category}-${target.slug}`}
                  to={`/help/${target.category}/${target.slug}`}
                  className="rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs p-4 transition-all group"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {targetCat.shortTitle}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 mt-0.5 leading-snug">
                    {target.title}
                  </h3>
                  {reason && <p className="text-xs text-slate-600 mt-1">{reason}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* H. Article Navigation */}
        <nav aria-label="Article navigation" className="pt-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                to={`/help/${prev.category}/${prev.slug}`}
                className="rounded-xl border border-slate-200 bg-white hover:border-slate-300 p-4 transition-colors group"
              >
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <ArrowLeft className="w-3 h-3" />
                  Previous Article
                </span>
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 mt-1 leading-snug">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                to={`/help/${next.category}/${next.slug}`}
                className="rounded-xl border border-slate-200 bg-white hover:border-slate-300 p-4 text-left sm:text-right transition-colors group"
              >
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  Next Article
                  <ArrowRight className="w-3 h-3" />
                </span>
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 mt-1 leading-snug">
                  {next.title}
                </div>
              </Link>
            )}
          </div>

          {categoryMeta && (
            <div className="pt-2">
              <Link
                to={`/help/${categoryMeta.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to {categoryMeta.title}</span>
              </Link>
            </div>
          )}
        </nav>
      </article>

      {/* Right Sidebar: On This Page */}
      <HelpTableOfContents headings={tocHeadings} />
    </div>
  );
}
