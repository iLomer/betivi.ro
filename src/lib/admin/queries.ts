import { createClient } from "@/lib/supabase/server";

export interface AdminStats {
  venueCount: number;
  reviewCount: number;
  producerCount: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();
  const [venues, reviews, producers] = await Promise.all([
    supabase.from("venues").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
    supabase.from("producers").select("id", { count: "exact", head: true }),
  ]);
  return {
    venueCount: venues.count ?? 0,
    reviewCount: reviews.count ?? 0,
    producerCount: producers.count ?? 0,
  };
}
