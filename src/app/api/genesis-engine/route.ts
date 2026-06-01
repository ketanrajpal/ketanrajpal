/* eslint-disable perfectionist/sort-imports, perfectionist/sort-modules */

import { revalidatePath } from "next/cache";
import { createClient } from "next-sanity";
import { type NextRequest, NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

type GenesisWebhookPayload = {
  blog?: {
    body?: string;
    category?: null | string;
    created_at?: null | string;
    id?: string;
    image?: null | string;
    parent_category?: null | string;
    project?: {
      id?: string;
      name?: string;
    };
    seo_description?: string;
    seo_keywords?: string[];
    seo_title?: string;
    subcategory?: null | string;
    subtitle?: string;
    tags?: string[];
    title?: string;
    updated_at?: null | string;
  };
  event?: string;
  secret?: string;
};

type SanityReference = {
  _key: string;
  _ref: string;
  _type: "reference";
};

const SITE_URL = "https://ketanrajpal.dev";
const SUPPORTED_EVENTS = ["BLOG_CREATED", "BLOG_UPDATED"] as const;

export const runtime = "nodejs";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

function createPortableTextBlock({
  index,
  listItem,
  style,
  text,
}: {
  index: number;
  listItem?: "bullet";
  style: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
  text: string;
}) {
  return {
    _key: `block-${index}`,
    _type: "block",
    ...(listItem ? { level: 1, listItem } : {}),
    children: [
      {
        _key: `span-${index}`,
        _type: "span",
        marks: [],
        text,
      },
    ],
    markDefs: [],
    style,
  };
}

function htmlToPortableText(body: string) {
  const blocks: ReturnType<typeof createPortableTextBlock>[] = [];
  const blockRegex =
    /<(p|blockquote|h1|h2|h3|h4)>([\s\S]*?)<\/\1>|<ul>([\s\S]*?)<\/ul>/gi;
  let blockIndex = 0;
  let match: null | RegExpExecArray;

  while ((match = blockRegex.exec(body)) !== null) {
    const tag = match[1];
    const content = match[2];
    const listContent = match[3];

    if (tag && content) {
      const text = decodeHtmlEntities(
        stripHtmlTags(content).replace(/\s+/g, " ").trim(),
      );

      if (!text) {
        continue;
      }

      const styleByTag: Record<
        "blockquote" | "h1" | "h2" | "h3" | "h4" | "p",
        "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal"
      > = {
        blockquote: "blockquote",
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        p: "normal",
      };

      const normalizedStyle = styleByTag[tag as keyof typeof styleByTag];

      blocks.push(
        createPortableTextBlock({
          index: blockIndex,
          style: normalizedStyle,
          text,
        }),
      );
      blockIndex += 1;
      continue;
    }

    if (listContent) {
      const listItemRegex = /<li>([\s\S]*?)<\/li>/gi;
      let listMatch: null | RegExpExecArray;

      while ((listMatch = listItemRegex.exec(listContent)) !== null) {
        const listText = decodeHtmlEntities(
          stripHtmlTags(listMatch[1]).replace(/\s+/g, " ").trim(),
        );

        if (!listText) {
          continue;
        }

        blocks.push(
          createPortableTextBlock({
            index: blockIndex,
            listItem: "bullet",
            style: "normal",
            text: listText,
          }),
        );
        blockIndex += 1;
      }
    }
  }

  return blocks;
}

function toPortableText(body: string) {
  const trimmed = body.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.includes("<") && trimmed.includes(">")) {
    const parsed = htmlToPortableText(trimmed);
    if (parsed.length > 0) {
      return parsed;
    }
  }

  return trimmed.split(/\n{2,}/).map((paragraph, index) => ({
    _key: `block-${index}`,
    _type: "block",
    children: [
      {
        _key: `span-${index}`,
        _type: "span",
        marks: [],
        text: paragraph.replace(/\n/g, " "),
      },
    ],
    markDefs: [],
    style: "normal",
  }));
}

function makeReference(docId: string, key: string): SanityReference {
  return {
    _key: key,
    _ref: docId,
    _type: "reference",
  };
}

function buildWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error("Missing environment variable: SANITY_API_WRITE_TOKEN");
  }

  return createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn: false,
  });
}

async function upsertCategory(
  client: ReturnType<typeof createClient>,
  name: string,
) {
  const title = name.trim();
  const slug = slugify(title);
  const documentId = `category-${slug}`;

  await client.createOrReplace({
    _id: documentId,
    _type: "category",
    slug: { _type: "slug", current: slug },
    title,
  });

  return documentId;
}

async function upsertKeyword(
  client: ReturnType<typeof createClient>,
  name: string,
) {
  const title = name.trim();
  const slug = slugify(title);
  const documentId = `keyword-${slug}`;

  await client.createOrReplace({
    _id: documentId,
    _type: "keyword",
    slug: { _type: "slug", current: slug },
    title,
  });

  return documentId;
}

async function upsertDefaultAuthor(client: ReturnType<typeof createClient>) {
  const documentId = "author-ketan-rajpal";

  await client.createOrReplace({
    _id: documentId,
    _type: "author",
    name: "Ketan Rajpal",
    slug: {
      _type: "slug",
      current: "ketan-rajpal",
    },
  });

  return documentId;
}

async function uploadImageFromUrl(
  client: ReturnType<typeof createClient>,
  altText: string,
  imageUrl: string,
  postId: string,
) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch image from source URL: ${imageUrl}`);
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const extension = contentType.includes("png") ? "png" : "jpg";
  const asset = await client.assets.upload("image", buffer, {
    contentType,
    filename: `${postId}.${extension}`,
  });

  return {
    _type: "image",
    alt: altText,
    asset: {
      _ref: asset._id,
      _type: "reference",
    },
  };
}

/**
 * Receives Genesis Engine webhook payload and upserts matching Sanity post data.
 */
export async function POST(request: NextRequest) {
  let payload: GenesisWebhookPayload;

  try {
    payload = (await request.json()) as GenesisWebhookPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const expectedSecret = process.env.GENESIS_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Server misconfigured: GENESIS_WEBHOOK_SECRET is missing" },
      { status: 500 },
    );
  }

  if (!payload.secret || payload.secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (
    !payload.event ||
    !SUPPORTED_EVENTS.includes(
      payload.event as (typeof SUPPORTED_EVENTS)[number],
    )
  ) {
    return NextResponse.json(
      {
        error: "Unsupported event",
        supportedEvents: SUPPORTED_EVENTS,
      },
      { status: 400 },
    );
  }

  const blog = payload.blog;
  if (!blog?.id || !blog.title) {
    return NextResponse.json(
      { error: "Missing required blog fields: id, title" },
      { status: 400 },
    );
  }

  const writeClient = buildWriteClient();

  const publishedPostId = `genesis-post-${blog.id}`;
  const postId = `drafts.${publishedPostId}`;
  const slugCurrent = slugify(blog.title);
  const categoryNames = [blog.parent_category, blog.category, blog.subcategory]
    .filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
    )
    .filter((value, index, array) => array.indexOf(value) === index);

  const seoKeywords = (blog.seo_keywords || []).filter(Boolean);
  const tags = (blog.tags || []).filter(Boolean);
  const allKeywordNames = [...new Set([...seoKeywords, ...tags])];

  const categoryIds = await Promise.all(
    categoryNames.map((name) => upsertCategory(writeClient, name)),
  );
  const authorId = await upsertDefaultAuthor(writeClient);
  const keywordIds = await Promise.all(
    allKeywordNames.map((name) => upsertKeyword(writeClient, name)),
  );

  const keywordIdByName = new Map(
    allKeywordNames.map((name, index) => [name, keywordIds[index]]),
  );

  const categoriesRefs = categoryIds.map((id, index) =>
    makeReference(id, `category-ref-${index}`),
  );

  const tagsRefs = tags
    .map((name, index) => {
      const id = keywordIdByName.get(name);
      if (!id) {
        return null;
      }
      return makeReference(id, `tag-ref-${index}`);
    })
    .filter((value): value is SanityReference => value !== null);

  const metaKeywordsRefs = seoKeywords
    .map((name, index) => {
      const id = keywordIdByName.get(name);
      if (!id) {
        return null;
      }
      return makeReference(id, `meta-keyword-ref-${index}`);
    })
    .filter((value): value is SanityReference => value !== null);

  let mainImage: Awaited<ReturnType<typeof uploadImageFromUrl>> | undefined;

  if (blog.image) {
    try {
      mainImage = await uploadImageFromUrl(
        writeClient,
        blog.seo_title || blog.title,
        blog.image,
        postId,
      );
    } catch {
      // Ignore image upload failures so post sync can still succeed.
    }
  }

  const document = {
    _id: postId,
    _type: "post",
    author: makeReference(authorId, "author-ref-0"),
    body: toPortableText(blog.body || ""),
    categories: categoriesRefs,
    featured: false,
    mainImage,
    metaDescription: blog.seo_description || blog.subtitle || blog.title,
    metaKeywords: metaKeywordsRefs,
    slug: {
      _type: "slug",
      current: slugCurrent,
    },
    subtitle: blog.subtitle || "",
    tags: tagsRefs,
    title: blog.seo_title || blog.title,
  };

  await writeClient.createOrReplace(document);

  revalidatePath("/blog");
  revalidatePath(`/blog/${slugCurrent}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({
    ok: true,
    postId,
    publishedPostId,
    revalidatedPaths: ["/blog", `/blog/${slugCurrent}`, "/sitemap.xml"],
    source: SITE_URL,
  });
}
