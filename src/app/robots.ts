import type { MetadataRoute } from "next";

const SITE_URL = "https://ketanrajpal.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: [
      {
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/*", "/indexnow"],
        userAgent: "*",
      },
      {
        allow: "/",
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "PerplexityBot",
          "CCBot",
          "Google-Extended",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
