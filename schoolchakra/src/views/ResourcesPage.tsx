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
          <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  AVAILABLE TODAY
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Role-based Help Guides &amp; Onboarding Documentation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Browse step-by-step walkthroughs for every SchoolChakra role or review the Getting Started checklist.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <Link to="/getting-started">
                  <Button variant="outline" size="sm">Getting Started</Button>
                </Link>
                <Link to="/help">
                  <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Open Help Center
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              {[
                { label: 'Getting Started', desc: 'First login, ERP IDs & workspace tour', to: '/help/getting-started' },
                { label: 'School Admin Guide', desc: 'Setup, users, imports, timetables & reports', to: '/help/school-admin' },
                { label: 'Teacher Guide', desc: 'Attendance, timetables, classes & assignments', to: '/help/teacher' },
                { label: 'Student Guide', desc: 'Subjects, homework submission & UPI payments', to: '/help/student' },
                { label: 'Accounts Guide', desc: 'Invoices, payments, UPI verification & Fee Insights', to: '/help/accounts' },
                { label: 'Common Help', desc: 'Global search, notifications, profile & issues', to: '/help/common-help' },
              ].map((guide) => (
                <Link
                  key={guide.to}
                  to={guide.to}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-slate-300 px-4 py-3 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {guide.label}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 truncate">{guide.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0" />
                </Link>
              ))}
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
