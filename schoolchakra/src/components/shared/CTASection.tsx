import type { ReactNode } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '../../router';
import { PilotTriggerButton } from './PilotTriggerButton';

interface CTASectionProps {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  primaryLabel?: string;
  primaryAction?: 'pilot-modal' | { to: string };
  secondaryLabel?: string;
  secondaryTo?: string;
  surface?: 'white' | 'slate';
}

export function CTASection({
  eyebrow = 'SCHOOLCHAKRA PLATFORM',
  title,
  description,
  primaryLabel = 'Apply for Founding Pilot',
  primaryAction = 'pilot-modal',
  secondaryLabel,
  secondaryTo,
  surface = 'white',
}: CTASectionProps) {
  const bgClass = surface === 'slate' ? 'bg-slate-50' : 'bg-white';

  return (
    <section className={`relative z-10 w-full ${bgClass} py-16 sm:py-20`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className="rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden transition-all duration-700"
          style={{
            background:
              'radial-gradient(circle at top left, var(--brand-glow, #2563EBD9) 0%, transparent 65%), linear-gradient(140deg, #1E293B 0%, #0B0F19 100%)',
          }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {primaryAction === 'pilot-modal' ? (
                <PilotTriggerButton
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="px-6"
                  useBrandBg
                >
                  {primaryLabel}
                </PilotTriggerButton>
              ) : (
                <Link
                  to={primaryAction.to}
                  className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-base text-white shadow-sm hover:opacity-95 transition-all"
                  style={{
                    backgroundColor: 'var(--brand-hex, #2563EB)',
                    boxShadow: '0 0 0 2px var(--brand-ring, #2563EB45)',
                  }}
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {secondaryLabel && secondaryTo && (
                <Link
                  to={secondaryTo}
                  className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-5 py-3 text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-colors"
                >
                  <span>{secondaryLabel}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
