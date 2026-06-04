"use client";

import { Star } from "lucide-react";
import type { DrinkLog, DrinkCategory } from "@/types/database";

const CATEGORY_LABELS: Record<DrinkCategory, string> = {
  beer:   "Bere",
  wine:   "Vin",
  spirit: "Spirit",
};

const CATEGORY_COLORS: Record<DrinkCategory, string> = {
  beer:   "bg-amber-950/60 text-amber-300 border-amber-700/40",
  wine:   "bg-purple-950/60 text-purple-300 border-purple-700/40",
  spirit: "bg-blue-950/60 text-blue-300 border-blue-700/40",
};

interface DrinkListProps {
  logs: DrinkLog[];
}

export function DrinkList({ logs }: DrinkListProps) {
  if (logs.length === 0) {
    return (
      <p className="py-12 text-center text-surface-500">
        Nu ai înregistrat nicio băutură încă.{" "}
        <a href="/tracker/log" className="text-brand-400 underline hover:text-brand-300">
          Adaugă prima!
        </a>
      </p>
    );
  }

  return (
    <ul className="divide-y divide-surface-700/40">
      {logs.map((log) => (
        <DrinkItem key={log.id} log={log} />
      ))}
    </ul>
  );
}

function DrinkItem({ log }: { log: DrinkLog }) {
  const date = new Date(log.logged_at).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li className="flex items-start gap-4 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-surface-100">{log.name}</p>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[log.category]}`}
          >
            {CATEGORY_LABELS[log.category]}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-3">
          {log.producer && (
            <span className="text-xs text-surface-400">{log.producer}</span>
          )}
          {log.rating !== null && (
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < log.rating! ? "fill-brand-400 text-brand-400" : "fill-surface-700 text-surface-700"
                  }`}
                />
              ))}
            </span>
          )}
          <span className="text-xs text-surface-500">{date}</span>
        </div>

        {log.notes && (
          <p className="mt-1.5 text-xs text-surface-500 line-clamp-2">{log.notes}</p>
        )}
      </div>
    </li>
  );
}
