import type { DrinkStats } from "@/types/database";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
}

const ALL_BADGES: Badge[] = [
  {
    id: "primul-pahar",
    name: "Primul Pahar",
    description: "Ai înregistrat prima băutură.",
    icon: "🍺",
    threshold: 1,
  },
  {
    id: "incepator",
    name: "Începător",
    description: "10 băuturi înregistrate.",
    icon: "🍻",
    threshold: 10,
  },
  {
    id: "experimentat",
    name: "Experimentat",
    description: "25 de băuturi înregistrate.",
    icon: "🥂",
    threshold: 25,
  },
  {
    id: "veteran",
    name: "Veteran",
    description: "50 de băuturi înregistrate.",
    icon: "🏆",
    threshold: 50,
  },
  {
    id: "academician",
    name: "Academician",
    description: "100 de băuturi înregistrate.",
    icon: "🎓",
    threshold: 100,
  },
];

export function getEarnedBadges(stats: DrinkStats): Badge[] {
  return ALL_BADGES.filter((badge) => stats.total >= badge.threshold);
}

export function getTopBadge(stats: DrinkStats): Badge | null {
  const earned = getEarnedBadges(stats);
  return earned.length > 0 ? earned[earned.length - 1] : null;
}
