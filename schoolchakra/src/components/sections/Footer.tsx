import { FOOTER_COLUMNS } from '../../data/navigation';
import { Link } from '../../router';
import { PilotFooterTrigger } from '../shared';
import { Wordmark } from '../Wordmark';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/60 py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/80">
          {/* Brand Area */}
          <div className="md:col-span-4 space-y-3">
            <Link to="/" aria-label="SchoolChakra" className="inline-flex items-center gap-2.5 group">
              <img
                src="/App_logo_light.png"
                alt=""
                aria-hidden="true"
                className="w-7 h-7 object-contain shrink-0 transition-transform group-hover:scale-105"
              />
              <Wordmark className="text-base leading-none" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs">
              School management platform for student records, attendance, timetables, assignments, notices, and fee operations.
            </p>
            <div className="pt-1">
              <PilotFooterTrigger />
            </div>
          </div>

          {/* Grouped Link Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  {col.title}
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {col.links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="hover:text-slate-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <span className="font-mono text-slate-400">© {CURRENT_YEAR} SchoolChakra</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
            <span>
              Privacy Policy &amp; Terms of Service pages are pending publication.{' '}
              <Link to="/contact" className="underline hover:text-slate-800">
                Contact us
              </Link>{' '}
              for policy inquiries.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
