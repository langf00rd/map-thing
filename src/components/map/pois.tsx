import { POI } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";

export default function PlacesOfInterest(props: { data: POI[] }) {
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
    <div className="w-[500px] space-y-3 rounded-sm h-[40vh] fixed bottom-20 overflow-y-scroll right-3 bg-white border shadow-sm z-[1000]">
      <div className="bg-white sticky top-0 p-2">
        <Input
          placeholder="Search..."
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </div>
      <ul className="space-y-5 p-4">
        {results.map((poi) => (
          <li key={poi.id} className="-space-y-1">
            <p className="font-semibold">{poi.name}</p>
            <p className="text-neutral-500">{poi.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
