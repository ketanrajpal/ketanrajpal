import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
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
      name: "author",
      to: { type: "author" },
      type: "reference",
    }),
    defineField({
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
      name: "mainImage",
      options: {
        hotspot: true,
      },
      type: "image",
    }),
    defineField({
      name: "categories",
      of: [defineArrayMember({ to: { type: "category" }, type: "reference" })],
      type: "array",
    }),
    defineField({
      name: "tags",
      of: [defineArrayMember({ to: { type: "tag" }, type: "reference" })],
      title: "Tags",
      type: "array",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      description: "SEO meta description (recommended: 150–160 characters).",
      name: "metaDescription",
      rows: 3,
      title: "Meta Description",
      type: "text",
    }),
    defineField({
      name: "metaKeywords",
      of: [defineArrayMember({ to: { type: "keyword" }, type: "reference" })],
      title: "Meta Keywords",
      type: "array",
    }),
    defineField({
      initialValue: false,
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  icon: DocumentTextIcon,
  name: "post",
  preview: {
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
    select: {
      author: "author.name",
      media: "mainImage",
      title: "title",
    },
  },
  title: "Post",
  type: "document",
});
