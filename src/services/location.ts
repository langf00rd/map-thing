import { MapSearchResult } from "@/lib/types";

export async function getUserCountry(): Promise<string | null> {
  const res = await fetch("https://ipapi.co/json/");
  if (!res.ok) throw new Error("Failed to fetch IP info");
  const data = await res.json();
  return data.country_name || null;
}

export async function searchLocation(
  query: string,
): Promise<MapSearchResult[]> {
  const userCountry = await getUserCountry();
  console.log("userCountry", userCountry);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + `, ${userCountry}`)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch IP info");
  return await res.json();
}
