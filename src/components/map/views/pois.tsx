import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Amenity, POI, Store } from "@/lib/types";
import { getIconByAmenity } from "@/lib/utils";
import { useState } from "react";

export default function POIsView(props: {
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
