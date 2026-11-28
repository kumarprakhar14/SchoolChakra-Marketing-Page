import {
  ArrowRight,
  Building2,
  BookOpen,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Users,
} from 'lucide-react';
import { Link } from '../router';
import {
  CONNECTED_SCHOOL_DAY,
  SCHOOL_SUITABILITY,
  SOLUTION_ROLES,
} from '../data/solutions';
import {
  AdminPreview,
  TeacherPreview,
  StudentPreview,
  AccountsPreview,
} from '../components/sections/RoleSwitcher';
import { Badge, Button, Card } from '../components/ui';
import { CTASection, PageHero, SectionHeader } from '../components/shared';

const ROLE_ICONS = {
  admin: Building2,
  teacher: BookOpen,
  student: GraduationCap,
  accounts: CreditCard,
};

export function SolutionsPage() {
  const renderRolePreview = (roleId: 'admin' | 'teacher' | 'student' | 'accounts') => {
    switch (roleId) {
      case 'admin':
        return <AdminPreview />;
      case 'teacher':
        return <TeacherPreview />;
      case 'student':
        return <StudentPreview />;
      case 'accounts':
        return <AccountsPreview />;
    }
  };

  return (
    <>
      <PageHero
        eyebrow="ROLE-BASED SCHOOL SOLUTIONS"
        eyebrowIcon={<Users className="w-3.5 h-3.5" />}
        title={
          <>
            One school. Different responsibilities.{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              One connected system.
            </span>
          </>
        }
        description="Every person in your school gets a workspace designed around what they need to do, without unnecessary complexity."
        actions={
          <div className="flex flex-wrap justify-center gap-2">
            {SOLUTION_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              return (
                <a
                  key={role.id}
                  href={`#${role.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 shadow-2xs transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: 'var(--brand-hex, #2563EB)' }} />
                  <span>{role.roleName}</span>
                </a>
              );
            })}
          </div>
        }
      />

      {/* Four Dedicated Role Showcases */}
      {SOLUTION_ROLES.map((role, idx) => {
        const isSlate = idx % 2 === 0;
        const Icon = ROLE_ICONS[role.id];

        return (
          <section
            key={role.id}
            id={role.id}
            className={`relative z-10 w-full py-14 sm:py-20 scroll-mt-24 ${
              isSlate ? 'bg-slate-50 border-y border-slate-200/60' : 'bg-white'
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-5">
                  <Badge variant="outline" size="xs" leftIcon={<Icon className="w-3.5 h-3.5" />}>
                    {role.badge}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {role.headline}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {role.description}
                  </p>
                  <ul className="space-y-2.5 pt-1">
                    {role.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: 'var(--brand-hex, #2563EB)' }}
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-white border border-slate-200/80 p-4 sm:p-6 shadow-xs">
                  {renderRolePreview(role.id)}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Connected School Day */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="A CONNECTED SCHOOL DAY"
            title="Connected workflows, not disconnected modules"
            description="Follow how an academic day moves smoothly across all four workspaces."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {CONNECTED_SCHOOL_DAY.map((step) => (
              <Card key={step.time} className="bg-white flex flex-col justify-between">
                <div>
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: 'var(--brand-hex, #2563EB)' }}
                  >
                    {step.time}
                  </span>
                  <div className="mt-2">
                    <Badge variant="outline" size="xs">{step.actor}</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2.5">{step.action}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{step.detail}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Different School Needs */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="SUITABILITY"
            title="Built for different school needs"
            description="Whether you are replacing paper registers or unifying growing departments, SchoolChakra adapts without unnecessary complexity."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SCHOOL_SUITABILITY.map((item) => (
              <Card key={item.title} className="bg-slate-50/70">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/features">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Features
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="md">Try Interactive Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="FOUR DEDICATED WORKSPACES"
        title="Give every role a better way to work."
        description="Walk through the Administrator, Teacher, Student, and Accounts workspaces with your school leadership team."
        primaryLabel="Apply for Founding Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="Explore Features"
        secondaryTo="/features"
        surface="slate"
      />
    </>
  );
}
