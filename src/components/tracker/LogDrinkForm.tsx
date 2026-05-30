"use client";

import { useActionState } from "react";
import { logDrinkAction } from "@/lib/tracker/actions";

type FormState = { error: string | null };

const initialState: FormState = { error: null };

async function logDrinkWrapper(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await logDrinkAction(formData);
    return { error: null };
  } catch (err) {
    // Re-throw Next.js redirect/notFound errors so the router can handle them
    if (
      err instanceof Error &&
      (err.message === "NEXT_REDIRECT" || err.message === "NEXT_NOT_FOUND")
    ) {
      throw err;
    }
    return { error: err instanceof Error ? err.message : "A apărut o eroare." };
  }
}

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

export function LogDrinkForm() {
  const [state, formAction, isPending] = useActionState(
    logDrinkWrapper,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <p role="alert" className="rounded bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-surface-700">
          Nume băutură <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="ex. Zăganu Blonde Ale"
          className="mt-1 block w-full rounded-md border border-surface-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-surface-700">
          Categorie <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className="mt-1 block w-full rounded-md border border-surface-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="" disabled>Alege categoria</option>
          <option value="beer">Bere</option>
          <option value="wine">Vin</option>
          <option value="spirit">Spirit</option>
        </select>
      </div>

      <div>
        <label htmlFor="producer" className="block text-sm font-medium text-surface-700">
          Producător
        </label>
        <input
          id="producer"
          name="producer"
          type="text"
          placeholder="ex. Zăganu Brewery"
          className="mt-1 block w-full rounded-md border border-surface-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <StarPickerField />

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-surface-700">
          Notițe
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Impresii, locul unde ai băut-o..."
          className="mt-1 block w-full rounded-md border border-surface-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {isPending ? "Se salvează..." : "Adaugă băutura"}
      </button>
    </form>
  );
}

function StarPickerField() {
  return (
    <div>
      <p className="block text-sm font-medium text-surface-700">Rating (opțional)</p>
      <div className="mt-1 flex gap-1">
        {STAR_VALUES.map((n) => (
          <label key={n} className="cursor-pointer">
            <input type="radio" name="rating" value={String(n)} className="sr-only" />
            <span className="text-2xl hover:text-yellow-400 peer-checked:text-yellow-400">
              ★
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
