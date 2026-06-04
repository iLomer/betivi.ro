import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { LogDrinkForm } from "@/components/tracker/LogDrinkForm";

export const metadata = {
  title: "Adaugă o băutură — Betivi",
  description: "Înregistrează o nouă băutură în jurnalul tău.",
};

export default async function LogDrinkPage() {
  const userId = (await headers()).get("x-user-id");

  if (!userId) {
    redirect("/auth/login?redirectTo=/tracker/log");
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-surface-100">
        Adaugă o băutură
      </h1>
      <LogDrinkForm />
    </main>
  );
}
