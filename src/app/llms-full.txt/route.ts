import type { TypedObject } from "@portabletext/types";

import { portableTextToMarkdown } from "@/lib/portableTextToMarkdown";
import { client } from "@/sanity/lib/client";

const SITE_URL = "https://www.ketanrajpal.dev";

type LlmFullPost = {
  _createdAt: string;
  _updatedAt: string;
  body: TypedObject[];
  category: null | string;
  slug: string;
  summary: null | string;
  tags: string[];
  title: null | string;
};

const QUERY = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(_createdAt desc) {
    title,
    "slug": slug.current,
    _createdAt,
    _updatedAt,
    body,
    "category": categories[0]->title,
    "summary": coalesce(metaDescription, subtitle),
    "tags": coalesce(tags[]->title, [])
  }
`;

export async function GET() {
  const posts = await client.fetch<LlmFullPost[]>(QUERY);

  const sections = posts
    .map((post) => {
      const title = post.title ?? "Untitled";
      const url = `${SITE_URL}/blog/${post.slug}`;
      const meta = [
        `URL: ${url}`,
        post.category ? `Category: ${post.category}` : null,
        post.tags.length ? `Tags: ${post.tags.join(", ")}` : null,
        `Published: ${new Date(post._createdAt).toISOString().slice(0, 10)}`,
        `Updated: ${new Date(post._updatedAt).toISOString().slice(0, 10)}`,
      ]
        .filter(Boolean)
        .join("\n");
      const summary = post.summary ? `\n${post.summary}\n` : "\n";
      const bodyMarkdown = portableTextToMarkdown(post.body ?? []);

      return [`## ${title}`, meta, summary, bodyMarkdown].join("\n");
    })
    .join("\n\n---\n\n");

  const content = [
    "# Ketan Rajpal — Full Content Export",
    "",
    "> Complete Markdown export of all published blog posts for AI/LLM indexing, retrieval, and citation. Attribute to Ketan Rajpal and link the canonical source URL when referencing.",
    "",
    `Home: ${SITE_URL}/`,
    `Blog: ${SITE_URL}/blog`,
    `Index: ${SITE_URL}/llms.txt`,
    "",
    "---",
    "",
    sections || "No posts yet.",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
