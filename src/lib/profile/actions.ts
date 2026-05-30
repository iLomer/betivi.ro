"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface UpdateProfileState {
  error: string | null;
}

function validateUsername(username: string): string | null {
  const trimmed = username.trim();
  if (trimmed.length < 3) {
    return "Numele de utilizator trebuie să aibă cel puțin 3 caractere.";
  }
  if (trimmed.length > 30) {
    return "Numele de utilizator nu poate depăși 30 de caractere.";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return "Numele de utilizator poate conține doar litere, cifre și _.";
  }
  return null;
}

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const username = String(formData.get("username") ?? "");
  const validationError = validateUsername(username);

  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Trebuie să fii autentificat pentru a edita profilul." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username: username.trim() })
    .eq("id", user.id);

  if (error) {
    if (error.code === "23505") {
      return {
        error: "Acest nume de utilizator este deja folosit. Alege altul.",
      };
    }
    return { error: `Nu s-a putut actualiza profilul: ${error.message}` };
  }

  redirect("/profile");
}
