"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type BlogPost = {
  _id: string;
  category: null | string;
  mainImage: null | Parameters<typeof urlFor>[0];
  slug: null | { current: string };
  subtitle: null | string;
  title: null | string;
};

const PAGE_SIZE = 5;

const QUERY = `
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    subtitle,
    mainImage,
    "category": categories[0]->title
  }
`;

const PostCard = ({ post }: { post: BlogPost }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article className="w-full items-center">
      <div className="overflow-hidden rounded-3xl">
        <motion.div
          animate={hovered ? "zoom" : "rest"}
          initial="rest"
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          variants={{ rest: { scale: 1 }, zoom: { scale: 1.07 } }}
        >
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
        </motion.div>
      </div>
      <div className="relative -mt-20 mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-xl">
        <div className="flex flex-col gap-6">
          <div>
            {post.category && (
              <p className="inline-block rounded-full bg-amber-300 p-1 px-3 font-bold uppercase tracking-wide text-black">
                {post.category}
              </p>
            )}
          </div>
          <h3 className="font-serif text-3xl font-medium leading-relaxed tracking-wide text-pretty">
            {post.title}
          </h3>
          {post.subtitle && (
            <p className="text-lg font-medium leading-loose text-pretty tracking-wide text-gray-500">
              {post.subtitle}
            </p>
          )}
          <motion.a
            aria-label={`Read more about ${post.title ?? "this article"}`}
            className="group inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-red-400 p-2 px-6 text-sm font-bold uppercase tracking-wide text-white"
            href={`/blog/${post.slug?.current ?? ""}`}
            onHoverEnd={() => setHovered(false)}
            onHoverStart={() => setHovered(true)}
            whileHover="hover"
          >
            <span>Read More</span>
            <span className="sr-only"> about {post.title}</span>
            <motion.svg
              fill="none"
              height="30"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              variants={{ hover: { x: 6 } }}
              viewBox="0 0 24 24"
              width="30"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </motion.svg>
          </motion.a>
        </div>
      </div>
    </article>
  );
};

const BlogHeading = () => (
  <div className="mx-auto flex max-w-sm flex-col gap-6 p-6 pt-15 md:max-w-2xl md:gap-12 md:px-0 md:pt-0 lg:max-w-3xl">
    <div className="flex flex-col gap-8">
      <h2 className="font-serif text-4xl font-medium tracking-wide md:text-7xl">
        Thinking Out Loud
      </h2>
      <p className="text-base font-medium leading-loose text-pretty tracking-wide sm:text-lg md:text-xl lg:text-2xl">
        Where the real work lives. Writing about technology, decisions, and the
        craft behind the systems people rely on.
      </p>
    </div>
  </div>
);

export const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const offsetRef = useRef(0);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    const batch = await client.fetch<BlogPost[]>(QUERY, {
      end: offsetRef.current + PAGE_SIZE,
      start: offsetRef.current,
    });

    offsetRef.current += PAGE_SIZE;
    setPosts((prev) => [...prev, ...batch]);
    if (batch.length < PAGE_SIZE) setHasMore(false);

    loadingRef.current = false;
    setLoading(false);
  }, [hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    window.dispatchEvent(new Event("lenis:resize"));
  }, [posts.length]);

  return (
    <section className="min-h-screen bg-blue-100 pt-[10%]">
      <div className="mx-auto flex max-w-4xl flex-col gap-20">
        <BlogHeading />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        <div className="flex justify-center py-8" ref={sentinelRef}>
          {loading && (
            <motion.div
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-sm font-medium text-gray-500"
              initial={{ opacity: 0 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                className="block h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-600"
                transition={{
                  duration: 0.8,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
