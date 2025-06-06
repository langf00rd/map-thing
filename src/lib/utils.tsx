import { clsx, type ClassValue } from "clsx";
import { Home, LucideIcon } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { twMerge } from "tailwind-merge";
import { amenityClasses, customAmenityPropsGroup } from "./constants";
import { Amenity } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAmenityProps(valueToCheck: Amenity) {
  const formattedAmenityValue = valueToCheck.replaceAll(" ", "_") as Amenity;
  const customAmenity = customAmenityPropsGroup[formattedAmenityValue];
  if (customAmenity) return customAmenity;
  for (const key in amenityClasses) {
    const { classes, icon, color } = amenityClasses[key];
    if (classes.includes(formattedAmenityValue)) {
      return { icon, color };
    }
  }
  return { icon: Home, color: "#FF8F1F" };
}

export function renderIconToSVG(Icon: LucideIcon, size = 16): string {
  const IconComponent = <Icon size={size} strokeWidth={1.5} />;
  return renderToStaticMarkup(IconComponent);
}
