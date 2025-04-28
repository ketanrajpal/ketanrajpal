import { defineField, defineType } from "sanity";

export const options = defineType({
  fields: [
    defineField({
      description: "This is the name of the option",
      name: "name",
      title: "Name",
      type: "string",
      validation: (e) => e.required(),
    }),
    defineField({
      description: "This is the slug of the option",
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
      description: "This is the value of the option",
      name: "value",
      title: "Value",
      type: "string",
      validation: (e) => e.required(),
    }),
  ],
  name: "options",
  preview: {
    select: {
      subtitle: "slug.current",
      title: "name",
    },
  },
  title: "Options",
  type: "document",
});
