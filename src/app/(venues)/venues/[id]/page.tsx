import { notFound } from "next/navigation";
import Link from "next/link";
import { getVenueById } from "@/lib/venues/queries";
import { VenueCategoryBadge } from "@/components/map/VenueCategoryBadge";
import { StarRating } from "@/components/map/StarRating";
import { ReviewSection } from "@/components/reviews/ReviewSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const venue = await getVenueById(id);
  if (!venue) return { title: "Locație negăsită — Betivi" };
  return {
    title: `${venue.name} — Betivi`,
    description: venue.description ?? `${venue.name} în ${venue.city}`,
  };
}

export default async function VenueDetailPage({ params }: PageProps) {
  const { id } = await params;
  const venue = await getVenueById(id);

  if (!venue) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/venues"
        className="mb-6 inline-flex items-center text-sm text-surface-500 hover:text-brand-600 dark:text-surface-400"
      >
        ← Înapoi la locații
      </Link>

      <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm dark:border-surface-700 dark:bg-surface-900">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
            {venue.name}
          </h1>
          {venue.category && <VenueCategoryBadge category={venue.category} />}
        </div>

        <div className="mb-4 flex items-center gap-3">
          <StarRating value={venue.rating_avg} />
          <span className="text-sm text-surface-500 dark:text-surface-400">
            {venue.rating_avg > 0
              ? `${venue.rating_avg.toFixed(1)} / 5`
              : "Fără recenzii încă"}
            {venue.review_count > 0 &&
              ` (${venue.review_count} ${venue.review_count === 1 ? "recenzie" : "recenzii"})`}
          </span>
        </div>

        <dl className="space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-medium text-surface-600 dark:text-surface-400">
              Oraș
            </dt>
            <dd className="text-surface-800 dark:text-surface-200">
              {venue.city}
            </dd>
          </div>
          {venue.address && (
            <div className="flex gap-2">
              <dt className="w-20 shrink-0 font-medium text-surface-600 dark:text-surface-400">
                Adresă
              </dt>
              <dd className="text-surface-800 dark:text-surface-200">
                {venue.address}
              </dd>
            </div>
          )}
        </dl>

        {venue.description && (
          <p className="mt-4 leading-relaxed text-surface-700 dark:text-surface-300">
            {venue.description}
          </p>
        )}
      </div>

      <ReviewSection venueId={id} />
    </main>
  );
}
