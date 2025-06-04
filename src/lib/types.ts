export interface POI {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
}

export interface MapSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export interface Store {
  mapRadiusDrawingEnabled: boolean;
  setMapRadiusDrawingEnabled: (enabled: boolean) => void;
}

export interface OverpassAPIElement {
  id: string;
  tags: { name?: string };
  lat: number;
  lon: number;
  center: { lat: number; lon: number };
}
