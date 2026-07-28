import { createElement } from "react";
import { defineField, defineType } from "sanity";

const SearchIcon = () =>
  createElement(
    "svg",
    { fill: "none", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    createElement("path", {
      d: "M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 0 8.5 8.5",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.8",
    }),
  );

export const keywordType = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      options: {
        source: "title",
      },
      type: "slug",
    }),
  ],
  icon: SearchIcon,
  name: "keyword",
  title: "Keyword",
  type: "document",
});
