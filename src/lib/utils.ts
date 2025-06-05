import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Amenity, POI } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const amenityClasses = {
  healthcareAmenityClasses: [
    Amenity.BabyHatch,
    Amenity.Clinic,
    Amenity.Dentist,
    Amenity.Doctors,
    Amenity.Hospital,
    Amenity.NursingHome,
    Amenity.Pharmacy,
    Amenity.Veterinary,
  ],
  foodAndDrinkAmenityClasses: [
    Amenity.Bar,
    Amenity.Biergarten,
    Amenity.Cafe,
    Amenity.FastFood,
    Amenity.FoodCourt,
    Amenity.IceCream,
    Amenity.Pub,
    Amenity.Restaurant,
  ],
  educationAmenityClasses: [
    Amenity.College,
    Amenity.DrivingSchool,
    Amenity.Kindergarten,
    Amenity.LanguageSchool,
    Amenity.Library,
    Amenity.MusicSchool,
    Amenity.School,
    Amenity.University,
  ],
  transportAmenityClasses: [
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
  financialAmenityClasses: [Amenity.ATM, Amenity.Bank, Amenity.BureauDeChange],
  entertainmentAmenityClasses: [
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
  publicServiceAmenityClasses: [
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
  facilityAmenityClasses: [
    Amenity.Bench,
    Amenity.Clock,
    Amenity.DrinkingWater,
    Amenity.Fountain,
    Amenity.Shelter,
    Amenity.Telephone,
    Amenity.Toilets,
    Amenity.WasteBasket,
  ],
  wasteManagementAmenityClasses: [
    Amenity.Recycling,
    Amenity.WasteDisposal,
    Amenity.WasteTransferStation,
  ],
  otherAmenityClasses: [
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
};

export function getPOIClassName(poi: POI) {
  if (amenityClasses.healthcareAmenityClasses.includes(poi.type)) {
    return "background-color: green; border-radius: 0";
  } else if (amenityClasses.entertainmentAmenityClasses.includes(poi.type)) {
    return "background-color: orange";
  } else if (amenityClasses.foodAndDrinkAmenityClasses.includes(poi.type)) {
    return "background-color: blue";
  } else return "background-color: #999";
}
