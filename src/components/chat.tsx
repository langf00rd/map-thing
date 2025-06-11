"use client";

import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { openRouterChatModel } from "@/lib/config/ai";
import { aiChatSchema } from "@/lib/schema";
import { AIChat, POI } from "@/lib/types";
import { generateObject } from "ai";
import { BotIcon, Loader, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import BetaTag from "./beta-tag";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Chat(props: { pois: POI[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responses, setResponses] = useState<AIChat[]>([]);

  async function submit() {
    try {
      setIsSubmitting(true);
      const { object } = await generateObject({
        model: openRouterChatModel,
        schema: aiChatSchema,
        prompt: SYSTEM_PROMPT(query, props.pois),
      });
      setResponses((prev) => [
        ...prev,
        {
          user: query,
          ai: object,
        },
      ]);
      setQuery("");
    } catch (err: any) {
      console.error(err);
      toast("Oops, ATLAS is not available. Please try again in a moment");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  if (props.pois.length < 1) return null;

  return (
    <div className="map__overlay_card p-4 py-0 max-h-[40vh] flex flex-col">
      <h2 className="font-semibold sticky py-3 top-0">
        Chat with ATLAS <BetaTag />
      </h2>
      <ul className="space-y-5 overflow-y-scroll pb-5">
        {responses.map((a, index) => (
          <li key={index} className="text-sm flex flex-col-reverse gap-4">
            <ChatItem data={a} type="AI" />
            <ChatItem data={a} type="USER" />
          </li>
        ))}
        <div ref={bottomRef} />
      </ul>
      <form
        className="flex py-4 items-center gap-2 sticky bottom-0 z-10"
        onSubmit={(evt) => {
          evt.preventDefault();
          submit();
        }}
      >
        <Input
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
          placeholder="Ask a question..."
          readOnly={isSubmitting}
        />
        <Button
          onClick={submit}
          disabled={query.length < 5 || isSubmitting}
          size="sm"
        >
          {isSubmitting ? <Loader className="animate-spin" /> : "Send"}
        </Button>
      </form>
    </div>
  );
}

function ChatItem(props: { data: AIChat; type: "AI" | "USER" }) {
  return (
    <div className="flex items-start gap-2">
      <div className="h-[32px] w-[32px] flex items-center justify-center bg-gray-100 rounded-full">
        {props.type === "AI" ? (
          <BotIcon size={20} className="text-neutral-400" />
        ) : (
          <User2 size={20} className="text-neutral-400" />
        )}
      </div>
      <div className="w-[80%] space-y-2">
        <div>
          <p className="leading-[1.6] text-neutral-700">
            {props.type === "AI" ? props.data.ai.ai_message : props.data.user}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {props.type === "AI" &&
            props.data.ai.payload &&
            props.data.ai.payload.map((a) => (
              <li className="text-[12px] bg-neutral-200/40 text-neutral-500 px-2 p-1 rounded-md">
                {a.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
