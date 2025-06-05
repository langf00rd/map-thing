import { MapSearchResult } from "@/lib/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

function MapSearchBox(props: {
  onSelectLocation: (lat: number, lon: number, label: string) => void;
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapSearchResult[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    if (!query || query.length < 3) return setResults([]);
    if (debounceTimeout) clearTimeout(debounceTimeout);

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data);
      setIsSearching(false);
    }, 300);

    setDebounceTimeout(timeout);
  }, [query]);

  return (
    <Card className="absolute p-2 top-4 right-4 z-[1000] w-[400px]">
      <CardContent className="p-0">
        <Input
          type="text"
          value={query}
          placeholder="Search a location..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white"
        />
        {isSearching && (
          <div className="w-full flex items-center justify-center p-5">
            <Loader className="animate-spin" />
          </div>
        )}
        {results.length > 0 && (
          <ul className="overflow-y-scroll max-h-[60vh] mt-3">
            {results.map((r) => (
              <li
                role="button"
                className="p-3 py-2 rounded-xl hover:bg-neutral-200/40 text-[12px] cursor-pointer"
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
              >
                <p>{r.display_name}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
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
