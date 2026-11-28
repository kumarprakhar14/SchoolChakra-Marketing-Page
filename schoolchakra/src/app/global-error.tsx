'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[SchoolChakra] Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased flex items-center justify-center p-6">
        <div className="max-w-lg text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-600">
            An unexpected application error occurred. Please reload or try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
