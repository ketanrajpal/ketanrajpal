import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SITE_URL = "https://www.ketanrajpal.dev";

type SitemapPost = {
  _createdAt: string;
  _updatedAt: string;
  mainImage: null | Parameters<typeof urlFor>[0];
  slug: string;
};

const SITEMAP_QUERY = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(_createdAt desc) {
    "slug": slug.current,
    _createdAt,
    _updatedAt,
    mainImage
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SitemapPost[]>(SITEMAP_QUERY);
  const latestPostDate = posts.length
    ? new Date(posts[0]._updatedAt)
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
    ...(post.mainImage
      ? {
          images: [urlFor(post.mainImage).width(1200).height(630).url()],
        }
      : {}),
    lastModified: new Date(post._updatedAt),
    priority: 0.8,
    url: `${SITE_URL}/blog/${post.slug}`,
  }));

  return [...staticRoutes, ...blogRoutes];
}
