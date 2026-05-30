import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").select("count");
  const supabaseStatus = error ? `Eroare: ${error.message}` : "Supabase OK";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-4xl font-bold text-brand-500">Betivi</h1>
      <p className="text-surface-600 dark:text-surface-400">
        Comunitatea băutorilor din România
      </p>
      <p className="mt-4 rounded-md bg-surface-100 px-4 py-2 text-sm text-surface-700 dark:bg-surface-800 dark:text-surface-300">
        {supabaseStatus}
      </p>
    </main>
  );
}
