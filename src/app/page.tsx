import Link from "next/link";
import { StatutSection } from "@/components/StatutSection";

const STATS = [
  { value: "47.832", label: "Membri Activi" },
  { value: "1.247", label: "Birturi pe Hartă" },
  { value: "89.412", label: "Beri Logate" },
];

function AnbtEmblem() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="200"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <path id="topArc" d="M 18,100 A 82,82 0 0,1 182,100" />
        <path id="botArc" d="M 40,108 A 60,60 0 0,0 160,108" />
      </defs>
      {/* Rings */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#c9a227" strokeWidth="0.8" />
      {/* Top curved text */}
      <text fill="#c9a227" fontSize="9" letterSpacing="2.2" fontFamily="Georgia, serif">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          ASOCIAȚIA NAȚIONALĂ A BEȚILOR
        </textPath>
      </text>
      {/* Beer mug */}
      <text x="100" y="120" textAnchor="middle" fontSize="46" fontFamily="serif">🍺</text>
      {/* Stars */}
      <text x="100" y="155" textAnchor="middle" fontSize="11" fill="#c9a227" letterSpacing="7">
        ★ ★ ★
      </text>
      {/* Bottom arc */}
      <text fill="#c9a227" fontSize="8" letterSpacing="1.5" fontFamily="Georgia, serif">
        <textPath href="#botArc" startOffset="50%" textAnchor="middle">
          BETIVI.RO
        </textPath>
      </text>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-surface-900">
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center px-6 pb-16 pt-16 text-center">
        {/* Emblem */}
        <AnbtEmblem />

        {/* Official tagline */}
        <p
          className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600"
          style={{ letterSpacing: "0.22em" }}
        >
          Est. 2024 &nbsp;·&nbsp; România &nbsp;·&nbsp; Nr. Reg. J99/BERE/2024
        </p>

        {/* Main headline */}
        <h1
          className="mt-6 text-[clamp(3rem,9vw,7rem)] font-black leading-[1] tracking-tight text-surface-100"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bem cu{" "}
          <span className="text-brand-400">rost</span>.
          <br />
          Știm ce bem.
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 text-lg text-surface-400 md:text-xl"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          Primul portal oficial al betivilor organizați din România.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/venues"
            className="bg-brand-500 px-7 py-3 text-xs font-bold uppercase tracking-widest text-surface-900 transition-colors hover:bg-brand-400"
          >
            Explorează locații
          </Link>
          <Link
            href="/auth/signup"
            className="border border-brand-500/50 px-7 py-3 text-xs font-bold uppercase tracking-widest text-brand-400 transition-colors hover:border-brand-400 hover:text-brand-300"
          >
            Devino Membru
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 md:gap-20">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <span
                className="block text-[clamp(2.5rem,6vw,4rem)] font-black leading-none text-brand-400"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {value}
              </span>
              <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-surface-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="relative z-10 my-4 flex items-center justify-center">
        <div className="h-px flex-1 bg-surface-700/40" />
        <span className="mx-6 text-2xl text-surface-600">§</span>
        <div className="h-px flex-1 bg-surface-700/40" />
      </div>

      {/* Statut section */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20">
        <StatutSection />
      </div>
    </main>
  );
}
