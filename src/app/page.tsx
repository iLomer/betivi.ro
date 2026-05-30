import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex flex-col items-center justify-center flex-1 px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-brand-500 mb-4">Betivi</h1>
        <p className="text-xl text-surface-400 mb-10 max-w-lg">
          Comunitatea băutorilor din România. Descoperă locuri, recenzează beri, urmărește ce bei.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/venues"
            className="px-6 py-3 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
          >
            Explorează locații
          </Link>
          <Link
            href="/harta"
            className="px-6 py-3 border border-surface-600 text-surface-200 rounded-lg font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors"
          >
            Harta birturilor
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-16 max-w-5xl mx-auto w-full">
        <FeatureCard
          title="Locații & Recenzii"
          description="Găsește baruri, berării și crame. Citește și scrie recenzii din comunitate."
          href="/venues"
          emoji="🍺"
        />
        <FeatureCard
          title="Tracker de băuturi"
          description="Înregistrează ce bei, câștigă badge-uri și urmărește-ți progresul pe cardul ANBR."
          href="/tracker"
          emoji="📊"
        />
        <FeatureCard
          title="Producători români"
          description="Descoperă berării artizanale, crame și distilerii din toată România."
          href="/producatori"
          emoji="🏭"
        />
      </section>
    </main>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  emoji: string;
}

function FeatureCard({ title, description, href, emoji }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-surface-700 p-6 hover:border-brand-500 transition-colors group"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-semibold text-surface-100 group-hover:text-brand-500 transition-colors mb-2">
        {title}
      </h3>
      <p className="text-sm text-surface-400">{description}</p>
    </Link>
  );
}
