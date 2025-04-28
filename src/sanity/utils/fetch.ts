import { client } from "../lib/client";
import { OptionQueryResult, PageQueryResult } from "../schema/types";
import { OptionQuery, PageQuery } from "./query";

export async function getOption(slug: string) {
  return await client.fetch<OptionQueryResult>(OptionQuery, {
    slug,
  });
}

export async function getPage(slug: string) {
  return await client.fetch<PageQueryResult>(PageQuery, {
    slug,
  });
}
