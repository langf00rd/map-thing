"use client";

import { openRouterChatModel } from "@/lib/ai";
import { generateObject } from "ai";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit() {
    setIsSubmitting(true);

    const sample_data = [
      { name: "john doe", age: 11 },
      { name: "jane doe", age: 20 },
      { name: "tricia doe", age: 93 },
    ];

    const { object } = await generateObject({
      model: openRouterChatModel,
      schema: z.object({
        payload: z.object({
          name: z.string(),
          age: z.string(),
        }),
      }),
      prompt: `${query} ${JSON.stringify(sample_data)}`,
    });

    console.log("object", object);

    // const { text } = await generateText({
    //   model: openRouterChatModel,
    //   prompt: query,
    // });

    setResponses((prev) => [...prev, JSON.stringify(object)]);
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-4">
      {process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}
      <h2 className="font-semibold">Assistant</h2>
      <ul className="space-y-3">
        {responses.map((a) => (
          <li key={a} className="text-sm">
            {a}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
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
