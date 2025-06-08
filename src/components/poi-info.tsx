import { useGlobalStore, useMapStore } from "@/lib/store";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function POIInfo() {
  const globalStore = useGlobalStore();
  const mapStore = useMapStore();

  if (globalStore.selectedPOIRSSNews.length > 0) {
    return (
      <div className="map__overlay_card max-h-[50vh] overflow-y-scroll p-4 pt-0 space-y-2">
        <h2 className="font-semibold sticky top-0 py-3 bg-white">
          Related News [BETA]
        </h2>
        <ul className="space-y-5">
          {globalStore.selectedPOIRSSNews.map((a, index) => {
            // const isLocationRelatedToTitle = checkLocationMatchesRSSFeedTitle(
            //   mapStore.selectedPOI!.name,
            //   a.title,
            // );

            // if (!isLocationRelatedToTitle) return null;
            return (
              <li key={index}>
                <Link
                  href={a.link}
                  target="_blank"
                  className="hover:underline space-y-1"
                >
                  <p className="text-sm text-neutral-700">{a.title}</p>
                  <div className="flex items-center gap-5 text-sm text-neutral-400">
                    <p className="flex items-center gap-1">
                      <Calendar size={12} /> {a.pubDate.substring(5, 16)}
                    </p>
                    <p className="">source: {a.source}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return null;
}
