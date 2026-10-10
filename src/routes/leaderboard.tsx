import { createFileRoute } from "@tanstack/react-router";
import { Leaderboard } from "@/components/intelligence/views";
export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Influencer Leaderboard — Takeda IBD Intelligence" },
      {
        name: "description",
        content: "Rank IBD physicians by engagement, strategic alignment and scientific influence.",
      },
      { property: "og:title", content: "Influencer Leaderboard — Takeda IBD Intelligence" },
      {
        property: "og:description",
        content: "Rank IBD physicians by engagement, strategic alignment and scientific influence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Leaderboard,
});
