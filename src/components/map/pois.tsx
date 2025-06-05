import { useMapStore } from "@/lib/store";
import { POI } from "@/lib/types";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export default function PlacesOfInterest(props: { data: POI[] }) {
  const mapStore = useMapStore();
  const [query, setQuery] = useState("");

  const results = query
    ? props.data.filter(
        (poi) =>
          poi.name.toLowerCase().includes(query) ||
          poi.type.toLowerCase().includes(query),
      )
    : props.data;

  if (props.data.length < 1) return null;

  return (
    <Card className="fixed overflow-y-scroll bottom-[100px] right-4 z-[1000] pt-0 w-[400px] h-[40vh]">
      <CardContent className="p-0">
        <div>
          <div className="sticky top-0 p-4">
            <Input
              placeholder="Search..."
              className="bg-white"
              onChange={(evt) => setQuery(evt.target.value)}
            />
          </div>
          <ul className="px-4">
            {results.map((poi) => (
              <li
                role="button"
                onClick={() => mapStore.setSelectedPOI(poi)}
                key={poi.id}
                className={`p-3 py-2 rounded-xl hover:bg-neutral-200/40 text-[12px] cursor-pointer ${mapStore.selectedPOI?.id === poi.id ? "bg-neutral-200/40" : ""}`}
              >
                <p className="font-medium">{poi.name}</p>
                <p className="text-neutral-500">{poi.type}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
