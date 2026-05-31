import { LoginForm } from "./LoginForm";

export const metadata = { title: "Intră în cont — Betivi" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo = "/" } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm border border-surface-700 bg-surface-800/60 p-8">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500/70">
          Asociația Națională a Beților
        </p>
        <h1
          className="mb-8 text-2xl font-black text-surface-100"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Intră în cont
        </h1>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </main>
  );
}
