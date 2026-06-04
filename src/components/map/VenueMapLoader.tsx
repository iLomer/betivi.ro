"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/types/database";

interface VenueMapLoaderProps {
  venues: Venue[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const VenueMap = dynamic(
  () => import("./VenueMap").then((m) => m.VenueMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-surface-800">
        <p className="text-sm text-surface-400">Se încarcă harta...</p>
      </div>
    ),
  }
);

export function VenueMapLoader({ venues, center, zoom, className }: VenueMapLoaderProps) {
  return <VenueMap venues={venues} center={center} zoom={zoom} className={className} />;
}
