import Link from "next/link";
import { MapPin } from "lucide-react";
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
      className="group block rounded-xl border border-surface-700/60 bg-surface-800/50 p-4 transition-all duration-200 hover:border-brand-500/50 hover:bg-surface-800"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h2 className="line-clamp-1 text-base font-semibold text-surface-100 transition-colors group-hover:text-brand-300">
          {venue.name}
        </h2>
        {venue.category && <VenueCategoryBadge category={venue.category} />}
      </div>

      <p className="mb-3 flex items-center gap-1.5 text-sm text-surface-400">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-surface-500" />
        {venue.city}{venue.judet ? `, ${venue.judet}` : ""}
      </p>

      <div className="flex items-center gap-2">
        <StarRating value={venue.rating_avg} />
        <span className="text-xs text-surface-500">
          {venue.rating_avg > 0 ? venue.rating_avg.toFixed(1) : "fără recenzii"}
          {venue.review_count > 0 && ` (${venue.review_count})`}
        </span>
      </div>
    </Link>
  );
}
