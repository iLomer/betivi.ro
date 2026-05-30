import type { DrinkLog } from "@/types/database";

const CATEGORY_LABEL: Record<string, string> = {
  beer: "Bere",
  wine: "Vin",
  spirit: "Spirtoasă",
};

interface RecentLogsProps {
  logs: DrinkLog[];
}

export function RecentLogs({ logs }: RecentLogsProps) {
  if (logs.length === 0) {
    return (
      <p className="text-sm text-surface-500">
        Nicio băutură înregistrată încă.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-surface-100">
      {logs.map((log) => (
        <li key={log.id} className="flex items-start justify-between py-3">
          <div>
            <p className="font-medium text-surface-900">{log.name}</p>
            {log.producer && (
              <p className="text-sm text-surface-500">{log.producer}</p>
            )}
          </div>
          <span className="ml-4 rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-surface-600">
            {CATEGORY_LABEL[log.category] ?? log.category}
          </span>
        </li>
      ))}
    </ul>
  );
}
