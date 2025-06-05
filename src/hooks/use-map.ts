import { POIS_PER_RADIUS } from "@/lib/constants";
import { OverpassAPIElement, POI } from "@/lib/types";
import { fetchPOIs } from "@/services/pois";
import { useEffect, useState } from "react";

export function useAppMap() {
  const [isFetchingPOIs, setIsFetchingPOIs] = useState(false);
  const [pois, setPois] = useState<POI[]>([]);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  async function getPOIs(latitude: number, longitude: number, radius: number) {
    try {
      setIsFetchingPOIs(true);

      const data = await fetchPOIs({
        radius,
        latitude,
        longitude,
      });

      const results: POI[] = data.elements
        .filter(
          (el: OverpassAPIElement) =>
            el.tags &&
            (el.lat || el.center) &&
            !!el.tags.amenity &&
            !!el.tags.name,
        )
        .map((el: OverpassAPIElement) => ({
          id: el.id,
          name: el.tags?.name,
          lat: el.lat || el.center.lat,
          lon: el.lon || el.center.lon,
          type: el.tags.amenity?.replaceAll("_", " "),
        }));

      const limitedResults = results.slice(0, POIS_PER_RADIUS);

      setPois(limitedResults);
    } catch (err) {
      alert(err);
    } finally {
      setIsFetchingPOIs(false);
    }
  }

  function getUserCurrentLocation() {
    if (typeof window === "undefined") return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userCoords: [number, number] = [
          coords.latitude,
          coords.longitude,
        ];
        setCenter(userCoords);
        setUserLocation(userCoords);
      },
      () => {
        setCenter([5.5593, 0.1974]); // fallback to accra
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  return {
    getPOIs,
    pois,
    center,
    setCenter,
    userLocation,
    isFetchingPOIs,
  };
}
