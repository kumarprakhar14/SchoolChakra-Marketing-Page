import { History, MessageSquarePlus } from 'lucide-react';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import { CHANGELOG_ENTRIES, type ChangeType } from '../data/changelog';
import { Badge, Button, Card } from '../components/ui';
import {
  CTASection,
  PageHero,
  PlaceholderNotice,
  SectionHeader,
} from '../components/shared';

const BADGE_VARIANT: Record<ChangeType, 'success' | 'info' | 'warning'> = {
  New: 'success',
  Improved: 'info',
  Fixed: 'warning',
};

export function ChangelogPage() {
  usePageMeta({
    title: 'Changelog & Product Updates — SchoolChakra',
    description:
      'Follow verified SchoolChakra product improvements, new capabilities, and refinements.',
    canonicalPath: '/changelog',
  });

  return (
    <>
      <PageHero
        eyebrow="PRODUCT UPDATES"
        eyebrowIcon={<History className="w-3.5 h-3.5" />}
        title={
          <>
            What&rsquo;s new in{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              SchoolChakra.
            </span>
          </>
        }
        description="Follow product improvements, new capabilities and refinements as SchoolChakra continues to evolve."
      />

      {/* Section 1: Release Timeline */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <SectionHeader
              eyebrow="RELEASE TIMELINE"
              title="Public release history"
              className="mb-0"
            />
            <div className="flex items-center gap-1.5">
              <Badge variant="success" size="xs">New</Badge>
              <Badge variant="info" size="xs">Improved</Badge>
              <Badge variant="warning" size="xs">Fixed</Badge>
            </div>
          </div>

          {CHANGELOG_ENTRIES.length === 0 ? (
            <PlaceholderNotice
              label="No public releases published yet"
              title="Release updates will appear here"
              message="No public release updates are available yet. Check back here for future product announcements as SchoolChakra publishes verified release notes."
              ctaLabel="Ask about recent updates"
              ctaTo="/contact"
            />
          ) : (
            <div className="space-y-6">
              {CHANGELOG_ENTRIES.map((entry) => (
                <Card key={entry.id} className="bg-white p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      {entry.version && (
                        <Badge variant="theme" size="xs">{entry.version}</Badge>
                      )}
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        {entry.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{entry.date}</span>
                  </div>
                  {entry.summary && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-3">{entry.summary}</p>
                  )}
                  <ul className="mt-4 space-y-2.5">
                    {entry.changes.map((chg, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Badge variant={BADGE_VARIANT[chg.type]} size="xs" className="mt-0.5 shrink-0">
                          {chg.type}
                        </Badge>
                        <span>{chg.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Product Feedback */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-50/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                <MessageSquarePlus className="w-4 h-4" />
                <span>PRODUCT FEEDBACK</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Share feedback directly from your school workspace
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Signed-in users can report bugs or share product issues directly through the application&rsquo;s built-in <strong>Report an Issue</strong> functionality. Prospective schools can reach our team through the Contact page.
              </p>
            </div>
            <Link to="/contact" className="shrink-0">
              <Button variant="outline" size="md">Contact Team</Button>
            </Link>
          </Card>
        </div>
      </section>

      <CTASection
        eyebrow="ACTIVE DEVELOPMENT"
        title="See what SchoolChakra offers today."
        description="Explore the interactive demo or review our full set of school management modules."
        primaryLabel="Explore Features"
        primaryAction={{ to: '/features' }}
        secondaryLabel="Try Interactive Demo"
        secondaryTo="/demo"
        surface="slate"
      />
    </>
  );
}
