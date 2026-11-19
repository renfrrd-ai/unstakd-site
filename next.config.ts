import type { NextConfig } from "next";

// Static export: `next build` writes plain files to out/, which Unstakd serves from Caddy.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
};

export default nextConfig;
