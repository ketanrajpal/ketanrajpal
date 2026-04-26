import type { TypedObject } from "@portabletext/types";
import type { Metadata } from "next";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProfileImage from "@/images/ketan-rajpal.jpg";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Post = {
  _id: string;
  body: TypedObject[];
  category: null | string;
  mainImage: null | Parameters<typeof urlFor>[0];
  publishedAt: null | string;
  subtitle: null | string;
  title: null | string;
};

const QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    publishedAt,
    mainImage,
    body,
    "category": categories[0]->title
  }
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

  return {
    alternates: { canonical: `https://ketanrajpal.dev/blog/${slug}` },
    description: post.subtitle ?? undefined,
    openGraph: {
      ...(ogImage && { images: [{ height: 630, url: ogImage, width: 1200 }] }),
      description: post.subtitle ?? undefined,
      locale: "en_GB",
      publishedTime: post.publishedAt ?? undefined,
      siteName: "Ketan Rajpal",
      title: post.title ?? undefined,
      type: "article",
      url: `https://ketanrajpal.dev/blog/${slug}`,
    },
    title: post.title ?? undefined,
    twitter: {
      ...(ogImage && { images: [ogImage] }),
      card: "summary_large_image",
      description: post.subtitle ?? undefined,
      title: post.title ?? undefined,
    },
  };
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
      <h3 className="mt-10 mb-3 font-serif text-2xl font-semibold tracking-wide text-orange-600">
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

  return (
    <section className="bg-blue-100 min-h-screen ">
      <div className="max-w-5xl mx-auto flex flex-col pt-30">
        <div className="mx-auto max-w-4xl px-6 md:px-0 w-full">
          <div className="rounded-t-2xl bg-white p-10 w-full">
            <div className="flex flex-row justify-between items-center mb-6">
              {post.category && (
                <p className="inline-block rounded-full bg-amber-300 p-1 px-3 font-bold uppercase tracking-wide text-black text-sm">
                  {post.category}
                </p>
              )}
              <Link className="flex items-center gap-4" href="/">
                <Image
                  alt="Ketan Rajpal"
                  className="h-10 w-10 rotate-2 rounded-3xl object-cover"
                  src={ProfileImage}
                />
                <p className="text-sm leading-loose text-pretty tracking-wide text-zinc-500 font-semibold">
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
          <div className="rounded-b-3xl bg-white p-10">
            {post.body && (
              <PortableText
                components={portableTextComponents}
                value={post.body}
              />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-10 md:px-0">
          <a
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
          </a>
        </div>
      </div>
    </section>
  );
}
