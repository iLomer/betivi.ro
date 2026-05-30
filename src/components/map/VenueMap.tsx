"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Venue } from "@/types/database";

interface VenueMapProps {
  venues: Venue[];
  center?: [number, number];
  zoom?: number;
}

const ROMANIA_CENTER: [number, number] = [45.9432, 24.9668];
const DEFAULT_ZOOM = 7;

const CATEGORY_ICONS: Record<string, string> = {
  bar: "🍺",
  berarie: "🍻",
  crama: "🍷",
  terasa: "☀️",
  club: "🎵",
  restaurant: "🍽️",
};

function getCategoryIcon(category: Venue["category"]): string {
  return CATEGORY_ICONS[category ?? ""] ?? "📍";
}

type VenueWithCoords = Venue & { lat: number; lng: number };

function hasCoords(venue: Venue): venue is VenueWithCoords {
  return venue.lat !== null && venue.lng !== null;
}

async function initMap(
  container: HTMLDivElement,
  venues: Venue[],
  center: [number, number],
  zoom: number,
  mounted: { current: boolean }
): Promise<import("leaflet").Map | null> {
  const L = (await import("leaflet")).default;

  if (!mounted.current) return null;

  const map = L.map(container, {
    center,
    zoom,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  venues.filter(hasCoords).forEach((venue) => {
    const icon = L.divIcon({
      html: `<span style="font-size:22px;line-height:1;">${getCategoryIcon(venue.category)}</span>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
    const popup = `
      <strong>${venue.name}</strong><br/>
      ${venue.city}${venue.address ? `<br/>${venue.address}` : ""}
      <br/><a href="/venues/${venue.id}" style="color:#d97706;font-weight:600;">Vezi detalii →</a>
    `;
    L.marker([venue.lat, venue.lng], { icon })
      .bindPopup(popup, { maxWidth: 220 })
      .addTo(map);
  });

  return map;
}

export function VenueMap({
  venues,
  center = ROMANIA_CENTER,
  zoom = DEFAULT_ZOOM,
}: VenueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const mounted = { current: true };

    initMap(mapRef.current, venues, center, zoom, mounted)
      .then((map) => {
        if (map) mapInstanceRef.current = map;
      })
      .catch(() => {
        setMapError("Harta nu a putut fi încărcată. Reîncarcă pagina.");
      });

    return () => {
      mounted.current = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [venues, center, zoom]);

  if (mapError) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
        {mapError}
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="h-96 w-full rounded-xl border border-surface-200 dark:border-surface-700"
      aria-label="Harta locațiilor"
      role="region"
    />
  );
}
