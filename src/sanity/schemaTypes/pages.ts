import { defineArrayMember, defineField, defineType } from "sanity";

export const pages = defineType({
  fields: [
    defineField({
      description: "This is the name of the page",
      name: "name",
      title: "Name",
      type: "string",
      validation: (e) => e.required(),
    }),
    defineField({
      description: "This is the slug of the page",
      name: "slug",
      options: {
        maxLength: 96,
        source: "name",
      },
      title: "Slug",
      type: "slug",
      validation: (e) => e.required(),
    }),
    defineField({
      description: "This is the title of the page",
      name: "title",
      title: "Title",
      type: "string",
      validation: (e) => e.required(),
    }),
    defineField({
      description: "This is the description of the page",
      name: "description",
      title: "Description",
      type: "text",
      validation: (e) => e.required(),
    }),
    defineField({
      description: "This is the keywords of the page",
      name: "keywords",
      of: [
        defineArrayMember({
          title: "Keyword",
          type: "string",
        }),
      ],
      title: "Keywords",
      type: "array",
    }),
  ],
  name: "pages",
  preview: {
    select: {
      subtitle: "slug.current",
      title: "name",
    },
  },
  title: "Pages",
  type: "document",
});
