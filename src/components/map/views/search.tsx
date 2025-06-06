import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapSearchResult } from "@/lib/types";

export default function SearchView(props: {
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
