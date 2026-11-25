import { useState, useEffect, type FormEvent } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useTheme } from '../../contexts';
import { useUI } from '../../contexts';
import { Button, Badge } from '../ui';
import { openCalModal, type CalBookingDetails } from '../../utils/cal';
import {
  submitLeadToGoogleSheets,
  logCalBookingToGoogleSheets,
  generateSubmissionId,
} from '../../services/leadService';

export function PilotModal() {
  const { theme } = useTheme();
  const {
    isPilotModalOpen,
    setIsPilotModalOpen,
    pilotSubmitted,
    setPilotSubmitted,
    pilotBoard,
    setPilotBoard,
    pilotSchoolName,
    setPilotSchoolName,
    pilotContactName,
    setPilotContactName,
    pilotContact,
    setPilotContact,
  } = useUI();

  // Local state for submission, Cal.com booking sync, and error handling
  const [submissionId, setSubmissionId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBookingDate, setConfirmedBookingDate] = useState<string | null>(null);
  const [isCalOpening, setIsCalOpening] = useState(false);

  // Close on Escape & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPilotModalOpen(false);
    };
    if (isPilotModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPilotModalOpen, setIsPilotModalOpen]);

  if (!isPilotModalOpen) return null;

  // 1. Submit Form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pilotSchoolName.trim() || !pilotContactName.trim() || !pilotContact.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const newSubId = generateSubmissionId();
    setSubmissionId(newSubId);

    try {
      await submitLeadToGoogleSheets({
        submissionId: newSubId,
        schoolName: pilotSchoolName.trim(),
        contactName: pilotContactName.trim(),
        board: pilotBoard,
        contact: pilotContact.trim(),
      });

      setPilotSubmitted(true);
    } catch (err: any) {
      console.error('[SchoolChakra] Submission error:', err);
      setSubmitError(
        "We couldn't send your details just now, but they're saved on this device. You can still pick a time below."
      );
      setPilotSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Open Walkthrough Scheduler
  const handleOpenCal = async () => {
    setIsCalOpening(true);

    try {
      await openCalModal({
        schoolName: pilotSchoolName,
        contactName: pilotContactName,
        contact: pilotContact,
        board: pilotBoard,
        brandColor: theme.hex,
        onBookingOrReschedule: async (details: CalBookingDetails) => {
          const bookedTime = details.confirmedDateText || details.date || 'Confirmed Walkthrough';
          setConfirmedBookingDate(bookedTime);

          await logCalBookingToGoogleSheets({
            submissionId: submissionId || generateSubmissionId(),
            scheduledDate: bookedTime,
            calBookingUid: details.bookingUid,
            schoolName: pilotSchoolName,
            contactName: pilotContactName,
            contact: pilotContact,
            board: pilotBoard,
            isReschedule: details.isReschedule,
          });
        },
      });
    } catch (err) {
      console.warn('[SchoolChakra] Walkthrough scheduler launcher:', err);
    } finally {
      setIsCalOpening(false);
    }
  };

  // 3. Build WhatsApp Direct Link
  const envPhone = (import.meta.env.VITE_WHATSAPP_PHONE as string) || '';
  const rawPhone = (envPhone && envPhone !== '919876543210') ? envPhone : '917289949342';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    `Hi SchoolChakra Team! We just submitted our founding pilot request for *${
      pilotSchoolName || 'Our School'
    }* (${pilotBoard || 'CBSE'}).\nContact: ${pilotContactName || ''} (${pilotContact || ''})\nReference ID: ${
      submissionId || 'NEW-LEAD'
    }\nWould love to connect with your team for our sandbox walkthrough!`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsPilotModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Founding pilot application"
    >
      <div
        className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-5 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsPilotModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ═══ STEP 1: INITIAL FORM ═══ */}
        {!pilotSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-3 pr-8">
              <Badge variant="theme" size="sm" className="whitespace-normal text-[10px] sm:text-[11px]">
                FOUNDING PILOT COHORT • ROLLING INTAKE
              </Badge>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 pr-6">
              Apply for Founding School Pilot
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              We&rsquo;ll set up a private demo of SchoolChakra in your school&rsquo;s brand colors and walk your leadership through the Admin, Teacher, Accounts, and Student screens.
            </p>

            {submitError && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
              {/* Field 1: School / Institution Name* */}
              <div>
                <label htmlFor="pilot-school-name" className="block font-semibold text-slate-700 mb-1">
                  School / Institution Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="pilot-school-name"
                    type="text"
                    required
                    value={pilotSchoolName}
                    onChange={(e) => setPilotSchoolName(e.target.value)}
                    placeholder="e.g., Heritage International School, Pune"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow text-slate-900"
                  />
                </div>
              </div>

              {/* Field 2: Your Name* */}
              <div>
                <label htmlFor="pilot-contact-name" className="block font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  id="pilot-contact-name"
                  type="text"
                  required
                  value={pilotContactName}
                  onChange={(e) => setPilotContactName(e.target.value)}
                  placeholder="e.g., Dr. Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow text-slate-900"
                />
              </div>

              {/* Field 3: Principal / Administrator Phone or Email* */}
              <div>
                <label htmlFor="pilot-contact" className="block font-semibold text-slate-700 mb-1">
                  Principal / Administrator Phone or Email *
                </label>
                <input
                  id="pilot-contact"
                  type="text"
                  required
                  value={pilotContact}
                  onChange={(e) => setPilotContact(e.target.value)}
                  placeholder="+91 98765 43210 or principal@school.edu.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow text-slate-900"
                />
              </div>

              {/* Field 4: Affiliation Board */}
              <div>
                <label htmlFor="pilot-board" className="block font-semibold text-slate-700 mb-1">
                  Affiliation Board
                </label>
                <select
                  id="pilot-board"
                  value={pilotBoard}
                  onChange={(e) => setPilotBoard(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-xs sm:text-sm text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State">State Board</option>
                  <option value="IB / IGCSE">IB / IGCSE</option>
                </select>
              </div>

              <div className="pt-1">
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
                  style={{ backgroundColor: theme.hex }}
                >
                  {isSubmitting ? 'Sending…' : 'Request my free walkthrough'}
                </Button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                We only use your details to set up your pilot, and we never share them.
              </p>
            </form>
          </div>
        ) : (
          /* ═══ STEP 2: SUCCESS VIEW WITH ONE CLEAR NEXT STEP ═══ */
          <div className="text-center py-2 space-y-5 animate-in fade-in duration-300">
            {/* Top Success Badge */}
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-bold text-slate-700 mb-2 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                REF: {submissionId || 'SC-PILOT-CONFIRMED'}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Thank you. We&apos;ve received your request for {pilotSchoolName.trim() || 'your school'}.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Pick a time now, or we&apos;ll call you within one working day.
              </p>
            </div>

            {/* Confirmed Walkthrough Banner */}
            {confirmedBookingDate && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-1 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Walkthrough confirmed!</span>
                </div>
                <div className="text-xs text-emerald-800 pl-6">
                  Scheduled for: <strong className="font-semibold">{confirmedBookingDate}</strong>
                </div>
              </div>
            )}

            {/* One primary next step */}
            <div className="space-y-3 pt-1">
              <Button
                type="button"
                onClick={handleOpenCal}
                disabled={isCalOpening}
                fullWidth
                size="lg"
                className="text-sm sm:text-base px-4 sm:px-6"
                style={{ backgroundColor: theme.hex }}
              >
                {isCalOpening && <Loader2 className="w-4 h-4 animate-spin mr-2 shrink-0" />}
                Pick a time for your 20-minute walkthrough
              </Button>

              {/* Quiet WhatsApp text link */}
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-slate-900 underline transition-colors"
                >
                  Prefer WhatsApp? Message the founder
                </a>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsPilotModalOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1"
              >
                Done • Back to Interactive Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
