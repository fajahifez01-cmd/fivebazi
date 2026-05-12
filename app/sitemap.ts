import type { MetadataRoute } from "next";
import { ELEMENT_LIST } from "@/lib/content/elements";
import { DAY_MASTER_LIST } from "@/lib/content/dayMasters";
import { ZODIAC_LIST } from "@/lib/content/zodiac";

const SITE = "https://fivebazi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,           lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/element`,    lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/day-master`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/zodiac`,     lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/about`,      lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`,    lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/privacy`,    lastModified, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const elementPages: MetadataRoute.Sitemap = ELEMENT_LIST.map((e) => ({
    url: `${SITE}/element/${e.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const dayMasterPages: MetadataRoute.Sitemap = DAY_MASTER_LIST.map((d) => ({
    url: `${SITE}/day-master/${d.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const zodiacPages: MetadataRoute.Sitemap = ZODIAC_LIST.map((z) => ({
    url: `${SITE}/zodiac/${z.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...elementPages, ...dayMasterPages, ...zodiacPages];
}
