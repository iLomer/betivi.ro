import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getProfileByUserId(
  userId: string
): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Nu s-a putut încărca profilul: ${error.message}`);
  }

  return data as Profile;
}
