import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

const DocumentTextIcon = () =>
  createElement(
    "svg",
    { fill: "none", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    createElement("path", {
      d: "M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm6 1.5V8h2.5L13 5.5Zm-1 4.5h4m-4 3h4m-8 3h8m-8-3h2m-2-3h2",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.6",
    }),
  );

export const postType = defineType({
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as undefined | { asset?: unknown };

              if (parent?.asset && !value?.trim()) {
                return "Alternative text is required when a main image is set.";
              }

              return true;
            }),
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
      of: [defineArrayMember({ to: { type: "keyword" }, type: "reference" })],
      title: "Tags",
      type: "array",
    }),
    defineField({
      description: "SEO meta description (recommended: 150–160 characters).",
      name: "metaDescription",
      rows: 3,
      title: "Meta Description",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(160),
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
