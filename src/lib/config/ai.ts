import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openRouter = createOpenRouter({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

export const openRouterChatModel = openRouter.chat(
  "anthropic/claude-3.5-sonnet",
);
