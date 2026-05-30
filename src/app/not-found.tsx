import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-2 text-6xl font-bold text-brand-600">404</h1>
      <p className="mb-6 text-center text-surface-600 dark:text-surface-400">
        Pagina nu a fost găsită.
      </p>
      <Link
        href="/"
        className="rounded-md bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Înapoi acasă
      </Link>
    </main>
  );
}
