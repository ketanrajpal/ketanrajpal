import { defineQuery } from "next-sanity";

export const PageQuery =
  defineQuery(`*[_type == "pages" && slug.current == $slug][0]{
    title,
    description,
    keywords,
}`);
