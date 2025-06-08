export async function fetchPOIs(props: {
  radius: number;
  latitude: number;
  longitude: number;
}) {
  const query = `
    [out:json][timeout:25];
    (
      node(around:${props.radius},${props.latitude},${props.longitude});
      way(around:${props.radius},${props.latitude},${props.longitude});
      relation(around:${props.radius},${props.latitude},${props.longitude});
    );
    out center tags;
  `;

  const res = await fetch(
    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
    { cache: "force-cache" }, // force cache response
  );

  if (!res.ok) throw new Error("error fetching POIs");

  return await res.json();
}
