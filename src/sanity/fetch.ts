import { client } from "./lib/client";
import { OptionQuery } from "./queries/options";
import { PageQuery } from "./queries/pages";
import { OptionQueryResult, PageQueryResult } from "./schema/types";

export async function getPage(slug: string) {
  return await client.fetch<PageQueryResult>(PageQuery, {
    slug,
  });
}

export async function getOption(slug: string) {
  return await client.fetch<OptionQueryResult>(OptionQuery, {
    slug,
  });
}
