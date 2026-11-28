import { ArrowRight, CheckCircle2, Compass, Layers, Sparkles } from 'lucide-react';
import { Link } from '../router';
import { Badge, Button, Card } from '../components/ui';
import { CTASection, PageHero, SectionHeader } from '../components/shared';

const PROBLEMS_SOLVED = [
  'Registers and spreadsheets scattered across departments',
  'Repetitive manual data entry across admission, attendance, and fee lists',
  'Manual attendance follow-ups and late threshold visibility',
  'Time-consuming timetable coordination and double-booking errors',
  'Disorganized fee tracking and payment proof reconciliation',
  'School notices spread across informal messaging groups',
  'Lack of consolidated operational visibility for school leadership',
];

const BELIEFS = [
  {
    title: 'Clarity over complexity',
    description:
      'People should see the information relevant to their responsibilities—not cluttered screens built for unrelated workflows.',
  },
  {
    title: 'Connected operations',
    description:
      'Academics, attendance, communication, and finances belong in one shared foundation so records stay consistent everywhere.',
  },
  {
    title: 'Practical digital transformation',
    description:
      'Moving to software should not require schools to rebuild every administrative process from scratch.',
  },
  {
    title: 'Accountability and visibility',
    description:
      'Attendance histories, fee transactions, and operational summaries should be straightforward to review and verify.',
  },
];

const APPROACH_PILLARS = [
  {
    title: 'Role-specific workspaces',
    detail: 'Dedicated experiences for Administrators, Teachers, Students, and Accounts teams.',
  },
  {
    title: 'Guided setup',
    detail: 'Structured checklists help schools configure classes, sections, subjects, and branding in order.',
  },
  {
    title: 'Bulk data migration',
    detail: 'Guided CSV import pipelines validate and reconcile records before committing them.',
  },
  {
    title: 'Operational safeguards',
    detail: '48-hour attendance finalization, timetable conflict checks, and non-destructive account archival protect records.',
  },
  {
    title: 'Continuous improvement through user feedback',
    detail: 'In-app issue reporting helps surface real classroom and office needs as SchoolChakra evolves.',
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT SCHOOLCHAKRA"
        eyebrowIcon={<Compass className="w-3.5 h-3.5" />}
        title={
          <>
            A clearer way to{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              run a school.
            </span>
          </>
        }
        description="SchoolChakra brings everyday school operations together so administrators, teachers, students and accounts teams can focus on what matters instead of managing scattered systems."
        actions={
          <>
            <Link to="/features">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore SchoolChakra
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                Try Interactive Demo
              </Button>
            </Link>
          </>
        }
      />

      {/* Section 1: Why SchoolChakra Exists */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Badge variant="outline" size="xs">WHY SCHOOLCHAKRA EXISTS</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Replacing scattered files with one coherent system
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In many schools, attendance, timetables, notices, and fees live in disconnected tools. When one detail changes, staff spend hours reconciling lists manually. SchoolChakra unifies those everyday workflows on one shared foundation.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROBLEMS_SOLVED.map((problem) => (
                <Card key={problem} padding="sm" className="bg-white flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: 'var(--brand-hex, #2563EB)' }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                    {problem}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What We Believe */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="WHAT WE BELIEVE"
            eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
            title="Principles guiding the product"
            description="Every workflow in SchoolChakra is shaped around how schools actually operate day to day."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BELIEFS.map((belief) => (
              <Card key={belief.title} className="bg-slate-50/70">
                <h3 className="text-base font-bold text-slate-900">{belief.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {belief.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our Approach */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="OUR APPROACH"
            eyebrowIcon={<Layers className="w-3.5 h-3.5" />}
            title="How SchoolChakra is built and evolved"
            description="SchoolChakra is actively developed and continues to improve alongside practical feedback from school workflows."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {APPROACH_PILLARS.map((pillar) => (
              <Card key={pillar.title} className="bg-white">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {pillar.detail}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="EXPLORE THE PLATFORM"
        title="Make school operations a little simpler."
        description="Explore the modules in detail or try the interactive demo to see how each role works."
        primaryLabel="Explore SchoolChakra"
        primaryAction={{ to: '/features' }}
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
        surface="white"
      />
    </>
  );
}
