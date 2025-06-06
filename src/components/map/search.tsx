import { MapSearchResult } from "@/lib/types";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import ResponsiveRender from "../responsive-render";
import SearchView from "./views/search";

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
    try {
      setIsSearching(true);
      const timeout = setTimeout(async () => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setResults(data);
        setDebounceTimeout(timeout);
      }, 300);
    } catch (err) {
      alert(err);
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  return (
    <ResponsiveRender desktopPosition="TOP-RIGHT" mobilePosition="TOP-CENTER">
      <SearchView
        isSearching={isSearching}
        query={query}
        setQuery={setQuery}
        onSelectLocation={props.onSelectLocation}
        results={results}
      />
    </ResponsiveRender>
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
