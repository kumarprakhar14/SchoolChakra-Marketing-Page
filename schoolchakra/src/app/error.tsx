'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[SchoolChakra] Route error:', error);
  }, [error]);

  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center space-y-5">
      <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
        Something went wrong
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
        We couldn&rsquo;t load this page.
      </h1>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
        An unexpected error occurred while rendering this view. You can try again or return to the
        overview.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-95"
          style={{ backgroundColor: 'var(--brand-hex, #2563EB)' }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Back to Overview
        </Link>
      </div>
    </section>
  );
}
