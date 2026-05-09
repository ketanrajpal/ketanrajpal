import { client } from "@/sanity/lib/client";
import {
  type PostImage,
  FromTheBlogClient,
} from "@/features/FromTheBlogClient";

type BlogPost = {
  _id: string;
  category: null | string;
  mainImage: null | PostImage;
  slug: null | { current: string };
  subtitle: null | string;
  title: null | string;
};

const QUERY = `
  *[_type == "post" && featured == true && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc) [0...3] {
    _id,
    title,
    slug,
    subtitle,
    mainImage,
    "category": categories[0]->title
  }
`;
export const FromTheBlog = async () => {
  const posts = await client.fetch<BlogPost[]>(QUERY);

  if (posts.length === 0) return null;

  return (
    <section className="bg-blue-100">
      <FromTheBlogClient posts={posts} />
    </section>
  );
};
