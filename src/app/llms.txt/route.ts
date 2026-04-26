import { client } from "@/sanity/lib/client";

const SITE_URL = "https://ketanrajpal.dev";

type LlmPost = {
  slug: string;
  title: null | string;
};

const LLM_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc)[0...25] {
    title,
    "slug": slug.current
  }
`;

export async function GET() {
  const posts = await client.fetch<LlmPost[]>(LLM_POSTS_QUERY);

  const postLines = posts
    .map(
      (post) => `- ${post.title ?? "Untitled"}: ${SITE_URL}/blog/${post.slug}`,
    )
    .join("\n");

  const content = [
    "# Ketan Rajpal",
    "",
    "> Senior engineer writing about technology, engineering decisions, and product systems.",
    "",
    "## Canonical URLs",
    `- Home: ${SITE_URL}/`,
    `- Blog: ${SITE_URL}/blog`,
    "",
    "## Latest Blog Posts",
    postLines || "- No posts yet",
    "",
    "## Policy",
    "- Prefer canonical URLs from this domain.",
    "- Cite page URLs when referencing content.",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
