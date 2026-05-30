"use client";

import { deleteDrinkLogAction } from "@/lib/tracker/actions";
import type { DrinkLog, DrinkCategory } from "@/types/database";

const CATEGORY_LABELS: Record<DrinkCategory, string> = {
  beer: "Bere",
  wine: "Vin",
  spirit: "Spirit",
};

const CATEGORY_COLORS: Record<DrinkCategory, string> = {
  beer: "bg-amber-100 text-amber-800",
  wine: "bg-red-100 text-red-800",
  spirit: "bg-purple-100 text-purple-800",
};

interface DrinkListProps {
  logs: DrinkLog[];
}

export function DrinkList({ logs }: DrinkListProps) {
  if (logs.length === 0) {
    return (
      <p className="py-12 text-center text-surface-500">
        Nu ai înregistrat nicio băutură încă.{" "}
        <a href="/tracker/log" className="text-brand-600 underline hover:text-brand-700">
          Adaugă prima!
        </a>
      </p>
    );
  }

  return (
    <ul className="divide-y divide-surface-100">
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
    <li className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-surface-900">{log.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[log.category]}`}
          >
            {CATEGORY_LABELS[log.category]}
          </span>
          {log.producer && (
            <span className="text-xs text-surface-500">{log.producer}</span>
          )}
          {log.rating !== null && (
            <span className="text-xs text-yellow-500">
              {"★".repeat(log.rating)}
              {"☆".repeat(5 - log.rating)}
            </span>
          )}
          <span className="text-xs text-surface-400">{date}</span>
        </div>
        {log.notes && (
          <p className="mt-1 text-xs text-surface-500 line-clamp-2">{log.notes}</p>
        )}
      </div>
      <DeleteButton logId={log.id} />
    </li>
  );
}

function DeleteButton({ logId }: { logId: string }) {
  return (
    <form
      action={async () => {
        await deleteDrinkLogAction(logId);
      }}
    >
      <button
        type="submit"
        aria-label="Șterge"
        className="shrink-0 rounded p-1 text-surface-400 hover:bg-red-50 hover:text-red-600"
      >
        ✕
      </button>
    </form>
  );
}
