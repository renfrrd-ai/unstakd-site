import type { NextConfig } from "next";

// Static export: `next build` writes plain files to out/, served by Cloudflare Workers (wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
};

export default nextConfig;
