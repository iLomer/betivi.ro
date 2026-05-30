import Link from "next/link";
import type { Producer, ProducerCategory } from "@/types/database";

const CATEGORY_LABELS: Record<ProducerCategory, string> = {
  brewery: "Berărie artizanală",
  winery: "Cramă",
  distillery: "Distilerie",
};

const CATEGORY_COLORS: Record<ProducerCategory, string> = {
  brewery: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  winery: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  distillery: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const description = producer.description
    ? producer.description.length > 120
      ? producer.description.slice(0, 120) + "..."
      : producer.description
    : null;

  return (
    <Link
      href={`/producatori/${producer.id}`}
      className="block rounded-lg border border-surface-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-surface-700 dark:bg-surface-800"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-surface-900 dark:text-surface-50">
          {producer.name}
        </h2>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[producer.category]}`}
        >
          {CATEGORY_LABELS[producer.category]}
        </span>
      </div>

      <p className="mb-2 text-sm text-surface-500 dark:text-surface-400">
        {producer.region}
      </p>

      {description && (
        <p className="text-sm text-surface-700 dark:text-surface-300">
          {description}
        </p>
      )}
    </Link>
  );
}
