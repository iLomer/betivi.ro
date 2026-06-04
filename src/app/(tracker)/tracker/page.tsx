import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Beer, MapPin, Plus, GlassWater } from "lucide-react";
import { getDrinkLogsByUserId, getDrinkStats } from "@/lib/tracker/queries";
import { getVenuesByUserId } from "@/lib/venues/queries";
import { FillingGlass } from "@/components/tracker/FillingGlass";
import { DrinkList } from "@/components/tracker/DrinkList";

export const metadata = {
  title: "Activitatea mea — Betivi",
};

export default async function TrackerPage() {
  const userId = (await headers()).get("x-user-id");
  if (!userId) redirect("/auth/login?redirectTo=/tracker");

  const [logs, stats, myVenues] = await Promise.all([
    getDrinkLogsByUserId(userId),
    getDrinkStats(userId),
    getVenuesByUserId(userId),
  ]);

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col lg:flex-row">

      {/* ── Left panel: Drinks ── */}
      <aside className="flex w-full flex-col border-b border-surface-700/60 lg:w-[420px] lg:shrink-0 lg:border-b-0 lg:border-r lg:overflow-hidden">

        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-surface-700/60 px-5 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-surface-100">
            <Beer className="h-4 w-4 text-brand-400" />
            Băuturile mele
            <span className="text-xs font-normal text-surface-500">{logs.length}</span>
          </h2>
          <Link
            href="/tracker/log"
            className="flex items-center gap-1.5 border border-brand-500/60 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
          >
            <Plus className="h-3 w-3" />
            Adaugă
          </Link>
        </div>

        {/* Stats strip */}
        <div className="border-b border-surface-700/60 bg-surface-800/30 px-5 py-4">
          <div className="flex items-center gap-5">
            <FillingGlass stats={stats} />
            <div className="flex-1">
              <p
                className="text-4xl font-black text-brand-400 leading-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stats.total}
              </p>
              <p className="mt-1 text-xs text-surface-500">băuturi înregistrate</p>
              <div className="mt-3 flex gap-4">
                {[
                  { label: "Bere",    value: stats.beer },
                  { label: "Vin",     value: stats.wine },
                  { label: "Spirit",  value: stats.spirit },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-base font-bold text-surface-200">{value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-surface-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Drink list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <GlassWater className="h-10 w-10 text-surface-700" />
              <p className="text-sm text-surface-500">Nicio băutură înregistrată.</p>
              <Link
                href="/tracker/log"
                className="border border-brand-500/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
              >
                Înregistrează prima
              </Link>
            </div>
          ) : (
            <DrinkList logs={logs} />
          )}
        </div>
      </aside>

      {/* ── Right panel: Venues ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-surface-700/60 px-5 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-surface-100">
            <MapPin className="h-4 w-4 text-brand-400" />
            Birturile mele
            <span className="text-xs font-normal text-surface-500">{myVenues.length}</span>
          </h2>
          <Link
            href="/venues/new"
            className="flex items-center gap-1.5 border border-brand-500/60 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
          >
            <Plus className="h-3 w-3" />
            Adaugă
          </Link>
        </div>

        {/* Venue list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {myVenues.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <MapPin className="h-10 w-10 text-surface-700" />
              <p className="text-sm text-surface-500">
                Nu ai adăugat niciun birt pe hartă.
              </p>
              <Link
                href="/venues/new"
                className="border border-brand-500/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:bg-brand-500 hover:text-surface-900"
              >
                Adaugă primul birt
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {myVenues.map((venue) => (
                <li key={venue.id}>
                  <Link
                    href={`/venues/${venue.id}`}
                    className="group flex items-center justify-between rounded-xl border border-surface-700/60 bg-surface-800/40 px-4 py-3.5 transition-all hover:border-brand-500/50 hover:bg-surface-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-surface-100 transition-colors group-hover:text-brand-300">
                        {venue.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-surface-500">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {venue.city}{venue.judet ? `, ${venue.judet}` : ""}
                      </p>
                    </div>
                    <span className="ml-3 shrink-0 text-surface-600 transition-colors group-hover:text-brand-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}
