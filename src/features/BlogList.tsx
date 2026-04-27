"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { CardHeading, CardParagraph, CardTag } from "@/components/Card";
import { CardLink } from "@/components/CardLink";
import { Heading } from "@/components/Heading";
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
  return (
    <article className="w-full items-center">
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
      <div className="relative -mt-20 mx-auto max-w-2xl rounded-3xl bg-white p-12 shadow-xl">
        <div className="flex flex-col gap-4">
          {post.category && <CardTag tag={post.category} />}
          {post.title && <CardHeading title={post.title} />}
          {post.subtitle && <CardParagraph description={post.subtitle} />}
          <CardLink
            ariaLabel={"Read more about " + (post.title ?? "this article")}
            link={`/blog/${post.slug?.current ?? ""}`}
          />
        </div>
      </div>
    </article>
  );
};

const BlogHeading = () => (
  <Heading
    description="Where the real work lives. Writing about technology, decisions, and the craft behind the systems people rely on."
    title="Thinking Out Loud"
  />
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
    <section className="min-h-screen bg-blue-100 pt-30">
      <div className="mx-auto flex max-w-4xl flex-col gap-20">
        <BlogHeading />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

        <div className="flex justify-center py-8" ref={sentinelRef}>
          {loading && (
            <motion.div
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-sm font-medium text-zinc-500"
              initial={{ opacity: 0 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                className="block h-5 w-5 rounded-full border-2 border-zinc-300 border-t-zinc-600"
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
