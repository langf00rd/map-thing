import { create, StoreApi, UseBoundStore } from "zustand";
import { Store } from "./types";

export const useMapStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  mapRadiusDrawingEnabled: false,
  selectedPOI: null,
  setSelectedPOI: (poi: Store["selectedPOI"]) => set({ selectedPOI: poi }),
  setMapRadiusDrawingEnabled: (enabled: boolean) =>
    set({ mapRadiusDrawingEnabled: enabled }),
}));
