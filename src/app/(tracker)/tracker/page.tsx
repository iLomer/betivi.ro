import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDrinkLogsByUserId, getDrinkStats } from "@/lib/tracker/queries";
import { DrinkStatsPanel } from "@/components/tracker/DrinkStats";
import { FillingGlass } from "@/components/tracker/FillingGlass";
import { DrinkList } from "@/components/tracker/DrinkList";

export const metadata = {
  title: "Jurnalul meu — Betivi",
  description: "Istoricul și statisticile băuturilor tale.",
};

export default async function TrackerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/tracker");
  }

  const userId = user.id;
  const [logs, stats] = await Promise.all([
    getDrinkLogsByUserId(userId),
    getDrinkStats(userId),
  ]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900">Jurnalul meu</h1>
        <Link
          href="/tracker/log"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Adaugă o băutură
        </Link>
      </div>

      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <FillingGlass stats={stats} />
        <div className="flex-1">
          <DrinkStatsPanel stats={stats} />
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-surface-800">Istoric</h2>
        <DrinkList logs={logs} />
      </section>
    </main>
  );
}
