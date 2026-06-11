import type { MetadataRoute } from "next";

const SITE_URL = "https://www.ketanrajpal.dev";

export default function robots(): MetadataRoute.Robots {
  return {
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
