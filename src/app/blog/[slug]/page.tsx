import type { TypedObject } from "@portabletext/types";
import type { Metadata } from "next";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CardTag } from "@/components/Card";
import ProfileImage from "@/images/ketan-rajpal.jpg";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Post = {
  _id: string;
  _updatedAt: string;
  body: TypedObject[];
  categories: string[];
  category: null | string;
  mainImage: null | Parameters<typeof urlFor>[0];
  metaDescription: null | string;
  metaKeywords: string[];
  publishedAt: null | string;
  subtitle: null | string;
  tags: string[];
  title: null | string;
};

const QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    subtitle,
    metaDescription,
    publishedAt,
    mainImage,
    body,
    "category": categories[0]->title,
    "categories": coalesce(categories[]->title, []),
    "tags": coalesce(tags[]->title, []),
    "metaKeywords": coalesce(metaKeywords[]->title, [])
  }
`;

const SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: null | Post = await client.fetch(QUERY, { slug });

  if (!post) return {};

  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  const ogImageAlt = post.title ?? "Ketan Rajpal";

  const defaultKeywords = [
    "Ketan Rajpal",
    "Freelance full stack developer London",
    "Senior software engineer for hire UK",
    "Custom web application development",
    "React and Django developer UK",
    "AI integration developer",
    "Enterprise platform development",
    "Legal technology developer UK",
    "Education technology developer",
    "Cloud migration consultant",
    "Bespoke software development London",
  ];

  defaultKeywords.push(...(post.metaKeywords ?? []));
  defaultKeywords.push(...(post.tags ?? []));
  defaultKeywords.push(...(post.categories ?? []));

  const seen = new Set<string>();
  const keywords = defaultKeywords
    .map((keyword) => keyword.toLowerCase())
    .filter((keyword) => {
      if (seen.has(keyword)) return false;
      seen.add(keyword);
      return true;
    });

  return {
    alternates: { canonical: `https://ketanrajpal.dev/blog/${slug}` },
    authors: [{ name: "Ketan Rajpal", url: "https://ketanrajpal.dev" }],
    description: post.metaDescription ?? post.subtitle ?? undefined,
    keywords: keywords,
    openGraph: {
      authors: ["Ketan Rajpal"],
      ...(ogImage && {
        images: [{ alt: ogImageAlt, height: 630, url: ogImage, width: 1200 }],
      }),
      description: post.metaDescription ?? post.subtitle ?? undefined,
      locale: "en_GB",
      modifiedTime: post._updatedAt,
      publishedTime: post.publishedAt ?? undefined,
      siteName: "Ketan Rajpal",
      title: post.title ?? undefined,
      type: "article",
      url: `https://ketanrajpal.dev/blog/${slug}`,
    },
    title: post.title ?? undefined,
    twitter: {
      ...(ogImage && {
        images: [{ alt: ogImageAlt, url: ogImage }],
      }),
      card: "summary_large_image",
      description: post.metaDescription ?? post.subtitle ?? undefined,
      title: post.title ?? undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(SLUGS_QUERY);
  return posts.map((post) => ({ slug: post.slug }));
}

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-amber-400 pl-6 font-serif text-xl italic text-zinc-600 leading-relaxed">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="mt-14 mb-4 font-serif text-4xl font-semibold tracking-wide text-zinc-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-serif text-3xl font-semibold tracking-wide text-zinc-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 font-serif text-2xl font-semibold tracking-wide text-zinc-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-2 font-serif text-xl font-semibold tracking-wide text-zinc-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg font-medium leading-loose text-pretty tracking-wide text-zinc-900">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg font-medium leading-loose tracking-wide text-zinc-700">
        {children}
      </ul>
    ),
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-amber-600 transition-colors"
        href={value?.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-zinc-1000">{children}</strong>
    ),
  },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: null | Post = await client.fetch(QUERY, { slug });

  if (!post) notFound();

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : "https://ketanrajpal.dev/og-image.png";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: {
      "@type": "Person",
      name: "Ketan Rajpal",
      url: "https://ketanrajpal.dev",
    },
    dateModified: post._updatedAt,
    datePublished: post.publishedAt ?? undefined,
    description: post.metaDescription ?? post.subtitle ?? undefined,
    headline: post.title ?? undefined,
    image: ogImage,
    keywords:
      [
        ...(post.metaKeywords ?? []),
        ...(post.tags ?? []),
        ...(post.categories ?? []),
      ]
        .filter(Boolean)
        .join(", ") || undefined,
    mainEntityOfPage: {
      "@id": `https://ketanrajpal.dev/blog/${slug}`,
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Person",
      image: "https://ketanrajpal.dev/og-image.png",
      name: "Ketan Rajpal",
    },
    url: `https://ketanrajpal.dev/blog/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        item: "https://ketanrajpal.dev",
        name: "Home",
        position: 1,
      },
      {
        "@type": "ListItem",
        item: "https://ketanrajpal.dev/blog",
        name: "Blog",
        position: 2,
      },
      {
        "@type": "ListItem",
        item: `https://ketanrajpal.dev/blog/${slug}`,
        name: post.title ?? slug,
        position: 3,
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <section className="bg-blue-100 min-h-screen ">
        <div className="max-w-5xl mx-auto flex flex-col pt-30">
          <div className="mx-auto max-w-4xl px-6 md:px-0 w-full">
            <div className="rounded-t-3xl bg-white p-10 w-full shadow-xl">
              <div className="flex flex-row justify-between items-center mb-6">
                {post.category && <CardTag tag={post.category} />}
                <Link className="flex items-center gap-4" href="/">
                  <Image
                    alt="Ketan Rajpal"
                    className="h-10 w-10 rotate-2 rounded-full object-cover"
                    src={ProfileImage}
                  />
                  <p className="text-base leading-loose text-pretty tracking-wide text-zinc-500 font-bold">
                    Ketan Rajpal
                  </p>
                </Link>
              </div>
              <h1 className="font-serif text-3xl font-medium leading-snug tracking-wide text-pretty text-zinc-900 md:text-5xl">
                {post.title}
              </h1>
              {publishedDate && (
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mt-4">
                  {publishedDate}
                </p>
              )}
            </div>
          </div>
          {post.mainImage && (
            <div className="overflow-hidden rounded-3xl">
              {post.mainImage && (
                <Image
                  alt={post.title ?? "Blog post"}
                  className="h-full w-full object-cover"
                  height={450}
                  loading="eager"
                  src={urlFor(post.mainImage).width(800).height(450).url()}
                  width={800}
                />
              )}
            </div>
          )}

          <div className="mx-auto max-w-4xl px-6 md:px-0">
            <div className="rounded-b-3xl bg-white p-10 shadow-xl">
              {post.body && (
                <PortableText
                  components={portableTextComponents}
                  value={post.body}
                />
              )}

              {post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      className="rounded bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-500"
                      key={tag}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-6 py-10 md:px-0">
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900"
              href="/blog"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              All posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
