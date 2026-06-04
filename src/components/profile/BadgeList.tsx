import type { Badge } from "@/lib/badges";

interface BadgeListProps {
  badges: Badge[];
}

export function BadgeList({ badges }: BadgeListProps) {
  if (badges.length === 0) {
    return (
      <p className="text-sm text-surface-500">
        Niciun badge câștigat încă. Înregistrează prima băutură!
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <li
          key={badge.id}
          title={badge.description}
          className="flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/40 px-3 py-1.5 text-sm font-medium text-amber-300"
        >
          <span aria-hidden="true">{badge.icon}</span>
          {badge.name}
        </li>
      ))}
    </ul>
  );
}
