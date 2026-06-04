import Link from "next/link";
import { headers } from "next/headers";
import { getVenues, getDistinctCities } from "@/lib/venues/queries";
import { VenueFiltersBar } from "@/components/map/VenueFiltersBar";
import { VenueMapLoader } from "@/components/map/VenueMapLoader";
import { VenueCard } from "@/components/map/VenueCard";
import type { VenueCategory } from "@/types/database";

export const metadata = {
  title: "Harta birturilor — Betivi",
  description: "Harta interactivă a locurilor de băut din România.",
};

const VALID_CATEGORIES: VenueCategory[] = [
  "bar", "berarie", "crama", "terasa", "club", "restaurant",
];

interface PageProps {
  searchParams: Promise<{ city?: string; category?: string; q?: string }>;
}

export default async function HartaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const city = params.city ?? "";
  const rawCategory = params.category ?? "";
  const search = params.q ?? "";
  const userId = (await headers()).get("x-user-id");

  const category = VALID_CATEGORIES.includes(rawCategory as VenueCategory)
    ? (rawCategory as VenueCategory)
    : undefined;

  const [venues, cities] = await Promise.all([
    getVenues({ city: city || undefined, category, search: search || undefined }),
    getDistinctCities(),
  ]);

  const mappableCount = venues.filter((v) => v.lat !== null).length;

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col lg:flex-row">

      {/* ── Mobile: full-screen map with header overlay ── */}
      <div className="relative flex-1 lg:hidden">
        <div className="absolute left-0 right-0 top-0 z-[1000] flex items-center justify-between bg-surface-900/85 px-4 py-3 backdrop-blur-sm">
          <span className="font-semibold text-surface-100">
            Harta birturilor
            <span className="ml-2 text-xs font-normal text-surface-500">
              {venues.length} locații
            </span>
          </span>
          {userId && (
            <Link
              href="/venues/new"
              className="border border-brand-500 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
            >
              + Adaugă
            </Link>
          )}
        </div>
        <VenueMapLoader venues={venues} className="h-full w-full" />
      </div>

      {/* ── Desktop: left panel (filters + list) ── */}
      <aside className="hidden w-[380px] shrink-0 flex-col border-r border-surface-700/60 lg:flex lg:overflow-hidden">
        <div className="flex items-center justify-between border-b border-surface-700/60 px-5 py-4">
          <h1 className="text-lg font-bold text-surface-50">
            Harta birturilor
            <span className="ml-2 text-xs font-normal text-surface-500">
              {venues.length} locații
            </span>
          </h1>
          {userId && (
            <Link
              href="/venues/new"
              className="border border-brand-500 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
            >
              + Adaugă
            </Link>
          )}
        </div>

        <div className="border-b border-surface-700/60 px-5 py-3">
          <VenueFiltersBar
            cities={cities}
            currentCity={city}
            currentCategory={rawCategory}
            currentSearch={search}
            basePath="/harta"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {venues.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-center">
              <p className="text-sm text-surface-500">
                Nicio locație găsită.{" "}
                {userId && (
                  <Link href="/venues/new" className="text-brand-400 hover:underline">
                    Fii primul!
                  </Link>
                )}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {venues.map((venue) => (
                <li key={venue.id}>
                  <VenueCard venue={venue} />
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-surface-600">
            {mappableCount} din {venues.length} locații au pin pe hartă
          </p>
        </div>
      </aside>

      {/* ── Desktop: right panel (map) ── */}
      <div className="hidden flex-1 lg:block">
        <VenueMapLoader venues={venues} className="h-full w-full" />
      </div>

    </div>
  );
}
