import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Betivi — Comunitatea băutorilor din România",
  description: "Descoperă baruri, cramă, berării și locuri de băut din România.",
};

const NAV_LINKS = [
  { href: "/venues", label: "Locații" },
  { href: "/harta", label: "Harta" },
  { href: "/tracker", label: "Tracker" },
  { href: "/producatori", label: "Producători" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    null;

  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface-900 text-surface-100">
        <nav className="sticky top-0 z-50 border-b border-surface-700/50 bg-surface-900/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
            {/* Wordmark */}
            <Link href="/" className="group flex items-baseline gap-1">
              <span
                className="text-xl font-black tracking-tight transition-colors group-hover:text-brand-300"
                style={{
                  background:
                    "linear-gradient(90deg, #f59e0b, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Betivi
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-surface-600">
                .ro
              </span>
            </Link>

            {/* Nav links — hidden on small screens */}
            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-surface-400 transition-colors hover:text-surface-100"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Auth */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="hidden text-sm font-medium text-surface-400 transition-colors hover:text-surface-100 md:block"
                  >
                    {displayName}
                  </Link>
                  <Link
                    href="/auth/logout"
                    className="text-xs font-semibold uppercase tracking-widest text-surface-600 transition-colors hover:text-brand-400"
                  >
                    Ieși
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="border border-brand-500/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-400 transition-colors hover:border-brand-400 hover:text-brand-300"
                >
                  Intră
                </Link>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
