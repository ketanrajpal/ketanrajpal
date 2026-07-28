import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

const CodeIcon = () =>
  createElement(
    "svg",
    { fill: "none", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    createElement("path", {
      d: "m8.5 7.5-4 4.5 4 4.5M15.5 7.5l4 4.5-4 4.5M13.5 4.5l-3 15",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.8",
    }),
  );

const ImageIcon = () =>
  createElement(
    "svg",
    { fill: "none", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    createElement("path", {
      d: "M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm2 2v10h12V7H6Zm2.5 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8.5 6-3-3-3 3-2-2-3 3",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.6",
    }),
  );

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  name: "blockContent",
  of: [
    defineArrayMember({
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
              },
            ],
            name: "link",
            title: "URL",
            type: "object",
          },
        ],
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
      },
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      type: "block",
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
      icon: ImageIcon,
      options: { hotspot: true },
      type: "image",
    }),
    defineArrayMember({
      fields: [
        defineField({
          name: "code",
          rows: 10,
          title: "HTML Code",
          type: "text",
        }),
      ],
      icon: CodeIcon,
      name: "html",
      preview: {
        prepare({ code }) {
          return {
            subtitle: code?.slice(0, 60),
            title: "HTML Block",
          };
        },
        select: { code: "code" },
      },
      title: "HTML",
      type: "object",
    }),
  ],
  title: "Block Content",
  type: "array",
});
