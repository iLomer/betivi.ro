"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { VenueCategory } from "@/types/database";

interface CreateVenueInput {
  name: string;
  city: string;
  judet: string;
  address: string;
  description: string;
  category: VenueCategory;
  lat: string;
  lng: string;
}

export async function createVenueAction(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const raw: CreateVenueInput = {
    name: (formData.get("name") as string | null) ?? "",
    city: (formData.get("city") as string | null) ?? "",
    judet: (formData.get("judet") as string | null) ?? "",
    address: (formData.get("address") as string | null) ?? "",
    description: (formData.get("description") as string | null) ?? "",
    category: (formData.get("category") as VenueCategory | null) ?? "bar",
    lat: (formData.get("lat") as string | null) ?? "",
    lng: (formData.get("lng") as string | null) ?? "",
  };

  if (!raw.name.trim() || !raw.city.trim() || !raw.judet.trim()) {
    throw new Error("Numele, orașul și județul sunt obligatorii.");
  }

  const lat = raw.lat ? parseFloat(raw.lat) : null;
  const lng = raw.lng ? parseFloat(raw.lng) : null;

  const { data, error } = await supabase
    .from("venues")
    .insert({
      name: raw.name.trim(),
      city: raw.city.trim(),
      judet: raw.judet.trim(),
      address: raw.address.trim() || null,
      description: raw.description.trim() || null,
      category: raw.category,
      lat: lat !== null && !isNaN(lat) ? lat : null,
      lng: lng !== null && !isNaN(lng) ? lng : null,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Nu s-a putut adăuga locația: ${error.message}`);
  }

  revalidatePath("/venues");
  revalidatePath("/harta");
  redirect(`/venues/${data.id}`);
}
