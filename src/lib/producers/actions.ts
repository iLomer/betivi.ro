"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProducerCategory } from "@/types/database";

const VALID_CATEGORIES: ProducerCategory[] = [
  "brewery",
  "winery",
  "distillery",
];

export async function createProducerAction(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const name = ((formData.get("name") as string | null) ?? "").trim();
  const category = ((formData.get("category") as string | null) ??
    "") as ProducerCategory;
  const region = ((formData.get("region") as string | null) ?? "").trim();
  const description = (
    (formData.get("description") as string | null) ?? ""
  ).trim();
  const website = ((formData.get("website") as string | null) ?? "").trim();

  if (!name) {
    throw new Error("Numele producătorului este obligatoriu.");
  }

  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(
      "Categoria trebuie să fie berărie artizanală, cramă sau distilerie."
    );
  }

  if (!region) {
    throw new Error("Regiunea este obligatorie.");
  }

  const { data, error } = await supabase
    .from("producers")
    .insert({
      name,
      category,
      region,
      description: description || null,
      website: website || null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Nu s-a putut adăuga producătorul: ${error.message}`);
  }

  revalidatePath("/producatori");
  redirect(`/producatori/${data.id}`);
}
