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
  bar: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  berarie: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  crama: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  terasa: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  club: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  restaurant: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

interface VenueCategoryBadgeProps {
  category: VenueCategory;
}

export function VenueCategoryBadge({ category }: VenueCategoryBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
