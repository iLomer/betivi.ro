import Link from "next/link";
import { getVenues, getDistinctCities } from "@/lib/venues/queries";
import type { VenueCategory } from "@/types/database";
import { VenueCard } from "@/components/map/VenueCard";
import { VenueFiltersBar } from "@/components/map/VenueFiltersBar";

export const metadata = {
  title: "Locații — Betivi",
  description: "Descoperă baruri, berării, crame și terase din România.",
};

const VALID_CATEGORIES: VenueCategory[] = [
  "bar",
  "berarie",
  "crama",
  "terasa",
  "club",
  "restaurant",
];

interface PageProps {
  searchParams: Promise<{ city?: string; category?: string; q?: string }>;
}

export default async function VenuesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const city = params.city ?? "";
  const rawCategory = params.category ?? "";
  const search = params.q ?? "";

  const category = VALID_CATEGORIES.includes(rawCategory as VenueCategory)
    ? (rawCategory as VenueCategory)
    : undefined;

  const [venues, cities] = await Promise.all([
    getVenues({ city: city || undefined, category, search: search || undefined }),
    getDistinctCities(),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
          Locații
        </h1>
        <Link
          href="/venues/new"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          + Adaugă locație
        </Link>
      </div>

      <VenueFiltersBar cities={cities} currentCity={city} currentCategory={rawCategory} currentSearch={search} />

      {venues.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-surface-500 dark:text-surface-400">
            Nicio locație găsită. Fii primul care adaugă una!
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <li key={venue.id}>
              <VenueCard venue={venue} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
