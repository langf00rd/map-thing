import { create } from "zustand";

export const useMapStore = create((set) => ({
  mapRadiusDrawingEnabled: false,
  setMapRadiusDrawingEnabled: (enabled: boolean) =>
    set({ mapRadiusDrawingEnabled: enabled }),
}));
