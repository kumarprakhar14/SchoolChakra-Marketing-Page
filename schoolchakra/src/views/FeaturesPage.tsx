import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { Link } from '../router';
import { CONNECTED_WORKFLOW_STEPS, FEATURE_CATEGORIES } from '../data/features';
import { Badge, Button, Card } from '../components/ui';
import { CTASection, PageHero, SectionHeader } from '../components/shared';
import { CategoryPreview } from '../components/features/CategoryPreview';

export function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="COMPLETE PRODUCT CAPABILITIES"
        eyebrowIcon={<Layers className="w-3.5 h-3.5" />}
        title={
          <>
            Everything your school needs.{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              All in one place.
            </span>
          </>
        }
        description="From student records and attendance to academic planning, assignments and fee management, bring your school's everyday operations into one connected platform."
        actions={
          <>
            <Link to="/demo">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore the Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </>
        }
      >
        {/* Compact Hero Dashboard Preview */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.10)] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                CONNECTED SCHOOL MODULES
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Six core modules sharing one academic &amp; user foundation
              </h2>
            </div>
            <Link
              to="/demo"
              className="text-xs font-semibold hover:underline"
              style={{ color: 'var(--brand-hex, #2563EB)' }}
            >
              Open interactive workspace →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            {FEATURE_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-colors text-left"
              >
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {cat.code.split('•')[0].trim()}
                </span>
                <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                  {cat.code.split('•')[1]?.trim()}
                </div>
              </a>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Feature Categories (Alternating Showcase Layout) */}
      {FEATURE_CATEGORIES.map((category, idx) => {
        const isSlate = idx % 2 === 0;
        const reverseOrder = idx % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            className={`relative z-10 w-full py-14 sm:py-18 scroll-mt-24 ${
              isSlate ? 'bg-slate-50 border-y border-slate-200/60' : 'bg-white'
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className={`lg:col-span-6 space-y-5 ${reverseOrder ? 'lg:order-2' : ''}`}>
                  <Badge variant="outline" size="xs">{category.code}</Badge>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {category.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {category.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {category.highlights.map((item) => (
                      <Card key={item.title} padding="sm" className="bg-white">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: 'var(--brand-hex, #2563EB)' }}
                          />
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-6 ${reverseOrder ? 'lg:order-1' : ''}`}>
                  <div className="rounded-3xl bg-slate-100/80 border border-slate-200/90 p-3 sm:p-4">
                    <CategoryPreview type={category.previewType} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Connected Workflows */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="CONNECTED WORKFLOWS"
            title="How modules work together across the school"
            description="Changes made in one workspace immediately inform the next—eliminating duplicate entry between administration, classrooms, and the fee desk."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CONNECTED_WORKFLOW_STEPS.map((item) => (
              <Card key={item.step} className="flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="w-7 h-7 rounded-full text-white font-mono text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: 'var(--brand-hex, #2563EB)' }}
                    >
                      {item.step}
                    </span>
                    <Badge variant="outline" size="xs">{item.role}</Badge>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="FOUNDING PILOT"
        title="Bring your school's operations together."
        description="Explore the interactive demo or apply for the Founding School Pilot to see how SchoolChakra fits your school's daily workflows."
        primaryLabel="Apply for Founding Pilot"
        primaryAction="pilot-modal"
        secondaryLabel="View Role Solutions"
        secondaryTo="/solutions"
        surface="white"
      />
    </>
  );
}
