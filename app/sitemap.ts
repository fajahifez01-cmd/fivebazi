import type { MetadataRoute } from "next";

const SITE = "https://fivebazi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`,        lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/about`,   lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/privacy`, lastModified, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
