import { createClient } from "@/lib/supabase/server";
import type { Venue, VenueCategory } from "@/types/database";

export interface VenueFilters {
  city?: string;
  category?: VenueCategory;
  search?: string;
}

export async function getVenues(filters: VenueFilters = {}): Promise<Venue[]> {
  const supabase = await createClient();

  let query = supabase
    .from("venues")
    .select("*")
    .order("rating_avg", { ascending: false });

  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch venues: ${error.message}`);
  }

  return (data ?? []) as Venue[];
}

export async function getVenueById(id: string): Promise<Venue | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Failed to fetch venue: ${error.message}`);
  }

  return data as Venue;
}

export async function getVenuesByUserId(userId: string): Promise<Venue[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch user venues: ${error.message}`);
  }

  return (data ?? []) as Venue[];
}

export async function getDistinctCities(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("venues")
    .select("city")
    .order("city");

  if (error) {
    throw new Error(`Failed to fetch cities: ${error.message}`);
  }

  const cities = [...new Set((data ?? []).map((row: { city: string }) => row.city))];
  return cities;
}
