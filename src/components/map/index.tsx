"use client";

import { useAppMap } from "@/hooks/use-map";
import { useMapStore } from "@/lib/store";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CustomRadius from "./custom-radius";
import PlacesOfInterest from "./pois";
import { SearchHandler } from "./search";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map() {
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
  const mapStore = useMapStore();
  const { fetchPOIs, pois, center, setCenter, userLocation } = useAppMap();

  useEffect(() => {
    if (mapStore.selectedPOI?.id) {
      const marker = markerRefs.current[mapStore.selectedPOI.id];
      if (marker) marker.openPopup();
    }
  }, [mapStore.selectedPOI]);

  const handleRadiusComplete = (center: LatLng, radius: number) => {
    setCenter([center.lat, center.lng]);
    fetchPOIs(center.lat, center.lng, radius);
  };

  if (!center) return <div className="p-4">🔍 Locating you...</div>;

  return (
    <div className="h-screen w-full">
      <PlacesOfInterest data={pois} />
      <MapContainer
        zoomControl={false}
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <SearchHandler />
        {/* user location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              className: "user-location-marker",
              html: `<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);"></div>`,
              iconSize: [22, 22],
              iconAnchor: [11, 11],
            })}
          >
            <Popup>
              <strong>you are here</strong>
            </Popup>
          </Marker>
        )}
        <CustomRadius onRadiusComplete={handleRadiusComplete} />
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lon]}
            ref={(el) => {
              if (el) markerRefs.current[poi.id] = el;
            }}
          >
            <Popup className="opacity-1">
              <strong>{poi.name || "(Unnamed)"}</strong>
              <br />
              Type: {poi.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
