import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghidul comunității — Betivi",
  description: "Regulile și valorile comunității betivi.ro.",
};

const SECTIONS = [
  {
    title: "Ce este betivi.ro",
    content:
      "Betivi.ro este o platformă comunitară pentru iubitorii de cultură a băutului din România — un spațiu unde poți descoperi locuri, împărtăși experiențe și te conecta cu alți entuziaști de bere artizanală, vin, și spirtoase românești. Nu suntem o reclamă la alcool. Suntem o comunitate de oameni care beau cu cap.",
  },
  {
    title: "Vârsta minimă",
    content:
      "Platforma este destinată exclusiv persoanelor cu vârsta de 18 ani împliniți. Prin crearea unui cont, confirmi că ai vârsta legală pentru consumul de alcool în România. Conturile aparținând minorilor vor fi șterse imediat ce sunt identificate.",
  },
  {
    title: "Regulile comunității",
    items: [
      "Fii respectuos. Atacurile personale, harțuirea sau discursul instigator la ură nu sunt tolerate.",
      "Postează onest. Recenziile și recomandările trebuie să fie autentice — fără recenzii false sau sponsorizate nedeclarate.",
      "Nu promova consumul excesiv. Conținutul care glorifică beția în exces sau comportamentele periculoase va fi șters.",
      "Respectă locațiile. Dacă adaugi un birt, asigură-te că informațiile sunt corecte și actuale.",
      "Nu conduceți după ce ați băut. Niciodată, indiferent de circumstanțe.",
      "Protejează-ți datele. Nu distribui informații personale ale altor utilizatori fără consimțământul lor.",
    ],
  },
  {
    title: "Consum responsabil",
    content:
      "Betivi.ro susține consumul moderat și conștient. Asta înseamnă să cunoști limitele proprii, să te hidratezi, să mănânci înainte și în timpul consumului, și să alegi să nu conduci. Dacă simți că tu sau cineva drag are o problemă cu alcoolul, nu ezita să cauți ajutor.",
  },
  {
    title: "Unde găsești ajutor",
    content:
      "Alcoolici Anonimi România oferă suport gratuit și confidențial pentru persoanele care se confruntă cu dependența de alcool.",
    link: { label: "aa.ro — Alcoolici Anonimi România", href: "https://www.aa.ro" },
  },
  {
    title: "Raportează un abuz",
    content:
      "Dacă întâlnești conținut care încalcă aceste reguli, scrie-ne la contact@betivi.ro. Luăm fiecare sesizare în serios.",
  },
];

export default function GhidPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
          Comunitatea
        </p>
        <h1
          className="text-4xl font-black text-surface-100"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ghidul comunității
        </h1>
        <p className="mt-3 text-surface-400">
          Bem cu rost. Ăsta e singurul nostru principiu.
        </p>
      </div>

      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title} className="border-t border-surface-700/40 pt-8">
            <h2 className="mb-3 text-lg font-semibold text-surface-100">
              {section.title}
            </h2>

            {"items" in section && section.items ? (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-surface-400">
                    <span className="mt-0.5 shrink-0 text-brand-600">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-surface-400">
                {"content" in section ? section.content : null}
              </p>
            )}

            {"link" in section && section.link && (
              <a
                href={section.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300"
              >
                {section.link.label} →
              </a>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 border-t border-surface-700/40 pt-8 text-center">
        <p className="text-xs text-surface-600">
          +18 · Consumați alcool responsabil · Nu beți și nu conduceți
        </p>
      </div>
    </main>
  );
}
