import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SessionRefresher } from "@/components/SessionRefresher";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Betivi — Comunitatea băutorilor din România",
  description: "Descoperă baruri, cramă, berării și locuri de băut din România.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user ?? null;
  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    null;

  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-surface-900 text-surface-100">
        <nav className="sticky top-0 z-50 border-b border-surface-700/60 bg-surface-900/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            {/* Wordmark */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl">🍺</span>
              <span
                className="text-lg font-bold tracking-tight text-brand-400 transition-colors group-hover:text-brand-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                betivi.ro
              </span>
            </Link>

            {/* Center links */}
            <div className="hidden items-center gap-8 md:flex">
              {[
                { href: "/", label: "Acasă" },
                { href: "/harta", label: "Harta Birturilor" },
                { href: "/tracker", label: "Tracker" },
                ...(user ? [{ href: "/profile", label: "Profilul Meu" }] : []),
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-surface-300 transition-colors hover:text-brand-400"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right CTA */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="hidden text-sm text-surface-400 md:block">
                    {displayName}
                  </span>
                  <Link
                    href="/auth/logout"
                    className="border border-surface-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-surface-400 transition-colors hover:border-brand-500 hover:text-brand-400"
                  >
                    Ieși
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="hidden text-sm font-medium text-surface-400 transition-colors hover:text-brand-400 md:block"
                  >
                    Intră
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="border border-brand-500 px-5 py-2 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
                  >
                    Devino Membru
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <SessionRefresher />
        {children}
      </body>
    </html>
  );
}
