"use client";

import { useState } from "react";
import Link from "next/link";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });

    if (!res.ok) {
      const body = (await res.json()) as { error: string };
      setError(body.error);
      setLoading(false);
      return;
    }

    // Hard navigation so the browser sends the fresh session cookies
    window.location.href = redirectTo;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-xs font-semibold uppercase tracking-widest text-surface-400"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-surface-700 bg-surface-800 px-3 py-2 text-surface-100 placeholder-surface-600 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-xs font-semibold uppercase tracking-widest text-surface-400"
        >
          Parolă
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full border border-surface-700 bg-surface-800 px-3 py-2 text-surface-100 placeholder-surface-600 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {error && (
        <p className="border border-red-800/40 bg-red-900/20 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-brand-500 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-surface-900 transition-colors hover:bg-brand-400 disabled:opacity-50"
      >
        {loading ? "Se procesează..." : "Intră în cont"}
      </button>

      <p className="text-center text-sm text-surface-500">
        Nu ai cont?{" "}
        <Link href="/auth/signup" className="text-brand-400 hover:text-brand-300">
          Înregistrează-te
        </Link>
      </p>
    </form>
  );
}
