import { MapSearchResult } from "@/lib/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import SidebarSection from "../sidebar/sidebar-section";
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
    <SidebarSection
      className={`${results.length >= 1 ? "" : "md:flex-[0.052]"}`}
    >
      <div className="sticky top-0">
        <Input
          value={query}
          placeholder="Search..."
          className="bg-white"
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </div>
      {isSearching && <Loader className="animate-spin" />}
      <ul>
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
              setResults([]);
            }}
          >
            <p>{r.display_name}</p>
          </li>
        ))}
      </ul>
    </SidebarSection>
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
