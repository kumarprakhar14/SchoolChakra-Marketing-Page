import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '../router';
import { Button } from '../components/ui';
import { CTASection, PageHero } from '../components/shared';
import { ResourceCatalog } from '../components/resources/ResourceCatalog';

export function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="EDUCATIONAL RESOURCES"
        eyebrowIcon={<BookOpen className="w-3.5 h-3.5" />}
        title={
          <>
            Practical insights for better{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              school operations.
            </span>
          </>
        }
        description="Guides, ideas and useful resources to help schools simplify administration and embrace digital workflows."
      />

      {/* Section 1 & 2: Categories + Topic Listing */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <ResourceCatalog />

          {/* Available Documentation Links */}
          <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                AVAILABLE TODAY
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                Ready to review practical setup and role guides now?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Our Getting Started checklist and Help Center cover onboarding preparation and role workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Link to="/getting-started">
                <Button variant="outline" size="sm">Getting Started</Button>
              </Link>
              <Link to="/help">
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Help Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="SCHOOLCHAKRA PLATFORM"
        title="Looking for a better way to manage your school?"
        description="Explore all SchoolChakra modules or request a private walkthrough for your leadership team."
        primaryLabel="Explore Features"
        primaryAction={{ to: '/features' }}
        secondaryLabel="Try Interactive Demo"
        secondaryTo="/demo"
        surface="white"
      />
    </>
  );
}
