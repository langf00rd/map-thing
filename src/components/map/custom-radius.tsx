import { LatLng } from "leaflet";
import { useState } from "react";
import { Circle, useMapEvents } from "react-leaflet";

export default function CustomRadius(props: {
  onRadiusComplete: (center: LatLng, radius: number) => void;
}) {
  const [start, setStart] = useState<LatLng | null>(null);
  const [tempRadius, setTempRadius] = useState<number>(0);
  const [finalRadius, setFinalRadius] = useState<number>(0);
  const [center, setCenter] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      if (!start) {
        setStart(e.latlng);
        setCenter(e.latlng);
      }
    },
    mousemove(e) {
      if (start) {
        const dist = start.distanceTo(e.latlng);
        setTempRadius(dist);
      }
    },
    dblclick(e) {
      if (start) {
        const final = start.distanceTo(e.latlng);
        setFinalRadius(final);
        props.onRadiusComplete(start, final);
        setStart(null);
        setTempRadius(0);
      }
    },
  });

  return (
    <>
      {center && finalRadius > 0 && (
        <Circle
          center={center}
          radius={finalRadius}
          pathOptions={{ color: "blue", fillOpacity: 0.1 }}
        />
      )}
      {start && tempRadius > 0 && (
        <Circle
          center={start}
          radius={tempRadius}
          pathOptions={{ color: "red", dashArray: "4 4", fillOpacity: 0.05 }}
        />
      )}
    </>
  );
}
