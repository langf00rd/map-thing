"use client";

import { useAppMap } from "@/hooks/use-map";
import { useMapStore } from "@/lib/store";
import { POI } from "@/lib/types";
import { getIconByAmenity, renderIconToSVG } from "@/lib/utils";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SidebarPortal from "../sidebar";
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
  const mapStore = useMapStore();
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
  const { getPOIs, pois, center, setCenter, userLocation, isFetchingPOIs } =
    useAppMap();

  useEffect(() => {
    if (mapStore.selectedPOI?.id) {
      const marker = markerRefs.current[mapStore.selectedPOI.id];
      if (marker) marker.openPopup();
    }
  }, [mapStore.selectedPOI]);

  const handleRadiusComplete = (center: LatLng, radius: number) => {
    setCenter([center.lat, center.lng]);
    getPOIs(center.lat, center.lng, radius);
  };

  if (!center)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Finding your location...
      </div>
    );

  return (
    <div className="h-screen w-full">
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

        <SidebarPortal>
          <SearchHandler />
          <PlacesOfInterest isLoading={isFetchingPOIs} data={pois} />
        </SidebarPortal>

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
            <Popup closeButton={false}>
              <p>You are here</p>
            </Popup>
          </Marker>
        )}

        <CustomRadius onRadiusComplete={handleRadiusComplete} />

        {pois.map((poi) => {
          const Icon = getIconByAmenity(poi.type);
          return (
            <Marker
              icon={L.divIcon({
                iconSize: [10, 10],
                iconAnchor: [11, 11],
                className: "user-location-marker",
                html: customPOIMarker(poi),
              })}
              key={poi.id}
              position={[poi.lat, poi.lon]}
              ref={(el) => {
                if (el) markerRefs.current[poi.id] = el;
              }}
            >
              <Popup closeButton={false}>
                <span className="size-[30px] mb-2 bg-neutral-200 flex items-center justify-center rounded-full">
                  <Icon size={16} />
                </span>
                <strong>{poi.name || "(Unnamed)"}</strong>
                <p className="uppercase -mt-4 text-neutral-500">{poi.type}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

function customPOIMarker(poi: POI) {
  const Icon = getIconByAmenity(poi.type);
  const iconSVG = renderIconToSVG(Icon, 14);
  return `
  <div style="display: flex; align-items: center; justify-content: center; height: 24px; width: 24px; border-radius: 50%; background: white; box-shadow: 0 0 8px #ccc;">
      ${iconSVG}
    </div>
  `;
}
