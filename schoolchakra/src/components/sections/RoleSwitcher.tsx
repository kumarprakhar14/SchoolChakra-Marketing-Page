import { type ReactNode } from 'react';
import {
  Building2,
  BookOpen,
  CreditCard,
  GraduationCap,
  Users,
  CheckCircle2,
  AlertTriangle,
  Eye,
  X,
  Check,
  Download,
} from 'lucide-react';
import { useTheme } from '../../contexts';
import { useUI } from '../../contexts';
import { useNoticeAudience } from '../../hooks';
import { Button, Badge, Card } from '../ui';

const ROLE_TABS = [
  { id: 'admin', label: 'School Admin', icon: Building2 },
  { id: 'teacher', label: 'Teachers', icon: BookOpen },
  { id: 'accounts', label: 'Accounts & Fees', icon: CreditCard },
  { id: 'student', label: 'Students', icon: GraduationCap },
];

const NOTICE_AUDIENCES = ['Students', 'Teachers', 'Accounts', 'Everyone'];

interface RoleFeature {
  label: string;
  description: string;
  code?: string;
  codeSuffix?: string;
}

interface RoleDefinition {
  id: string;
  title: string;
  description: string;
  features: RoleFeature[];
  preview: () => ReactNode;
}

function AdminPreview() {
  const { conflictAttempt, setConflictAttempt } = useUI();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Admin Reports &amp; Defaulters Watchlist</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Live Alerts: Low Attendance (&lt;75%) &amp; Overdue Fee Invoices</p>
        </div>
        <Badge variant="outline" size="xs">Class X • Section A</Badge>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 sm:mt-0 shrink-0" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong>Low Attendance Alert (&lt;75%):</strong> 3 students in Class 10-A fell below board threshold this month.
          </div>
        </div>
        <Badge variant="warning" size="xs" className="shrink-0">Auto-Flagged</Badge>
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
        <div className="px-3 sm:px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700">
          <span>Fee Defaulters Table (With Overdue Days)</span>
          <Badge variant="outline" size="xs">Filter: This Month</Badge>
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {[
            { name: 'Aarav Mehta', id: 'STU-10A-04', due: '₹18,500', days: '19 days overdue', status: 'OVERDUE' },
            { name: 'Diya Kulkarni', id: 'STU-10A-12', due: '₹9,200', days: '11 days overdue', status: 'PARTIALLY PAID' },
            { name: 'Rohan Verma', id: 'STU-10B-08', due: '₹18,500', days: '7 days overdue', status: 'PENDING' },
          ].map((row, idx) => (
            <div key={idx} className="px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 hover:bg-slate-50/50 transition-colors">
              <div className="min-w-0">
                <div className="font-bold text-slate-900">{row.name}</div>
                <div className="text-[11px] font-mono text-slate-500">{row.id}</div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">{row.due}</div>
                  <div className="text-[11px] text-rose-600 font-semibold">{row.days}</div>
                </div>
                <Badge variant={row.status === 'OVERDUE' ? 'danger' : row.status === 'PARTIALLY PAID' ? 'warning' : 'default'} size="xs">
                  {row.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timetable Guard simulation folded into Admin */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-bold text-slate-900">Monday • Period 3 (10:15 AM)</span>
          <button
            onClick={() => setConflictAttempt(!conflictAttempt)}
            className="text-[11px] font-mono px-2 py-0.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
          >
            {conflictAttempt ? 'Clear Conflict' : 'Simulate Double-Book'}
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-bold text-slate-900">Class 10-A • Mathematics (MATH)</div>
              <div className="text-[11px] text-slate-500">Assigned: Mr. R. Sharma</div>
            </div>
            <Badge variant="success" size="xs">VALID SLOT</Badge>
          </div>

          {conflictAttempt ? (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-bold text-rose-900">Class 10-B • Physics (PHY)</div>
                <div className="text-[11px] text-rose-700">Blocked: Mr. R. Sharma already in 10-A (Period 3)</div>
              </div>
              <Badge variant="danger" size="xs">CONFLICT!</Badge>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-bold text-slate-900">Class 10-B • Physics (PHY)</div>
                <div className="text-[11px] text-slate-500">Assigned: Ms. S. Iyer</div>
              </div>
              <Badge variant="default" size="xs">VALID SLOT</Badge>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          Click <strong>&ldquo;Simulate Double-Book&rdquo;</strong> to test timetable guard.
        </div>
      </div>
    </div>
  );
}

function TeacherPreview() {
  const { theme } = useTheme();
  const { roleAttendanceState, setRoleAttendanceState } = useUI();
  const {
    audiences: noticeAudiences,
    isEveryoneSelected,
    isEdited: noticeEdited,
    toggle: toggleAudience,
  } = useNoticeAudience();

  const students = [
    { roll: '01', name: 'Aanya Sharma', present: true },
    { roll: '02', name: 'Kabir Nair', present: true },
    { roll: '03', name: 'Reyansh Joshi', present: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Scoped Attendance Register</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Only assigned classes shown • Unsaved exit browser guard active</p>
        </div>
        <Badge variant="outline" size="xs">Class 10-A (Mathematics)</Badge>
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-slate-700">
            Workflow: <span className="font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-900 font-bold">{roleAttendanceState}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setRoleAttendanceState('draft')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                roleAttendanceState === 'draft'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              1. Draft
            </button>
            <button
              onClick={() => setRoleAttendanceState('locked')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                roleAttendanceState === 'locked'
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              2. Lock
            </button>
            <button
              onClick={() => setRoleAttendanceState('finalized')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                roleAttendanceState === 'finalized'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              3. Final (48h)
            </button>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {students.map((stu) => (
            <div key={stu.roll} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/70 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 font-semibold">#{stu.roll}</span>
                <span className="font-bold text-slate-800">{stu.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={stu.present ? 'success' : 'danger'} size="xs">
                  {stu.present ? 'PRESENT' : 'ABSENT'}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>
            {roleAttendanceState === 'draft' && 'Draft saved. Teachers can edit freely.'}
            {roleAttendanceState === 'locked' && 'Locked. Auto-finalizes in 48 hours unless unlocked.'}
            {roleAttendanceState === 'finalized' && 'Permanently finalized audit record.'}
          </span>
          <span className="font-mono font-bold text-slate-700">40/42 Present</span>
        </div>
      </div>

      {/* Notice Audience panel folded into Teacher */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-900">Notice Audience</span>
          {noticeEdited && <Badge variant="outline" size="xs">Edited</Badge>}
        </div>
        <p className="text-[11px] text-slate-500 mb-2.5">
          Selecting all roles normalizes to <strong className="text-slate-700">Everyone</strong>:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {NOTICE_AUDIENCES.map((aud) => {
            const active = aud === 'Everyone' ? isEveryoneSelected : noticeAudiences.includes(aud);
            return (
              <button
                key={aud}
                onClick={() => toggleAudience(aud)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  active ? 'text-white border-transparent font-semibold shadow-2xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                style={active ? { backgroundColor: theme.hex } : {}}
              >
                {aud}
              </button>
            );
          })}
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-mono text-slate-600">
          Target:{' '}
          <strong style={{ color: theme.hex }}>
            {isEveryoneSelected ? 'EVERYONE (Normalized)' : noticeAudiences.join(' + ')}
          </strong>
        </div>
      </div>
    </div>
  );
}

function AccountsPreview() {
  const { upiProofStatus, setUpiProofStatus } = useUI();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">UPI Payment Verification &amp; Audit Log</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Verify student UTR numbers &amp; generate QR watermarked PDF receipts</p>
        </div>
        <Badge variant="outline" size="xs">Operator: Accounts</Badge>
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-900">Student Proof: Vihaan Malhotra (Class 9-B)</div>
            <div className="text-xs font-mono text-slate-500 mt-0.5">Invoice: INV-2026-0891 • Amount: ₹14,500 • Mode: UPI QR</div>
          </div>
          <Badge
            variant={upiProofStatus === 'approved' ? 'success' : upiProofStatus === 'rejected' ? 'danger' : 'warning'}
            size="sm"
          >
            {upiProofStatus === 'approved' && 'STATUS: PAID (UTR VERIFIED)'}
            {upiProofStatus === 'rejected' && 'STATUS: PROOF REJECTED'}
            {upiProofStatus === 'pending' && 'STATUS: AWAITING VERIFICATION'}
          </Badge>
        </div>

        <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div><span className="text-slate-500">Submitted 12-Digit UTR: </span><span className="font-mono font-bold text-slate-900">428910492817</span></div>
          <span className="text-blue-600 font-medium flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 shrink-0" />Screenshot_UPI.png</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
          <div className="text-[11px] text-slate-500">Test Verification Action:</div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="success" size="sm" leftIcon={<Check className="w-3.5 h-3.5" />} onClick={() => setUpiProofStatus('approved')}>Approve &amp; Issue Receipt</Button>
            <Button variant="danger" size="sm" leftIcon={<X className="w-3.5 h-3.5" />} onClick={() => setUpiProofStatus('rejected')}>Reject</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentPreview() {
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Student Academics, Timetable &amp; Fee Portal</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Ananya Rao • Class 10-A • Roll #04</p>
        </div>
        <Badge variant="success" size="xs">Fees: All Clear</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xs">
          <div className="text-xs font-bold text-slate-900 mb-2.5">Today's Period Schedule</div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between gap-2 py-1 border-b border-slate-100"><span className="font-mono text-slate-500 shrink-0">08:30 • P1</span><span className="font-semibold text-slate-800 text-right">Mathematics (R. Sharma)</span></div>
            <div className="flex justify-between gap-2 py-1 border-b border-slate-100"><span className="font-mono text-slate-500 shrink-0">09:20 • P2</span><span className="font-semibold text-slate-800 text-right">Physics Lab (S. Iyer)</span></div>
            <div className="flex justify-between gap-2 py-1"><span className="font-mono text-slate-500 shrink-0">10:15 • P3</span><span className="font-semibold text-slate-800 text-right">English Lit (M. Das)</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
              <span className="text-xs font-bold text-slate-900">Active Assignment</span>
              <Badge variant="warning" size="xs">Due Tomorrow</Badge>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">Quadratic Equations Problem Set #4 (PDF attached)</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5"><Download className="w-3.5 h-3.5 shrink-0" />Worksheet.pdf</span>
            <Button size="sm" style={{ backgroundColor: theme.hex }}>Upload Solution</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ROLES: RoleDefinition[] = [
  {
    id: 'admin',
    title: 'Attendance, fees, and defaulters in one view — no spreadsheet digging.',
    description:
      'From first-run setup to daily attendance and financial snapshots, Principals and School Admins get actionable alerts without digging through spreadsheets.',
    features: [
      {
        label: 'Actionable Insights:',
        description:
          'Top 10 best-attending students, low-attendance alert list (<75%), and fee defaulters with overdue days.',
      },
      {
        label: 'Lifecycle User Management:',
        description:
          'Create Teacher, Student, and Accounts profiles with photo uploads; suspend or soft-archive without data loss.',
      },
      {
        label: 'Academic Calendar & Overrides:',
        description:
          'Mon–Sat default working days with holiday overlap detection and instant month filtering.',
      },
    ],
    preview: () => <AdminPreview />,
  },
  {
    id: 'teacher',
    title: 'Scoped class views and locked attendance records.',
    description:
      'Teachers never see irrelevant classes. Dropdowns automatically scope to their assigned sections, making daily attendance and homework distribution effortless.',
    features: [
      {
        label: 'Draft, lock, auto-finalize:',
        description:
          'Mark all present in one tap, save temp drafts, lock records, or unlock to fix before 48-hour auto-finalization.',
      },
      {
        label: 'Assignments & Submissions:',
        description:
          'Publish PDFs/worksheets with due dates by section and download student submissions in one place.',
      },
      {
        label: 'Multi-Audience Announcements:',
        description:
          'Broadcast notices to specific roles; selecting all roles automatically normalizes to "Everyone."',
      },
    ],
    preview: () => <TeacherPreview />,
  },
  {
    id: 'accounts',
    title: 'Built for Indian fee workflows: UPI UTR verification & QR receipts.',
    description:
      'Eliminate manual receipt books and WhatsApp payment confusion. Accounts staff get a dedicated ledger with full staff audit trails.',
    features: [
      {
        label: 'UPI Payment Proof Queue:',
        description:
          'Inspect student-submitted UTR numbers and screenshots; approve or reject with instant invoice status updates.',
      },
      {
        label: 'Watermarked PDF Invoices:',
        description:
          'Auto-numbered invoices with school logo, dynamic status watermark (',
        code: 'PAID / PARTIALLY PAID',
        codeSuffix: '), and QR verification.',
      },
      {
        label: '"Added By" Staff Accountability:',
        description:
          'Every logged payment records which Accounts staff member created the transaction.',
      },
    ],
    preview: () => <AccountsPreview />,
  },
  {
    id: 'student',
    title: 'A clean daily companion for timetables, homework, and fee receipts.',
    description:
      'Students and parents get a distraction-free portal showing enrolled subjects, daily period schedules, pending assignments, and instant PDF receipt downloads.',
    features: [
      {
        label: 'Live Daily & Weekly Timetable:',
        description: 'Always in sync with admin period slots and subject teachers.',
      },
      {
        label: 'Before-Due-Date Assignment Uploads:',
        description:
          'Download teacher reference files and submit homework directly from mobile or desktop.',
      },
      {
        label: 'Transparent Fee History:',
        description:
          'View paid, pending, or partially paid invoices, submit UPI UTR proofs, and download official receipts.',
      },
    ],
    preview: () => <StudentPreview />,
  },
];

export function RoleSwitcher() {
  const { theme } = useTheme();
  const { activeRole, setActiveRole } = useUI();

  const handleTabClick = (roleId: string) => {
    setActiveRole(roleId);
  };

  const activeRoleDef = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  return (
    <section
      id="roles"
      className="relative z-10 w-full bg-white py-16 sm:py-20"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 px-4">
          <Badge variant="outline" size="xs" leftIcon={<Users className="w-3.5 h-3.5" />}>
            SEPARATE WORKSPACES FOR EVERY ROLE
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
            One platform. 4 specialized{' '}
            <span className="font-normal italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              workspaces.
            </span>
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-2xl mx-auto hidden sm:block">
            Pick a role to see the screen that person actually uses.
          </p>
        </div>

        {/* Role Tabs with "I'm a:" label */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-1 sm:px-2 mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-medium text-slate-500">I&apos;m a:</span>
          <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs">
            {ROLE_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRole === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive ? 'text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                  style={isActive ? { backgroundColor: theme.hex } : {}}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Single active role panel with tab-swap mockupFadeIn animation */}
        <div key={activeRoleDef.id} className="animate-fadeIn">
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{activeRoleDef.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{activeRoleDef.description}</p>
                </div>
                <ul className="space-y-3.5 text-sm text-slate-700">
                  {activeRoleDef.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: theme.hex }} />
                      <span>
                        <strong>{feature.label}</strong> {feature.description}
                        {feature.code && (
                          <code className="font-mono text-xs">{feature.code}</code>
                        )}
                        {feature.codeSuffix}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-white border border-slate-200/80 p-3.5 sm:p-6 shadow-xs">
                {activeRoleDef.preview()}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
