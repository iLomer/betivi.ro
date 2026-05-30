"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
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

export function VenueMap({
  venues,
  center = ROMANIA_CENTER,
  zoom = DEFAULT_ZOOM,
}: VenueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let mounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;

      if (!mounted || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

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
    }

    initMap().catch(() => {});

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [venues, center, zoom]);

  return (
    <div
      ref={mapRef}
      className="h-96 w-full rounded-xl border border-surface-200 dark:border-surface-700"
      aria-label="Harta locațiilor"
      role="region"
    />
  );
}
