import type { MetadataRoute } from "next";
import { ELEMENT_LIST } from "@/lib/content/elements";
import { DAY_MASTER_LIST } from "@/lib/content/dayMasters";
import { ZODIAC_LIST } from "@/lib/content/zodiac";
import { ARTICLE_LIST } from "@/lib/content/articles";

const SITE = "https://fivebazi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,           lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/learn`,      lastModified, changeFrequency: "weekly",  priority: 0.9 },
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

  const articlePages: MetadataRoute.Sitemap = ARTICLE_LIST.map((a) => ({
    url: `${SITE}/learn/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...elementPages,
    ...dayMasterPages,
    ...zodiacPages,
    ...articlePages,
  ];
}
