import type { Metadata } from "next";

import { BlogList } from "@/features/BlogList";

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

export default function BlogPage() {
  return <BlogList />;
}
