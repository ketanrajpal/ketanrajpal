import type { TypedObject } from "@portabletext/types";

type PortableTextBlock = TypedObject & {
  _type: string;
  children?: Array<{
    _type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    marks?: string[];
  }>;
  style?: string;
  level?: number;
  listItem?: string;
};

type PortableTextImage = TypedObject & {
  _type: "image";
  asset?: {
    _ref: string;
  };
  alt?: string;
};

type PortableTextCode = TypedObject & {
  _type: "code";
  code?: string;
  language?: string;
};

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

export function portableTextToMarkdown(body: TypedObject[]): string {
  return body
    .map((block) => {
      const typedBlock = block as PortableTextBlock;

      if (typedBlock._type === "block") {
        const text = serializeChildren(typedBlock.children);
        const style = typedBlock.style || "normal";

        switch (style) {
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
          case "blockquote":
            return `> ${text}`;
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

export function generateJsonContent(
  post: {
    title?: string | null;
    subtitle?: string | null;
    publishedAt?: string | null;
    metaDescription?: string | null;
    mainImage?: { alt?: string | null; asset?: { _ref: string } } | null;
    categories?: string[];
    tags?: string[];
    metaKeywords?: string[];
    body: TypedObject[];
  },
  slug: string,
  author = "Ketan Rajpal",
): string {
  const bodyMarkdown = portableTextToMarkdown(post.body);

  const content = {
    title: post.title ?? null,
    subtitle: post.subtitle ?? null,
    slug,
    author,
    image: post.mainImage?.asset?._ref ?? null,
    imageAlt: post.mainImage?.alt ?? null,
    category: post.categories?.[0] ?? null,
    tags: post.tags ?? [],
    publishedAt: post.publishedAt ?? null,
    metaDescription: post.metaDescription ?? null,
    metaKeywords: post.metaKeywords ?? [],
    body: bodyMarkdown,
  };

  return JSON.stringify(content, null, 2);
}
