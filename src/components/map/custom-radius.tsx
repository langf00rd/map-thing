"use client";

import { useMapStore } from "@/lib/store";
import { LatLng } from "leaflet";
import { BanIcon, CircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Circle, useMapEvents } from "react-leaflet";
import { Button } from "../ui/button";

export default function CustomRadius(props: {
  onRadiusComplete: (center: LatLng, radius: number) => void;
}) {
  const [start, setStart] = useState<LatLng | null>(null);
  const [tempRadius, setTempRadius] = useState<number>(0);
  const [radii, setRadii] = useState<{ center: LatLng; radius: number }[]>([]);

  const mapStore = useMapStore();
  const mapRadiusDrawingEnabled = mapStore.mapRadiusDrawingEnabled;
  const setMapRadiusDrawingEnabled = mapStore.setMapRadiusDrawingEnabled;

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
          pathOptions={{ color: "gray", fillOpacity: 0.1 }}
        />
      ))}
      {start && tempRadius > 0 && (
        <Circle
          center={start}
          radius={tempRadius}
          pathOptions={{ color: "black", dashArray: "2 10", fillOpacity: 0.1 }}
        />
      )}
      <div className="fixed space-x-2 p-0 top-2 right-2 md:right-4 z-[1000]">
        <div className="p-0 flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMapRadiusDrawingEnabled(!mapRadiusDrawingEnabled)}
          >
            {mapRadiusDrawingEnabled ? <BanIcon /> : <CircleIcon />}
            {mapRadiusDrawingEnabled ? "Disable radius" : "Enable radius"}
          </Button>
          {radii.length >= 1 && (
            <Button
              size="sm"
              onClick={() => setRadii([])}
              variant="outline-destructive"
            >
              <XIcon />
              Clear radius
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
