import { z } from "zod";

export const aiChatSchema = z.object({
  ai_message: z.string(),
  payload: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        lat: z.number(),
        lon: z.number(),
        type: z.string(),
      }),
    )
    .nullable(),
});
