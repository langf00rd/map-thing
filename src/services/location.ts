import { MapSearchResult } from "@/lib/types";

export async function getUserCountry(): Promise<string | null> {
  const res = await fetch("https://ipapi.co/json/", { cache: "force-cache" }); // force cache the location response
  if (!res.ok) throw new Error("Failed to fetch IP info");
  const data = await res.json();
  return data.country_name || null;
}

export async function searchLocation(
  query: string,
): Promise<MapSearchResult[]> {
  const userCountry = await getUserCountry();
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
  );

  if (!res.ok) throw new Error("Failed to fetch IP info");

  const results = await res.json();
  let finalResults = results;

  // sort the response to make those with the `userCountry` value come up
  if (userCountry) {
    finalResults = results.sort((a: MapSearchResult, b: MapSearchResult) => {
      const aIncludes = a.display_name.includes(userCountry) ? 0 : 1;
      const bIncludes = b.display_name.includes(userCountry) ? 0 : 1;
      return aIncludes - bIncludes;
    });
  }

  return finalResults;
}
