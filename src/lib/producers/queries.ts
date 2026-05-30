import { createClient } from "@/lib/supabase/server";
import type { Producer, ProducerCategory } from "@/types/database";

export interface ProducerFilters {
  category?: ProducerCategory;
  region?: string;
  search?: string;
}

export async function getProducers(
  filters: ProducerFilters = {}
): Promise<Producer[]> {
  const supabase = await createClient();

  let query = supabase
    .from("producers")
    .select("*")
    .order("name", { ascending: true });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.region) {
    query = query.ilike("region", `%${filters.region}%`);
  }

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Nu s-au putut încărca producătorii: ${error.message}`);
  }

  return (data ?? []) as Producer[];
}

export async function getProducerById(id: string): Promise<Producer | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("producers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Nu s-a putut încărca producătorul: ${error.message}`);
  }

  return data as Producer;
}

export async function getDistinctRegions(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("producers")
    .select("region")
    .order("region");

  if (error) {
    throw new Error(`Nu s-au putut încărca regiunile: ${error.message}`);
  }

  const regions = [
    ...new Set(
      (data ?? []).map((row: { region: string }) => row.region)
    ),
  ];
  return regions;
}
