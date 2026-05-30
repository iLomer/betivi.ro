import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogDrinkForm } from "@/components/tracker/LogDrinkForm";

export const metadata = {
  title: "Adaugă o băutură — Betivi",
  description: "Înregistrează o nouă băutură în jurnalul tău.",
};

export default async function LogDrinkPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/tracker/log");
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-surface-900">
        Adaugă o băutură
      </h1>
      <LogDrinkForm />
    </main>
  );
}
