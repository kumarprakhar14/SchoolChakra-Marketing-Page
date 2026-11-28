'use client';

import { useState } from 'react';
import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  IndianRupee,
  Lock,
  QrCode,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useTheme } from '../../contexts';
import type { FeatureCategory } from '../../data/features';
import { Badge } from '../ui';

export function CategoryPreview({ type }: { type: FeatureCategory['previewType'] }) {
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
