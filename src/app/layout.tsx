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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <nav className="border-b border-surface-200 bg-white px-6 py-3 dark:border-surface-700 dark:bg-surface-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-brand-600 hover:text-brand-700"
            >
              Betivi
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-surface-600 dark:text-surface-400">
                    {user.email}
                  </span>
                  <Link
                    href="/auth/logout"
                    className="text-sm font-medium text-surface-700 hover:text-brand-600 dark:text-surface-300"
                  >
                    Ieși
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-surface-700 hover:text-brand-600 dark:text-surface-300"
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
