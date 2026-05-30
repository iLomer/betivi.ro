"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function recalculateVenueAggregates(
  venueId: string
): Promise<void> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("venue_id", venueId);

  if (error) {
    throw new Error(`Failed to fetch ratings: ${error.message}`);
  }

  const ratings = (data ?? []).map((r: { rating: number }) => r.rating);
  const review_count = ratings.length;
  const rating_avg =
    review_count > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / review_count
      : 0;

  const { error: updateError } = await supabase
    .from("venues")
    .update({
      rating_avg: Math.round(rating_avg * 10) / 10,
      review_count,
    })
    .eq("id", venueId);

  if (updateError) {
    throw new Error(`Failed to update venue aggregates: ${updateError.message}`);
  }
}

export async function submitReviewAction(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const venueId = (formData.get("venue_id") as string | null) ?? "";
  const ratingRaw = (formData.get("rating") as string | null) ?? "";
  const body = (formData.get("body") as string | null) ?? "";

  if (!venueId) {
    throw new Error("ID-ul locației lipsește.");
  }

  const rating = parseInt(ratingRaw, 10);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    throw new Error("Ratingul trebuie să fie între 1 și 5 stele.");
  }

  const { error } = await supabase.from("reviews").upsert(
    {
      venue_id: venueId,
      user_id: user.id,
      rating,
      body: body.trim() || null,
    },
    { onConflict: "venue_id,user_id" }
  );

  if (error) {
    throw new Error(`Nu s-a putut salva recenzia: ${error.message}`);
  }

  await recalculateVenueAggregates(venueId);

  revalidatePath(`/venues/${venueId}`);
}

export async function deleteReviewAction(
  reviewId: string,
  venueId: string
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Nu s-a putut șterge recenzia: ${error.message}`);
  }

  await recalculateVenueAggregates(venueId);

  revalidatePath(`/venues/${venueId}`);
}
