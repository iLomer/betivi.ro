"use client";

import { useActionState } from "react";
import { updateProfile, type UpdateProfileState } from "@/lib/profile/actions";

interface EditProfileFormProps {
  currentUsername: string | null;
}

const initialState: UpdateProfileState = { error: null };

export function EditProfileForm({ currentUsername }: EditProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-surface-700"
        >
          Nume de utilizator
        </label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={currentUsername ?? ""}
          maxLength={30}
          required
          className="mt-1 block w-full rounded-md border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder-surface-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="ex: betivan_ro"
        />
        <p className="mt-1 text-xs text-surface-500">
          3–30 de caractere. Litere, cifre și _ permise.
        </p>
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {isPending ? "Se salvează..." : "Salvează"}
        </button>
        <a
          href="/profile"
          className="rounded-md border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50"
        >
          Anulează
        </a>
      </div>
    </form>
  );
}
