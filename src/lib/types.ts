export interface POI {
  id: string;
  name?: string;
  lat: number;
  lon: number;
  type: string;
}

export interface MapSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}
