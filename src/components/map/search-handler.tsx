import { POI } from "@/lib/types";
import { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import LocationSearch from "./location-search";
import POIs from "./pois";

export function SearchHandler(props: { pois: POI[]; isFetchingPOIs: boolean }) {
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
      <div className="space-y-4">
        <LocationSearch onSelectLocation={handleSelect} />
        <POIs {...props} />
      </div>
      {marker && (
        <Marker position={[marker.lat, marker.lon]}>
          <Popup>{marker.label}</Popup>
        </Marker>
      )}
    </>
  );
}
