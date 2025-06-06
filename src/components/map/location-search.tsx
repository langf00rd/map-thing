import { useGlobalStore } from "@/lib/store";
import { MapSearchResult } from "@/lib/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LocationSearch(props: {
  onSelectLocation: (lat: number, lon: number, label: string) => void;
}) {
  const globalStore = useGlobalStore();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapSearchResult[]>([]);

  function toggleSearchInputFieldInFocus() {
    globalStore.setIsLocationSearchInputInFocus(
      !globalStore.isLocationSearchInputInFocus,
    );
  }

  useEffect(() => {
    if (!query || query.length < 3) return setResults([]);
    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <div className="flex items-center gap-2">
        <Input
          onBlur={toggleSearchInputFieldInFocus}
          onFocus={toggleSearchInputFieldInFocus}
          value={query}
          placeholder="Search..."
          className="bg-white"
          onChange={(evt) => setQuery(evt.target.value)}
        />
        {globalStore.isLocationSearchInputInFocus && (
          <Button
            onClick={toggleSearchInputFieldInFocus}
            variant="ghost"
            className="text-primary"
          >
            Cancel
          </Button>
        )}
      </div>
      {isSearching && (
        <div className="flex items-center justify-center p-4">
          <Loader className="animate-spin" />
        </div>
      )}
      <ul>
        {results.map((r) => (
          <li
            role="button"
            className="p-3 py-2 rounded-xl hover:bg-neutral-200/40 text-sm cursor-pointer"
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
    </>
  );
}
