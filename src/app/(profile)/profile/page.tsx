import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getDrinkStats } from "@/lib/tracker/queries";
import { getProfileByUserId } from "@/lib/profile/queries";
import { getEarnedBadges } from "@/lib/badges";
import { BadgeList } from "@/components/profile/BadgeList";
import { ANBRCard } from "@/components/anbr-card/ANBRCard";

export const metadata: Metadata = {
  title: "Profilul meu — Betivi",
};

function computeGrade(total: number) {
  if (total >= 50) return "Academician";
  if (total >= 25) return "Emerit";
  if (total >= 10) return "Autorizat";
  return "Stagiar";
}

function deriveMemberNumber(userId: string) {
  const num = parseInt(userId.replace(/-/g, "").slice(-8), 16) % 1_000_000;
  return String(num).padStart(6, "0");
}

export default async function ProfilePage() {
  const hdrs = await headers();
  const userId = hdrs.get("x-user-id");
  const userEmail = hdrs.get("x-user-email") ?? "";

  if (!userId) redirect("/auth/login?redirectTo=/profile");

  const [profile, stats] = await Promise.all([
    getProfileByUserId(userId),
    getDrinkStats(userId),
  ]);

  const badges = getEarnedBadges(stats);
  const displayName = profile?.username ?? userEmail.split("@")[0] ?? "Betivan";
  const grade = computeGrade(stats.total);
  const memberNumber = deriveMemberNumber(userId);

  return (
    <main className="min-h-[calc(100vh-60px)] bg-surface-900">

      {/* ── Hero banner ── */}
      <div className="relative border-b border-surface-700/60 bg-surface-800/30">
        {/* Gold accent top line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

        <div className="relative mx-auto max-w-xl px-6 py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Grade badge */}
              <span className="inline-flex items-center rounded-full border border-brand-700/50 bg-brand-950/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
                {grade}
              </span>
              {/* Name */}
              <h1
                className="mt-3 text-4xl font-black text-surface-100"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {displayName}
              </h1>
              {/* Member number + email */}
              <p className="mt-1.5 font-mono text-sm text-surface-500">
                Nr. #{memberNumber}
                {profile?.username && (
                  <span className="ml-3 font-sans">{userEmail}</span>
                )}
              </p>
            </div>
            <Link
              href="/profile/edit"
              className="shrink-0 border border-surface-600 px-3 py-1.5 text-xs font-medium text-surface-400 transition-colors hover:border-brand-500 hover:text-brand-400"
            >
              Editează
            </Link>
          </div>

          {/* Mini stats row */}
          <div className="mt-6 flex gap-6 border-t border-surface-700/40 pt-5">
            {[
              { label: "Total băuturi", value: stats.total, highlight: true },
              { label: "Bere",          value: stats.beer },
              { label: "Vin",           value: stats.wine },
              { label: "Spirtoase",     value: stats.spirit },
            ].map(({ label, value, highlight }) => (
              <div key={label}>
                <p className={`text-xl font-black ${highlight ? "text-brand-400" : "text-surface-200"}`}
                   style={highlight ? { fontFamily: "var(--font-playfair)" } : {}}>
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-surface-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-xl px-6 py-10 space-y-10">

        {/* ANBR Card */}
        <section>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-surface-500">
            Card de membru
          </p>
          <ANBRCard userId={userId} displayName={displayName} stats={stats} badges={badges} />
        </section>

        {/* Badges */}
        <section>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-surface-500">
            Badge-uri câștigate · {badges.length}
          </p>
          <BadgeList badges={badges} />
        </section>

      </div>
    </main>
  );
}
