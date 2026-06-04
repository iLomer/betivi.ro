import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/types/database";

export interface ReviewWithProfile extends Review {
  profiles: {
    username: string | null;
  } | null;
}

export async function getReviewsByVenueId(
  venueId: string
): Promise<ReviewWithProfile[]> {
  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch reviews: ${error.message}`);
  }

  if (!reviews?.length) return [];

  const userIds = [...new Set(reviews.map((r) => r.user_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

  return reviews.map((review) => ({
    ...review,
    profiles: profileMap.get(review.user_id) ?? null,
  })) as ReviewWithProfile[];
}

export async function getUserReviewForVenue(
  venueId: string,
  userId: string
): Promise<Review | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("venue_id", venueId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch user review: ${error.message}`);
  }

  return data as Review | null;
}
