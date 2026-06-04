"use client";

import { useState, useActionState } from "react";
import { Star } from "lucide-react";
import { logDrinkAction } from "@/lib/tracker/actions";

type FormState = { error: string | null };
const initialState: FormState = { error: null };

async function logDrinkWrapper(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await logDrinkAction(formData);
    return { error: null };
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === "NEXT_REDIRECT" || err.message === "NEXT_NOT_FOUND")
    ) {
      throw err;
    }
    return { error: err instanceof Error ? err.message : "A apărut o eroare." };
  }
}

const inputClass =
  "mt-1 block w-full rounded-lg border border-surface-600 bg-surface-800 px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

const labelClass = "block text-sm font-medium text-surface-300";

export function LogDrinkForm() {
  const [state, formAction, isPending] = useActionState(logDrinkWrapper, initialState);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p role="alert" className="rounded-lg border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className={labelClass}>
          Nume băutură <span className="text-brand-500">*</span>
        </label>
        <input
          id="name" name="name" type="text" required
          placeholder="ex. Zăganu Blonde Ale"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Categorie <span className="text-brand-500">*</span>
        </label>
        <select
          id="category" name="category" required defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>Alege categoria</option>
          <option value="beer">Bere</option>
          <option value="wine">Vin</option>
          <option value="spirit">Spirit</option>
        </select>
      </div>

      <div>
        <label htmlFor="producer" className={labelClass}>Producător</label>
        <input
          id="producer" name="producer" type="text"
          placeholder="ex. Zăganu Brewery"
          className={inputClass}
        />
      </div>

      <div>
        <p className={labelClass}>Rating <span className="text-surface-500">(opțional)</span></p>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n === rating ? 0 : n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${n} stele`}
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  n <= (hovered || rating)
                    ? "fill-brand-400 text-brand-400"
                    : "fill-surface-700 text-surface-700"
                }`}
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating > 0 ? rating : ""} />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>Notițe</label>
        <textarea
          id="notes" name="notes" rows={3}
          placeholder="Impresii, locul unde ai băut-o..."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-surface-900 transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Se salvează..." : "Adaugă băutura"}
      </button>
    </form>
  );
}
