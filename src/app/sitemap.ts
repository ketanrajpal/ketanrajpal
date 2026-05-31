import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";

const SITE_URL = "https://ketanrajpal.dev";

type SitemapPost = {
  _createdAt: string;
  _updatedAt: string;
  slug: string;
};

const SITEMAP_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(_createdAt desc) {
    "slug": slug.current,
    _createdAt,
    _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SitemapPost[]>(SITEMAP_QUERY);
  const latestPostDate = posts.length
    ? new Date(posts[0]._createdAt)
    : new Date("2026-01-01T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: latestPostDate,
      priority: 1,
      url: SITE_URL,
    },
    {
      changeFrequency: "daily",
      lastModified: latestPostDate,
      priority: 0.9,
      url: `${SITE_URL}/blog`,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    changeFrequency: "monthly",
    lastModified: new Date(post._createdAt),
    priority: 0.8,
    url: `${SITE_URL}/blog/${post.slug}`,
  }));

  return [...staticRoutes, ...blogRoutes];
}
