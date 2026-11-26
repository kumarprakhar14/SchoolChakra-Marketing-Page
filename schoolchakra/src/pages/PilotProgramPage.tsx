import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Compass,
  HelpCircle,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Unlock,
} from 'lucide-react';
import { useTheme } from '../contexts';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import { submitContactEnquiry } from '../services/leadService';
import {
  ELIGIBLE_SCHOOL_NEEDS,
  FREE_NO_OBLIGATION_POINTS,
  OPT_OUT_POINTS,
  PILOT_EXPECTATIONS,
  PILOT_HERO_FACTS,
  PILOT_PARTICIPANT_ACTIVITIES,
  PILOT_PARTICIPATION_STEPS,
  PILOT_PROGRAM_FAQS,
  PILOT_REASONS,
} from '../data/pilotProgram';
import { Badge, Button, Card } from '../components/ui';
import {
  FAQAccordion,
  PageHero,
  PlaceholderNotice,
  SectionHeader,
} from '../components/shared';

export function PilotProgramPage() {
  const { theme } = useTheme();

  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interestNotes, setInterestNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    submitted: boolean;
    deliveredRemotely: boolean;
    submissionId: string;
    message: string;
  } | null>(null);

  usePageMeta({
    title: 'SchoolChakra Pilot Program | Explore, Test & Grow Together',
    description:
      'Explore SchoolChakra during its active development through a completely free, voluntary pilot program for schools. Share feedback and opt out anytime.',
    canonicalPath: '/pilot-program',
  });

  const envPhone = (import.meta.env.VITE_WHATSAPP_PHONE as string) || '';
  const rawPhone = envPhone && envPhone !== '919876543210' ? envPhone : '917289949342';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!schoolName.trim()) nextErrors.schoolName = 'Please enter your school name.';
    if (!contactName.trim()) nextErrors.contactName = 'Please enter a contact person name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 8) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!interestNotes.trim()) {
      nextErrors.interestNotes = 'Please share a short note about your school’s interest.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const result = await submitContactEnquiry({
      fullName: contactName.trim(),
      schoolName: schoolName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: 'Pilot Program Enquiry',
      topic: 'Pilot Program',
      notes: interestNotes.trim(),
    });

    setSubmitResult({
      submitted: true,
      deliveredRemotely: Boolean(result.deliveredRemotely),
      submissionId: result.submissionId,
      message: result.message,
    });
    setIsSubmitting(false);
  };

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi SchoolChakra Team! We are interested in the Pilot Program for *${
      schoolName || 'Our School'
    }* (Contact: ${contactName || ''}).${
      submitResult?.submissionId ? ` Ref: ${submitResult.submissionId}` : ''
    }`
  )}`;

  return (
    <>
      {/* Section 1 — Hero: An Invitation to Build Together */}
      <PageHero
        eyebrow="PILOT PROGRAM • ACTIVE DEVELOPMENT"
        eyebrowIcon={<Compass className="w-3.5 h-3.5" />}
        title={
          <>
            Be Part of SchoolChakra&rsquo;s{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Journey
            </span>
          </>
        }
        description="SchoolChakra is actively evolving, and we're inviting schools to experience the platform at this stage. Explore its capabilities, use it in your school environment, and help us improve it through real-world feedback — completely free of cost."
        actions={
          <>
            <Button
              type="button"
              size="lg"
              onClick={() => scrollToSection('pilot-interest-form')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Join the Pilot Program
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('what-is-pilot')}
              rightIcon={<ArrowDown className="w-4 h-4" />}
            >
              Understand the Program
            </Button>
          </>
        }
      >
        {/* Three Prominent Facts */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILOT_HERO_FACTS.map((fact) => (
            <Card key={fact.label} className="bg-white p-5 text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.hex }} />
                <strong className="text-sm font-bold text-slate-900">{fact.label}</strong>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{fact.detail}</p>
            </Card>
          ))}
        </div>
      </PageHero>

      {/* Section 2 — What Is the Pilot Program? */}
      <section
        id="what-is-pilot"
        className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70 scroll-mt-24"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="outline" size="xs">WHAT IS THE PILOT PROGRAM?</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Testing and learning together in real school environments
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The SchoolChakra Pilot Program is an opportunity for selected schools to use the platform while it is still under active development. Instead of building in isolation, we want to understand how the software performs in actual school environments, how different people interact with it, and where it needs improvement.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed p-4 rounded-xl bg-white border border-slate-200/80">
                This program is designed for collaborative product testing, learning, and improvement. Not every workflow is finished or guaranteed to replace every existing school system immediately.
              </p>
            </div>

            <div className="lg:col-span-6">
              <Card className="bg-white p-6">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4">
                  Participating schools may:
                </h3>
                <ul className="space-y-3">
                  {PILOT_PARTICIPANT_ACTIVITIES.map((activity) => (
                    <li key={activity} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: theme.hex }}
                      />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Why Are We Running This Program? */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="WHY WE RUN THIS PILOT"
            title="Shaping SchoolChakra alongside real school needs"
            description="SchoolChakra remains responsible for building, maintaining, and improving the software. Inviting schools early helps ensure development stays grounded in practical reality."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILOT_REASONS.map((reason) => (
              <Card key={reason.number} className="bg-slate-50/70 p-6 flex flex-col justify-between">
                <div>
                  <span
                    className="text-xs font-mono font-bold tracking-wider"
                    style={{ color: theme.hex }}
                  >
                    {reason.number}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{reason.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — What Should Participating Schools Expect? */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="WHAT TO EXPECT"
            title="Honest expectations during active development"
            description="We want schools to enter the pilot with complete clarity about the current stage of the platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILOT_EXPECTATIONS.map((item) => (
              <Card key={item.title} className="bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <Badge variant="outline" size="xs">{item.badge}</Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="bg-white p-6 mt-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-slate-900">Communication and Feedback</h3>
              <Badge variant="theme" size="xs">FEEDBACK CHANNEL</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Signed-in school users can report bugs directly inside the application using the built-in <strong>Report an Issue</strong> option, or reach out through our <Link to="/contact" className="underline hover:text-slate-900">Contact page</Link>.
            </p>
            <PlaceholderNotice
              className="mt-4"
              label="Pending confirmation"
              title="Dedicated pilot feedback channel & response expectations"
              message="The dedicated feedback channel for participating pilot schools—and any operational response expectations—will be confirmed during onboarding. No fixed response times or guaranteed bug-fix timelines are promised at this stage."
              ctaLabel=""
              ctaTo=""
            />
          </Card>
        </div>
      </section>

      {/* Section 5 — How Does Participation Work? */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="PARTICIPATION JOURNEY"
            title="How participation works"
            description="A straightforward five-step journey from initial interest to exploring workflows and sharing feedback—with no rigid or guaranteed rollout timeline."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PILOT_PARTICIPATION_STEPS.map((item) => (
              <Card key={item.step} className="bg-slate-50/70 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="w-7 h-7 rounded-full text-white font-mono text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: theme.hex }}
                    >
                      {item.step}
                    </span>
                    <Badge variant="outline" size="xs">Step {item.step}</Badge>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Completely Free. No Obligation. */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <Card
            variant="elevated"
            className="p-6 sm:p-10 bg-white ring-2"
            style={{ borderColor: theme.hex }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <Badge variant="success" size="sm">COMPLETELY FREE • NO OBLIGATION</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Try It Without a Financial Commitment.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Participation in the current SchoolChakra Pilot Program is completely free of cost. There are no subscription charges, pilot participation fees, or payment obligations during this stage.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Opting out does not require your school to complete the pilot or submit a minimum amount of feedback. Note that free participation applies to the current pilot stage and does not guarantee permanent free access once future commercial plans and terms are announced.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 sm:p-6 space-y-3">
                  {FREE_NO_OBLIGATION_POINTS.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 7 — Your Freedom to Opt Out */}
      <section id="opt-out" className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="outline" size="xs" leftIcon={<Unlock className="w-3.5 h-3.5" />}>
                VOLUNTARY PARTICIPATION
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                You&rsquo;re Free to Leave, Anytime.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We understand that every school has its own priorities and operational requirements. Participating in the pilot does not lock your school into a contract or a long-term commitment. If SchoolChakra does not meet your expectations, or if your school simply decides not to continue, you can opt out at any time.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <Card className="bg-slate-50/70 p-6">
                <ul className="space-y-3">
                  {OPT_OUT_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: theme.hex }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <PlaceholderNotice
                label="Data handling pending confirmation"
                title="Data retention, export, and deletion after opting out"
                message="The exact procedure for exporting, retaining, or deleting school data after opting out of the Pilot Program is currently being finalized. Please confirm these data-handling details with the SchoolChakra team during your initial discussion before participating."
                ctaLabel="Ask about data handling"
                ctaTo="/contact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — Who Can Participate? */}
      <section className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Badge variant="outline" size="xs">WHO CAN PARTICIPATE</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Designed for schools open to exploring together
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The pilot is intended for schools interested in exploring a digital platform for their day-to-day academic and administrative workflows and willing to share practical feedback as the product evolves.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Participation depends on suitability and current onboarding availability, which our team will discuss with you openly during the initial conversation.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ELIGIBLE_SCHOOL_NEEDS.map((need) => (
                <Card key={need} padding="sm" className="bg-white flex items-start gap-2.5 p-4">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: theme.hex }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                    {need}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 — Frequently Asked Questions */}
      <section className="relative z-10 w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeader
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
            title="Clear answers before you decide"
            description="Straightforward answers on product maturity, participation terms, opt-out freedom, and pending data policies."
            align="center"
          />
          <FAQAccordion
            items={PILOT_PROGRAM_FAQS}
            defaultOpenIndex={0}
            className="max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Section 10 — Final CTA & Express Interest Form */}
      <section
        id="pilot-interest-form"
        className="relative z-10 w-full bg-slate-50 py-16 sm:py-20 border-t border-slate-200/70 scroll-mt-24"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div
              className="lg:col-span-5 rounded-3xl p-7 sm:p-9 text-white shadow-xl transition-all duration-700"
              style={{
                background: `radial-gradient(circle at top left, ${theme.hex}D9 0%, transparent 65%), linear-gradient(140deg, #1E293B 0%, #0B0F19 100%)`,
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-mono uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PILOT PROGRAM</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Help Us Build Something Schools Can Rely On.
              </h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mt-3">
                If your school is interested in exploring SchoolChakra and contributing to its evolution, we&rsquo;d love to hear from you.
              </p>
              <p className="text-xs font-mono text-white/80 mt-6 pt-5 border-t border-white/15">
                Completely free. No obligation. Opt out anytime.
              </p>
            </div>

            <Card variant="elevated" className="lg:col-span-7 p-6 sm:p-8 bg-white">
              {submitResult?.submitted ? (
                <div className="space-y-4 py-2 animate-fadeIn">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      submitResult.deliveredRemotely
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {submitResult.deliveredRemotely ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <AlertCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    REF: {submitResult.submissionId}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {submitResult.deliveredRemotely
                      ? `Pilot interest recorded for ${schoolName}`
                      : 'Remote delivery could not be confirmed'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {submitResult.message}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" leftIcon={<MessageSquare className="w-4 h-4" />}>
                        Connect on WhatsApp
                      </Button>
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSubmitResult(null)}
                    >
                      Submit another note
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      Express Interest in the Pilot
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Share basic contact details and a short note so we can schedule an initial discussion.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label htmlFor="pilot-prog-school" className="block font-semibold text-slate-700 mb-1">
                        School name *
                      </label>
                      <input
                        id="pilot-prog-school"
                        type="text"
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g., Heritage International School"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.schoolName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.schoolName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pilot-prog-contact-name" className="block font-semibold text-slate-700 mb-1">
                        Contact person&rsquo;s name *
                      </label>
                      <input
                        id="pilot-prog-contact-name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g., Dr. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.contactName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.contactName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pilot-prog-email" className="block font-semibold text-slate-700 mb-1">
                        Work email *
                      </label>
                      <input
                        id="pilot-prog-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="principal@school.edu.in"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pilot-prog-phone" className="block font-semibold text-slate-700 mb-1">
                        Phone number *
                      </label>
                      <input
                        id="pilot-prog-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm">
                    <label htmlFor="pilot-prog-notes" className="block font-semibold text-slate-700 mb-1">
                      What would your school like to explore in the pilot? *
                    </label>
                    <textarea
                      id="pilot-prog-notes"
                      rows={3}
                      required
                      value={interestNotes}
                      onChange={(e) => setInterestNotes(e.target.value)}
                      placeholder="Briefly describe your current setup (e.g., attendance, fees, timetables) and what you'd like to test."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.interestNotes && (
                      <p className="text-xs text-rose-600 mt-1">{errors.interestNotes}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                    rightIcon={
                      isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )
                    }
                  >
                    {isSubmitting ? 'Submitting interest…' : 'Express Interest in the Pilot'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
