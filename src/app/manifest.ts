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
      {
        purpose: "any",
        sizes: "192x192",
        src: "/icon-192.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/icon-512.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icon-512.png",
        type: "image/png",
      },
    ],
    name: "Ketan Rajpal",
    short_name: "Ketan Rajpal",
    start_url: "/",
    theme_color: "#ffffff",
  };
}
