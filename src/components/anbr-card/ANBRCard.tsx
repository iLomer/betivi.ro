import type { DrinkStats } from "@/types/database";
import type { Badge } from "@/lib/badges";
import { getTopBadge } from "@/lib/badges";

type Grade = "Stagiar" | "Autorizat" | "Emerit" | "Academician";

function computeGrade(total: number): Grade {
  if (total >= 50) return "Academician";
  if (total >= 25) return "Emerit";
  if (total >= 10) return "Autorizat";
  return "Stagiar";
}

function deriveMembershipNumber(userId: string): string {
  const hex = userId.replace(/-/g, "");
  const last8 = hex.slice(-8);
  const num = parseInt(last8, 16) % 1_000_000;
  return String(num).padStart(6, "0");
}

interface ANBRCardProps {
  userId: string;
  displayName: string;
  stats: DrinkStats;
  badges: Badge[];
}

export function ANBRCard({
  userId,
  displayName,
  stats,
  badges,
}: ANBRCardProps) {
  const membershipNumber = deriveMembershipNumber(userId);
  const grade = computeGrade(stats.total);
  const topBadge = getTopBadge({ ...stats, total: stats.total });

  const statItems = [
    { label: "Bere", value: stats.beer },
    { label: "Vin", value: stats.wine },
    { label: "Spirtoase", value: stats.spirit },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-50 p-6 shadow-lg">
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-amber-200 opacity-30" />
      <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-yellow-300 opacity-20" />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
              ANBR
            </p>
            <p className="text-[10px] uppercase tracking-wider text-amber-600">
              Asociația Națională a Băutorilor Responsabili
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-amber-600">Nr. membru</p>
            <p className="font-mono text-lg font-bold text-amber-800">
              #{membershipNumber}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xl font-bold text-surface-900">{displayName}</p>
          <p className="mt-0.5 text-sm font-semibold text-amber-700">{grade}</p>
        </div>

        <div className="mb-4 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xl font-bold text-surface-900">{stats.total}</p>
            <p className="text-[10px] text-surface-600">Total</p>
          </div>
          {statItems.map(({ label, value }) => (
            <div key={label}>
              <p className="text-xl font-bold text-surface-900">{value}</p>
              <p className="text-[10px] text-surface-600">{label}</p>
            </div>
          ))}
        </div>

        {topBadge && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-white/60 px-3 py-2">
            <span aria-hidden="true" className="text-lg">
              {topBadge.icon}
            </span>
            <div>
              <p className="text-xs font-semibold text-amber-800">
                {topBadge.name}
              </p>
              <p className="text-[10px] text-surface-500">
                {topBadge.description}
              </p>
            </div>
          </div>
        )}

        {badges.length === 0 && (
          <p className="text-xs text-surface-500">
            Înregistrează prima băutură pentru a câștiga primul badge!
          </p>
        )}
      </div>
    </div>
  );
}
