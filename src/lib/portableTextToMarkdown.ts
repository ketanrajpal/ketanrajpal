import type { TypedObject } from "@portabletext/types";

type PortableTextBlock = TypedObject & {
  _type: string;
  children?: Array<{
    _type: string;
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    marks?: string[];
    text?: string;
  }>;
  level?: number;
  listItem?: string;
  style?: string;
};

type PortableTextCode = TypedObject & {
  _type: "code";
  code?: string;
  language?: string;
};

type PortableTextImage = TypedObject & {
  _type: "image";
  alt?: string;
  asset?: {
    _ref: string;
  };
};

export function generateJsonContent(
  post: {
    _createdAt?: null | string;
    body: TypedObject[];
    categories?: string[];
    mainImage?: null | { alt?: null | string; asset?: { _ref: string } };
    metaDescription?: null | string;
    metaKeywords?: string[];
    subtitle?: null | string;
    tags?: string[];
    title?: null | string;
  },
  slug: string,
  author = "Ketan Rajpal",
): string {
  const bodyMarkdown = portableTextToMarkdown(post.body);

  const content = {
    author,
    body: bodyMarkdown,
    category: post.categories?.[0] ?? null,
    createdAt: post._createdAt ?? null,
    image: post.mainImage?.asset?._ref ?? null,
    imageAlt: post.mainImage?.alt ?? null,
    metaDescription: post.metaDescription ?? null,
    metaKeywords: post.metaKeywords ?? [],
    slug,
    subtitle: post.subtitle ?? null,
    tags: post.tags ?? [],
    title: post.title ?? null,
  };

  return JSON.stringify(content, null, 2);
}

export function portableTextToMarkdown(body: TypedObject[]): string {
  return body
    .map((block) => {
      const typedBlock = block as PortableTextBlock;

      if (typedBlock._type === "block") {
        const text = serializeChildren(typedBlock.children);
        const style = typedBlock.style || "normal";

        switch (style) {
          case "blockquote":
            return `> ${text}`;
          case "h1":
            return `# ${text}`;
          case "h2":
            return `## ${text}`;
          case "h3":
            return `### ${text}`;
          case "h4":
            return `#### ${text}`;
          case "h5":
            return `##### ${text}`;
          case "h6":
            return `###### ${text}`;
          case "normal":
          default:
            if (typedBlock.listItem === "bullet") {
              return `- ${text}`;
            }
            if (typedBlock.listItem === "number") {
              return `1. ${text}`;
            }
            return text || "";
        }
      }

      if (typedBlock._type === "image") {
        const imageBlock = block as PortableTextImage;
        const alt = imageBlock.alt || "Image";
        const ref = imageBlock.asset?._ref || "";
        return `![${alt}](image:${ref})`;
      }

      if (typedBlock._type === "code") {
        const codeBlock = block as PortableTextCode;
        const language = codeBlock.language || "";
        const code = codeBlock.code || "";
        return `\`\`\`${language}\n${code}\n\`\`\``;
      }

      return "";
    })
    .filter((block) => block.trim().length > 0)
    .join("\n\n");
}

function serializeChildren(
  children: PortableTextBlock["children"] = [],
): string {
  return children
    .map((child) => {
      let text = child.text || "";

      if (child.bold) text = `**${text}**`;
      if (child.italic) text = `*${text}*`;
      if (child.code) text = `\`${text}\``;

      return text;
    })
    .join("");
}
