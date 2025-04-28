import { defineQuery } from "next-sanity";

export const OptionQuery =
  defineQuery(`*[_type == "options" && slug.current == $slug][0]{
    value,
}`);
