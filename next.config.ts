import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const key = process.env.INDEXNOW_KEY;
    if (!key) return [];
    return [
      {
        destination: "/indexnow",
        source: `/${key}.txt`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
    ],
  },
  reactCompiler: true,
  turbopack: {},
};

export default nextConfig;
