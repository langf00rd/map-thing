import {
  Bus,
  Castle,
  Church,
  Drum,
  Fuel,
  GraduationCap,
  Hamburger,
  Hospital,
  Landmark,
  LucideIcon,
  Phone,
  Recycle,
  Store,
} from "lucide-react";
import { Amenity, AmenityProps } from "./types";

export const POIS_PER_RADIUS = 300;
export const MOBILE_VIEW_BREAKPOINT = 768; // px

export const RSS_URLS = [
  "https://liveghanatv.com/feed/",
  "https://accramail.com/feed/",
  "https://ghheadlines.com/rss",
  "https://www.myjoyonline.com/feed/",
  "https://ghanaiantimes.com.gh/feed/",
  "https://ghanaiantimes.com.gh/feed/",
  "https://www.pulse.com.gh/rss",
];

export const amenityClasses: AmenityProps = {
  healthcareAmenityProps: {
    classes: [
      Amenity.BabyHatch,
      Amenity.Clinic,
      Amenity.Dentist,
      Amenity.Doctors,
      Amenity.Hospital,
      Amenity.NursingHome,
      Amenity.Pharmacy,
      Amenity.Veterinary,
    ],
    icon: Hospital,
    color: "#FF8F1F",
  },
  foodAndDrinkAmenityProps: {
    classes: [
      Amenity.Bar,
      Amenity.Biergarten,
      Amenity.Cafe,
      Amenity.FastFood,
      Amenity.FoodCourt,
      Amenity.IceCream,
      Amenity.Pub,
      Amenity.Restaurant,
    ],
    icon: Hamburger,
    color: "#FF8F1F",
  },
  educationAmenityProps: {
    classes: [
      Amenity.College,
      Amenity.DrivingSchool,
      Amenity.Kindergarten,
      Amenity.LanguageSchool,
      Amenity.Library,
      Amenity.MusicSchool,
      Amenity.School,
      Amenity.University,
    ],
    icon: GraduationCap,
    color: "#AF6C38",
  },
  transportAmenityProps: {
    classes: [
      Amenity.BicycleParking,
      Amenity.BicycleRental,
      Amenity.BusStation,
      Amenity.CarRental,
      Amenity.CarSharing,
      Amenity.CarWash,
      Amenity.ChargingStation,
      Amenity.FerryTerminal,
      Amenity.Fuel,
      Amenity.Parking,
      Amenity.Taxi,
    ],
    icon: Bus,
    color: "#03CF6A",
  },
  financialAmenityProps: {
    classes: [Amenity.ATM, Amenity.Bank, Amenity.BureauDeChange],
    icon: Landmark,
    color: "#A2A19D",
  },
  entertainmentAmenityProps: {
    classes: [
      Amenity.ArtsCentre,
      Amenity.Casino,
      Amenity.Cinema,
      Amenity.CommunityCentre,
      Amenity.ConferenceCentre,
      Amenity.EventsVenue,
      Amenity.Nightclub,
      Amenity.Planetarium,
      Amenity.SocialCentre,
      Amenity.Studio,
      Amenity.Theatre,
    ],
    icon: Drum,
    color: "#FF6FAD",
  },
  publicServiceAmenityProps: {
    classes: [
      Amenity.Courthouse,
      Amenity.Embassy,
      Amenity.FireStation,
      Amenity.Police,
      Amenity.PostBox,
      Amenity.PostOffice,
      Amenity.Prison,
      Amenity.RangerStation,
      Amenity.RescueStation,
      Amenity.Townhall,
    ],
    icon: Castle,
    color: "#A87BF2",
  },
  facilityAmenityProps: {
    classes: [
      Amenity.Bench,
      Amenity.Clock,
      Amenity.DrinkingWater,
      Amenity.Fountain,
      Amenity.Shelter,
      Amenity.Telephone,
      Amenity.Toilets,
      Amenity.WasteBasket,
    ],
    icon: Phone,
    color: "#FF8F1F",
  },
  wasteManagementAmenityProps: {
    classes: [
      Amenity.Recycling,
      Amenity.WasteDisposal,
      Amenity.WasteTransferStation,
    ],
    icon: Recycle,
    color: "#FF8F1F",
  },
  otherAmenityProps: {
    classes: [
      Amenity.AnimalShelter,
      Amenity.Crematorium,
      Amenity.DiveCentre,
      Amenity.DogPark,
      Amenity.FuneralHall,
      Amenity.Marketplace,
      Amenity.PlaceOfWorship,
      Amenity.PublicBath,
      Amenity.PublicBookcase,
      Amenity.Shower,
      Amenity.SwimmingPool,
      Amenity.WaterPoint,
    ],
    icon: Store,
    color: "#FEAF00",
  },
};

export const customAmenityPropsGroup: Partial<
  Record<Amenity, { icon: LucideIcon; color?: string }>
> = {
  [Amenity.PlaceOfWorship]: {
    icon: Church,
    color: "#FF8F1F",
  },
  [Amenity.Fuel]: {
    icon: Fuel,
    color: "#2B8AEF",
  },
};
