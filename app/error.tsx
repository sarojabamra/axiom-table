'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 rounded-lg border border-secondaryStroke bg-backgroundTertiary p-8 text-center">
        <div className="text-4xl">⚠️</div>
        <h2 className="text-xl font-semibold text-textPrimary">Something went wrong!</h2>
        <p className="text-sm text-textTertiary max-w-md">
          We encountered an unexpected error. Please try again or refresh the page.
        </p>
        {error.message && (
          <p className="text-xs text-textTertiary bg-primaryStroke/30 px-3 py-2 rounded-md max-w-md">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="bg-[#5B7FFF] hover:bg-[#5B7FFF]/80 text-black px-6 py-2 rounded-full font-bold text-sm transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
