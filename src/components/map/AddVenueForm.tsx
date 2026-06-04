"use client";

import { useActionState } from "react";
import { createVenueAction } from "@/lib/venues/actions";
import { LocationPicker } from "@/components/map/LocationPicker";

const CATEGORIES = [
  { value: "bar",        label: "Bar" },
  { value: "berarie",    label: "Berărie" },
  { value: "crama",      label: "Cramă" },
  { value: "terasa",     label: "Terasă" },
  { value: "club",       label: "Club" },
  { value: "restaurant", label: "Restaurant" },
] as const;

type ActionState = { error: string } | null;

async function wrappedAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await createVenueAction(formData);
    return null;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Eroare necunoscută" };
  }
}

const inputClass =
  "w-full rounded-lg border border-surface-600 bg-surface-800 px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

const labelClass = "mb-1 block text-sm font-medium text-surface-300";

export function AddVenueForm() {
  const [state, formAction, isPending] = useActionState(wrappedAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div role="alert" className="rounded-lg border border-red-800/50 bg-red-950/50 p-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <fieldset>
        <label htmlFor="name" className={labelClass}>
          Nume locație <span className="text-brand-500">*</span>
        </label>
        <input id="name" name="name" type="text" required placeholder="ex: Berea lui Dorel" className={inputClass} />
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <fieldset>
          <label htmlFor="city" className={labelClass}>
            Oraș / Sat <span className="text-brand-500">*</span>
          </label>
          <input id="city" name="city" type="text" required placeholder="ex: Cluj-Napoca" className={inputClass} />
        </fieldset>

        <fieldset>
          <label htmlFor="judet" className={labelClass}>
            Județ <span className="text-brand-500">*</span>
          </label>
          <input id="judet" name="judet" type="text" required placeholder="ex: Cluj" className={inputClass} />
        </fieldset>
      </div>

      <fieldset>
        <label htmlFor="category" className={labelClass}>Categorie</label>
        <select id="category" name="category" defaultValue="bar" className={inputClass}>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="address" className={labelClass}>Adresă</label>
        <input id="address" name="address" type="text" placeholder="ex: Str. Memorandumului 10" className={inputClass} />
      </fieldset>

      <fieldset>
        <label htmlFor="description" className={labelClass}>Descriere</label>
        <textarea id="description" name="description" rows={3} placeholder="Spune ceva despre această locație..." className={inputClass} />
      </fieldset>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-surface-300">
          Locație pe hartă <span className="text-surface-500">(opțional)</span>
        </legend>
        <LocationPicker />
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-surface-900 transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Se adaugă..." : "Adaugă birtul"}
      </button>
    </form>
  );
}
