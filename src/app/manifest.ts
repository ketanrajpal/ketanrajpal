import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description:
      "Portfolio of Ketan Rajpal — Senior Manager at KPMG UK based in London, United Kingdom.",
    display: "standalone",
    icons: [
      {
        purpose: "any",
        sizes: "any",
        src: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    name: "Ketan Rajpal",
    short_name: "Ketan Rajpal",
    start_url: "/",
    theme_color: "#ffffff",
  };
}
