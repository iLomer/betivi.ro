import { getReviewsByVenueId } from "@/lib/reviews/queries";
import { StarRating } from "@/components/map/StarRating";

interface ReviewListProps {
  venueId: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function ReviewList({ venueId }: ReviewListProps) {
  const reviews = await getReviewsByVenueId(venueId);

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-surface-500">
        Nicio recenzie încă. Fii primul!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-xl border border-surface-700/60 bg-surface-800/50 p-4"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <StarRating value={review.rating} />
              <span className="text-sm font-medium text-surface-200">
                {review.profiles?.username ?? "Anonim"}
              </span>
            </div>
            <time dateTime={review.created_at} className="text-xs text-surface-500">
              {formatDate(review.created_at)}
            </time>
          </div>
          {review.body && (
            <p className="text-sm leading-relaxed text-surface-300">{review.body}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
