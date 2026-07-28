import type { MetadataRoute } from "next";

const SITE_URL = "https://www.ketanrajpal.dev";

const DISALLOW = ["/studio", "/studio/", "/api/*", "/indexnow"];

// AI / LLM crawlers we explicitly welcome so the site can be indexed by
// answer engines and used as a citation source.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "Diffbot",
  "YouBot",
  "Timpibot",
  "DuckAssistBot",
  "AI2Bot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: [
      {
        allow: "/",
        disallow: DISALLOW,
        userAgent: "*",
      },
      {
        allow: "/",
        disallow: DISALLOW,
        userAgent: AI_CRAWLERS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
