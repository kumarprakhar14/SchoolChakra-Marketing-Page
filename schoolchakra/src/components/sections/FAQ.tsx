import { HelpCircle, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import { Badge } from '../ui';
import { FAQAccordion, type AccordionItem } from '../shared';

const FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'What does the Founding Pilot cost?',
    answer:
      'The 30-day pilot is completely free with zero setup fees and no credit card required. Founding partner schools receive done-for-you CSV data migration, custom brand styling, and lock in our founding-partner subscription pricing for life when transitioning to production.',
  },
  {
    question: 'What happens after the 30-day pilot ends?',
    answer:
      'At the end of 30 days, your leadership team decides whether SchoolChakra reduced your staff’s administrative load. If you choose to continue, your locked-in founding partner rate activates. If not, we hand you a complete export of all your data in standard CSV/Excel format with zero friction.',
  },
  {
    question: 'Which boards and school structures are supported?',
    answer:
      'CBSE, ICSE, State Boards, and IB/IGCSE. SchoolChakra is built specifically for Indian school workflows — supporting term-wise and quarterly fee schedules, UPI UTR verification, 6-day academic timetables with double-booking prevention, and CBSE board attendance thresholds (<75%).',
  },
  {
    question: 'Who owns our school’s data, and can we export it?',
    answer:
      'Your school owns 100% of its data. Every record is strictly isolated to your school tenant on every database query. You can export complete student rosters, fee ledgers, and attendance archives to raw CSV or Excel anytime with a single click. There is zero vendor lock-in.',
  },
  {
    question: 'How much effort does onboarding require from our staff?',
    answer:
      'Under 20 minutes of initial leadership time. On Day 0, we do a 20-minute kickoff call. On Days 1–2, our engineering team migrates and cleans your legacy Excel sheets. On Day 3, we train your teachers and accounts staff. On Day 4, your school is live.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <Badge variant="outline" size="xs" leftIcon={<HelpCircle className="w-3.5 h-3.5" />}>
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2.5">
            Everything leadership asks before{' '}
            <span className="font-normal italic" style={{ fontFamily: 'var(--font-serif)' }}>
              joining the pilot.
            </span>
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-xl mx-auto">
            Honest answers to common questions about pricing, data ownership, curriculum support, and staff onboarding.
          </p>
        </div>

        {/* Founder Trust Callout */}
        <div className="max-w-3xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5"
            style={{ backgroundColor: 'var(--brand-hex, #2563EB)' }}
          >
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">
              Built alongside 20+ Indian school administrators
            </span>
            Most ERPs fail because they were adapted from corporate HR tools or foreign universities. We sat inside administrative offices watching fee queues on fee day, paper registers during morning roll call, and timetable conflict chaos on Monday mornings — so SchoolChakra solves what actually breaks.
          </div>
        </div>

        {/* Accordion List */}
        <FAQAccordion items={FAQ_ITEMS} defaultOpenIndex={0} className="max-w-3xl mx-auto" />

        {/* Trust Badges Bar */}
        <div className="max-w-2xl mx-auto mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Shield className="w-4 h-4 text-blue-600 shrink-0" /> Zero vendor lock-in
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 4-day assisted go-live
          </span>
        </div>
      </div>
    </section>
  );
}
