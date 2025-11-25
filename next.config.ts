import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error -- devBundler is supported in Next.js 16 but not in current types
  devBundler: "webpack",
};

export default nextConfig;
