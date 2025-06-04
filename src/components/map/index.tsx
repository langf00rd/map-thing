"use client";

import { useAppMap } from "@/hooks/use-map";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CustomRadius from "./custom-radius";
import { SearchHandler } from "./search";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map() {
  const { fetchPOIs, pois, center, setCenter, userLocation } = useAppMap();

  const handleRadiusComplete = (center: LatLng, radius: number) => {
    setCenter([center.lat, center.lng]);
    fetchPOIs(center.lat, center.lng, radius);
  };

  if (!center) return <div className="p-4">🔍 Locating you...</div>;

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        doubleClickZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
              <br />
              Lat: {userLocation[0].toFixed(4)}
              <br />
              Lng: {userLocation[1].toFixed(4)}
            </Popup>
          </Marker>
        )}
        <CustomRadius onRadiusComplete={handleRadiusComplete} />
        {pois.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lon]}>
            <Popup>
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
