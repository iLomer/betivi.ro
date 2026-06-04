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
      <circle cx="100" cy="100" r="94" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#c9a227" strokeWidth="0.8" />
      <text fill="#c9a227" fontSize="9" letterSpacing="2.2" fontFamily="Georgia, serif">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          ASOCIAȚIA NAȚIONALĂ A BEȚILOR
        </textPath>
      </text>
      <text x="100" y="120" textAnchor="middle" fontSize="46" fontFamily="serif">🍺</text>
      <text x="100" y="155" textAnchor="middle" fontSize="11" fill="#c9a227" letterSpacing="7">
        ★ ★ ★
      </text>
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

      {/* Hero — split layout, full viewport height */}
      <section className="relative z-10 flex min-h-[calc(100vh-60px)] items-center px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">

          {/* Left — emblem + credential */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <AnbtEmblem />
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-700">
              Est. 2024 · România · Nr. Reg. J99/BERE/2024
            </p>
          </div>

          {/* Divider */}
          <div className="hidden h-56 w-px bg-surface-700/50 md:block" aria-hidden="true" />

          {/* Right — headline + CTAs + stats */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <h1
              className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-[1.05] tracking-tight text-surface-100"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bem cu{" "}
              <span className="text-brand-400">rost</span>.
              <br />
              Știm ce bem.
            </h1>

            <p
              className="mt-4 text-lg text-surface-400 md:text-xl"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Primul portal oficial al betivilor organizați din România.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/harta"
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
            <div className="mt-10 flex flex-wrap justify-center gap-8 md:justify-start md:gap-12">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center md:text-left">
                  <span
                    className="block text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-none text-brand-400"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {value}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-surface-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="h-px flex-1 bg-surface-700/40" />
        <span className="mx-6 text-2xl text-surface-600">§</span>
        <div className="h-px flex-1 bg-surface-700/40" />
      </div>

      {/* Statut section */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20">
        <StatutSection />
      </div>
    </main>
  );
}
