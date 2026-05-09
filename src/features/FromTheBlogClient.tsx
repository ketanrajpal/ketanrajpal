"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { CardHeading, CardParagraph, CardTag } from "@/components/Card";
import { CardLink } from "@/components/CardLink";
import { urlFor } from "@/sanity/lib/image";

export type PostImage = Parameters<typeof urlFor>[0] & {
  alt?: null | string;
};

type BlogPost = {
  _id: string;
  category: null | string;
  mainImage: null | PostImage;
  slug: null | { current: string };
  subtitle: null | string;
  title: null | string;
};

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
        className="mx-5 flex w-full max-w-3xl flex-col items-center"
        style={{ opacity: 1, scale }}
      >
        {post.mainImage && (
          <div className="w-full overflow-hidden rounded-3xl">
            <Image
              alt={post.mainImage.alt ?? post.title ?? "Blog post"}
              className="h-full w-full object-cover"
              height={450}
              src={urlFor(post.mainImage).width(800).height(450).url()}
              width={800}
            />
          </div>
        )}
        <div className="-mt-15 max-w-2xl rounded-3xl bg-white p-10 shadow-xl">
          <div className="flex flex-col gap-4">
            {post.category && <CardTag tag={post.category} />}
            {post.title && <CardHeading title={post.title} />}
            {post.subtitle && <CardParagraph description={post.subtitle} />}
            <CardLink
              ariaLabel={post.title ?? "this article"}
              link={`/blog/${post.slug?.current ?? ""}`}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const FromTheBlogClient = ({ posts }: { posts: BlogPost[] }) => {
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
