import Image from "next/image";

import { CardHeading, CardParagraph, CardTag } from "@/components/Card";
import { CardLink } from "@/components/CardLink";
import { Heading } from "@/components/Heading";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type BlogPost = {
  _id: string;
  category: null | string;
  mainImage: null | PostImage;
  slug: null | { current: string };
  subtitle: null | string;
  title: null | string;
};

type PostImage = Parameters<typeof urlFor>[0] & {
  alt?: null | string;
};

const QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc) {
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
            alt={post.mainImage.alt ?? post.title ?? "Blog post"}
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

export const BlogList = async () => {
  const posts = await client.fetch<BlogPost[]>(QUERY);

  return (
    <section className="min-h-screen bg-blue-100 py-30">
      <div className="mx-auto flex max-w-4xl flex-col gap-20">
        <BlogHeading />
        {posts.length === 0 && (
          <p className="px-6 text-lg font-medium leading-loose tracking-wide text-zinc-500 md:px-0">
            No posts published yet.
          </p>
        )}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};
