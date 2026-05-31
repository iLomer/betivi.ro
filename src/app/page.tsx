import Link from "next/link";

const STATS = [
  { value: "3.2K", label: "locații" },
  { value: "18K", label: "recenzii" },
  { value: "5.4K", label: "beți înregistrați" },
];

const SECTIONS = [
  {
    tag: "Descoperire",
    title: "Locații & Recenzii",
    body: "Baruri, berării, crame, birtul din colț — toate cu recenzii reale din comunitate. Fără turiști, fără bullshit.",
    href: "/venues",
    cta: "Explorează locații",
  },
  {
    tag: "Urmărire",
    title: "Tracker de băuturi",
    body: "Înregistrează fiecare Ursus, Ciucaș, tuică sau palincă. Câștigă badge-uri. Vezi cât ai băut de fapt.",
    href: "/tracker",
    cta: "Deschide tracker-ul",
  },
  {
    tag: "Comunitate",
    title: "Producători români",
    body: "Berării artizanale, crame, distilerii de vișinată și palincă din toată România. Susține ce e al nostru.",
    href: "/producatori",
    cta: "Vezi producătorii",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-900">
      {/* grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Hero */}
      <section className="relative z-10 flex min-h-[92vh] flex-col justify-between px-6 pt-24 pb-12 md:px-12 lg:px-20">
        {/* amber radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-500/70">
            Comunitatea băutorilor din România
          </p>
          <h1
            className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.9] tracking-tight text-surface-50"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <span className="block">Birturi.</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Beri. Betivi.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base text-surface-400 md:text-lg">
            Găsește unde bei. Recenzează ce bei. Urmărește cât bei.
            <br />
            Fără filtru turistic — doar România reală, cu halbă cu tot.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 bg-brand-500 px-6 py-3 text-sm font-semibold text-surface-900 transition-colors hover:bg-brand-400"
            >
              Explorează locații
            </Link>
            <Link
              href="/harta"
              className="inline-flex items-center gap-2 border border-surface-700 px-6 py-3 text-sm font-semibold text-surface-300 transition-colors hover:border-brand-500 hover:text-brand-400"
            >
              Harta birturilor
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 flex flex-wrap gap-8 border-t border-surface-700/60 pt-8 md:gap-16">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <span className="block text-2xl font-black text-brand-400 md:text-3xl">
                {value}
              </span>
              <span className="text-xs uppercase tracking-widest text-surface-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 mx-6 border-t border-surface-700/40 md:mx-12 lg:mx-20" />

      {/* Feature sections */}
      <section className="relative z-10 grid grid-cols-1 gap-px bg-surface-700/30 md:grid-cols-3">
        {SECTIONS.map(({ tag, title, body, href, cta }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-4 bg-surface-900 p-8 transition-colors hover:bg-surface-800/60 md:p-10"
          >
            <span className="w-fit border border-brand-500/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500/70 transition-colors group-hover:border-brand-500/60 group-hover:text-brand-400">
              {tag}
            </span>
            <div>
              <h3 className="text-lg font-bold text-surface-100 transition-colors group-hover:text-brand-300">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-500">
                {body}
              </p>
            </div>
            <span className="mt-auto text-xs font-semibold text-brand-500/60 transition-colors group-hover:text-brand-400">
              {cta} →
            </span>
          </Link>
        ))}
      </section>

      {/* Editorial strip */}
      <section className="relative z-10 mx-6 my-20 max-w-2xl md:mx-12 lg:mx-20">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-surface-600">
          Ce e Betivi?
        </p>
        <p className="text-xl font-light leading-relaxed text-surface-400 md:text-2xl">
          Nu e TripAdvisor cu bere. Nu e Google Maps cu stele. E locul unde
          românii care știu ce beau — de la Ursus rece la o palincă de casă —
          lasă recenzii adevărate, găsesc birtul de colț și se cunosc între ei.
        </p>
        <div className="mt-6 h-px w-16 bg-brand-500/40" />
      </section>
    </main>
  );
}
