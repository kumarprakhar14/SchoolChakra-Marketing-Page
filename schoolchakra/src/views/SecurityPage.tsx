import {
  CheckCircle2,
  Database,
  Download,
  FileSpreadsheet,
  Lock,
  QrCode,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  FINANCIAL_INTEGRITY_POINTS,
  OPERATIONAL_SAFEGUARDS,
  ROLE_PERMISSION_MATRIX,
} from '../data/security';
import { Badge, Card } from '../components/ui';
import {
  CTASection,
  PageHero,
  PlaceholderNotice,
  SectionHeader,
} from '../components/shared';

export function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="SECURITY & DATA OWNERSHIP"
        eyebrowIcon={<ShieldCheck className="w-3.5 h-3.5" />}
        title={
          <>
            Your school&rsquo;s data.{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Your school&rsquo;s boundaries.
            </span>
          </>
        }
        description="School operations involve sensitive student, staff and financial records. SchoolChakra is designed around clear access boundaries, structured workflows and data ownership."
      />

      {/* Section 1: School-level Data Isolation */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="outline" size="xs">SCHOOL-LEVEL DATA ISOLATION</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Every school operates inside its own boundary
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Records in SchoolChakra are scoped to each school so administrators, teachers, students, and accounts staff interact strictly with their own institution&rsquo;s data.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-1">
                {[
                  'Every school maintains its own tenant identity, settings, and branding.',
                  'Student, attendance, timetable, notice, and fee records are scoped to the respective school.',
                  'School users operate exclusively within their own school context.',
                  'Access boundaries are enforced across the application’s permission and data-access layers.',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: 'var(--brand-hex, #2563EB)' }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Miniature Multi-tenant Visual */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                    TENANT CONTAINER BOUNDARIES
                  </span>
                  <Badge variant="theme" size="xs">SCHOOL-SCOPED ACCESS</Badge>
                </div>

                <div
                  className="p-4 rounded-2xl border flex items-center justify-between gap-3"
                  style={{
                    backgroundColor: 'var(--brand-light, #EFF6FF)',
                    borderColor: 'var(--brand-border, #BFDBFE)',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Database className="w-4 h-4 shrink-0" style={{ color: 'var(--brand-hex, #2563EB)' }} />
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold truncate" style={{ color: 'var(--brand-hex, #2563EB)' }}>
                        Active School Context
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Students, registers, timetables &amp; fee ledgers scoped to this school
                      </div>
                    </div>
                  </div>
                  <Badge variant="success" size="xs">ACTIVE</Badge>
                </div>

                {['Separate School B Context', 'Separate School C Context'].map((label) => (
                  <div
                    key={label}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 opacity-80"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Database className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-mono text-xs font-semibold text-slate-600 truncate">
                          {label}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Isolated outside active user context
                        </div>
                      </div>
                    </div>
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Role-Based Access */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="ROLE-BASED ACCESS"
            eyebrowIcon={<Users className="w-3.5 h-3.5" />}
            title="Four clear roles with scoped visibility"
            description="Teachers see assigned classes, students see their own academic and fee records, accounts staff handle financial operations, and administrators oversee the school."
          />

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs sm:text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3.5 font-bold">Module / Area</th>
                    <th className="px-4 py-3.5 font-bold">Administrator</th>
                    <th className="px-4 py-3.5 font-bold">Teacher</th>
                    <th className="px-4 py-3.5 font-bold">Student</th>
                    <th className="px-4 py-3.5 font-bold">Accounts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ROLE_PERMISSION_MATRIX.map((row) => (
                    <tr key={row.module} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">{row.module}</td>
                      <td className="px-4 py-3 text-slate-700">{row.admin}</td>
                      <td className="px-4 py-3 text-slate-600">{row.teacher}</td>
                      <td className="px-4 py-3 text-slate-600">{row.student}</td>
                      <td className="px-4 py-3 text-slate-600">{row.accounts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Operational Integrity */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="OPERATIONAL INTEGRITY"
            title="Built-in safeguards for daily school records"
            description="Workflow checks reduce accidental edits, scheduling clashes, corrupted imports, and destructive deletions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OPERATIONAL_SAFEGUARDS.map((group) => (
              <Card key={group.title} className="bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-slate-900">{group.title}</h3>
                  <Badge variant="outline" size="xs">{group.badge}</Badge>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {group.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: 'var(--brand-hex, #2563EB)' }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 & 5: Data Ownership + Financial Document Integrity */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Data Ownership & Portability */}
            <Card className="lg:col-span-6 bg-slate-50/70 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <FileSpreadsheet className="w-4 h-4" style={{ color: 'var(--brand-hex, #2563EB)' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  DATA OWNERSHIP &amp; PORTABILITY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Bring your data in cleanly and download supported records
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                SchoolChakra supports structured CSV imports and provides downloadable documents and data exports where implemented across workflows.
              </p>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700">
                {[
                  'Bulk data import through structured CSV templates.',
                  'Data export capabilities where implemented in product modules.',
                  'Downloadable PDF invoices and fee receipts.',
                  'Downloadable records and assignment files.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Download className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--brand-hex, #2563EB)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Financial Document Integrity */}
            <Card className="lg:col-span-6 bg-slate-50/70 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <QrCode className="w-4 h-4" style={{ color: 'var(--brand-hex, #2563EB)' }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  FINANCIAL DOCUMENT INTEGRITY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Traceable invoices, receipts, and staff-verified UPI approvals
              </h2>
              <div className="mt-4 space-y-3">
                {FINANCIAL_INTEGRITY_POINTS.map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <PlaceholderNotice
            className="mt-8"
            label="Security & infrastructure policy details"
            title="Backup schedules, encryption specifications, and compliance documentation"
            message="Detailed policies covering automated backup schedules, disaster recovery targets, encryption standards, uptime commitments, and independent security certifications are not currently published here. Contact our team if your institution requires a technical review."
            ctaLabel="Request technical review"
            ctaTo="/contact"
          />
        </div>
      </section>

      <CTASection
        eyebrow="BUILT FOR TRUST"
        title="Your school's operations deserve a system built with care."
        description="Explore the product capabilities or test the interactive workspace demo to see SchoolChakra in action."
        primaryLabel="Explore SchoolChakra"
        primaryAction={{ to: '/features' }}
        secondaryLabel="Try Interactive Demo"
        secondaryTo="/demo"
        surface="slate"
      />
    </>
  );
}
