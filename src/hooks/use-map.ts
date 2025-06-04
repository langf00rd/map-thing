import { OverpassAPIElement, POI } from "@/lib/types";
import { useEffect, useState } from "react";

export function useAppMap() {
  const [pois, setPois] = useState<POI[]>([]);
  const [center, setCenter] = useState<[number, number] | null>(null); // null until we get location
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  async function fetchPOIs(
    latitude: number,
    longitude: number,
    radius: number,
  ) {
    const query = `
      [out:json][timeout:25];
      (
        node(around:${radius},${latitude},${longitude});
        way(around:${radius},${latitude},${longitude});
        relation(around:${radius},${latitude},${longitude});
      );
      out center tags;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    const results: POI[] = data.elements
      .filter((el: OverpassAPIElement) => el.tags && (el.lat || el.center))
      .map((el: OverpassAPIElement) => ({
        id: el.id,
        name: el.tags?.name,
        lat: el.lat || el.center.lat,
        lon: el.lon || el.center.lon,
        type: Object.keys(el.tags || {}).join(", "),
      }));

    // results without undefined names
    const validResults = results.filter((obj) => obj.name !== undefined);
    setPois(validResults);
    console.log(validResults);
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
    fetchPOIs,
    pois,
    center,
    setCenter,
    userLocation,
  };
}
