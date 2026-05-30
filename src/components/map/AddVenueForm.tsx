"use client";

import { useActionState } from "react";
import { createVenueAction } from "@/lib/venues/actions";

const CATEGORIES = [
  { value: "bar", label: "Bar" },
  { value: "berarie", label: "Berărie" },
  { value: "crama", label: "Cramă" },
  { value: "terasa", label: "Terasă" },
  { value: "club", label: "Club" },
  { value: "restaurant", label: "Restaurant" },
] as const;

type ActionState = { error: string } | null;

async function wrappedAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await createVenueAction(formData);
    return null;
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Eroare necunoscută",
    };
  }
}

export function AddVenueForm() {
  const [state, formAction, isPending] = useActionState(wrappedAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div
          role="alert"
          className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300"
        >
          {state.error}
        </div>
      )}

      <fieldset>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          Nume locație <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="ex: Berea lui Dorel"
          className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        />
      </fieldset>

      <fieldset>
        <label
          htmlFor="city"
          className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          Oraș <span aria-hidden="true">*</span>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          required
          placeholder="ex: Cluj-Napoca"
          className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        />
      </fieldset>

      <fieldset>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          Categorie
        </label>
        <select
          id="category"
          name="category"
          defaultValue="bar"
          className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label
          htmlFor="address"
          className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          Adresă
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="ex: Str. Memorandumului 10"
          className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        />
      </fieldset>

      <fieldset>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          Descriere
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Spune ceva despre această locație..."
          className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        />
      </fieldset>

      <fieldset>
        <legend className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Coordonate GPS (opțional)
        </legend>
        <div className="flex gap-3">
          <input
            id="lat"
            name="lat"
            type="number"
            step="any"
            placeholder="Latitudine"
            className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
          />
          <input
            id="lng"
            name="lng"
            type="number"
            step="any"
            placeholder="Longitudine"
            className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Se adaugă..." : "Adaugă locația"}
      </button>
    </form>
  );
}
