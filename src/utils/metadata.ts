import { getOption, getPage } from "@/sanity/utils/fetch";
import { Metadata } from "next";

export async function metaData(currentPage: string): Promise<Metadata> {
  const page = await getPage(currentPage);
  const siteName = await getOption("site-name");

  if (!page) {
    return {
      description: "This page does not exist",
      title: "Page not found",
    };
  }

  return {
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      description: page.description,
      locale: "en_GB",
      siteName: siteName?.value,
      title: page.title,
      type: "website",
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
      },
      index: true,
    },
    title: page.title,
    twitter: {
      description: page.description,
      title: page.title,
    },
  };
}
