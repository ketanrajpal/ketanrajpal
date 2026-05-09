import Image from "next/image";

import { CardLink } from "@/components/CardLink";
import { urlFor } from "@/sanity/lib/image";

type PostImage = Parameters<typeof urlFor>[0] & {
  alt?: null | string;
};

type RelatedPost = {
  _id: string;
  category: null | string;
  mainImage: null | PostImage;
  slug: null | { current: string };
  subtitle: null | string;
  title: null | string;
};

type RelatedPostsSliderProps = {
  posts: RelatedPost[];
};

export const RelatedPostsSlider = ({ posts }: RelatedPostsSliderProps) => {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {posts.map((post) => (
        <article
          className="overflow-hidden rounded-3xl flex flex-col gap-6 md:flex-row p-3 bg-slate-200 items-center"
          key={post._id}
        >
          {post.mainImage && (
            <Image
              alt={post.mainImage.alt ?? post.title ?? "Blog post"}
              className="h-auto w-full object-cover md:w-72 md:shrink-0 rounded-2xl"
              height={400}
              src={urlFor(post.mainImage).width(720).height(400).url()}
              width={720}
            />
          )}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-medium leading-relaxed tracking-wide text-pretty text-base md:text-lg lg:text-xl">
              {post.title}
            </h3>

            <CardLink
              ariaLabel={post.title ?? "this article"}
              link={`/blog/${post.slug?.current ?? ""}`}
              small
            />
          </div>
        </article>
      ))}
    </div>
  );
};
