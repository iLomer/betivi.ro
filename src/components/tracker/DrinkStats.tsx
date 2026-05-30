import type { DrinkStats } from "@/types/database";

interface DrinkStatsProps {
  stats: DrinkStats;
}

const CATEGORY_LABELS: Record<keyof Omit<DrinkStats, "total">, string> = {
  beer: "Bere",
  wine: "Vin",
  spirit: "Spirit",
};

export function DrinkStatsPanel({ stats }: DrinkStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard label="Total" value={stats.total} highlight />
      <StatCard label={CATEGORY_LABELS.beer} value={stats.beer} />
      <StatCard label={CATEGORY_LABELS.wine} value={stats.wine} />
      <StatCard label={CATEGORY_LABELS.spirit} value={stats.spirit} />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  highlight?: boolean;
}

function StatCard({ label, value, highlight = false }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        highlight
          ? "border-brand-200 bg-brand-50"
          : "border-surface-200 bg-white"
      }`}
    >
      <p className={`text-3xl font-bold ${highlight ? "text-brand-700" : "text-surface-900"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-surface-500">{label}</p>
    </div>
  );
}
