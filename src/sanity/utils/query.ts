import { defineQuery } from "next-sanity";

export const OptionQuery =
  defineQuery(`*[_type == "options" && slug.current == $slug][0]{
    value,
}`);

export const PageQuery =
  defineQuery(`*[_type == "pages" && slug.current == $slug][0]{
    title,
    description,
    keywords,
}`);
