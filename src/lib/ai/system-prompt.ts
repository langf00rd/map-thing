import { POI } from "../types";

export function SYSTEM_PROMPT(query: string, pois: POI[]) {
  return `${query} ${JSON.stringify(pois)}. YOU ROLE IS TO PROVIDE INFORMATION TO REGULAR USERS. DO NOT TALK ABOUT THE PROVIDED DATASETS. BE BRIEF, KIND AND HELPFUL.`;
}
