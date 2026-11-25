import {
  ShieldCheck,
  Database,
  Lock,
  Check,
  Minus,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useTheme } from '../../contexts';

export function Architecture() {
  const { theme } = useTheme();

  return (
    <section id="architecture" className="relative z-10 w-full bg-white py-16 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              OPERATIONAL INTEGRITY &amp; GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Your school&rsquo;s data, walled off and exportable.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Schools cannot afford downtime, corrupted CSV imports, or accidental cross-school data leakage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 01 — Tenant Data Isolation */}
          <div className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[var(--brand-border)] hover:bg-slate-50 transition-all duration-200">
            <div className="h-[140px] rounded-xl bg-white border border-slate-200/90 p-3 shadow-2xs mb-4 flex flex-col justify-between overflow-hidden transition-all duration-200 group-hover:shadow-xs group-hover:border-slate-300/90">
              <div className="flex items-center justify-between gap-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider text-slate-600 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-105" style={{ color: theme.hex }} />
                  ISOLATED
                </span>
                <span
                  className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border shrink-0 transition-colors"
                  style={{
                    backgroundColor: theme.lightBg,
                    borderColor: theme.borderLight,
                    color: theme.hex,
                  }}
                >
                  ROW-LEVEL
                </span>
              </div>

              <div className="space-y-1.5">
                <div
                  className="flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg border transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{
                    backgroundColor: theme.lightBg,
                    borderColor: theme.borderLight,
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 min-w-0">
                    <Database className="w-3 h-3 shrink-0" style={{ color: theme.hex }} />
                    <span className="font-mono text-[10px] font-bold truncate" style={{ color: theme.hex }}>
                      SCH-DPA-01
                    </span>
                  </span>
                  <span className="font-mono text-[9px] font-semibold shrink-0" style={{ color: theme.hex }}>
                    SCOPED
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/80 opacity-75">
                  <span className="inline-flex items-center gap-1.5 min-w-0">
                    <Database className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="font-mono text-[10px] text-slate-500 truncate">SCH-STX-02</span>
                  </span>
                  <Lock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/80 opacity-75">
                  <span className="inline-flex items-center gap-1.5 min-w-0">
                    <Database className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="font-mono text-[10px] text-slate-500 truncate">SCH-LVI-03</span>
                  </span>
                  <Lock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">Tenant Data Isolation</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Every record is tagged to your school and filtered out of every other school&rsquo;s view — enforced on every database query, not just in the interface.
            </p>
          </div>

          {/* Card 02 — Strict Role Permissions */}
          <div className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[var(--brand-border)] hover:bg-slate-50 transition-all duration-200">
            <div className="h-[140px] rounded-xl bg-white border border-slate-200/90 p-2.5 sm:p-3 shadow-2xs mb-4 flex flex-col justify-between overflow-hidden transition-all duration-200 group-hover:shadow-xs group-hover:border-slate-300/90">
              <div className="grid grid-cols-[1.5fr_0.8fr_0.95fr_0.95fr] items-center pb-1.5 border-b border-slate-100 text-[9px] font-mono font-semibold uppercase tracking-tight text-slate-400">
                <span>Module</span>
                <span className="text-center">Admin</span>
                <span className="text-center">Teacher</span>
                <span className="text-center">Student</span>
              </div>

              <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-around">
                {[
                  { label: 'Students', admin: true, teacher: true, student: false },
                  { label: 'Attendance', admin: true, teacher: true, student: false },
                  { label: 'Fees', admin: true, teacher: false, student: false },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1.5fr_0.8fr_0.95fr_0.95fr] items-center py-1"
                  >
                    <span className="text-[10.5px] font-medium text-slate-700 truncate pr-1">
                      {row.label}
                    </span>
                    {[row.admin, row.teacher, row.student].map((allowed, colIdx) => (
                      <div key={colIdx} className="flex justify-center">
                        {allowed ? (
                          <span
                            className="w-4 h-4 rounded flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                            style={{
                              backgroundColor: theme.lightBg,
                              color: theme.hex,
                            }}
                          >
                            <Check className="w-2.5 h-2.5" strokeWidth={2.75} />
                          </span>
                        ) : (
                          <span className="w-4 h-4 rounded bg-slate-50 text-slate-300 flex items-center justify-center">
                            <Minus className="w-2.5 h-2.5" strokeWidth={2.25} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">Strict Role Permissions</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Granular permissions ensure teachers only access their assigned grade registers, accounts staff access billing, and students see only their reports.
            </p>
          </div>

          {/* Card 03 — Assisted Data Migration */}
          <div className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[var(--brand-border)] hover:bg-slate-50 transition-all duration-200">
            <div className="h-[140px] rounded-xl bg-white border border-slate-200/90 p-3 shadow-2xs mb-4 flex flex-col justify-between overflow-hidden transition-all duration-200 group-hover:shadow-xs group-hover:border-slate-300/90">
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 truncate">
                  MIGRATION
                </span>
                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 min-w-0 flex-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="font-mono text-[10px] font-medium text-slate-700 truncate">
                    fees.csv
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                <div
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border min-w-0 flex-1 transition-colors"
                  style={{
                    backgroundColor: theme.lightBg,
                    borderColor: theme.borderLight,
                    color: theme.hex,
                  }}
                >
                  <Database className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-mono text-[10px] font-bold truncate">
                    Ledger DB
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1 text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 truncate">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    1,420 rows valid
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 shrink-0">100%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-emerald-500 transition-transform duration-300 origin-left group-hover:scale-x-[1.01]" />
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">Assisted Data Migration</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Founding schools receive dedicated engineering assistance to clean up legacy Excel or ERP data with automated row-by-row checks.
            </p>
          </div>

          {/* Card 04 — Zero Vendor Lock-In */}
          <div className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[var(--brand-border)] hover:bg-slate-50 transition-all duration-200">
            <div className="h-[140px] rounded-xl bg-white border border-slate-200/90 p-3 shadow-2xs mb-4 flex flex-col justify-between overflow-hidden transition-all duration-200 group-hover:shadow-xs group-hover:border-slate-300/90">
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 truncate">
                  FULL EXPORT
                </span>
                <span
                  className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border shrink-0 transition-colors"
                  style={{
                    backgroundColor: theme.lightBg,
                    borderColor: theme.borderLight,
                    color: theme.hex,
                  }}
                >
                  1-CLICK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/90 flex flex-col gap-0.5 transition-colors duration-200 group-hover:border-slate-300">
                  <div className="flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="font-mono text-[10px] font-bold text-slate-800">.CSV</span>
                  </div>
                  <span className="text-[10px] text-slate-500 truncate">Rosters &amp; logs</span>
                </div>

                <div
                  className="p-2 rounded-lg border flex flex-col gap-0.5 transition-transform duration-200 group-hover:-translate-y-0.5"
                  style={{
                    backgroundColor: theme.lightBg,
                    borderColor: theme.borderLight,
                  }}
                >
                  <div className="flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" style={{ color: theme.hex }} />
                    <span className="font-mono text-[10px] font-bold" style={{ color: theme.hex }}>
                      .XLSX
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-600 truncate">Fee ledgers</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px]">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 truncate">
                  <Download
                    className="w-3 h-3 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
                    style={{ color: theme.hex }}
                  />
                  Ready to export
                </span>
                <span className="font-mono text-[9px] font-semibold text-emerald-700 shrink-0">
                  OWNED
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">Zero Vendor Lock-In</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Export complete student rosters, attendance logs, and fee receipts to raw CSV / Excel at any time with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
