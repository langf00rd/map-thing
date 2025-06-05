import { useIsMobileView } from "@/hooks/use-mobile-view";
import { useMapStore } from "@/lib/store";
import { Amenity, POI, Store } from "@/lib/types";
import { getIconByAmenity } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import ResponsiveRender from "../responsive-render";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export default function PlacesOfInterest(props: {
  data: POI[];
  isLoading: boolean;
}) {
  const isMobileView = useIsMobileView();
  const mapStore = useMapStore();
  const [query, setQuery] = useState("");

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

  const dataAmenities = getAmenitiesFromData();

  if (props.isLoading) {
    return (
      <Loader
        className={`animate-spin ${!isMobileView ? "absolute bottom-16 right-5" : ""}`}
      />
    );
  }

  if (props.data.length < 1) return null;

  return (
    <ResponsiveRender
      desktopPosition="BOTTOM-RIGHT"
      mobilePosition="BOTTOM-CENTER"
    >
      <POIsView
        isMobileView={isMobileView}
        data={dataAmenities}
        results={results}
        query={query}
        setQuery={setQuery}
        mapStore={mapStore}
      />
    </ResponsiveRender>
  );

  if (isMobileView) {
    return (
      <div className="fixed bottom-0 left-0 z-[1000] w-screen">
        <POIsView
          isMobileView={isMobileView}
          data={dataAmenities}
          results={results}
          query={query}
          setQuery={setQuery}
          mapStore={mapStore}
        />
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 right-4 z-[1000] w-[400px]">
      <POIsView
        isMobileView={isMobileView}
        data={dataAmenities}
        results={results}
        query={query}
        setQuery={setQuery}
        mapStore={mapStore}
      />
    </div>
  );
}

function POIsView(props: {
  data: Amenity[];
  results: POI[];
  query: string;
  setQuery: (q: string) => void;
  mapStore: Store;
  isMobileView: boolean;
}) {
  const [hide, setHide] = useState(false);

  function toggleHide() {
    setHide((prev) => !prev);
  }

  return (
    <>
      <div className="flex w-full items-center mb-1 justify-center">
        <Button
          onClick={toggleHide}
          className="rounded-full mx-auto shadow-xl"
          size="sm"
        >
          {hide ? "Show places" : "Hide places"}
        </Button>
      </div>
      {!hide && (
        <Card
          className={`w-full md:max-h-[50vh] max-h-[40vh] overflow-y-scroll pt-0 ${props.isMobileView && "rounded-b-none"}`}
        >
          <CardContent className="p-0">
            <div>
              <div className="sticky space-y-2 top-0 p-4">
                <Input
                  value={props.query}
                  placeholder="Search..."
                  className="bg-white"
                  onChange={(evt) => props.setQuery(evt.target.value)}
                />
                <ul className="flex overflow-scroll gap-2">
                  {Object.values(props.data).map((amenity) => {
                    const Icon = getIconByAmenity(amenity);
                    return (
                      <li
                        role="button"
                        key={amenity}
                        className={`flex items-center gap-1 px-2 cursor-pointer uppercase whitespace-nowrap border text-[12px] text-neutral-500 font-medium rounded-sm ${props.query === amenity ? "bg-primary text-white" : "bg-white"}`}
                        onClick={() => props.setQuery(amenity)}
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
              <ul className="px-4">
                {props.results.map((poi) => {
                  const Icon = getIconByAmenity(poi.type);
                  return (
                    <li
                      role="button"
                      onClick={() => props.mapStore.setSelectedPOI(poi)}
                      key={poi.id}
                      className={`p-3 py-2 flex gap-1 rounded-xl hover:bg-neutral-200/40 text-[12px] cursor-pointer ${props.mapStore.selectedPOI?.id === poi.id ? "bg-neutral-200/40" : ""}`}
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
          </CardContent>
        </Card>
      )}
    </>
  );
}
