import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../contexts';
import { usePageMeta } from '../seo/usePageMeta';
import { submitContactEnquiry } from '../services/leadService';
import { openCalModal } from '../utils/cal';
import { OPEN_APP_URL } from '../data/navigation';
import { Badge, Button, Card } from '../components/ui';
import { PageHero, PlaceholderNotice } from '../components/shared';

const ROLE_OPTIONS = [
  'School Administrator',
  'Principal / School Owner',
  'Teacher',
  'Accounts / Finance',
  'Other',
] as const;

const ENQUIRY_TOPICS = [
  'Product demonstration',
  'Pricing and plans',
  'Data migration',
  'Founding Pilot',
  'General enquiry',
] as const;

export function ContactPage() {
  const { theme } = useTheme();

  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<string>(ROLE_OPTIONS[0]);
  const [studentStrength, setStudentStrength] = useState('');
  const [topic, setTopic] = useState<string>(ENQUIRY_TOPICS[0]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    submitted: boolean;
    deliveredRemotely: boolean;
    submissionId: string;
    message: string;
  } | null>(null);

  usePageMeta({
    title: 'Contact Us — SchoolChakra',
    description:
      'Get in touch with SchoolChakra for a product demonstration, pricing guidance, data migration questions, or Founding Pilot enquiries.',
    canonicalPath: '/contact',
  });

  const envPhone = (import.meta.env.VITE_WHATSAPP_PHONE as string) || '';
  const rawPhone = envPhone && envPhone !== '919876543210' ? envPhone : '917289949342';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi SchoolChakra Team! Enquiry from *${fullName || 'School Representative'}* at *${
      schoolName || 'Our School'
    }* (${role}) regarding: ${topic}.${
      submitResult?.submissionId ? ` Ref: ${submitResult.submissionId}` : ''
    }`
  )}`;

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!schoolName.trim()) nextErrors.schoolName = 'Please enter your school name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 8) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const result = await submitContactEnquiry({
      fullName: fullName.trim(),
      schoolName: schoolName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      studentStrength: studentStrength.trim() || undefined,
      topic,
    });

    setSubmitResult({
      submitted: true,
      deliveredRemotely: Boolean(result.deliveredRemotely),
      submissionId: result.submissionId,
      message: result.message,
    });
    setIsSubmitting(false);
  };

  const handleOpenScheduler = async () => {
    await openCalModal({
      schoolName: schoolName || undefined,
      contactName: fullName || undefined,
      contact: email || phone || undefined,
      studentStrength: studentStrength || undefined,
      brandColor: theme.hex,
    });
  };

  return (
    <>
      <PageHero
        eyebrow="CONTACT & ENQUIRIES"
        eyebrowIcon={<Mail className="w-3.5 h-3.5" />}
        title={
          <>
            Let&rsquo;s talk about{' '}
            <span
              className="font-normal italic"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              your school.
            </span>
          </>
        }
        description="Whether you're exploring SchoolChakra, considering a switch from spreadsheets or looking for a suitable plan, we'd be happy to hear from you."
      />

      <section className="relative z-10 w-full bg-slate-50 py-14 sm:py-18 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Section 1: Contact Form */}
            <Card variant="elevated" className="lg:col-span-7 p-6 sm:p-8">
              {submitResult?.submitted ? (
                <div className="space-y-5 py-2 animate-fadeIn">
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

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-slate-700 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      REF: {submitResult.submissionId}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {submitResult.deliveredRemotely
                        ? `Enquiry received for ${schoolName}`
                        : 'Remote delivery could not be confirmed'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {submitResult.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={handleOpenScheduler}
                      leftIcon={<Calendar className="w-4 h-4" />}
                    >
                      Schedule a 20-minute walkthrough
                    </Button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" leftIcon={<MessageSquare className="w-4 h-4" />}>
                        Connect on WhatsApp
                      </Button>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitResult(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Send an enquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Tell us a little about your school. We&rsquo;ll help you understand where SchoolChakra fits.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label htmlFor="contact-full-name" className="block font-semibold text-slate-700 mb-1">
                        Full name *
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Dr. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-school-name" className="block font-semibold text-slate-700 mb-1">
                        School name *
                      </label>
                      <input
                        id="contact-school-name"
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
                      <label htmlFor="contact-email" className="block font-semibold text-slate-700 mb-1">
                        Work email *
                      </label>
                      <input
                        id="contact-email"
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
                      <label htmlFor="contact-phone" className="block font-semibold text-slate-700 mb-1">
                        Phone number *
                      </label>
                      <input
                        id="contact-phone"
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

                    <div>
                      <label htmlFor="contact-role" className="block font-semibold text-slate-700 mb-1">
                        Your role
                      </label>
                      <select
                        id="contact-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                      >
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-strength" className="block font-semibold text-slate-700 mb-1">
                        Approximate student strength <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-strength"
                        type="text"
                        value={studentStrength}
                        onChange={(e) => setStudentStrength(e.target.value)}
                        placeholder="e.g., 650 students"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm">
                    <label htmlFor="contact-topic" className="block font-semibold text-slate-700 mb-1">
                      What would you like to discuss?
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                    >
                      {ENQUIRY_TOPICS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
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
                      {isSubmitting ? 'Submitting enquiry…' : 'Submit enquiry'}
                    </Button>
                  </div>
                </form>
              )}
            </Card>

            {/* Section 2: Verified Alternative Contact Channels */}
            <div className="lg:col-span-5 space-y-5">
              <Card className="bg-white p-6 space-y-4">
                <Badge variant="outline" size="xs">VERIFIED CONTACT CHANNELS</Badge>
                <h2 className="text-lg font-bold text-slate-900">Direct ways to connect</h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900">Schedule a 20-minute walkthrough</span>
                      <Calendar className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-600">
                      Pick a slot via Cal.com for a guided look at Administrator, Teacher, Student, and Accounts workflows.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleOpenScheduler}
                    >
                      Open walkthrough scheduler
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900">WhatsApp direct contact</span>
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-600">
                      Verified founder WhatsApp number configured for pilot and product enquiries: <span className="font-mono font-semibold text-slate-800">+{cleanPhone}</span>.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                      style={{ color: theme.hex }}
                    >
                      <span>Message on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="font-bold text-slate-900">Existing school users</div>
                    <p className="text-xs text-slate-600">
                      If your school already uses SchoolChakra, you can sign in to the application directly or use the in-app Report an Issue tool.
                    </p>
                    <a
                      href={OPEN_APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                      style={{ color: theme.hex }}
                    >
                      <span>Open SchoolChakra App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </Card>

              <PlaceholderNotice
                label="Additional contact details"
                title="Office address & support email"
                message="A public corporate street address, dedicated email inbox, and social media profiles are not currently published in this website configuration. Please use the enquiry form, WhatsApp contact, or walkthrough scheduler above."
                ctaLabel=""
                ctaTo=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
