import { create, StoreApi, UseBoundStore } from "zustand";
import { GlobalStore, Store } from "./types";

export const useMapStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  mapRadiusDrawingEnabled: false,
  selectedPOI: null,
  setSelectedPOI: (poi: Store["selectedPOI"]) => set({ selectedPOI: poi }),
  setMapRadiusDrawingEnabled: (enabled: boolean) =>
    set({ mapRadiusDrawingEnabled: enabled }),
}));

export const useGlobalStore: UseBoundStore<StoreApi<GlobalStore>> = create(
  (set) => ({
    isLocationSearchInputInFocus: false,
    setIsLocationSearchInputInFocus: (state: boolean) =>
      set({ isLocationSearchInputInFocus: state }),
  }),
);
