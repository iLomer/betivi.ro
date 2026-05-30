"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Error reported to monitoring service if integrated
    void error;
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-2xl font-bold text-surface-900 dark:text-surface-100">
        Oops!
      </h1>
      <p className="mb-6 text-center text-surface-600 dark:text-surface-400">
        A apărut o eroare neașteptată. Te rugăm să reîncarci pagina.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Reîncarcă pagina
      </button>
    </main>
  );
}
