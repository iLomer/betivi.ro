import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { getUserReviewForVenue } from "@/lib/reviews/queries";

interface ReviewSectionProps {
  venueId: string;
}

export async function ReviewSection({ venueId }: ReviewSectionProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const existingReview = user
    ? await getUserReviewForVenue(venueId, user.id)
    : null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-surface-100">Recenzii</h2>

      <ReviewList venueId={venueId} />

      <div className="mt-6">
        {user ? (
          <div className="rounded-xl border border-surface-700/60 bg-surface-800/50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-surface-200">
              {existingReview ? "Recenzia ta" : "Lasă o recenzie"}
            </h3>
            <ReviewForm venueId={venueId} existingReview={existingReview} />
          </div>
        ) : (
          <p className="text-sm text-surface-500">
            <Link href="/auth/login" className="font-medium text-brand-400 hover:text-brand-300">
              Conectează-te
            </Link>{" "}
            pentru a scrie o recenzie.
          </p>
        )}
      </div>
    </div>
  );
}
