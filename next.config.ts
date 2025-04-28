import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `
      @use "sass:map"; 
      @use "${path.resolve(__dirname, "src/scss/var.scss")}" as *;
      `,
  },
};

export default nextConfig;
