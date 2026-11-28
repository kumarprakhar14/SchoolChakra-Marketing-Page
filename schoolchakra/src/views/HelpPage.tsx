import { ArrowRight, BookOpen, HelpCircle, LifeBuoy } from 'lucide-react';
import { Link } from '../router';
import {
  ALL_HELP_ARTICLES,
  HELP_CATEGORIES,
  getArticlesByCategory,
  type HelpCategorySlug,
} from '../data/help-center';
import { Badge, Button, Card } from '../components/ui';
import { CTASection, PageHero, SectionHeader } from '../components/shared';
import { HelpSearchBar } from '../components/help/HelpSearchBar';
import { CATEGORY_ICONS } from '../components/help/HelpIcons';
import { SearchableHelpFaq } from '../components/help/SearchableHelpFaq';

const ROLE_SLUGS: HelpCategorySlug[] = ['school-admin', 'teacher', 'student', 'accounts'];

const EXPLORE_TOPICS: {
  title: string;
  description: string;
  links: { label: string; to: string }[];
}[] = [
  {
    title: 'First-Time Setup & Navigation',
    description: 'Sign in with your ERP ID, explore your workspace, and configure school branding.',
    links: [
      { label: 'Logging In to SchoolChakra', to: '/help/getting-started/logging-in' },
      { label: 'Understanding the Layout', to: '/help/getting-started/navigating-the-workspace' },
      { label: 'Admin Dashboard & Setup Checklist', to: '/help/school-admin/admin-dashboard' },
      { label: 'School Branding, Logo & UPI ID', to: '/help/school-admin/school-settings' },
    ],
  },
  {
    title: 'Users, Classes & Timetables',
    description: 'Set up grades and sections, onboard staff and students, and schedule periods.',
    links: [
      { label: 'Adding & Managing Users', to: '/help/school-admin/user-management' },
      { label: 'Bulk CSV / Excel Import', to: '/help/school-admin/bulk-data-import' },
      { label: 'Setting Up Classes & Sections', to: '/help/school-admin/academics-classes-sections' },
      { label: 'Building Weekly Timetables', to: '/help/school-admin/timetable-management' },
    ],
  },
  {
    title: 'Attendance & Homework',
    description: 'Take daily roll call, finalize registers, post assignments, and turn in homework.',
    links: [
      { label: 'Marking & Locking Attendance (Teacher)', to: '/help/teacher/teacher-attendance' },
      { label: 'Creating Assignments & Checking Work', to: '/help/teacher/teacher-assignments' },
      { label: 'Submitting Assignments (Student)', to: '/help/student/student-assignments' },
      { label: 'Attendance & Fee Reports (Admin)', to: '/help/school-admin/reports-and-insights' },
    ],
  },
  {
    title: 'Fees, UPI Payments & Receipts',
    description: 'Bill students, pay via UPI, verify UTR proofs, and download official PDFs.',
    links: [
      { label: 'Creating Invoices & Recording Payments', to: '/help/accounts/invoices-and-payments' },
      { label: 'Paying Fees via UPI & Submitting UTR', to: '/help/student/student-upi-payments' },
      { label: 'Verifying Student UPI Proofs', to: '/help/accounts/upi-verification-receipts' },
      { label: 'Fee Insights & Overdue Defaulters', to: '/help/accounts/fee-insights-reports' },
    ],
  },
];

export function HelpPage() {
  const gettingStartedArticles = getArticlesByCategory('getting-started');
  const commonHelpArticles = getArticlesByCategory('common-help');

  return (
    <>
      <PageHero
        eyebrow="HELP CENTER & USER GUIDE"
        eyebrowIcon={<LifeBuoy className="w-3.5 h-3.5" />}
        title={
          <>
            How can we{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              help you?
            </span>
          </>
        }
        description="Step-by-step guides organized by your school role—from first login and attendance to timetables, assignments, and UPI fee receipts."
      >
        <div className="max-w-3xl mx-auto">
          <HelpSearchBar />
        </div>
      </PageHero>

      {/* Section 1: Browse by Role */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="BROWSE BY ROLE"
            title="Select your SchoolChakra workspace"
            description="Each school role has its own dedicated documentation covering only the screens and actions you use."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLE_SLUGS.map((slug) => {
              const category = HELP_CATEGORIES.find((c) => c.slug === slug);
              if (!category) return null;
              const Icon = CATEGORY_ICONS[slug];
              const articles = getArticlesByCategory(slug);

              return (
                <Card
                  key={slug}
                  hover
                  className="bg-white flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: 'var(--brand-light, #EFF6FF)',
                          borderColor: 'var(--brand-border, #BFDBFE)',
                          color: 'var(--brand-hex, #2563EB)',
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" size="xs">
                        {articles.length} guides
                      </Badge>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900">{category.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {category.description}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      {category.popularTasks.slice(0, 3).map((task) => (
                        <li key={task.slug}>
                          <Link
                            to={`/help/${slug}/${task.slug}`}
                            className="text-xs text-slate-600 hover:text-slate-900 hover:underline inline-flex items-start gap-1.5"
                          >
                            <span className="text-slate-400">•</span>
                            <span>{task.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <Link
                      to={`/help/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                      style={{ color: 'var(--brand-hex, #2563EB)' }}
                    >
                      <span>Open {category.shortTitle} Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Getting Started & Common Help */}
      <section className="relative z-10 w-full bg-white py-14 sm:py-18">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Getting Started */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    GETTING STARTED
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    First steps in SchoolChakra
                  </h2>
                </div>
                <Link
                  to="/help/getting-started"
                  className="text-xs font-semibold hover:underline shrink-0"
                  style={{ color: 'var(--brand-hex, #2563EB)' }}
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {gettingStartedArticles.map((article, idx) => (
                  <Link
                    key={article.slug}
                    to={`/help/getting-started/${article.slug}`}
                    className="flex items-start justify-between gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span
                        className="text-xs font-mono font-bold shrink-0 mt-0.5"
                        style={{ color: 'var(--brand-hex, #2563EB)' }}
                      >
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Common Help */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    COMMON HELP
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    Tools available to every user
                  </h2>
                </div>
                <Link
                  to="/help/common-help"
                  className="text-xs font-semibold hover:underline shrink-0"
                  style={{ color: 'var(--brand-hex, #2563EB)' }}
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {commonHelpArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/help/common-help/${article.slug}`}
                    className="flex items-start justify-between gap-4 p-4 sm:p-5 hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Explore Topics */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <SectionHeader
              eyebrow="EXPLORE TOPICS"
              eyebrowIcon={<BookOpen className="w-3.5 h-3.5" />}
              title="Jump straight to a workflow"
              description="Direct links to the most frequently needed operational guides across all roles."
              className="mb-0"
            />
            <span className="text-xs font-mono text-slate-500">
              {ALL_HELP_ARTICLES.length} published help articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EXPLORE_TOPICS.map((topic) => (
              <div
                key={topic.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">{topic.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {topic.description}
                  </p>
                  <ul className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    {topic.links.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="text-xs font-medium text-slate-700 hover:text-blue-700 inline-flex items-center gap-1.5 group"
                        >
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Searchable Common Questions */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="COMMON QUESTIONS"
            eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
            title="Quick operational answers"
            align="center"
          />

          <SearchableHelpFaq />
        </div>
      </section>

      {/* Section 5: Additional Help */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-16 border-t border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                STILL NEED HELP?
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Report an issue in-app or contact our team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                Signed-in users can submit issues directly inside SchoolChakra using{' '}
                <strong>Report an Issue</strong> in the sidebar. For school onboarding or general
                enquiries, visit our Contact page.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Link to="/help/common-help/reporting-issues">
                <Button variant="outline" size="md">
                  How to Report Issues
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Go to Contact
                </Button>
              </Link>
            </div>
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
        surface="white"
      />
    </>
  );
}
