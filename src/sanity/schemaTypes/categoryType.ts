import { createElement } from "react";
import { defineField, defineType } from "sanity";

const TagIcon = () =>
  createElement(
    "svg",
    { fill: "none", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    createElement("path", {
      d: "M4 5a1 1 0 0 1 1-1h6l9 9-8 8-9-9V5Zm2 1v4.17l7.83 7.83 4.17-4.17L10.17 6H6Z",
      fill: "currentColor",
    }),
  );

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
});
