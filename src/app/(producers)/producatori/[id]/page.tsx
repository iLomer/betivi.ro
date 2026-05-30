import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducerById } from "@/lib/producers/queries";
import type { ProducerCategory } from "@/types/database";

const CATEGORY_LABELS: Record<ProducerCategory, string> = {
  brewery: "Berărie artizanală",
  winery: "Cramă",
  distillery: "Distilerie",
};

const CATEGORY_COLORS: Record<ProducerCategory, string> = {
  brewery: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  winery:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  distillery:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const producer = await getProducerById(id);

  if (!producer) {
    return { title: "Producător negăsit — Betivi" };
  }

  return {
    title: `${producer.name} — Betivi`,
    description:
      producer.description ??
      `${CATEGORY_LABELS[producer.category]} din ${producer.region}`,
  };
}

export default async function ProducatorDetailPage({ params }: PageProps) {
  const { id } = await params;
  const producer = await getProducerById(id);

  if (!producer) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/producatori"
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
      >
        &larr; Înapoi la producători
      </Link>

      <article>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-50">
            {producer.name}
          </h1>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${CATEGORY_COLORS[producer.category]}`}
          >
            {CATEGORY_LABELS[producer.category]}
          </span>

          <span className="rounded-full bg-surface-100 px-3 py-1 text-sm font-medium text-surface-700 dark:bg-surface-700 dark:text-surface-200">
            {producer.region}
          </span>
        </div>

        {producer.description && (
          <p className="mb-6 text-base leading-relaxed text-surface-700 dark:text-surface-300">
            {producer.description}
          </p>
        )}

        {producer.website && (
          <a
            href={producer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Vizitează site-ul
          </a>
        )}
      </article>
    </main>
  );
}
