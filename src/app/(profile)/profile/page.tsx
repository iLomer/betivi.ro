import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getDrinkLogsByUserId, getDrinkStats } from "@/lib/tracker/queries";
import { getProfileByUserId } from "@/lib/profile/queries";
import { getEarnedBadges } from "@/lib/badges";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { BadgeList } from "@/components/profile/BadgeList";
import { RecentLogs } from "@/components/profile/RecentLogs";
import { ANBRCard } from "@/components/anbr-card/ANBRCard";

export const metadata: Metadata = {
  title: "Profilul meu — Betivi",
  description: "Statistici, badge-uri și cardul tău ANBR.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/profile");
  }

  const [profile, stats, allLogs] = await Promise.all([
    getProfileByUserId(user.id),
    getDrinkStats(user.id),
    getDrinkLogsByUserId(user.id),
  ]);

  const recentLogs = allLogs.slice(0, 5);
  const badges = getEarnedBadges(stats);
  const displayName = profile?.username ?? user.email ?? "Betivan";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">{displayName}</h1>
          {profile?.username && (
            <p className="mt-0.5 text-sm text-surface-500">{user.email}</p>
          )}
        </div>
        <Link
          href="/profile/edit"
          className="rounded-md border border-surface-300 bg-white px-3 py-1.5 text-sm font-medium text-surface-700 hover:bg-surface-50"
        >
          Editează profil
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-surface-800">
          Statistici
        </h2>
        <ProfileStats stats={stats} />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-surface-800">
          Cardul ANBR
        </h2>
        <ANBRCard userId={user.id} displayName={displayName} stats={stats} badges={badges} />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-surface-800">
          Badge-uri
        </h2>
        <BadgeList badges={badges} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-surface-800">
            Ultimele băuturi
          </h2>
          <Link
            href="/tracker"
            className="text-sm text-brand-600 hover:text-brand-700"
          >
            Vezi toate
          </Link>
        </div>
        <RecentLogs logs={recentLogs} />
      </section>
    </main>
  );
}
