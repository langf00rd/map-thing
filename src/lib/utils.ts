import { clsx, type ClassValue } from "clsx";
import { Home, LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { amenityClasses } from "./constants";
import { Amenity, POI } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPOIClassName(poi: POI) {
  if (amenityClasses.healthcareAmenityClasses.classes.includes(poi.type)) {
    return "background-color: green; border-radius: 0";
  } else if (
    amenityClasses.entertainmentAmenityClasses.classes.includes(poi.type)
  ) {
    return "background-color: orange";
  } else if (
    amenityClasses.foodAndDrinkAmenityClasses.classes.includes(poi.type)
  ) {
    return "background-color: blue";
  } else return "background-color: #999";
}

export function getIconByAmenity(valueToCheck: Amenity): LucideIcon {
  const formattedAmenityValue = valueToCheck.replaceAll(" ", "_") as Amenity;
  for (const key in amenityClasses) {
    const { classes, icon } = amenityClasses[key];
    if (classes.includes(formattedAmenityValue)) {
      return icon;
    }
  }
  return Home;
}
