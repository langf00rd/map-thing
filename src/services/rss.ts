import { RSS_URLS } from "@/lib/constants";
import { POI } from "@/lib/types";
import { getDomainFromURL } from "@/lib/utils";

async function fetchRSS(location: string) {
  const allRSSContent = [];

  for (const url of RSS_URLS) {
    const content = await fetchRSSContent(url);
    allRSSContent.push(...content);
  }

  // const contentIncludingLocationName = allRSSContent.filter((item) =>
  //   item.title.toLowerCase().includes(location.toLowerCase()),
  // );

  // TODO:all the below is shit. use ML/AI check if any of the rss titles with matching words are actually related to the location
  const locationWords = location.toLowerCase().split(/\s+/).filter(Boolean);
  const contentIncludingLocationName = allRSSContent.filter((item) => {
    const title = item.title.toLowerCase();
    return locationWords.some((word) => title.includes(word));
  });

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
    source: getDomainFromURL(String(item.querySelector("link")?.textContent)),
  }));
}

export async function getLocationInformation(poi: POI) {
  return await fetchRSS(poi.name);
}
