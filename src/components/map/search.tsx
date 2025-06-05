import { MapSearchResult } from "@/lib/types";
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import ResponsiveRender from "../responsive-render";
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

function SearchView(props: {
  query: string;
  setQuery: (q: string) => void;
  onSelectLocation: (lat: number, lon: number, name: string) => void;
  results: MapSearchResult[];
  isSearching: boolean;
}) {
  return (
    <>
      <Card className={`w-full max-h-[40vh] overflow-y-scroll p-0 pt-0`}>
        <CardContent className="p-0">
          <div>
            <div className="sticky space-y-2 top-0 p-4">
              <Input
                value={props.query}
                placeholder="Search..."
                className="bg-white"
                onChange={(evt) => props.setQuery(evt.target.value)}
              />
            </div>
            <ul className="px-4">
              {props.results.map((r) => (
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
                  }}
                >
                  <p>{r.display_name}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
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
