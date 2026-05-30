import type { DrinkStats } from "@/types/database";

interface ProfileStatsProps {
  stats: DrinkStats;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    { label: "Total", value: stats.total },
    { label: "Bere", value: stats.beer },
    { label: "Vin", value: stats.wine },
    { label: "Spirtoase", value: stats.spirit },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-surface-200 bg-white p-4 text-center shadow-sm"
        >
          <p className="text-2xl font-bold text-brand-600">{value}</p>
          <p className="mt-1 text-sm text-surface-600">{label}</p>
        </div>
      ))}
    </div>
  );
}
