import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/thephoenix2026",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
