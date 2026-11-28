import {
  Calendar,
  ExternalLink,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { getWhatsAppPhone } from '../config/env';
import { OPEN_APP_URL } from '../data/navigation';
import { Badge, Card } from '../components/ui';
import { PageHero, PlaceholderNotice } from '../components/shared';
import { ContactEnquiryForm } from '../components/contact/ContactEnquiryForm';
import { WalkthroughSchedulerButton } from '../components/contact/WalkthroughSchedulerButton';

export function ContactPage() {
  const cleanPhone = getWhatsAppPhone();
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hi SchoolChakra Team! We would like to connect regarding SchoolChakra.'
  )}`;

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
              style={{ fontFamily: 'var(--font-serif)' }}
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
            <ContactEnquiryForm />

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
                    <WalkthroughSchedulerButton />
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
                      style={{ color: 'var(--brand-hex, #2563EB)' }}
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
                      style={{ color: 'var(--brand-hex, #2563EB)' }}
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
