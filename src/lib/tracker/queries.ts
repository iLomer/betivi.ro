import { createClient } from "@/lib/supabase/server";
import type { DrinkLog, DrinkStats } from "@/types/database";

export async function getDrinkLogsByUserId(userId: string): Promise<DrinkLog[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("drink_logs")
    .select("*")
    .eq("user_id", userId)
    .order("logged_at", { ascending: false });

  if (error) {
    throw new Error(`Nu s-au putut încărca băuturile: ${error.message}`);
  }

  return (data ?? []) as DrinkLog[];
}

export async function getDrinkStats(userId: string): Promise<DrinkStats> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("drink_logs")
    .select("category")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Nu s-au putut calcula statisticile: ${error.message}`);
  }

  const rows = data ?? [];
  const stats: DrinkStats = { total: rows.length, beer: 0, wine: 0, spirit: 0 };

  for (const row of rows) {
    if (row.category === "beer") stats.beer += 1;
    else if (row.category === "wine") stats.wine += 1;
    else if (row.category === "spirit") stats.spirit += 1;
  }

  return stats;
}
