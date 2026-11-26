import { ArrowRight, CheckCircle2, Cloud, CreditCard, HelpCircle, Sparkles } from 'lucide-react';
import { useTheme, useUI } from '../contexts';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import { PRICING_FAQS, UPCOMING_PLANS } from '../data/pricing';
import { Badge, Button, Card } from '../components/ui';
import {
  CTASection,
  FAQAccordion,
  PageHero,
  SectionHeader,
} from '../components/shared';

const MASKED_FEATURE_WIDTHS = ['w-4/5', 'w-11/12', 'w-3/4', 'w-5/6'];

export function PricingPage() {
  const { theme } = useTheme();
  const { openPilotModal } = useUI();

  usePageMeta({
    title: 'Pricing & Founding Pilot — SchoolChakra School ERP',
    description:
      'Join the SchoolChakra Founding School Pilot — free of cost and cancellable anytime. Details for upcoming Free, Starter, Growth, and Enterprise plans are coming soon.',
    canonicalPath: '/pricing',
  });

  return (
    <>
      <PageHero
        eyebrow="PLANS & PRICING"
        eyebrowIcon={<CreditCard className="w-3.5 h-3.5" />}
        title={
          <>
            Simple plans. A clearer way to{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              manage your school.
            </span>
          </>
        }
        description="Start today through our Founding School Pilot Program while standard subscription plans are being finalized."
      />

      {/* Section 1: Founding Pilot Card + Cloud-Veiled Upcoming Plan Cards */}
      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          {/* Founding Pilot Program Card */}
          <Card
            variant="elevated"
            className="p-6 sm:p-8 lg:p-10 ring-2 bg-white"
            style={{ borderColor: theme.hex }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="theme" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                    OPEN NOW • FOUNDING SCHOOL PILOT
                  </Badge>
                  <Badge variant="success" size="sm">
                    Free of Cost
                  </Badge>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Founding School Pilot Program
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our Founding School Pilot Program is <strong>absolutely free of cost</strong> and{' '}
                  <strong>cancellable anytime</strong>—so your school can evaluate SchoolChakra in real daily operations with zero financial commitment.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs sm:text-sm font-medium text-slate-700">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Absolutely free of cost
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Cancellable anytime
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-3 shrink-0 lg:min-w-[260px]">
                <Button
                  type="button"
                  onClick={openPilotModal}
                  size="lg"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply for Founding Pilot
                </Button>
                <Link to="/pilot-program" className="block">
                  <Button variant="outline" size="md" fullWidth>
                    Read Full Pilot Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Upcoming Plan Cards (Previous 4-card structure veiled by a cloud foreground) */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500">
                UPCOMING PLANS
              </h3>
              <span className="text-xs text-slate-500">
                Pricing and plan entitlements are coming soon
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {UPCOMING_PLANS.map((plan) => (
                <Card
                  key={plan.id}
                  className="flex flex-col justify-between p-6 relative overflow-hidden bg-white"
                >
                  {/* Visible Plan Header */}
                  <div className="relative z-20 flex items-center justify-between gap-2 mb-3">
                    <h4 className="text-lg font-extrabold text-slate-900">{plan.name}</h4>
                    <Badge variant="outline" size="xs">
                      Coming soon
                    </Badge>
                  </div>

                  {/* Masked Previous Card Structure Underneath Cloud Veil */}
                  <div className="relative flex-1 flex flex-col justify-between">
                    <div
                      aria-hidden="true"
                      className="select-none pointer-events-none blur-[4.5px] opacity-45 flex flex-col justify-between flex-1"
                    >
                      <div>
                        {/* Masked Price Row */}
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-400 font-mono">
                            ₹ ••••
                          </span>
                          <span className="text-xs font-medium text-slate-400">/ ••••</span>
                        </div>
                        <div className="mt-2 h-3 w-28 rounded-full bg-slate-200/80" />

                        {/* Masked Description & Features List */}
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                          <div className="h-3.5 w-3/4 rounded-full bg-slate-200" />
                          <div className="h-3 w-full rounded-full bg-slate-100" />
                        </div>

                        <ul className="mt-4 space-y-2.5">
                          {MASKED_FEATURE_WIDTHS.map((widthClass, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                              <span className={`h-3 ${widthClass} rounded-full bg-slate-200/90`} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Masked Button Silhouette */}
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <div className="h-10 w-full rounded-full bg-slate-200/90" />
                      </div>
                    </div>

                    {/* Soft Cloud-Like Foreground Veil */}
                    <div
                      className="absolute -inset-2 z-10 flex flex-col items-center justify-center text-center px-4 backdrop-blur-[2px]"
                      style={{
                        background:
                          'radial-gradient(circle at 25% 28%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.68) 45%, transparent 72%), radial-gradient(circle at 78% 35%, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.65) 48%, transparent 74%), radial-gradient(circle at 50% 62%, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.88) 55%, rgba(255,255,255,0.72) 100%)',
                      }}
                    >
                      <div className="inline-flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.12)]">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                          Coming soon
                        </span>
                        <span className="text-[11px] text-slate-500 leading-snug max-w-[180px]">
                          Pricing &amp; plan details will be announced soon
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pricing FAQs */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
            title="Questions about the Founding Pilot and upcoming plans"
            align="center"
          />

          <FAQAccordion items={PRICING_FAQS} defaultOpenIndex={0} className="max-w-3xl mx-auto" />
        </div>
      </section>

      <CTASection
        eyebrow="NEED GUIDANCE?"
        title="Interested in joining the Founding Pilot?"
        description="Apply directly for the free Founding Pilot or talk to our team about your school's requirements."
        primaryLabel="Apply for Founding Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="Talk to Us"
        secondaryTo="/contact"
        surface="slate"
      />
    </>
  );
}
