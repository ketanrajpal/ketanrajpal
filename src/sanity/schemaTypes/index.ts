import { type SchemaTypeDefinition } from "sanity";

import { options } from "./options";
import { pages } from "./pages";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pages, options],
};
