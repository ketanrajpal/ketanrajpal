import type { Metadata } from "next";

import { BlogList } from "@/features/BlogList";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ketanrajpal.dev/blog",
    types: {
      "application/rss+xml": "https://ketanrajpal.dev/rss.xml",
    },
  },
  description:
    "Writing about technology, engineering decisions, and the craft behind the systems people rely on. By Ketan Rajpal.",
  openGraph: {
    description:
      "Writing about technology, engineering decisions, and the craft behind the systems people rely on.",
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
    title: "Thinking Out Loud",
  },
};

export default function BlogPage() {
  return <BlogList />;
}
