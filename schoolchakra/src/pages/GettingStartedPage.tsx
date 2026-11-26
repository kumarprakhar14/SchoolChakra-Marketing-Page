import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileSpreadsheet,
  Rocket,
} from 'lucide-react';
import { useTheme, useUI } from '../contexts';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import {
  AFTER_SETUP_ITEMS,
  GETTING_STARTED_FAQS,
  ONBOARDING_STEPS,
  PREPARATION_CHECKLIST,
} from '../data/onboarding';
import { Badge, Button, Card } from '../components/ui';
import {
  CTASection,
  FAQAccordion,
  PageHero,
  PlaceholderNotice,
  SectionHeader,
} from '../components/shared';

export function GettingStartedPage() {
  const { theme } = useTheme();
  const { openPilotModal } = useUI();

  usePageMeta({
    title: 'Getting Started & Onboarding — SchoolChakra',
    description:
      'Learn how schools transition from spreadsheets and manual registers to SchoolChakra through guided setup, CSV migration, and staff onboarding.',
    canonicalPath: '/getting-started',
  });

  const requiredItems = PREPARATION_CHECKLIST.filter((i) => i.required);
  const optionalItems = PREPARATION_CHECKLIST.filter((i) => !i.required);

  return (
    <>
      <PageHero
        eyebrow="ONBOARDING & IMPLEMENTATION"
        eyebrowIcon={<Rocket className="w-3.5 h-3.5" />}
        title={
          <>
            Getting started shouldn&rsquo;t be{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              another project.
            </span>
          </>
        }
        description="Move from spreadsheets and manual registers to an organized school workspace with guided setup and assisted data migration."
        actions={
          <>
            <Button
              type="button"
              onClick={openPilotModal}
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Apply for Founding Pilot
            </Button>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Our Team
              </Button>
            </Link>
          </>
        }
      />

      {/* Section 1: Four-step Onboarding Journey */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="4-STEP ONBOARDING JOURNEY"
            title="From first conversation to daily operations"
            description="A clear four-stage path helps your school prepare records cleanly before launching across classrooms and the fee desk."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ONBOARDING_STEPS.map((item) => (
              <Card key={item.step} className="bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="w-8 h-8 rounded-full text-white font-mono text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: theme.hex }}
                    >
                      {item.step}
                    </span>
                    <Badge variant="outline" size="xs">Step {item.step}</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <PlaceholderNotice
            className="mt-8"
            label="Implementation timelines"
            title="General onboarding duration vs. Pilot Program"
            message="The 4-day assisted go-live timeline applies specifically to schools accepted into the Founding School Pilot offer. Standard implementation timelines and general Pilot Program participation depend on your school's readiness and onboarding conversation."
            ctaLabel="Explore the Pilot Program"
            ctaTo="/pilot-program"
          />
        </div>
      </section>

      {/* Section 2: What to Prepare */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="PREPARATION CHECKLIST"
            eyebrowIcon={<ClipboardList className="w-3.5 h-3.5" />}
            title="What to prepare before onboarding"
            description="Gather the required academic and user records first. Optional items like historical fee balances and branding can be added during setup."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-50/70 p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-base font-bold text-slate-900">Required for initial setup</h3>
                <Badge variant="theme" size="xs">Required</Badge>
              </div>
              <ul className="space-y-3">
                {requiredItems.map((entry) => (
                  <li
                    key={entry.item}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: theme.hex }}
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{entry.item}</div>
                      <p className="text-xs text-slate-600 mt-0.5">{entry.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-slate-50/70 p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-base font-bold text-slate-900">Optional or staged during setup</h3>
                <Badge variant="outline" size="xs">Optional</Badge>
              </div>
              <ul className="space-y-3">
                {optionalItems.map((entry) => (
                  <li
                    key={entry.item}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{entry.item}</div>
                      <p className="text-xs text-slate-600 mt-0.5">{entry.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: What Happens After Setup */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="AFTER SETUP"
            eyebrowIcon={<Compass className="w-3.5 h-3.5" />}
            title="What happens once your workspace is configured"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AFTER_SETUP_ITEMS.map((item) => (
              <Card key={item.title} className="bg-white">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.detail}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Onboarding FAQ */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="ONBOARDING FAQ"
            title="Common questions about switching to SchoolChakra"
            align="center"
          />
          <FAQAccordion
            items={GETTING_STARTED_FAQS}
            defaultOpenIndex={0}
            className="max-w-3xl mx-auto"
          />
        </div>
      </section>

      <CTASection
        eyebrow="START YOUR TRANSITION"
        title="Let's get your school started."
        description="Speak with our team about your current records or apply directly for the Founding School Pilot."
        primaryLabel="Apply for Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
        surface="slate"
      />
    </>
  );
}
