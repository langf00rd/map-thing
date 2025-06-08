"use client";

import { openRouterChatModel } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { POI } from "@/lib/types";
import { generateObject } from "ai";
import { BotIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const querySchema = z.object({
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

export default function Chat(props: { pois: POI[] }) {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<z.infer<typeof querySchema>[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit() {
    setIsSubmitting(true);
    const { object } = await generateObject({
      model: openRouterChatModel,
      schema: querySchema,
      prompt: SYSTEM_PROMPT(query, props.pois),
    });
    setResponses((prev) => [...prev, object]);
    setIsSubmitting(false);
    setQuery("");
  }

  if (props.pois.length < 1) return null;

  return (
    <div className="map__overlay_card p-4 space-y-2 max-h-[50vh] overflow-y-scroll">
      <h2 className="font-semibold sticky py-3 top-0 bg-white">
        Assistant [BETA]
      </h2>
      <ul className="space-y-5">
        {responses.map((a, index) => (
          <li key={index} className="text-sm space-y-1">
            <BotIcon />
            <div className="space-y-1">
              <p className="leading-[1.6] text-neutral-700">{a.ai_message}</p>
              <ul className="gap-1 flex flex-wrap">
                {a.payload?.map((b) => (
                  <li
                    className="border bg-secondary text-neutral-500 rounded-md p-1 px-2"
                    key={b.id}
                  >
                    {b.name}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex py-4 items-center gap-2 sticky bottom-0 z-10 bg-white">
        <Input
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
          placeholder="Ask a question..."
        />
        <Button onClick={submit} disabled={query.length < 5 || isSubmitting}>
          {isSubmitting ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
