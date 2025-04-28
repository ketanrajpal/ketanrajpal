import { defineArrayMember, defineField, defineType } from "sanity";

export const pages = defineType({
  type: "document",
  name: "pages",
  title: "Pages",
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
      validation: (e) => e.required(),
      description: "This is the name of the page",
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      validation: (e) => e.required(),
      description: "This is the slug of the page",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (e) => e.required(),
      description: "This is the title of the page",
    }),
    defineField({
      type: "text",
      name: "description",
      title: "Description",
      validation: (e) => e.required(),
      description: "This is the description of the page",
    }),
    defineField({
      type: "array",
      name: "keywords",
      title: "Keywords",
      description: "This is the keywords of the page",
      of: [
        defineArrayMember({
          type: "string",
          title: "Keyword",
        }),
      ],
    }),
  ],
});
