"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email sau parolă incorectă. Încearcă din nou.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get("redirectTo") ?? "/";
    // Hard reload so the server picks up the fresh session cookies
    window.location.href = redirectTo;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-lg border border-surface-200 bg-white p-8 shadow-sm dark:border-surface-700 dark:bg-surface-900">
        <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-50">
          Intră în cont
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-surface-300 px-3 py-2 text-surface-900 focus:border-brand-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
            >
              Parolă
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-surface-300 px-3 py-2 text-surface-900 focus:border-brand-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-50"
            />
          </div>
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-500 px-4 py-2 font-medium text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
          >
            {loading ? "Se procesează..." : "Intră"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-surface-600 dark:text-surface-400">
          Nu ai cont?{" "}
          <Link href="/auth/signup" className="text-brand-600 hover:text-brand-700">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </main>
  );
}
