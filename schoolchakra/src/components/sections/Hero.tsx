'use client';

import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { useTheme, useTenant, useUI } from '../../contexts';
import { Link } from '../../router';
import { Button, HeroRotatingPill } from '../ui';
import { DemoCanvas } from '../demo-canvas';
import type { BrandThemeKey } from '../../types';

export function Hero() {
  const { theme, activeThemeKey, setActiveThemeKey } = useTheme();
  const { currentTenant } = useTenant();
  const { openPilotModal } = useUI();

  // Map tenant ID to DemoCanvas school code if available
  const mappedSchool =
    currentTenant.id === 'delhi-public'
      ? 'dpa'
      : currentTenant.id === 'st-xaviers'
      ? 'stx'
      : currentTenant.id === 'lotus-valley'
      ? 'lvi'
      : 'dpa';

  return (
    <section id="top" className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-10 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 max-w-full px-3 sm:px-3.5 py-1.5 rounded-2xl sm:rounded-full border border-slate-200/90 bg-white shadow-2xs mb-5 sm:mb-6">
          <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: theme.hex }} />
          <span className="text-[11px] sm:text-xs font-bold tracking-wide text-slate-900">
            Founding School Pilot Open — Rolling Intake
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link
            to="/pilot-program"
            className="text-[11px] sm:text-xs font-bold inline-flex items-center gap-0.5 hover:underline whitespace-nowrap shrink-0"
            style={{ color: theme.hex }}
          >
            Read terms <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4 sm:mb-5">
          <span className="block text-slate-900">
            Every role. Every{' '}
            <span
              className="font-normal italic text-slate-900 px-1 inline-block"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              classroom.
            </span>
          </span>
          <span className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-1.5 text-slate-900">
            <HeroRotatingPill />
            <span className="font-extrabold text-slate-900">under one roof.</span>
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-7 font-normal">
          SchoolChakra runs fees, attendance, timetables, and notices for Indian schools. Principals, teachers, accounts staff, and students each get their own workspace, colored in your school&rsquo;s brand.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button
            onClick={openPilotModal}
            rightIcon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />}
            size="xl"
            className="group font-bold text-sm sm:text-lg px-6 sm:px-10 py-3.5 sm:py-5 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ring-4 ring-offset-2"
            style={{
              backgroundColor: theme.hex,
              boxShadow: `0 14px 34px -6px ${theme.hex}60`,
            }}
          >
            Apply for the Founding Pilot
          </Button>
        </div>

        {/* ═══ TRUST BADGES (BELOW PRIMARY CTA & ABOVE DEMO CANVAS) ═══ */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 mt-5 sm:mt-6 mb-8 sm:mb-10 opacity-60">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Set up by our team
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Export your data anytime
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Founder on WhatsApp
          </span>
        </div>
      </div>

      {/* ═══ INTERACTIVE MOCKUP CANVAS ═══ */}
      <div className="relative max-w-7xl mx-auto mt-2 sm:mt-4">
        <div className="p-2 sm:p-3 bg-slate-100/90 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.10)]">
          <DemoCanvas
            defaultSchool={mappedSchool}
            theme={activeThemeKey}
            onThemeChange={(th) => setActiveThemeKey(th.id as BrandThemeKey)}
          />
        </div>
      </div>
    </section>
  );
}
