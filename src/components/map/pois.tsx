import { useIsMobileView } from "@/hooks/use-mobile-view";
import { useMapStore } from "@/lib/store";
import { Amenity, POI } from "@/lib/types";
import { getIconByAmenity } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import SidebarSection from "../sidebar/sidebar-section";
import { Input } from "../ui/input";

export default function PlacesOfInterest(props: {
  data: POI[];
  isLoading: boolean;
}) {
  const mapStore = useMapStore();
  const isMobileView = useIsMobileView();
  const [query, setQuery] = useState("");
  // const [hide, setHide] = useState(false);

  // function toggleHide() {
  //   setHide((prev) => !prev);
  // }

  const results = query
    ? props.data.filter(
        (poi) =>
          poi.name.toLowerCase().includes(query) ||
          poi.type.toLowerCase().includes(query),
      )
    : props.data;

  function getAmenitiesFromData() {
    const amenities: Amenity[] = [];
    props.data.forEach((a) => {
      amenities.push(a.type);
    });
    const uniqueAmenities = new Set(amenities);
    return Array.from(uniqueAmenities);
  }

  const amenities = getAmenitiesFromData();

  if (props.isLoading) {
    return (
      <Loader
        className={`animate-spin ${!isMobileView ? "absolute bottom-16 right-5" : ""}`}
      />
    );
  }

  if (props.data.length < 1) return null;

  return (
    <SidebarSection>
      {/* <div className="flex w-full items-center mb-1 justify-center md:hidden">
        <Button
          onClick={toggleHide}
          className="rounded-full mx-auto shadow-xl"
          size="sm"
        >
          {hide ? "Show places" : "Hide places"}
        </Button>
      </div> */}
      <div>
        <div className="sticky space-y-2 top-0">
          <Input
            value={query}
            placeholder="Search..."
            className="bg-white"
            onChange={(evt) => setQuery(evt.target.value)}
          />
          <ul className="flex overflow-scroll gap-2">
            {Object.values(amenities).map((amenity) => {
              const Icon = getIconByAmenity(amenity);
              return (
                <li
                  role="button"
                  key={amenity}
                  className={`flex items-center gap-1 pr-2 cursor-pointer uppercase whitespace-nowrap border text-[12px] text-neutral-500 font-medium rounded-sm ${query === amenity ? "bg-primary text-white" : "bg-white"}`}
                  onClick={() => setQuery(amenity)}
                >
                  <span className="size-[25px] flex items-center justify-center rounded-full">
                    <Icon size={14} />
                  </span>
                  {amenity}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="mt-2">
          {results.map((poi) => {
            const Icon = getIconByAmenity(poi.type);
            return (
              <li
                role="button"
                onClick={() => mapStore.setSelectedPOI(poi)}
                key={poi.id}
                className={`p-3 py-2 flex gap-1 rounded-xl hover:bg-neutral-200/40 text-[12px] cursor-pointer ${mapStore.selectedPOI?.id === poi.id ? "bg-neutral-200/40" : ""}`}
              >
                <span className="size-[30px] bg-neutral-200 flex items-center justify-center rounded-full">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="font-medium">{poi.name}</p>
                  <p className="text-neutral-500 uppercase">{poi.type}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SidebarSection>
  );
}
