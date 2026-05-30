import type { DrinkStats } from "@/types/database";

const MILESTONES = [
  { threshold: 100, fillPct: 100 },
  { threshold: 50, fillPct: 75 },
  { threshold: 25, fillPct: 50 },
  { threshold: 10, fillPct: 25 },
  { threshold: 0, fillPct: 0 },
] as const;

function getFillPercent(total: number): number {
  for (const { threshold, fillPct } of MILESTONES) {
    if (total >= threshold) return fillPct;
  }
  return 0;
}

function getNextMilestone(total: number): number | null {
  const upcoming = [10, 25, 50, 100].find((m) => m > total);
  return upcoming ?? null;
}

interface FillingGlassProps {
  stats: DrinkStats;
}

export function FillingGlass({ stats }: FillingGlassProps) {
  const fillPct = getFillPercent(stats.total);
  const nextMilestone = getNextMilestone(stats.total);
  const fillY = 120 - (fillPct / 100) * 90;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width="80"
        height="130"
        viewBox="0 0 80 130"
        aria-label={`Pahar ${fillPct}% plin`}
        role="img"
      >
        <defs>
          <clipPath id="glass-clip">
            <polygon points="10,10 70,10 60,120 20,120" />
          </clipPath>
        </defs>
        <polygon
          points="10,10 70,10 60,120 20,120"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
        />
        {fillPct > 0 && (
          <rect
            x="0"
            y={fillY}
            width="80"
            height="130"
            fill="#f59e0b"
            opacity="0.7"
            clipPath="url(#glass-clip)"
          />
        )}
        <text
          x="40"
          y="70"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill={fillPct > 40 ? "#fff" : "#6b7280"}
        >
          {fillPct}%
        </text>
      </svg>
      {nextMilestone !== null ? (
        <p className="text-xs text-surface-500">
          Mai ai {nextMilestone - stats.total} băuturi până la {nextMilestone}
        </p>
      ) : (
        <p className="text-xs font-medium text-amber-600">Pahar plin! Felicitări!</p>
      )}
    </div>
  );
}
