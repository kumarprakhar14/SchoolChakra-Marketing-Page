import { Info, ArrowRight } from 'lucide-react';
import { Link } from '../../router';

interface PlaceholderNoticeProps {
  label?: string;
  title?: string;
  message: string;
  ctaLabel?: string;
  ctaTo?: string;
  className?: string;
}

export function PlaceholderNotice({
  label = 'Currently being finalized',
  title,
  message,
  ctaLabel = 'Contact our team',
  ctaTo = '/contact',
  className = '',
}: PlaceholderNoticeProps) {
  return (
    <div
      className={`rounded-2xl bg-slate-50/90 border border-slate-200/90 p-5 sm:p-6 ${className}`}
      role="note"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
              {label}
            </span>
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2">
                {title}
              </h3>
            )}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
              {message}
            </p>
          </div>
        </div>

        {ctaTo && ctaLabel && (
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-white border border-slate-200 hover:border-slate-300 transition-colors shrink-0 self-start"
            style={{ color: 'var(--brand-hex, #2563EB)' }}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
