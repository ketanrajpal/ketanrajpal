import { type SchemaTypeDefinition } from "sanity";
import { pages } from "./pages";
import { options } from "./options";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pages, options],
};
