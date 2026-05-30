import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/auth";
import { getAdminStats } from "@/lib/admin/queries";

export const metadata = { title: "Admin — Betivi" };

export default async function AdminPage() {
  const admin = await isAdmin();
  if (!admin) redirect("/");

  const stats = await getAdminStats();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">Panou de administrare</h1>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard label="Locații" count={stats.venueCount} href="/venues" />
        <StatCard label="Recenzii" count={stats.reviewCount} href="/venues" />
        <StatCard label="Producători" count={stats.producerCount} href="/producatori" />
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/venues/new" className="text-brand-500 hover:underline">+ Adaugă locație</Link>
        <Link href="/producatori" className="text-brand-500 hover:underline">+ Administrează producători</Link>
      </div>
    </main>
  );
}

interface StatCardProps {
  label: string;
  count: number;
  href: string;
}

function StatCard({ label, count, href }: StatCardProps) {
  return (
    <Link href={href} className="block rounded-lg border border-surface-200 p-5 hover:border-brand-400 transition-colors">
      <p className="text-3xl font-bold text-brand-500">{count}</p>
      <p className="text-sm text-surface-500 mt-1">{label}</p>
    </Link>
  );
}
