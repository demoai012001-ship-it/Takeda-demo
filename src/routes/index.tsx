import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/intelligence/dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — Takeda IBD Intelligence" },
      {
        name: "description",
        content:
          "Executive scientific engagement analytics, priority segmentation, physician rankings and AI insights for IBD Medical Affairs.",
      },
      { property: "og:title", content: "Executive Dashboard — Takeda IBD Intelligence" },
      {
        property: "og:description",
        content: "A connected executive view of IBD scientific influence and engagement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
