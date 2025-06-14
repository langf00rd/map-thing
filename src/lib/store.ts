import { create, StoreApi, UseBoundStore } from "zustand";
import { GlobalStore, POI, RSSFeedItem, Store } from "./types";

export const useMapStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  mapRadiusDrawingEnabled: false,
  selectedPOI: null,
  radii: 0, //in metres
  setSelectedPOI: (poi: Store["selectedPOI"]) => set({ selectedPOI: poi }),
  setRadii: (poi: number) => set({ radii: poi }),
  setMapRadiusDrawingEnabled: (enabled: boolean) =>
    set({ mapRadiusDrawingEnabled: enabled }),
}));

export const useGlobalStore: UseBoundStore<StoreApi<GlobalStore>> = create(
  (set) => ({
    isLocationSearchInputInFocus: false,
    selectedPOIRSSNews: [],
    selectedPOI: null,
    setIsLocationSearchInputInFocus: (state: boolean) =>
      set({ isLocationSearchInputInFocus: state }),
    setSelectedPOIRSSNews: (data: RSSFeedItem[]) =>
      set({ selectedPOIRSSNews: data }),
    setSelectedPOI: (data: POI) => set({ selectedPOI: data }),
  }),
);
