import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://unstakd.com", changeFrequency: "weekly", priority: 1 },
    { url: "https://unstakd.com/docs", changeFrequency: "weekly", priority: 0.8 },
  ];
}
