"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { DrinkCategory } from "@/types/database";

const VALID_CATEGORIES: DrinkCategory[] = ["beer", "wine", "spirit"];

function validateCategory(value: string): DrinkCategory {
  if ((VALID_CATEGORIES as string[]).includes(value)) {
    return value as DrinkCategory;
  }
  throw new Error("Categoria selectată nu este validă.");
}

export async function logDrinkAction(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const name = ((formData.get("name") as string | null) ?? "").trim();
  const categoryRaw = (formData.get("category") as string | null) ?? "";
  const producer = ((formData.get("producer") as string | null) ?? "").trim();
  const ratingRaw = (formData.get("rating") as string | null) ?? "";
  const notes = ((formData.get("notes") as string | null) ?? "").trim();

  if (!name) {
    throw new Error("Numele băuturii este obligatoriu.");
  }

  const category = validateCategory(categoryRaw);

  let rating: number | null = null;
  if (ratingRaw !== "") {
    const parsed = parseInt(ratingRaw, 10);
    if (isNaN(parsed) || parsed < 1 || parsed > 5) {
      throw new Error("Ratingul trebuie să fie între 1 și 5 stele.");
    }
    rating = parsed;
  }

  const { error } = await supabase.from("drink_logs").insert({
    user_id: user.id,
    name,
    category,
    producer: producer || null,
    rating,
    notes: notes || null,
  });

  if (error) {
    throw new Error(`Nu s-a putut salva băutura: ${error.message}`);
  }

  redirect("/tracker");
}

export async function deleteDrinkLogAction(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { error } = await supabase
    .from("drink_logs")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Nu s-a putut șterge înregistrarea: ${error.message}`);
  }

  revalidatePath("/tracker");
}
