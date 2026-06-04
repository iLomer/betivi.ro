"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Venue } from "@/types/database";

interface VenueMapProps {
  venues: Venue[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const ROMANIA_CENTER: [number, number] = [45.9432, 24.9668];
const DEFAULT_ZOOM = 7;

type VenueWithCoords = Venue & { lat: number; lng: number };

function hasCoords(venue: Venue): venue is VenueWithCoords {
  return venue.lat !== null && venue.lng !== null;
}

function makeMarkerHtml(category: Venue["category"]): string {
  const colors: Record<string, string> = {
    bar: "#d4a634",
    berarie: "#e0bc52",
    crama: "#a8441f",
    terasa: "#4a9e6b",
    club: "#7c5cbf",
    restaurant: "#c97a27",
  };
  const color = colors[category ?? ""] ?? "#d4a634";
  return `<div style="
    width:14px;height:14px;border-radius:50%;
    background:${color};border:2.5px solid #0a0705;
    box-shadow:0 0 0 1.5px ${color}88,0 2px 8px rgba(0,0,0,0.6);
  "></div>`;
}

function makePopupHtml(venue: Venue): string {
  return `
    <div style="min-width:160px">
      <p style="font-weight:700;font-size:14px;color:#d4a634;margin:0 0 4px">${venue.name}</p>
      <p style="font-size:12px;color:#9c7a45;margin:0 0 8px">${venue.city}${venue.judet ? `, ${venue.judet}` : ""}</p>
      <a href="/venues/${venue.id}" style="font-size:12px;font-weight:600;color:#d4a634;text-decoration:none;">
        Vezi detalii →
      </a>
    </div>
  `;
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
    scrollWheelZoom: true,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }
  ).addTo(map);

  venues.filter(hasCoords).forEach((venue) => {
    const icon = L.divIcon({
      html: makeMarkerHtml(venue.category),
      className: "",
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    L.marker([venue.lat, venue.lng], { icon })
      .bindPopup(makePopupHtml(venue), {
        className: "betivi-popup",
        maxWidth: 240,
      })
      .addTo(map);
  });

  return map;
}

export function VenueMap({
  venues,
  center = ROMANIA_CENTER,
  zoom = DEFAULT_ZOOM,
  className = "h-96 w-full",
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
      <div className={`flex items-center justify-center rounded-xl border border-red-800 bg-red-950 text-sm text-red-300 ${className}`}>
        {mapError}
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={className}
      aria-label="Harta locațiilor"
      role="region"
    />
  );
}
