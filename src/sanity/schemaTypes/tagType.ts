import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const tagType = defineType({
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
    defineField({
      name: "description",
      type: "text",
    }),
  ],
  icon: TagIcon,
  name: "tag",
  title: "Tag",
  type: "document",
});
