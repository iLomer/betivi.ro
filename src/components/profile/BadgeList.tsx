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
    <ul className="flex flex-wrap gap-3">
      {badges.map((badge) => (
        <li
          key={badge.id}
          className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800"
          title={badge.description}
        >
          <span aria-hidden="true">{badge.icon}</span>
          {badge.name}
        </li>
      ))}
    </ul>
  );
}
