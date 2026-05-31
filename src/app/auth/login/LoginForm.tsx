"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = { error: null };

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

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

      {state.error && (
        <p className="border border-red-800/40 bg-red-900/20 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-brand-500 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-surface-900 transition-colors hover:bg-brand-400 disabled:opacity-50"
      >
        {pending ? "Se procesează..." : "Intră în cont"}
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
