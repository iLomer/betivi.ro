import type { DrinkStats } from "@/types/database";

const MILESTONES = [
  { threshold: 100, fillPct: 100 },
  { threshold: 50,  fillPct: 75 },
  { threshold: 25,  fillPct: 50 },
  { threshold: 10,  fillPct: 25 },
  { threshold: 0,   fillPct: 0 },
] as const;

function getFillPercent(total: number): number {
  for (const { threshold, fillPct } of MILESTONES) {
    if (total >= threshold) return fillPct;
  }
  return 0;
}

function getNextMilestone(total: number): number | null {
  return [10, 25, 50, 100].find((m) => m > total) ?? null;
}

function GlassSvg({ fillPct, fillY }: { fillPct: number; fillY: number }) {
  return (
    <svg width="80" height="130" viewBox="0 0 80 130" aria-label={`Pahar ${fillPct}% plin`} role="img">
      <defs>
        <clipPath id="glass-clip">
          <polygon points="10,10 70,10 60,120 20,120" />
        </clipPath>
      </defs>
      {/* glass body */}
      <polygon points="10,10 70,10 60,120 20,120" fill="none" stroke="#c9a227" strokeWidth="2" />
      {/* liquid fill */}
      {fillPct > 0 && (
        <rect x="0" y={fillY} width="80" height="130" fill="#d4a634" opacity="0.6" clipPath="url(#glass-clip)" />
      )}
      {/* foam bubbles when has content */}
      {fillPct > 0 && (
        <>
          <circle cx="28" cy={fillY + 4} r="3" fill="#e8d5b0" opacity="0.5" clipPath="url(#glass-clip)" />
          <circle cx="40" cy={fillY + 2} r="4" fill="#e8d5b0" opacity="0.4" clipPath="url(#glass-clip)" />
          <circle cx="52" cy={fillY + 5} r="2.5" fill="#e8d5b0" opacity="0.5" clipPath="url(#glass-clip)" />
        </>
      )}
      <text x="40" y="72" textAnchor="middle" fontSize="12" fontWeight="bold"
        fill={fillPct > 40 ? "#100d08" : "#c9a227"}>
        {fillPct}%
      </text>
    </svg>
  );
}

export function FillingGlass({ stats }: { stats: DrinkStats }) {
  const fillPct = getFillPercent(stats.total);
  const nextMilestone = getNextMilestone(stats.total);
  const fillY = 120 - (fillPct / 100) * 90;

  return (
    <div className="flex flex-col items-center gap-2">
      <GlassSvg fillPct={fillPct} fillY={fillY} />
      <p className="text-center text-xs text-surface-500">
        {nextMilestone !== null
          ? `${nextMilestone - stats.total} până la milestone`
          : <span className="font-medium text-brand-400">Pahar plin! 🏆</span>
        }
      </p>
    </div>
  );
}
