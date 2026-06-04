"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const ROMANIA_CENTER: [number, number] = [45.9432, 24.9668];

export function LocationPicker() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markerRef = useRef<import("leaflet").Marker | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const mounted = { current: true };

    (async () => {
      const L = (await import("leaflet")).default;
      if (!mounted.current || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: ROMANIA_CENTER,
        zoom: 7,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const pinIcon = L.divIcon({
        html: `<span style="font-size:26px;line-height:1;">📍</span>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        }

        setCoords({ lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) });
      });

      mapInstanceRef.current = map;
    })();

    return () => {
      mounted.current = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-2">
      <input type="hidden" name="lat" value={coords?.lat ?? ""} />
      <input type="hidden" name="lng" value={coords?.lng ?? ""} />

      <div
        ref={mapRef}
        className="h-64 w-full cursor-crosshair rounded-lg border border-surface-600"
        aria-label="Selectează locația pe hartă"
      />

      <p className="text-xs text-surface-400">
        {coords
          ? `📍 ${coords.lat}, ${coords.lng} — apasă din nou pentru a muta`
          : "Apasă pe hartă pentru a plasa locația birtului"}
      </p>
    </div>
  );
}
