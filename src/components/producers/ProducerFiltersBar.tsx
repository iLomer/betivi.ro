"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { ProducerCategory } from "@/types/database";

const CATEGORIES: { value: ProducerCategory; label: string }[] = [
  { value: "brewery", label: "Berărie artizanală" },
  { value: "winery", label: "Cramă" },
  { value: "distillery", label: "Distilerie" },
];

interface ProducerFiltersBarProps {
  regions: string[];
  currentCategory: string;
  currentRegion: string;
}

export function ProducerFiltersBar({
  regions,
  currentCategory,
  currentRegion,
}: ProducerFiltersBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/producatori?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-md border border-surface-300 bg-white px-3 py-2 text-sm text-surface-700 shadow-sm focus:border-brand-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
        aria-label="Filtrează după categorie"
      >
        <option value="">Toate categoriile</option>
        {CATEGORIES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={currentRegion}
        onChange={(e) => updateParam("region", e.target.value)}
        className="rounded-md border border-surface-300 bg-white px-3 py-2 text-sm text-surface-700 shadow-sm focus:border-brand-500 focus:outline-none dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
        aria-label="Filtrează după regiune"
      >
        <option value="">Toate regiunile</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
