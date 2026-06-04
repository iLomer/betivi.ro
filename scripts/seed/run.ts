import { config } from "dotenv";
config({ path: ".env.local" });

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
  const { count } = await supabase
    .from("venues")
    .select("*", { count: "exact", head: true });

  if (count && count >= seedVenues.length) {
    process.stdout.write(`⚡ Venues already fully seeded (${count} found), skipping.\n`);
    return;
  }

  const { error } = await supabase.from("venues").insert(seedVenues);
  if (error) throw new Error(`Venues seed failed: ${error.message}`);
  process.stdout.write(`✓ Seeded ${seedVenues.length} venues\n`);
}

async function seedProducersData() {
  const { count } = await supabase
    .from("producers")
    .select("*", { count: "exact", head: true });

  if (count && count > 0) {
    process.stdout.write(`⚡ Producers already seeded (${count} found), skipping.\n`);
    return;
  }

  const { error } = await supabase.from("producers").insert(seedProducers);
  if (error) throw new Error(`Producers seed failed: ${error.message}`);
  process.stdout.write(`✓ Seeded ${seedProducers.length} producers\n`);
}

async function main() {
  process.stdout.write("Starting seed...\n\n");
  await seedVenuesData();
  await seedProducersData();
  process.stdout.write("\nSeed complete.\n");
}

main().catch((err: unknown) => {
  process.stderr.write(`\nSeed error: ${String(err)}\n`);
  process.exit(1);
});
