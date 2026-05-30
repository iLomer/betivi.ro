import { getVenues, getDistinctCities } from "@/lib/venues/queries";
import { VenueFiltersBar } from "@/components/map/VenueFiltersBar";
import { VenueMapLoader } from "@/components/map/VenueMapLoader";
import type { VenueCategory } from "@/types/database";

export const metadata = {
  title: "Harta birturilor — Betivi",
  description: "Harta interactivă a locurilor de băut din România.",
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

export default async function HartaPage({ searchParams }: PageProps) {
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

  const mappableCount = venues.filter((v) => v.lat !== null).length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-50">
        Harta birturilor
      </h1>

      <VenueFiltersBar
        cities={cities}
        currentCity={city}
        currentCategory={rawCategory}
        currentSearch={search}
        basePath="/harta"
      />

      <div className="mt-6">
        <VenueMapLoader venues={venues} />
      </div>

      <p className="mt-3 text-xs text-surface-400">
        {mappableCount} din {venues.length} locații au coordonate GPS.
      </p>
    </main>
  );
}
