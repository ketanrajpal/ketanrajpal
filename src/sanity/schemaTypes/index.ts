import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { keywordType } from "./keywordType";
import { postType } from "./postType";
import { tagType } from "./tagType";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    keywordType,
    tagType,
    postType,
    authorType,
  ],
};
