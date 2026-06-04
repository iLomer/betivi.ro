import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AddVenueForm } from "@/components/map/AddVenueForm";

export const metadata = {
  title: "Adaugă locație — Betivi",
};

export default async function NewVenuePage() {
  const userId = (await headers()).get("x-user-id");

  if (!userId) {
    redirect("/auth/login?redirectTo=/venues/new");
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-surface-100">
        Adaugă o locație nouă
      </h1>
      <AddVenueForm />
    </main>
  );
}
