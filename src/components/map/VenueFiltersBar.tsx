"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { VenueCategory } from "@/types/database";

const CATEGORIES: { value: VenueCategory; label: string }[] = [
  { value: "bar", label: "Bar" },
  { value: "berarie", label: "Berărie" },
  { value: "crama", label: "Cramă" },
  { value: "terasa", label: "Terasă" },
  { value: "club", label: "Club" },
  { value: "restaurant", label: "Restaurant" },
];

interface VenueFiltersBarProps {
  cities: string[];
  currentCity: string;
  currentCategory: string;
  currentSearch: string;
}

export function VenueFiltersBar({
  cities,
  currentCity,
  currentCategory,
  currentSearch,
}: VenueFiltersBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`/venues?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        placeholder="Caută locație..."
        defaultValue={currentSearch}
        onChange={(e) => updateParam("q", e.target.value)}
        className="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 sm:max-w-xs"
        aria-label="Caută locație"
      />

      <select
        value={currentCity}
        onChange={(e) => updateParam("city", e.target.value)}
        className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        aria-label="Filtrează după oraș"
      >
        <option value="">Toate orașele</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
        aria-label="Filtrează după categorie"
      >
        <option value="">Toate categoriile</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
