import type { VenueCategory } from "@/types/database";

const CATEGORY_LABELS: Record<VenueCategory, string> = {
  bar: "Bar",
  berarie: "Berărie",
  crama: "Cramă",
  terasa: "Terasă",
  club: "Club",
  restaurant: "Restaurant",
};

const CATEGORY_COLORS: Record<VenueCategory, string> = {
  bar:        "bg-amber-950/60  border-amber-700/40  text-amber-300",
  berarie:    "bg-yellow-950/60 border-yellow-700/40 text-yellow-300",
  crama:      "bg-purple-950/60 border-purple-700/40 text-purple-300",
  terasa:     "bg-green-950/60  border-green-700/40  text-green-300",
  club:       "bg-blue-950/60   border-blue-700/40   text-blue-300",
  restaurant: "bg-orange-950/60 border-orange-700/40 text-orange-300",
};

interface VenueCategoryBadgeProps {
  category: VenueCategory;
}

export function VenueCategoryBadge({ category }: VenueCategoryBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
