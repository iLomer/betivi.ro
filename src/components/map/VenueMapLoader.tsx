"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/types/database";

interface VenueMapLoaderProps {
  venues: Venue[];
  center?: [number, number];
  zoom?: number;
}

const VenueMap = dynamic(
  () => import("./VenueMap").then((m) => m.VenueMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 items-center justify-center rounded-xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800">
        <p className="text-sm text-surface-400">Se încarcă harta...</p>
      </div>
    ),
  }
);

export function VenueMapLoader({ venues, center, zoom }: VenueMapLoaderProps) {
  return <VenueMap venues={venues} center={center} zoom={zoom} />;
}
