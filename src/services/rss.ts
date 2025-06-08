import { RSS_URLS } from "@/lib/constants";
import { POI } from "@/lib/types";

async function fetchRSS(location: string) {
  const allRSSContent = [];

  for (const url of RSS_URLS) {
    const content = await fetchRSSContent(url);
    allRSSContent.push(...content);
  }

  const contentIncludingLocationName = allRSSContent.filter(
    (item) =>
      item.title.toLowerCase().includes(location.toLowerCase()) ||
      item.description.toLowerCase().includes(location.toLowerCase()),
  );

  // const locationWords = location.toLowerCase().split(/\s+/).filter(Boolean); // split by space, remove empty
  // const contentIncludingLocationName = allRSSContent.filter((item) => {
  //   const title = item.title.toLowerCase();
  //   return locationWords.some((word) => title.includes(word));
  // });

  return contentIncludingLocationName;
}

export async function fetchRSSContent(url: string) {
  const res = await fetch(url, { cache: "force-cache" });
  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const items = Array.from(xml.querySelectorAll("item"));
  return items.map((item) => ({
    title: item.querySelector("title")?.textContent ?? "",
    link: item.querySelector("link")?.textContent ?? "",
    pubDate: item.querySelector("pubDate")?.textContent ?? "",
    description: item.querySelector("description")?.textContent ?? "",
  }));
}

export async function getLocationInformation(poi: POI) {
  const info = await fetchRSS(poi.name);
  console.log("info", info);
  return info;
}
