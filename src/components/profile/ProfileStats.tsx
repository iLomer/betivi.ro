import type { DrinkStats } from "@/types/database";

interface ProfileStatsProps {
  stats: DrinkStats;
}

const ITEMS = [
  { key: "total" as const, label: "Total", highlight: true },
  { key: "beer"  as const, label: "Bere" },
  { key: "wine"  as const, label: "Vin" },
  { key: "spirit" as const, label: "Spirtoase" },
];

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ITEMS.map(({ key, label, highlight }) => (
        <div
          key={key}
          className={`rounded-xl border p-4 text-center ${
            highlight
              ? "border-brand-700/40 bg-brand-950/30"
              : "border-surface-700/60 bg-surface-800/50"
          }`}
        >
          <p className={`text-3xl font-bold ${highlight ? "text-brand-400" : "text-surface-100"}`}>
            {stats[key]}
          </p>
          <p className="mt-1 text-xs text-surface-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
