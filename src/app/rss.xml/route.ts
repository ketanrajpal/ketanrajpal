import { client } from "@/sanity/lib/client";

const SITE_URL = "https://ketanrajpal.dev";

type Post = {
  _id: string;
  category: null | string;
  publishedAt: null | string;
  slug: null | { current: string };
  subtitle: null | string;
  title: null | string;
};

const QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    subtitle,
    publishedAt,
    "category": categories[0]->title
  }
`;

export async function GET() {
  const posts: Post[] = await client.fetch(QUERY, {}, { cache: "no-store" });

  const items = posts
    .filter((post) => post.slug?.current && post.title)
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug!.current}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : "";
      const description = post.subtitle ? escapeXml(post.subtitle) : "";
      const category = post.category ? escapeXml(post.category) : "";

      return `
    <item>
      <title>${escapeXml(post.title!)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      ${description ? `<description>${description}</description>` : ""}
      ${category ? `<category>${category}</category>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ketan Rajpal</title>
    <link>${SITE_URL}</link>
    <description>Writing about technology, engineering decisions, and the craft behind the systems people rely on.</description>
    <language>en-gb</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
