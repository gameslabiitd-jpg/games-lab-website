import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → out/ for Cloudflare Pages (the whole site is static:
  // no route handlers, middleware, or server actions, and the only dynamic
  // route, team/[slug], has generateStaticParams).
  output: "export",

  // Cloudflare Pages has no Next.js image-optimization server, so serve images
  // as-is. Required when using next/image with output: "export".
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
