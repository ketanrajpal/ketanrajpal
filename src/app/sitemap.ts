import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";

const SITE_URL = "https://ketanrajpal.dev";

type SitemapPost = {
  _updatedAt: string;
  publishedAt: null | string;
  slug: string;
};

const SITEMAP_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc) {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SitemapPost[]>(SITEMAP_QUERY);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: SITE_URL,
    },
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 0.9,
      url: `${SITE_URL}/blog`,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    changeFrequency: "monthly",
    lastModified: new Date(post.publishedAt ?? post._updatedAt),
    priority: 0.8,
    url: `${SITE_URL}/blog/${post.slug}`,
  }));

  return [...staticRoutes, ...blogRoutes];
}
