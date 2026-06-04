import type { DrinkLog } from "@/types/database";

const CATEGORY_LABEL: Record<string, string> = {
  beer:   "Bere",
  wine:   "Vin",
  spirit: "Spirtoasă",
};

const CATEGORY_COLOR: Record<string, string> = {
  beer:   "bg-amber-950/60 text-amber-300 border-amber-700/40",
  wine:   "bg-purple-950/60 text-purple-300 border-purple-700/40",
  spirit: "bg-blue-950/60 text-blue-300 border-blue-700/40",
};

interface RecentLogsProps {
  logs: DrinkLog[];
}

export function RecentLogs({ logs }: RecentLogsProps) {
  if (logs.length === 0) {
    return (
      <p className="text-sm text-surface-500">Nicio băutură înregistrată încă.</p>
    );
  }

  return (
    <ul className="divide-y divide-surface-700/40">
      {logs.map((log) => (
        <li key={log.id} className="flex items-center justify-between py-3">
          <div className="min-w-0">
            <p className="truncate font-medium text-surface-100">{log.name}</p>
            {log.producer && (
              <p className="text-sm text-surface-400">{log.producer}</p>
            )}
          </div>
          <span
            className={`ml-4 shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              CATEGORY_COLOR[log.category] ?? "bg-surface-700/50 text-surface-300 border-surface-600/40"
            }`}
          >
            {CATEGORY_LABEL[log.category] ?? log.category}
          </span>
        </li>
      ))}
    </ul>
  );
}
