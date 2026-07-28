import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

const UserIcon = () =>
  createElement(
    "svg",
    { fill: "none", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    createElement("path", {
      d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4Z",
      fill: "currentColor",
    }),
  );

export const authorType = defineType({
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      options: {
        source: "name",
      },
      type: "slug",
    }),
    defineField({
      name: "image",
      options: {
        hotspot: true,
      },
      type: "image",
    }),
    defineField({
      name: "bio",
      of: [
        defineArrayMember({
          lists: [],
          styles: [{ title: "Normal", value: "normal" }],
          type: "block",
        }),
      ],
      type: "array",
    }),
  ],
  icon: UserIcon,
  name: "author",
  preview: {
    select: {
      media: "image",
      title: "name",
    },
  },
  title: "Author",
  type: "document",
});
