import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stella — Software Engineer in Nairobi" },
      { name: "description", content: "Selected work and experience across backend systems, applied AI, Web3, and smart systems." },
      { property: "og:title", content: "Stella — Software Engineer in Nairobi" },
      { property: "og:description", content: "Selected work across backend systems, applied AI, Web3, and smart systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
