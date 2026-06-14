import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Phoenix",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
