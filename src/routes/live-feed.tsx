import { createFileRoute } from "@tanstack/react-router";
import { LiveFeed } from "@/components/intelligence/live-feed";
export const Route = createFileRoute("/live-feed")({
  head: () => ({
    meta: [
      { title: "Live Scientific Intelligence Feed — Takeda IBD Intelligence" },
      { name: "description", content: "Real-time simulated scientific signals with live scoring, ranking movement, AI alerts and explainability." },
      { property: "og:title", content: "Live Scientific Intelligence Feed — Takeda IBD Intelligence" },
      { property: "og:description", content: "A real-time Medical Affairs command center with explainable AI scoring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LiveFeed,
});
