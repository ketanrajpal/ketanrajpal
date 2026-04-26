"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const QUERY = `
  *[_type == "post" && featured == true] | order(publishedAt asc) [0...3] {
    _id,
    title,
    slug,
    subtitle,
    mainImage,
    "category": categories[0]->title
  }
`;

const StickyCard = ({
  index,
  post,
  progress,
  total,
}: {
  index: number;
  post: BlogPost;
  progress: MotionValue<number>;
  total: number;
}) => {
  const isLast = index === total - 1;
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, isLast ? 1 : 0.92],
  );

  return (
    <div
      className="sticky top-0 flex h-screen items-center justify-center"
      style={{ zIndex: index }}
    >
      <motion.article
        className="flex w-full max-w-3xl flex-col items-center mx-5"
        style={{ opacity: 1, scale }}
      >
        {post.mainImage && (
          <div className="w-full overflow-hidden rounded-3xl">
            <Image
              alt={post.title ?? "Blog post"}
              className="h-full w-full object-cover"
              height={450}
              src={urlFor(post.mainImage).width(800).height(450).url()}
              width={800}
            />
          </div>
        )}
        <div className="-mt-15 max-w-2xl rounded-3xl bg-white p-10 shadow-xl">
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
              className="group inline-flex w-fit cursor-pointer items-center gap-2 font-bold text-sm tracking-wide bg-red-400 text-white rounded-full p-2 px-6 uppercase"
              href={`/blog/${post.slug?.current ?? ""}`}
              whileHover="hover"
            >
              <span>Read More</span>
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
      </motion.article>
    </div>
  );
};

const CardStack = ({ posts }: { posts: BlogPost[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: containerRef,
  });

  return (
    <div ref={containerRef} style={{ height: `${posts.length * 100}vh` }}>
      {posts.map((post, i) => (
        <StickyCard
          index={i}
          key={post._id}
          post={post}
          progress={scrollYProgress}
          total={posts.length}
        />
      ))}
    </div>
  );
};

export const FromTheBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    client.fetch<BlogPost[]>(QUERY).then(setPosts);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="bg-blue-100">
      <CardStack posts={posts} />
    </section>
  );
};
