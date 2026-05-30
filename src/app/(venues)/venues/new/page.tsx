import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AddVenueForm } from "@/components/map/AddVenueForm";

export const metadata = {
  title: "Adaugă locație — Betivi",
};

export default async function NewVenuePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/venues/new");
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-50">
        Adaugă o locație nouă
      </h1>
      <AddVenueForm />
    </main>
  );
}
