import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CreditCard,
  GraduationCap,
  MonitorPlay,
} from 'lucide-react';
import { useTheme, useUI } from '../contexts';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import { DemoCanvas } from '../components/demo-canvas';
import type { DemoTabId } from '../components/demo-canvas';
import {
  AdminPreview,
  TeacherPreview,
  StudentPreview,
  AccountsPreview,
} from '../components/sections/RoleSwitcher';
import type { BrandThemeKey } from '../types';
import { Badge, Button, Card } from '../components/ui';
import { CTASection, PageHero, SectionHeader } from '../components/shared';

const EXPLORE_ROLES = [
  {
    id: 'admin' as const,
    name: 'Administrator',
    summary: 'School operations, user directory, setup checklist, and oversight.',
    canvasTab: 'dashboard' as DemoTabId,
    canvasHint: 'Focuses Overview tab above',
    icon: Building2,
  },
  {
    id: 'teacher' as const,
    name: 'Teacher',
    summary: 'Daily attendance workflow, assigned classes, notices, and timetable.',
    icon: BookOpen,
  },
  {
    id: 'student' as const,
    name: 'Student',
    summary: 'Personal timetable, active assignments, attendance, and fee records.',
    icon: GraduationCap,
  },
  {
    id: 'accounts' as const,
    name: 'Accounts',
    summary: 'Fee invoices, payment recording, UPI verification, and financial ledger.',
    canvasTab: 'fees' as DemoTabId,
    canvasHint: 'Focuses Fee & UPI Ledger above',
    icon: CreditCard,
  },
];

export function DemoPage() {
  const { activeThemeKey, setActiveThemeKey, theme } = useTheme();
  const { openPilotModal } = useUI();
  const [canvasTab, setCanvasTab] = useState<DemoTabId>('dashboard');
  const [selectedRolePreview, setSelectedRolePreview] = useState<
    'admin' | 'teacher' | 'student' | 'accounts'
  >('admin');

  usePageMeta({
    title: 'Interactive Demo — SchoolChakra',
    description:
      'Explore the interactive SchoolChakra workspace preview across schools, brand themes, operational overview, users, CSV import, and fee ledger.',
    canonicalPath: '/demo',
  });

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
      <PageHero
        eyebrow="INTERACTIVE PRODUCT DEMO"
        eyebrowIcon={<MonitorPlay className="w-3.5 h-3.5" />}
        title={
          <>
            See how your school could work with{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              SchoolChakra.
            </span>
          </>
        }
        description="Explore the different workspaces and experience how everyday school operations come together."
        actions={
          <>
            <Button
              type="button"
              onClick={openPilotModal}
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Apply for Founding Pilot
            </Button>
            <Link to="/features">
              <Button variant="outline" size="lg">
                View All Features
              </Button>
            </Link>
          </>
        }
      >
        {/* Section 1: Interactive Demo Canvas (Primary Focus) */}
        <div id="interactive-demo-canvas" className="max-w-7xl mx-auto">
          <div className="p-2 sm:p-3 bg-slate-100/90 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.10)]">
            <DemoCanvas
              defaultSchool="dpa"
              theme={activeThemeKey}
              activeTab={canvasTab}
              onTabChange={setCanvasTab}
              onThemeChange={(th) => setActiveThemeKey(th.id as BrandThemeKey)}
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-3">
            Sample school data shown for demonstration. Switch tenants, brand themes, and modules in the top bar and sidebar.
          </p>
        </div>
      </PageHero>

      {/* Section 2: What to Explore */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="WHAT TO EXPLORE"
            title="Explore all four customer-facing roles"
            description="Inspect Administrator and Accounts views directly in the interactive canvas above, or preview Teacher and Student workspaces below."
            align="center"
          />

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
        </div>
      </section>

      <CTASection
        eyebrow="PRIVATE SCHOOL WALKTHROUGH"
        title="Ready to bring SchoolChakra to your school?"
        description="Apply for the Founding Pilot to get a private walkthrough configured with your school's branding."
        primaryLabel="Apply for Founding Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="Contact Team"
        secondaryTo="/contact"
        surface="white"
      />
    </>
  );
}
