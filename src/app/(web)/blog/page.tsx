import type { Metadata } from "next";

import { BlogList } from "@/features/BlogList";
import { client } from "@/sanity/lib/client";

type BlogListSchemaPost = {
  slug: string;
  title: null | string;
};

const BLOG_LIST_SCHEMA_QUERY = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(_createdAt desc) {
    title,
    "slug": slug.current
  }
`;

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ketanrajpal.dev/blog",
    types: {
      "application/rss+xml": "https://ketanrajpal.dev/rss.xml",
    },
  },
  authors: [{ name: "Ketan Rajpal", url: "https://ketanrajpal.dev" }],
  description:
    "Writing about technology, engineering decisions, and the craft behind the systems people rely on. By Ketan Rajpal.",
  keywords: [
    "engineering blog",
    "technology writing",
    "legal technology",
    "education technology",
    "AI engineering",
    "software architecture",
    "Ketan Rajpal blog",
  ],
  openGraph: {
    description:
      "Writing about technology, engineering decisions, and the craft behind the systems people rely on.",
    images: [
      {
        alt: "Ketan Rajpal — Thinking Out Loud",
        height: 941,
        url: "/og-image.png",
        width: 1672,
      },
    ],
    locale: "en_GB",
    siteName: "Ketan Rajpal",
    title: "Thinking Out Loud",
    type: "website",
    url: "https://ketanrajpal.dev/blog",
  },
  title: "Thinking Out Loud",
  twitter: {
    card: "summary_large_image",
    description:
      "Writing about technology, engineering decisions, and the craft behind the systems people rely on.",
    images: ["/og-image.png"],
    title: "Thinking Out Loud",
  },
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogListSchemaPost[]>(
    BLOG_LIST_SCHEMA_QUERY,
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        item: {
          "@type": "BlogPosting",
          headline: post.title ?? "Untitled",
          url: `https://ketanrajpal.dev/blog/${post.slug}`,
        },
        position: index + 1,
      })),
    },
    name: "Thinking Out Loud",
    url: "https://ketanrajpal.dev/blog",
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        type="application/ld+json"
      />
      <BlogList />
    </>
  );
}
