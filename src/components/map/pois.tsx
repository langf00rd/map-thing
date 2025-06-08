import { useIsMobileView } from "@/hooks/use-mobile-view";
import { useGlobalStore, useMapStore } from "@/lib/store";
import { Amenity, POI } from "@/lib/types";
import { getAmenityProps } from "@/lib/utils";
import { getLocationInformation } from "@/services/rss";
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

  async function handlePOIClick(poi: POI) {
    mapStore.setSelectedPOI(poi);
    const locationInformation = await getLocationInformation(poi);
    globalStore.setSelectedPOIRSSNews(locationInformation);
  }

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
          const amenityProps = getAmenityProps(amenity);
          return (
            <li
              role="button"
              key={amenity}
              className={`flex items-center gap-1 p-1 pr-3 cursor-pointer uppercase whitespace-nowrap border text-sm text-neutral-500 font-medium rounded-full ${query === amenity ? "bg-primary text-white" : "bg-white"}`}
              onClick={() => setQuery(amenity)}
            >
              <span className="size-[25px] flex items-center justify-center rounded-full">
                <amenityProps.icon size={14} />
              </span>
              {amenity}
            </li>
          );
        })}
      </ul>
      <ul className="space-y-2">
        {results.map((poi) => {
          const amenityProps = getAmenityProps(poi.type);
          return (
            <li
              role="button"
              onClick={() => handlePOIClick(poi)}
              key={poi.id}
              className={`p-3 py-2 flex gap-2 rounded-xl hover:bg-neutral-200/40 text-sm cursor-pointer ${mapStore.selectedPOI?.id === poi.id ? "bg-neutral-200/40" : ""}`}
            >
              <div className="w-[15%]">
                <span
                  className={`flex-1 size-[45px] text-white flex items-center justify-center rounded-full`}
                  style={{
                    backgroundColor: amenityProps.color,
                  }}
                >
                  <amenityProps.icon size={20} />
                </span>
              </div>
              <div className="w-[90%]">
                <p className="font-medium">{poi.name}</p>
                <p className="text-neutral-500 text-[13px] uppercase">
                  {poi.type}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
