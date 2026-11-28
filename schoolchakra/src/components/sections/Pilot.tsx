'use client';

import { useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Database,
  Users,
  Check,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../contexts';
import { useUI } from '../../contexts';
import { Link } from '../../router';
import { Button } from '../ui';

gsap.registerPlugin(ScrollTrigger);

const PILOT_BENEFITS = [
  'Assisted CSV Student & Fee Migration',
  'Custom School Logo & Brand Theme Setup',
  'Direct Priority Founder & Engineering Support',
  'Founding-partner pricing, locked for life',
];

const TIMELINE_STEPS = [
  {
    step: 1,
    label: 'Day 0',
    title: 'Discovery Call',
    description: 'Understand your school’s requirements and existing setup.',
    icon: Phone,
  },
  {
    step: 2,
    label: 'Day 1–2',
    title: 'Data Migration',
    description: 'We import and validate your existing school records.',
    icon: Database,
  },
  {
    step: 3,
    label: 'Day 3',
    title: 'Staff Training',
    description: 'Get your teachers and administrators ready to use the platform.',
    icon: Users,
  },
  {
    step: 4,
    label: 'Day 4',
    title: 'Your School Goes Live',
    description: 'Your school is ready to operate on SchoolChakra.',
    icon: Check,
    isFinal: true,
  },
];

export function Pilot() {
  const { theme } = useTheme();
  const { openPilotModal } = useUI();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        animate: '(prefers-reduced-motion: no-preference)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduceMotion } = context.conditions ?? {};
        const nodes = container.querySelectorAll('.pilot-node');
        const contents = container.querySelectorAll('.pilot-content');
        const connectors = container.querySelectorAll('.pilot-connector');
        const pulseRing = container.querySelector('.pilot-golive-pulse');

        if (reduceMotion) {
          gsap.set([nodes, contents, connectors], { clearProps: 'all' });
          if (pulseRing) {
            gsap.set(pulseRing, { autoAlpha: 0 });
          }
          return;
        }

        gsap.set(nodes, { autoAlpha: 0, scale: 0.8 });
        gsap.set(contents, { autoAlpha: 0, y: 10 });
        gsap.set(connectors, { scaleY: 0, transformOrigin: 'top center' });
        if (pulseRing) {
          gsap.set(pulseRing, { scale: 1, autoAlpha: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
          },
        });

        nodes.forEach((node, idx) => {
          const offset = idx === 0 ? 0 : '-=0.06';
          tl.to(
            node,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.28,
              ease: 'back.out(1.4)',
            },
            offset
          );

          if (contents[idx]) {
            tl.to(
              contents[idx],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.28,
                ease: 'power2.out',
              },
              '-=0.18'
            );
          }

          if (connectors[idx]) {
            tl.to(
              connectors[idx],
              {
                scaleY: 1,
                duration: 0.24,
                ease: 'power1.inOut',
              },
              '-=0.12'
            );
          }
        });

        const lastNode = nodes[nodes.length - 1];
        if (lastNode) {
          tl.to(lastNode, {
            scale: 1.08,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          });
        }
        if (pulseRing) {
          tl.fromTo(
            pulseRing,
            { scale: 1, autoAlpha: 0.5 },
            { scale: 1.55, autoAlpha: 0, duration: 0.6, ease: 'power2.out' },
            '<'
          );
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="pilot" className="relative z-10 w-full bg-white py-16 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className="rounded-3xl p-5 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden transition-all duration-700"
          style={{
            background: `radial-gradient(circle at top left, ${theme.hex}D9 0%, transparent 65%), linear-gradient(140deg, #1E293B 0%, #0B0F19 100%)`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Founding School Pilot Program • Rolling Intake
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Bring SchoolChakra to your campus with{' '}
                <span
                  className="font-normal italic underline decoration-white/40"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  done-for-you
                </span>{' '}
                setup.
              </h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
                We are partnering with a select cohort of schools ready to get off Excel for our Founding Pilot Program.
                Our engineers migrate your CSV records, apply your school&rsquo;s brand colors, and train your staff.
                You don&rsquo;t set anything up yourself.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-white/90">
                {PILOT_BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: 4-step vertical timeline replacing estimator */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/20">
              <div ref={timelineRef} className="mb-6">
                {TIMELINE_STEPS.map((s, idx) => {
                  const Icon = s.icon;
                  const isFinal = Boolean(s.isFinal);
                  const isBeforeFinal = idx === TIMELINE_STEPS.length - 2;

                  return (
                    <div
                      key={s.step}
                      className="relative flex items-start gap-3.5 pb-4 sm:pb-5 last:pb-0"
                    >
                      {/* Vertical connector aligned centrally between consecutive nodes */}
                      {idx < TIMELINE_STEPS.length - 1 && (
                        <div
                          className="pilot-connector absolute left-4 -translate-x-1/2 top-4 -bottom-4 w-0.5 rounded-full"
                          style={{
                            background: isBeforeFinal
                              ? `linear-gradient(to bottom, ${theme.hex}55, #05966999)`
                              : `${theme.hex}40`,
                          }}
                        />
                      )}

                      {/* Circular milestone icon node */}
                      <div className="relative z-10 shrink-0">
                        {isFinal && (
                          <span
                            aria-hidden="true"
                            className="pilot-golive-pulse pointer-events-none absolute inset-0 rounded-full bg-emerald-500 opacity-0"
                          />
                        )}
                        <div
                          className={`pilot-node w-8 h-8 rounded-full text-white flex items-center justify-center shadow-xs transition-colors duration-200 ${
                            isFinal ? 'bg-emerald-600 ring-4 ring-emerald-500/15' : ''
                          }`}
                          style={isFinal ? undefined : { backgroundColor: theme.hex }}
                        >
                          <Icon className="w-4 h-4" strokeWidth={isFinal ? 2.5 : 2} />
                        </div>
                      </div>

                      {/* Milestone copy */}
                      <div className="pilot-content pt-0.5 min-w-0">
                        <span
                          className={`font-mono text-[11px] uppercase tracking-wider block ${
                            isFinal
                              ? 'text-emerald-700 font-bold'
                              : 'text-slate-500 font-semibold'
                          }`}
                        >
                          {s.label}
                        </span>
                        <h3
                          className={`mt-0.5 ${
                            isFinal
                              ? 'text-[15px] font-extrabold text-slate-900'
                              : 'text-sm font-bold text-slate-900'
                          }`}
                        >
                          {s.title}
                        </h3>
                        <p
                          className={`text-xs leading-relaxed mt-0.5 ${
                            isFinal ? 'text-slate-600 font-medium' : 'text-slate-500'
                          }`}
                        >
                          {s.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={openPilotModal}
                fullWidth
                size="lg"
                className="text-sm sm:text-base px-4 sm:px-6"
                rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
                style={{ backgroundColor: theme.hex }}
              >
                Apply for the Founding Pilot
              </Button>
              <div className="mt-3 text-center">
                <Link
                  to="/pilot-program"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline transition-colors"
                >
                  Read full Pilot Program overview →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
