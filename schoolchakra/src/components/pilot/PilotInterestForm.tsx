'use client';

import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { getWhatsAppPhone } from '../../config/env';
import { submitContactEnquiry } from '../../services/leadService';
import { Button, Card } from '../ui';

export function PilotInterestForm() {
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

  const cleanPhone = getWhatsAppPhone();

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
  );
}
