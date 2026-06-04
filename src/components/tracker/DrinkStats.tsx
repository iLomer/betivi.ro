import type { DrinkStats } from "@/types/database";

interface DrinkStatsProps {
  stats: DrinkStats;
}

export function DrinkStatsPanel({ stats }: DrinkStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Total" value={stats.total} highlight />
      <StatCard label="Bere"  value={stats.beer} />
      <StatCard label="Vin"   value={stats.wine} />
      <StatCard label="Spirit" value={stats.spirit} />
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
          ? "border-brand-700/40 bg-brand-950/30"
          : "border-surface-700/60 bg-surface-800/50"
      }`}
    >
      <p className={`text-3xl font-bold ${highlight ? "text-brand-400" : "text-surface-100"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-surface-500">{label}</p>
    </div>
  );
}
