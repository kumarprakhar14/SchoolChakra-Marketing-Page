import { ArrowRight, HelpCircle, LifeBuoy } from 'lucide-react';
import { Link } from '../router';
import { GETTING_STARTED_GUIDES } from '../data/help';
import { Button, Card } from '../components/ui';
import {
  CTASection,
  PageHero,
  PlaceholderNotice,
  SectionHeader,
} from '../components/shared';
import { RoleGuideTabs } from '../components/help/RoleGuideTabs';
import { SearchableHelpFaq } from '../components/help/SearchableHelpFaq';

export function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="HELP CENTER & USER GUIDANCE"
        eyebrowIcon={<LifeBuoy className="w-3.5 h-3.5" />}
        title={
          <>
            Find your way around{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              SchoolChakra.
            </span>
          </>
        }
        description="Explore practical guidance for setting up your school and managing everyday operations."
      />

      {/* Section 1: Getting Started Essentials */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="GETTING STARTED"
            title="First steps inside SchoolChakra"
            description="Key concepts every school user encounters on their first login."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GETTING_STARTED_GUIDES.map((item, idx) => (
              <Card key={item.title} className="bg-white flex flex-col justify-between">
                <div>
                  <span
                    className="text-[11px] font-mono font-bold"
                    style={{ color: 'var(--brand-hex, #2563EB)' }}
                  >
                    0{idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Role-Based Guides */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <RoleGuideTabs />

          <PlaceholderNotice
            className="mt-8"
            label="Detailed documentation expanding"
            title="Step-by-step web walkthrough articles"
            message="Detailed standalone help articles with step-by-step screenshots are not yet published on the website. Signed-in school users can access the built-in User Guide inside SchoolChakra, or contact our team for specific guidance."
            ctaLabel="Contact support"
            ctaTo="/contact"
          />
        </div>
      </section>

      {/* Section 3: Searchable Common Questions */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="COMMON QUESTIONS"
            eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
            title="Search common operational questions"
            align="center"
          />

          <SearchableHelpFaq />
        </div>
      </section>

      {/* Section 4: Still Need Help? */}
      <section className="relative z-10 w-full bg-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-50/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                STILL NEED HELP?
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Report an issue in-app or contact our team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                Existing users can submit issues directly inside SchoolChakra via the <strong>Report an Issue</strong> option. For onboarding, plan, or general enquiries, visit our Contact page.
              </p>
            </div>
            <Link to="/contact" className="shrink-0">
              <Button size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Go to Contact
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <CTASection
        eyebrow="ONBOARDING"
        title="Preparing your school to switch?"
        description="Review our four-step onboarding journey and preparation checklist before getting started."
        primaryLabel="View Getting Started"
        primaryAction={{ to: '/getting-started' }}
        secondaryLabel="Try Interactive Demo"
        secondaryTo="/demo"
        surface="slate"
      />
    </>
  );
}
