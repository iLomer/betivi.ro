import { createClient } from "@supabase/supabase-js";
import { seedVenues } from "./venues";
import { seedProducers } from "./producers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedVenuesData() {
  const { error } = await supabase
    .from("venues")
    .upsert(seedVenues, { onConflict: "name" });
  if (error) throw new Error(`Venues seed failed: ${error.message}`);
  process.stdout.write(`Seeded ${seedVenues.length} venues\n`);
}

async function seedProducersData() {
  const { error } = await supabase
    .from("producers")
    .upsert(seedProducers, { onConflict: "name" });
  if (error) throw new Error(`Producers seed failed: ${error.message}`);
  process.stdout.write(`Seeded ${seedProducers.length} producers\n`);
}

async function main() {
  process.stdout.write("Starting seed...\n");
  await seedVenuesData();
  await seedProducersData();
  process.stdout.write("Seed complete.\n");
}

main().catch((err: unknown) => {
  process.stderr.write(`Seed error: ${String(err)}\n`);
  process.exit(1);
});
