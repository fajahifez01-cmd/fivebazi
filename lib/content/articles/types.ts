export type ArticleCategory = "fundamentals" | "day-master" | "elements" | "zodiac";

export interface ArticleSection {
  h2: string;
  paragraphs: string[];
  list?: { type: "bullet" | "numbered"; items: string[] };
  pullQuote?: string;
}

export interface ArticleFAQ {
  q: string;
  a: string;
}

export type InternalLinkRef =
  | { kind: "zodiac"; slug: string; label?: string }
  | { kind: "element"; slug: string; label?: string }
  | { kind: "day-master"; slug: string; label?: string }
  | { kind: "article"; slug: string; label?: string }
  | { kind: "calculator"; label?: string };

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  category: ArticleCategory;
  primaryKeyword: string;
  publishedAt: string;
  readingMinutes: number;
  tldr: string;
  intro: string[];
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  related: InternalLinkRef[];
}
