import { useIsMobileView } from "@/hooks/use-mobile-view";
import { useGlobalStore, useMapStore } from "@/lib/store";
import { Amenity, POI } from "@/lib/types";
import { getIconByAmenity } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function POIs(props: { pois: POI[]; isFetchingPOIs: boolean }) {
  const mapStore = useMapStore();
  const globalStore = useGlobalStore();

  const isMobileView = useIsMobileView();
  const [query, setQuery] = useState("");

  function getResults() {
    if (query === Amenity.All) return props.pois;
    else {
      return props.pois.filter(
        (poi) =>
          poi.name.toLowerCase().includes(query) ||
          poi.type.toLowerCase().includes(query),
      );
    }
  }

  const results = getResults();

  function getAmenitiesFromData() {
    const amenities: Amenity[] = [];
    props.pois.forEach((a) => {
      amenities.push(a.type);
    });
    const uniqueAmenities = new Set(amenities);
    return Array.from(uniqueAmenities);
  }

  const amenities = getAmenitiesFromData();

  if (props.isFetchingPOIs) {
    return (
      <Loader
        className={`animate-spin ${!isMobileView ? "absolute bottom-16 right-5" : ""}`}
      />
    );
  }

  if (props.pois.length < 1) return null;

  if (globalStore.isLocationSearchInputInFocus) return null;

  return (
    <>
      <ul className="flex overflow-scroll gap-2">
        {[Amenity.All, ...Object.values(amenities)].map((amenity) => {
          const Icon = getIconByAmenity(amenity);
          return (
            <li
              role="button"
              key={amenity}
              className={`flex items-center gap-1 p-1 pr-3 cursor-pointer uppercase whitespace-nowrap border text-sm text-neutral-500 font-medium rounded-full ${query === amenity ? "bg-primary text-white" : "bg-white"}`}
              onClick={() => setQuery(amenity)}
            >
              <span className="size-[25px] flex items-center justify-center rounded-full">
                <Icon size={14} />
              </span>
              {amenity}
            </li>
          );
        })}
      </ul>
      <ul>
        {results.map((poi) => {
          const Icon = getIconByAmenity(poi.type);
          return (
            <li
              role="button"
              onClick={() => mapStore.setSelectedPOI(poi)}
              key={poi.id}
              className={`p-3 py-2 flex gap-2 rounded-xl hover:bg-neutral-200/40 text-sm cursor-pointer ${mapStore.selectedPOI?.id === poi.id ? "bg-neutral-200/40" : ""}`}
            >
              <span className="size-[35px] bg-[#FF8F1F] text-white flex items-center justify-center rounded-full">
                <Icon size={16} />
              </span>
              <div>
                <p className="font-medium">{poi.name}</p>
                <p className="text-neutral-500 uppercase">{poi.type}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
