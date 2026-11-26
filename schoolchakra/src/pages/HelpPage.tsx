import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CreditCard,
  GraduationCap,
  HelpCircle,
  LifeBuoy,
  Search,
} from 'lucide-react';
import { useTheme } from '../contexts';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import {
  GETTING_STARTED_GUIDES,
  HELP_FAQS,
  ROLE_HELP_GUIDES,
} from '../data/help';
import { Badge, Button, Card } from '../components/ui';
import {
  CTASection,
  FAQAccordion,
  PageHero,
  PlaceholderNotice,
  SectionHeader,
} from '../components/shared';

const GUIDE_ICONS = {
  admin: Building2,
  teacher: BookOpen,
  student: GraduationCap,
  accounts: CreditCard,
};

export function HelpPage() {
  const { theme } = useTheme();
  const [activeGuide, setActiveGuide] = useState<'admin' | 'teacher' | 'student' | 'accounts'>('admin');
  const [faqQuery, setFaqQuery] = useState('');

  usePageMeta({
    title: 'Help Center & User Guidance — SchoolChakra',
    description:
      'Practical guidance for getting started with SchoolChakra and using Administrator, Teacher, Student, and Accounts workspaces.',
    canonicalPath: '/help',
  });

  const currentGuide = ROLE_HELP_GUIDES.find((g) => g.id === activeGuide) || ROLE_HELP_GUIDES[0];

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return HELP_FAQS;
    return HELP_FAQS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [faqQuery]);

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
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
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
                    style={{ color: theme.hex }}
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <SectionHeader
              eyebrow="ROLE-BASED GUIDES"
              title="Guidance organized by workspace"
              description="Select a role below to inspect the key tasks covered in its built-in User Guide."
              className="mb-0"
            />

            <div className="inline-flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start">
              {ROLE_HELP_GUIDES.map((guide) => {
                const Icon = GUIDE_ICONS[guide.id];
                const isActive = guide.id === activeGuide;
                return (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => setActiveGuide(guide.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                    style={isActive ? { backgroundColor: theme.hex } : undefined}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{guide.title.replace(' Guide', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Card variant="elevated" className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{currentGuide.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{currentGuide.summary}</p>
              </div>
              <Badge variant="theme" size="xs">{currentGuide.topics.length} Core Topics</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {currentGuide.topics.map((topic) => (
                <div
                  key={topic.name}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80"
                >
                  <h4 className="text-sm font-bold text-slate-900">{topic.name}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{topic.detail}</p>
                </div>
              ))}
            </div>
          </Card>

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

          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Search attendance, UPI verification, timetable, archival..."
              aria-label="Search common questions"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {filteredFaqs.length === 0 ? (
            <Card className="bg-white text-center py-8">
              <p className="text-sm font-semibold text-slate-800">
                No matching questions found for &ldquo;{faqQuery}&rdquo;.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try another keyword or reach out via our Contact page.
              </p>
            </Card>
          ) : (
            <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />
          )}
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
