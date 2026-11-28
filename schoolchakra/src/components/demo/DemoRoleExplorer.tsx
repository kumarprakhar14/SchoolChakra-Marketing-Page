'use client';

import {
  BookOpen,
  Building2,
  CreditCard,
  GraduationCap,
} from 'lucide-react';
import { useTheme } from '../../contexts';
import { Link } from '../../router';
import type { DemoTabId } from '../demo-canvas';
import {
  AdminPreview,
  TeacherPreview,
  StudentPreview,
  AccountsPreview,
} from '../sections/RoleSwitcher';
import { Badge, Card } from '../ui';
import { useDemoWorkspace, type ExploreRoleId } from './demo-workspace-context';

const EXPLORE_ROLES: Array<{
  id: ExploreRoleId;
  name: string;
  summary: string;
  canvasTab?: DemoTabId;
  canvasHint?: string;
  icon: typeof Building2;
}> = [
  {
    id: 'admin',
    name: 'Administrator',
    summary: 'School operations, user directory, setup checklist, and oversight.',
    canvasTab: 'dashboard',
    canvasHint: 'Focuses Overview tab above',
    icon: Building2,
  },
  {
    id: 'teacher',
    name: 'Teacher',
    summary: 'Daily attendance workflow, assigned classes, notices, and timetable.',
    icon: BookOpen,
  },
  {
    id: 'student',
    name: 'Student',
    summary: 'Personal timetable, active assignments, attendance, and fee records.',
    icon: GraduationCap,
  },
  {
    id: 'accounts',
    name: 'Accounts',
    summary: 'Fee invoices, payment recording, UPI verification, and financial ledger.',
    canvasTab: 'fees',
    canvasHint: 'Focuses Fee & UPI Ledger above',
    icon: CreditCard,
  },
];

export function DemoRoleExplorer() {
  const { theme } = useTheme();
  const { setCanvasTab, selectedRolePreview, setSelectedRolePreview } = useDemoWorkspace();

  const handleRoleCardClick = (role: (typeof EXPLORE_ROLES)[number]) => {
    setSelectedRolePreview(role.id);
    if (role.canvasTab) {
      setCanvasTab(role.canvasTab);
      const canvasEl = document.getElementById('interactive-demo-canvas');
      canvasEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const previewEl = document.getElementById('role-workspace-preview');
      previewEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
        {EXPLORE_ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRolePreview === role.id;
          return (
            <Card
              key={role.id}
              className={`bg-white flex flex-col justify-between transition-all ${
                isSelected ? 'ring-2' : ''
              }`}
              style={isSelected ? { borderColor: theme.hex } : undefined}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: theme.lightBg, color: theme.hex }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" size="xs">
                    {role.canvasTab ? role.canvasHint : 'Preview below'}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900">{role.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {role.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleCardClick(role)}
                  className="text-xs font-semibold hover:underline cursor-pointer"
                  style={{ color: theme.hex }}
                >
                  {role.canvasTab ? 'Open in Demo Canvas ↑' : 'View Workspace Preview ↓'}
                </button>
                <Link
                  to={`/solutions#${role.id}`}
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-900"
                >
                  Details
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Reused Role Workspace Preview */}
      <div
        id="role-workspace-preview"
        className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 p-4 sm:p-6 shadow-xs"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              ROLE WORKSPACE PREVIEW
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {EXPLORE_ROLES.find((r) => r.id === selectedRolePreview)?.name} View
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {EXPLORE_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRolePreview(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                  selectedRolePreview === r.id
                    ? 'text-white border-transparent'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                style={
                  selectedRolePreview === r.id
                    ? { backgroundColor: theme.hex }
                    : undefined
                }
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {selectedRolePreview === 'admin' && <AdminPreview />}
        {selectedRolePreview === 'teacher' && <TeacherPreview />}
        {selectedRolePreview === 'student' && <StudentPreview />}
        {selectedRolePreview === 'accounts' && <AccountsPreview />}
      </div>
    </>
  );
}
