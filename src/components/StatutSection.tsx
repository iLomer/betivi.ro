"use client";

import { useState } from "react";

const ARTICLES = [
  {
    n: 1,
    text: "Orice cetățean român cu vârsta minimă de 18 ani și o toleranță dovedită la minimum 3 sticle de bere are dreptul de a deveni Membru Stagiar al Asociației.",
  },
  {
    n: 2,
    text: 'Membrii sunt obligați moral să raporteze fiecare birt descoperit pe teritoriul național, inclusiv cele fără semn, cele din spatele benzinăriei și cele care se închid „la 10" dar mai stau până la 12.',
  },
  {
    n: 3,
    text: "Gradul de Betiv Emerit se acordă membrului care a documentat minimum 100 de soiuri distincte de bere românească, fără a repeta de două ori aceeași greșeală.",
  },
  {
    n: 4,
    text: 'Consumul de vin este tolerat și respectat. Se raportează separat, în categoria „Nobili". Vinul bag-in-box se declară pe proprie răspundere.',
  },
  {
    n: 5,
    text: "Tuica și palinca se declară pe proprie răspundere. Asociația nu își asumă responsabilitatea pentru zilele de luni pierdute sau pentru deciziile luate după ora 22:00.",
  },
  {
    n: 6,
    text: 'Membrul care descoperă un birt nou și îl adaugă pe hartă primește titlul onorific de „Explorator" și o bere imaginară din partea Asociației.',
  },
  {
    n: 7,
    text: "Asociația condamnă ferm beția iresponsabilă. Bem civilizat, cu rating și cu Uber la final. Sau cu bicicleta dacă nu plouă.",
  },
];

export function StatutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border border-surface-700/60 bg-surface-800/40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-8 py-5 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-widest text-brand-400">
          Statutul Asociației — extras oficial
        </span>
        <span className="text-xs font-semibold text-brand-500/70">
          {open ? "▲ închide" : "▼ citește"}
        </span>
      </button>

      {open && (
        <div className="border-t border-surface-700/40 px-8 py-6">
          <ul className="space-y-0">
            {ARTICLES.map(({ n, text }, i) => (
              <li key={n}>
                <div className="py-5">
                  <p className="text-base leading-relaxed text-surface-200">
                    <span className="mr-3 font-bold text-brand-500">
                      Art. {n}
                    </span>
                    {text}
                  </p>
                </div>
                {i < ARTICLES.length - 1 && (
                  <div className="border-t border-surface-700/30" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
