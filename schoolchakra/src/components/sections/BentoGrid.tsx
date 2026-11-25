import { useState, type ReactNode } from 'react';
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  QrCode,
  Lock,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../../contexts';
import { useTenant } from '../../contexts';
import { useUI } from '../../contexts';
import { Badge } from '../ui';

const INVOICE_STATUSES = ['PAID', 'PARTIALLY PAID', 'PENDING'];
const ATTENDANCE_STATES = [
  { id: 'draft', label: '1. Save Temp', icon: RefreshCw },
  { id: 'locked', label: '2. Lock', icon: Lock },
  { id: 'finalized', label: '3. Final Save', icon: ShieldCheck },
];

function BentoCard({
  span,
  eyebrow,
  badge,
  title,
  description,
  children,
}: {
  span: string;
  eyebrow: string;
  badge?: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className={`${span} rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all`}>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">{eyebrow}</span>
          {badge}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  );
}

function CsvStripCard() {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(3);

  return (
    <BentoCard
      span="lg:col-span-12"
      eyebrow="01 • ZERO-FRICTION DATA MIGRATION"
      title="Migrate thousands of students and fee ledgers without silent failures."
      description="Legacy ERPs fail on a single typo. SchoolChakra guides admins through a step-by-step reconciliation pipeline with row-level errors that say exactly what to fix and downloadable failed-row CSV reports."
    >
      <div className="mt-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {/* Three-stage before/after progression strip: Messy sheet → Errors flagged → Clean import */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Stage 1: Messy sheet */}
          <div
            onClick={() => setActiveStage(1)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStage === 1
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                1. Messy Sheet
              </span>
              <Badge variant="outline" size="xs">Raw CSV</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-slate-500 font-mono text-[11px]">
                  <span>Row 104</span>
                  <span>Class 8-A</span>
                </div>
                <div className="font-semibold text-slate-800 mt-0.5">A. Sharma</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-slate-500 font-mono text-[11px]">
                  <span>Row 319</span>
                  <span className="font-mono font-bold text-rose-600">₹12,O00</span>
                </div>
                <div className="font-semibold text-slate-800 mt-0.5">Q3 Tuition Fee</div>
              </div>
            </div>
          </div>

          {/* Stage 2: Errors flagged */}
          <div
            onClick={() => setActiveStage(2)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStage === 2
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900">
                2. Errors Flagged
              </span>
              <Badge variant="warning" size="xs">2 Flags</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">Row 104: A. Sharma</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-900">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Matches 2 students</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50/80 border border-rose-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800">Row 319: ₹12,O00</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] font-bold text-rose-800">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Typo caught</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 3: Clean import (Highlighted by default) */}
          <div
            onClick={() => setActiveStage(3)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeStage === 3
                ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/30 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-900">
                3. Clean Import
              </span>
              <Badge variant="success" size="xs">Resolved</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">Row 104 Resolved:</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    STU-8A-02
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">Row 319 Amount:</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ₹12,000
                  </span>
                </div>
              </div>
              <div className="pt-1 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All 1,420 fee records reconciled.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption under interactive area */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 text-xs font-mono text-slate-600">
          Row 319: typo caught, ₹12,O00 → ₹12,000
        </div>
      </div>
    </BentoCard>
  );
}

function InvoiceCard() {
  const { theme } = useTheme();
  const { currentTenant } = useTenant();
  const { invoiceStatus, setInvoiceStatus } = useUI();

  const watermarkColor =
    invoiceStatus === 'PAID' ? 'text-emerald-600' : invoiceStatus === 'PARTIALLY PAID' ? 'text-amber-600' : 'text-rose-600';

  const amountPaid =
    invoiceStatus === 'PAID' ? '₹24,000' : invoiceStatus === 'PARTIALLY PAID' ? '₹12,000' : '₹0';

  const statusBadgeVariant =
    invoiceStatus === 'PAID' ? 'success' : invoiceStatus === 'PARTIALLY PAID' ? 'warning' : 'danger';

  return (
    <BentoCard
      span="lg:col-span-6"
      eyebrow="02 • INSTANT PDF RECEIPTS"
      badge={
        <div className="flex flex-wrap items-center gap-1">
          {INVOICE_STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setInvoiceStatus(st)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border cursor-pointer transition-all ${
                invoiceStatus === st
                  ? 'bg-slate-900 text-white border-slate-900 font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      }
      title="Watermarked PDF invoices with QR verification."
      description="Inline desktop preview and 1-tap mobile download. Toggle the status pills above to inspect the live watermark."
    >
      <div className="mt-5 relative bg-slate-50/70 rounded-2xl border border-slate-200 p-5 overflow-hidden shadow-2xs">
        <div
          className={`pointer-events-none select-none absolute inset-0 flex items-center justify-center -rotate-12 font-mono font-extrabold text-3xl sm:text-4xl tracking-widest opacity-10 ${watermarkColor}`}
        >
          {invoiceStatus}
        </div>

        <div className="relative z-10 flex items-start justify-between border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: theme.hex }}>
              SC
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{currentTenant.name}</div>
              <div className="text-[11px] font-mono text-slate-500">INV-2026-0842 • Oct 2026 Term</div>
            </div>
          </div>
          <div className="p-1.5 rounded-lg border border-slate-200/80 bg-white">
            <QrCode className="w-7 h-7 text-slate-700" />
          </div>
        </div>

        <div className="relative z-10 my-3.5 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Student:</span>
            <span className="font-semibold text-slate-800">Ishaanvi Nair (Class 11-A)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Billed:</span>
            <span className="font-mono font-semibold text-slate-900">₹24,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Paid:</span>
            <span className="font-mono font-bold text-emerald-600">{amountPaid}</span>
          </div>
        </div>

        <div className="relative z-10 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <Badge variant={statusBadgeVariant} size="xs">● {invoiceStatus}</Badge>
          <span className="font-mono text-slate-500">Operator: Accounts_02</span>
        </div>

        {/* Caption under interactive area */}
        <div className="relative z-10 mt-3.5 pt-2.5 border-t border-slate-200/80 text-xs text-slate-500">
          One tap on mobile sends the PDF to the parent.
        </div>
      </div>
    </BentoCard>
  );
}

function AttendanceCard() {
  const { theme } = useTheme();
  const { bentoAttState, setBentoAttState, presentCount, setPresentCount } = useUI();

  return (
    <BentoCard
      span="lg:col-span-6"
      eyebrow="03 • ATTENDANCE INTEGRITY"
      badge={<Badge variant="warning" size="xs">Auto-finalizes after 48h</Badge>}
      title="Draft, Lock, and 48-hour Auto-Finalization."
      description="Teachers can save temporary drafts or lock attendance. If left locked, the record finalizes automatically after 48 hours."
    >
      <div className="mt-5 bg-slate-50/70 rounded-2xl border border-slate-200 p-4 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-800">Class 12-B • 42 Students</span>
          <button
            onClick={() => {
              if (bentoAttState === 'draft') setPresentCount(42);
            }}
            disabled={bentoAttState !== 'draft'}
            className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-opacity ${
              bentoAttState === 'draft'
                ? 'bg-white text-slate-800 border-slate-300 cursor-pointer hover:bg-slate-100'
                : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            Mark All Present ({presentCount}/42)
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {ATTENDANCE_STATES.map((st) => {
            const Icon = st.icon;
            const active = bentoAttState === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setBentoAttState(st.id)}
                className={`p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold flex flex-col items-center text-center gap-1 transition-all cursor-pointer ${
                  active ? 'text-white border-transparent shadow-2xs' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                style={active ? { backgroundColor: theme.hex } : {}}
              >
                <Icon className="w-4 h-4" />
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs flex flex-wrap items-center justify-between gap-2">
          {bentoAttState === 'draft' && (
            <>
              <span className="text-amber-700 font-medium">● Unsaved Exit Browser Warning Active</span>
              <span className="font-mono text-[11px] text-slate-500">Editable</span>
            </>
          )}
          {bentoAttState === 'locked' && (
            <>
              <span className="text-blue-700 font-medium">● Locked, auto-finalizing in 47h 59m</span>
              <button onClick={() => setBentoAttState('draft')} className="font-mono text-[11px] underline text-blue-700 cursor-pointer">
                Unlock to Fix
              </button>
            </>
          )}
          {bentoAttState === 'finalized' && (
            <>
              <span className="text-emerald-700 font-medium">● Finalized — record locked</span>
              <span className="font-mono text-[11px] text-emerald-700">Immutable</span>
            </>
          )}
        </div>

        {/* Caption under interactive area */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 text-xs text-slate-500">
          Locked registers auto-finalize into permanent audit records after 48 hours.
        </div>
      </div>
    </BentoCard>
  );
}

export function BentoGrid() {
  return (
    <section id="bento" className="relative z-10 w-full bg-slate-50 py-16 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl mb-12">
          <Badge variant="outline" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
            ENGINEERED FOR REAL-WORLD SCHOOL CHAOS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3">
            Three jobs that eat your office&rsquo;s week,{' '}
            <span className="font-normal italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              done in minutes.
            </span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Tap around. These are our real screens, filled with sample data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <CsvStripCard />
          <InvoiceCard />
          <AttendanceCard />
        </div>
      </div>
    </section>
  );
}
