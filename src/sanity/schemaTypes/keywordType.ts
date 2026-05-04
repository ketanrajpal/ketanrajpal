import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
