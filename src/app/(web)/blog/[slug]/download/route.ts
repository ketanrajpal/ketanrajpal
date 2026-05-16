import type { TypedObject } from "@portabletext/types";

import { generateJsonContent } from "@/lib/portableTextToMarkdown";
import { client } from "@/sanity/lib/client";

type Post = {
  _id: string;
  body: TypedObject[];
  categories: string[];
  category: null | string;
  mainImage: null | PostImage;
  metaDescription: null | string;
  metaKeywords: string[];
  publishedAt: null | string;
  subtitle: null | string;
  tags: string[];
  title: null | string;
};

type PostImage = {
  alt?: null | string;
  asset?: { _ref: string };
};

const QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    metaDescription,
    publishedAt,
    mainImage,
    body,
    "slug": slug.current,
    "category": categories[0]->title,
    "categories": coalesce(categories[]->title, []),
    "tags": coalesce(tags[]->title, []),
    "metaKeywords": coalesce(metaKeywords[]->title, [])
  }
`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post: null | Post = await client.fetch(QUERY, { slug });

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const json = generateJsonContent(post, slug);
  const filename = `${slug}.json`;

  return new Response(json, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
