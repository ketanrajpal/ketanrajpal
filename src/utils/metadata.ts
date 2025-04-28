import { getOption, getPage } from "@/sanity/fetch";
import { Metadata } from "next";

export async function metaData(currentPage: string): Promise<Metadata> {
  const page = await getPage(currentPage);
  const siteName = await getOption("site-name");

  if (!page) {
    return {
      title: "Page not found",
      description: "This page does not exist",
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      siteName: siteName?.value,
      locale: "en_GB",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}
