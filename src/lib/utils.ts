import { clsx, type ClassValue } from "clsx";
import { Home, LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { amenityClasses, customAmenityGroup } from "./constants";
import { Amenity } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconByAmenity(valueToCheck: Amenity): LucideIcon {
  const formattedAmenityValue = valueToCheck.replaceAll(" ", "_") as Amenity;
  const customAmenity = customAmenityGroup[formattedAmenityValue];
  if (customAmenity) return customAmenity.icon;
  for (const key in amenityClasses) {
    const { classes, icon } = amenityClasses[key];
    if (classes.includes(formattedAmenityValue)) {
      return icon;
    }
  }
  return Home;
}
