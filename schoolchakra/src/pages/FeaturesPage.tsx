import { useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  IndianRupee,
  Layers,
  Lock,
  QrCode,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useTheme } from '../contexts';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import { CONNECTED_WORKFLOW_STEPS, FEATURE_CATEGORIES, type FeatureCategory } from '../data/features';
import { Badge, Button, Card } from '../components/ui';
import { CTASection, PageHero, SectionHeader } from '../components/shared';

function CategoryPreview({ type }: { type: FeatureCategory['previewType'] }) {
  const { theme } = useTheme();
  const [attMode, setAttMode] = useState<'draft' | 'locked' | 'finalized'>('locked');
  const [noticeRole, setNoticeRole] = useState<'All' | 'Teachers' | 'Students'>('Teachers');

  if (type === 'users') {
    const sampleRows = [
      { name: 'Priya Sharma', erpId: 'ERP-TCH-002', role: 'TEACHER', status: 'Active', detail: 'Mathematics' },
      { name: 'Arjun Singh', erpId: 'ERP-STU-001', role: 'STUDENT', status: 'Active', detail: 'Class X-A' },
      { name: 'Sneha Gupta', erpId: 'ERP-ACC-001', role: 'ACCOUNTS', status: 'Active', detail: 'Fee Desk' },
      { name: 'Rohan Joshi', erpId: 'ERP-STU-003', role: 'STUDENT', status: 'Archived', detail: 'Records retained' },
    ];
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: theme.hex }} />
            <span className="text-xs font-bold text-slate-900">School User Directory</span>
          </div>
          <Badge variant="outline" size="xs">ERP ID Scoped</Badge>
        </div>
        <div className="mt-3 divide-y divide-slate-100">
          {sampleRows.map((row) => (
            <div key={row.erpId} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <div className="font-bold text-slate-900">{row.name}</div>
                <div className="font-mono text-[11px] text-slate-500">
                  {row.erpId} • {row.detail}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" size="xs">{row.role}</Badge>
                <Badge variant={row.status === 'Active' ? 'success' : 'outline'} size="xs">
                  {row.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'attendance') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" style={{ color: theme.hex }} />
            <span className="text-xs font-bold text-slate-900">Daily Register • Class 10-A</span>
          </div>
          <Badge variant="warning" size="xs">48h Auto-Finalize</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'draft', label: '1. Draft' },
            { id: 'locked', label: '2. Lock' },
            { id: 'finalized', label: '3. Final Save' },
          ].map((item) => {
            const active = attMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setAttMode(item.id as 'draft' | 'locked' | 'finalized')}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  active ? 'text-white border-transparent shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                style={active ? { backgroundColor: theme.hex } : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="font-semibold text-slate-800">Mark All Present Shortcut</span>
            <Badge variant="success" size="xs">40 / 42 Present</Badge>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-2">
            <span className="text-slate-600">
              {attMode === 'draft' && 'Draft active — unsaved-changes guard prevents accidental tab loss.'}
              {attMode === 'locked' && 'Locked — teacher can unlock for corrections before 48h finalization.'}
              {attMode === 'finalized' && 'Finalized — locked into permanent attendance reporting.'}
            </span>
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'academics') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: theme.hex }} />
            <span className="text-xs font-bold text-slate-900">Timetable &amp; Academic Calendar</span>
          </div>
          <Badge variant="success" size="xs">0 Clashes</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-mono text-[10px] text-slate-500 uppercase">Period 1 • 08:30</div>
            <div className="font-bold text-slate-900 mt-1">Mathematics (MATH-10)</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Class 10-A • Ms. Priya Sharma</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="font-mono text-[10px] text-rose-700 uppercase">Conflict Guard</div>
            <div className="font-bold text-rose-900 mt-1">Double-booking blocked</div>
            <div className="text-[11px] text-rose-700 mt-0.5">Teacher already assigned to 10-A</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-600">Calendar supports holidays, vacations &amp; special working days</span>
          <Badge variant="outline" size="xs">Academic Year</Badge>
        </div>
      </div>
    );
  }

  if (type === 'communication') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" style={{ color: theme.hex }} />
            <span className="text-xs font-bold text-slate-900">Assignments &amp; Targeted Notices</span>
          </div>
          <Badge variant="outline" size="xs">Edited Indicator</Badge>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-slate-900">Science Lab Worksheet #3</span>
            <Badge variant="warning" size="xs">Due Friday</Badge>
          </div>
          <p className="text-slate-600">Attachment included • 34 of 40 student submissions received</p>
        </div>

        <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-slate-900">
              <Bell className="w-3.5 h-3.5" style={{ color: theme.hex }} />
              Role-Scoped Notice Visibility
            </span>
            <span className="text-[10px] font-mono text-slate-500">Edited</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Teachers', 'Students'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setNoticeRole(r)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer transition-colors ${
                  noticeRole === r
                    ? 'text-white border-transparent'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
                style={noticeRole === r ? { backgroundColor: theme.hex } : undefined}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500">
            Visible only to: <strong className="text-slate-800">{noticeRole}</strong>
          </p>
        </div>
      </div>
    );
  }

  if (type === 'fees') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4" style={{ color: theme.hex }} />
            <span className="text-xs font-bold text-slate-900">Fee Ledger &amp; QR Receipt</span>
          </div>
          <Badge variant="success" size="xs">UTR Verified</Badge>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-mono text-[11px] text-slate-500">INV-2026-0842 • Auto-numbered</div>
            <div className="font-bold text-slate-900 mt-0.5">₹14,500 • UPI / Cash / Cheque</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Staff verified before receipt issuance</div>
          </div>
          <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0">
            <QrCode className="w-6 h-6 text-slate-700" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
          <span className="inline-flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-400" /> PDF Invoice &amp; Receipt Ready
          </span>
          <Badge variant="danger" size="xs">Defaulter Watchlist</Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: theme.hex }} />
          <span className="text-xs font-bold text-slate-900">Operational Summaries</span>
        </div>
        <Badge variant="theme" size="xs">Attendance &amp; Fees</Badge>
      </div>

      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] font-mono uppercase text-slate-500">Working-Day Rate</div>
          <div className="text-lg font-extrabold font-mono text-slate-900 mt-1">96.4%</div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">Low-attendance alerts</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] font-mono uppercase text-slate-500">Collection Rate</div>
          <div className="text-lg font-extrabold font-mono text-slate-900 mt-1">94.2%</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Expected vs. collected</div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <span>Payment-method breakdown</span>
        <span className="font-mono font-semibold text-slate-800">UPI • Cash • Cheque • Online</span>
      </div>
    </div>
  );
}

export function FeaturesPage() {
  const { theme } = useTheme();

  usePageMeta({
    title: 'Features — SchoolChakra School Management Software',
    description:
      'Explore SchoolChakra capabilities across student and user management, attendance workflows, academic timetables, assignments, notices, UPI fee collection, and reporting.',
    canonicalPath: '/features',
  });

  return (
    <>
      <PageHero
        eyebrow="COMPLETE PRODUCT CAPABILITIES"
        eyebrowIcon={<Layers className="w-3.5 h-3.5" />}
        title={
          <>
            Everything your school needs.{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              All in one place.
            </span>
          </>
        }
        description="From student records and attendance to academic planning, assignments and fee management, bring your school's everyday operations into one connected platform."
        actions={
          <>
            <Link to="/demo">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore the Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </>
        }
      >
        {/* Compact Hero Dashboard Preview */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.10)] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                CONNECTED SCHOOL MODULES
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Six core modules sharing one academic &amp; user foundation
              </h2>
            </div>
            <Link
              to="/demo"
              className="text-xs font-semibold hover:underline"
              style={{ color: theme.hex }}
            >
              Open interactive workspace →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            {FEATURE_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-colors text-left"
              >
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {cat.code.split('•')[0].trim()}
                </span>
                <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                  {cat.code.split('•')[1]?.trim()}
                </div>
              </a>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Feature Categories (Alternating Showcase Layout) */}
      {FEATURE_CATEGORIES.map((category, idx) => {
        const isSlate = idx % 2 === 0;
        const reverseOrder = idx % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            className={`relative z-10 w-full py-14 sm:py-18 ${
              isSlate ? 'bg-slate-50 border-y border-slate-200/60' : 'bg-white'
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className={`lg:col-span-6 space-y-5 ${reverseOrder ? 'lg:order-2' : ''}`}>
                  <Badge variant="outline" size="xs">{category.code}</Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {category.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {category.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {category.highlights.map((item) => (
                      <Card key={item.title} padding="sm" className="bg-white">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: theme.hex }}
                          />
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-6 ${reverseOrder ? 'lg:order-1' : ''}`}>
                  <div className="rounded-3xl bg-slate-100/80 border border-slate-200/90 p-3 sm:p-4">
                    <CategoryPreview type={category.previewType} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Connected Workflows */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="CONNECTED WORKFLOWS"
            title="How modules work together across the school"
            description="Changes made in one workspace immediately inform the next—eliminating duplicate entry between administration, classrooms, and the fee desk."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CONNECTED_WORKFLOW_STEPS.map((item) => (
              <Card key={item.step} className="flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="w-7 h-7 rounded-full text-white font-mono text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: theme.hex }}
                    >
                      {item.step}
                    </span>
                    <Badge variant="outline" size="xs">{item.role}</Badge>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="FOUNDING PILOT"
        title="Bring your school's operations together."
        description="Explore the interactive demo or apply for the Founding School Pilot to see how SchoolChakra fits your school's daily workflows."
        primaryLabel="Apply for Founding Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="View Role Solutions"
        secondaryTo="/solutions"
        surface="white"
      />
    </>
  );
}
