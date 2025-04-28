import { defineField, defineType } from "sanity";

export const options = defineType({
  type: "document",
  name: "options",
  title: "Options",
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
      description: "This is the name of the option",
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      validation: (e) => e.required(),
      description: "This is the slug of the option",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      type: "string",
      name: "value",
      title: "Value",
      validation: (e) => e.required(),
      description: "This is the value of the option",
    }),
  ],
});
