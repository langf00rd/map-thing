import { LucideIcon } from "lucide-react";

export interface POI {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: Amenity;
}

export type RSSFeedItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export interface MapSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export interface Store {
  mapRadiusDrawingEnabled: boolean;
  setMapRadiusDrawingEnabled: (enabled: boolean) => void;
  selectedPOI: POI | null;
  setSelectedPOI: (poi: Store["selectedPOI"]) => void;
}

export interface GlobalStore {
  isLocationSearchInputInFocus: boolean;
  selectedPOIInfo: RSSFeedItem[];
  setIsLocationSearchInputInFocus: (state: boolean) => void;
  setSelectedPOIInformation: (data: RSSFeedItem[]) => void;
}

export interface OverpassAPIElement {
  id: string;
  tags: { name?: string; amenity?: string };
  lat: number;
  lon: number;
  center: { lat: number; lon: number };
}

export interface AmenityProps {
  [key: string]: {
    classes: Amenity[];
    icon: LucideIcon;
    color?: string;
  };
}

export type Position =
  | "TOP-LEFT"
  | "TOP-RIGHT"
  | "BOTTOM-LEFT"
  | "BOTTOM-RIGHT"
  | "TOP-CENTER"
  | "BOTTOM-CENTER";

export enum Amenity {
  // sustenance
  All = "all",
  Bar = "bar",
  Biergarten = "biergarten",
  Cafe = "cafe",
  FastFood = "fast_food",
  FoodCourt = "food_court",
  IceCream = "ice_cream",
  Pub = "pub",
  Restaurant = "restaurant",

  // education
  College = "college",
  DrivingSchool = "driving_school",
  Kindergarten = "kindergarten",
  LanguageSchool = "language_school",
  Library = "library",
  MusicSchool = "music_school",
  School = "school",
  University = "university",

  // transportation
  BicycleParking = "bicycle_parking",
  BicycleRental = "bicycle_rental",
  BusStation = "bus_station",
  CarRental = "car_rental",
  CarSharing = "car_sharing",
  CarWash = "car_wash",
  ChargingStation = "charging_station",
  FerryTerminal = "ferry_terminal",
  Fuel = "fuel",
  Parking = "parking",
  Taxi = "taxi",

  // financial
  ATM = "atm",
  Bank = "bank",
  BureauDeChange = "bureau_de_change",

  // healthcare
  BabyHatch = "baby_hatch",
  Clinic = "clinic",
  Dentist = "dentist",
  Doctors = "doctors",
  Hospital = "hospital",
  NursingHome = "nursing_home",
  Pharmacy = "pharmacy",
  Veterinary = "veterinary",

  // entertainment, arts & culture
  ArtsCentre = "arts_centre",
  Casino = "casino",
  Cinema = "cinema",
  CommunityCentre = "community_centre",
  ConferenceCentre = "conference_centre",
  EventsVenue = "events_venue",
  Nightclub = "nightclub",
  Planetarium = "planetarium",
  SocialCentre = "social_centre",
  Studio = "studio",
  Theatre = "theatre",

  // public service
  Courthouse = "courthouse",
  Embassy = "embassy",
  FireStation = "fire_station",
  Police = "police",
  PostBox = "post_box",
  PostOffice = "post_office",
  Prison = "prison",
  RangerStation = "ranger_station",
  RescueStation = "rescue_station",
  Townhall = "townhall",

  // facilities
  Bench = "bench",
  Clock = "clock",
  DrinkingWater = "drinking_water",
  Fountain = "fountain",
  Shelter = "shelter",
  Telephone = "telephone",
  Toilets = "toilets",
  WasteBasket = "waste_basket",

  // waste management
  Recycling = "recycling",
  WasteDisposal = "waste_disposal",
  WasteTransferStation = "waste_transfer_station",

  // others
  AnimalShelter = "animal_shelter",
  Crematorium = "crematorium",
  DiveCentre = "dive_centre",
  DogPark = "dog_park",
  FuneralHall = "funeral_hall",
  Marketplace = "marketplace",
  PlaceOfWorship = "place_of_worship",
  PublicBath = "public_bath",
  PublicBookcase = "public_bookcase",
  Shower = "shower",
  SwimmingPool = "swimming_pool",
  WaterPoint = "water_point",
}
