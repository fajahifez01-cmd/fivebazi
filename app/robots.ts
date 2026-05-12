import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://fivebazi.com/sitemap.xml",
    host: "https://fivebazi.com",
  };
}
