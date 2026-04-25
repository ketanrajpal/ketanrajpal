import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.mp4": {
        type: "asset",
      },
    },
  },
};

export default nextConfig;
