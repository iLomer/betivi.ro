import Link from "next/link";
import type { Venue } from "@/types/database";
import { VenueCategoryBadge } from "./VenueCategoryBadge";
import { StarRating } from "./StarRating";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link
      href={`/venues/${venue.id}`}
      className="block rounded-xl border border-surface-200 bg-white p-4 shadow-sm transition hover:border-brand-400 hover:shadow-md dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-500"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h2 className="line-clamp-1 text-base font-semibold text-surface-900 dark:text-surface-50">
          {venue.name}
        </h2>
        {venue.category && <VenueCategoryBadge category={venue.category} />}
      </div>

      <p className="mb-3 text-sm text-surface-500 dark:text-surface-400">
        {venue.city}
        {venue.address && ` — ${venue.address}`}
      </p>

      <div className="flex items-center gap-2">
        <StarRating value={venue.rating_avg} />
        <span className="text-xs text-surface-500 dark:text-surface-400">
          {venue.rating_avg > 0
            ? venue.rating_avg.toFixed(1)
            : "–"}
          {venue.review_count > 0 && ` (${venue.review_count})`}
        </span>
      </div>
    </Link>
  );
}
