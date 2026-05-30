import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProfileByUserId } from "@/lib/profile/queries";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

export const metadata: Metadata = {
  title: "Editează profil — Betivi",
  description: "Actualizează-ți numele de utilizator.",
};

export default async function EditProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/profile/edit");
  }

  const profile = await getProfileByUserId(user.id);

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-surface-900">
        Editează profil
      </h1>
      <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
        <EditProfileForm currentUsername={profile?.username ?? null} />
      </div>
    </main>
  );
}
