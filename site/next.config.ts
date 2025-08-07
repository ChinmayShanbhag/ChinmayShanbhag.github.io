import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    optimizePackageImports: ["animejs", "recharts"],
  },
  images: {
    unoptimized: true,
  },
  output: "export",
};

export default withMDX(nextConfig);
