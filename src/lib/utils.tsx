import { clsx, type ClassValue } from "clsx";
import { Home, LucideIcon } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { twMerge } from "tailwind-merge";
import { brain } from "./config/ai";
import { RSS_LOCATION_CHECK_TRAINING_DATA } from "./config/training-data";
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

export function getDomainFromURL(url: string) {
  if (!url) return null;
  const splitURL = new URL(url).host.split(".");
  if (splitURL[0] === "www" && splitURL[1]) return splitURL[1];
  return splitURL[0];
}

export function checkLocationMatchesRSSFeedTitle(
  location: string,
  title: string,
) {
  brain.train(RSS_LOCATION_CHECK_TRAINING_DATA);
  const result = brain.run([location, title]);
  return result[0] >= 0.5;
}
