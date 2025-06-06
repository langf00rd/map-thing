import { useIsMobileView } from "@/hooks/use-mobile-view";
import { useMapStore } from "@/lib/store";
import { Amenity, POI } from "@/lib/types";
import { Loader } from "lucide-react";
import { useState } from "react";
import ResponsiveRender from "../responsive-render";
import POIsView from "./views/pois";

export default function PlacesOfInterest(props: {
  data: POI[];
  isLoading: boolean;
}) {
  const isMobileView = useIsMobileView();
  const mapStore = useMapStore();
  const [query, setQuery] = useState("");

  const results = query
    ? props.data.filter(
        (poi) =>
          poi.name.toLowerCase().includes(query) ||
          poi.type.toLowerCase().includes(query),
      )
    : props.data;

  function getAmenitiesFromData() {
    const amenities: Amenity[] = [];
    props.data.forEach((a) => {
      amenities.push(a.type);
    });
    const uniqueAmenities = new Set(amenities);
    return Array.from(uniqueAmenities);
  }

  const dataAmenities = getAmenitiesFromData();

  if (props.isLoading) {
    return (
      <Loader
        className={`animate-spin ${!isMobileView ? "absolute bottom-16 right-5" : ""}`}
      />
    );
  }

  if (props.data.length < 1) return null;

  return (
    <ResponsiveRender
      desktopPosition="BOTTOM-RIGHT"
      mobilePosition="BOTTOM-CENTER"
    >
      <POIsView
        isMobileView={isMobileView}
        data={dataAmenities}
        results={results}
        query={query}
        setQuery={setQuery}
        mapStore={mapStore}
      />
    </ResponsiveRender>
  );
}
