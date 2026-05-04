import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { keywordType } from "./keywordType";
import { postType } from "./postType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, keywordType, postType, authorType],
};
