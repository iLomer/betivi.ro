import { Suspense } from "react";
import { getProducers, getDistinctRegions } from "@/lib/producers/queries";
import type { ProducerCategory } from "@/types/database";
import { ProducerCard } from "@/components/producers/ProducerCard";
import { ProducerFiltersBar } from "@/components/producers/ProducerFiltersBar";

export const metadata = {
  title: "Producători — Betivi",
  description:
    "Descoperă berării artizanale, crame și distilerii din România.",
};

const VALID_CATEGORIES: ProducerCategory[] = [
  "brewery",
  "winery",
  "distillery",
];

interface PageProps {
  searchParams: Promise<{
    category?: string;
    region?: string;
  }>;
}

export default async function ProducatoriPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawCategory = params.category ?? "";
  const region = params.region ?? "";

  const category = VALID_CATEGORIES.includes(rawCategory as ProducerCategory)
    ? (rawCategory as ProducerCategory)
    : undefined;

  const [producers, regions] = await Promise.all([
    getProducers({
      category,
      region: region || undefined,
    }),
    getDistinctRegions(),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
          Producători
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Berării artizanale, crame și distilerii din România
        </p>
      </div>

      <Suspense fallback={null}>
        <ProducerFiltersBar
          regions={regions}
          currentCategory={rawCategory}
          currentRegion={region}
        />
      </Suspense>

      {producers.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-surface-500 dark:text-surface-400">
            Niciun producător găsit.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {producers.map((producer) => (
            <li key={producer.id}>
              <ProducerCard producer={producer} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
