"use client";

import { MapSearchResult } from "@/lib/types";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

function MapSearchBox(props: {
  onSelectLocation: (lat: number, lon: number, label: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapSearchResult[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data);
    }, 300); // Debounce

    setDebounceTimeout(timeout);
  }, [query]);

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded shadow w-[300px]">
      <input
        type="text"
        value={query}
        placeholder="Search a place..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded text-sm"
      />
      {results.length > 0 && (
        <ul className="mt-2 border rounded max-h-60 overflow-y-auto text-sm">
          {results.map((r) => (
            <li
              key={`${r.lat}-${r.lon}`}
              onClick={() => {
                props.onSelectLocation(
                  parseFloat(r.lat),
                  parseFloat(r.lon),
                  r.display_name,
                );
                setQuery("");
                setResults([]);
              }}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SearchHandler() {
  const map = useMap();
  const [marker, setMarker] = useState<{
    lat: number;
    lon: number;
    label: string;
  } | null>(null);

  const handleSelect = (lat: number, lon: number, label: string) => {
    setMarker({ lat, lon, label });
    map.setView([lat, lon], 15);
  };

  return (
    <>
      <MapSearchBox onSelectLocation={handleSelect} />
      {marker && (
        <Marker position={[marker.lat, marker.lon]}>
          <Popup>{marker.label}</Popup>
        </Marker>
      )}
    </>
  );
}
