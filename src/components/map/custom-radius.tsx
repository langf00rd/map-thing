"use client";

import { useMapStore } from "@/lib/store";
import { Store } from "@/lib/types";
import { LatLng } from "leaflet";
import { useState } from "react";
import { Circle, useMapEvents } from "react-leaflet";
import { Button } from "../ui/button";

export default function CustomRadius(props: {
  onRadiusComplete: (center: LatLng, radius: number) => void;
}) {
  const [start, setStart] = useState<LatLng | null>(null);
  const [tempRadius, setTempRadius] = useState<number>(0);
  const [radii, setRadii] = useState<{ center: LatLng; radius: number }[]>([]);

  const mapRadiusDrawingEnabled = useMapStore(
    (state) => (state as Store).mapRadiusDrawingEnabled,
  );
  const setMapRadiusDrawingEnabled = useMapStore(
    (state) => (state as Store).setMapRadiusDrawingEnabled,
  );

  useMapEvents({
    click(e) {
      if (!mapRadiusDrawingEnabled || start) return;
      setStart(e.latlng);
    },
    mousemove(e) {
      if (!start) return;
      const dist = start.distanceTo(e.latlng);
      setTempRadius(dist);
    },
    dblclick(e) {
      if (!start) return;

      const final = start.distanceTo(e.latlng);
      setRadii((prev) => [...prev, { center: start, radius: final }]);

      props.onRadiusComplete(start, final);

      // Reset state
      setStart(null);
      setTempRadius(0);
      setMapRadiusDrawingEnabled(false);
    },
  });

  return (
    <>
      {radii.map((r, idx) => (
        <Circle
          key={idx}
          center={r.center}
          radius={r.radius}
          pathOptions={{ color: "blue", fillOpacity: 0.1 }}
        />
      ))}
      {/* {center && finalRadius > 0 && (
        <Circle
          center={center}
          radius={finalRadius}
          pathOptions={{ color: "blue", fillOpacity: 0.1 }}
        />
      )} */}
      {start && tempRadius > 0 && (
        <Circle
          center={start}
          radius={tempRadius}
          pathOptions={{ color: "red", dashArray: "4 4", fillOpacity: 0.05 }}
        />
      )}
      <div className="fixed space-x-2 p-2 bottom-5 right-5 bg-white z-[1000]">
        <Button
          onClick={() => setMapRadiusDrawingEnabled(!mapRadiusDrawingEnabled)}
        >
          {mapRadiusDrawingEnabled ? "Disable radius" : "Enable radius"}
        </Button>
        {radii.length >= 1 && (
          <Button onClick={() => setRadii([])} variant="destructive">
            Clear radius
          </Button>
        )}
      </div>
    </>
  );
}
