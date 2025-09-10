// libs/types/blog.ts
export type Locale = "vi" | "en";

export interface LocalizedString {
  vi: string;
  en: string;
}

export interface LocalizedRichLang {
  raw?: unknown;
  html?: string;
  text?: string;
}

export interface LocalizedRich {
  vi: LocalizedRichLang;
  en: LocalizedRichLang;
}

export interface BlogBase {
  _id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  image?: string;
  tags?: string[];
  publishedAt?: string;
  status?: "draft" | "active" | "archived";
  views?: number;
}

export interface Blog extends BlogBase {
  content: LocalizedRich; // detail: luôn có content
}

export interface BlogListItem extends BlogBase {
  content?: LocalizedRich; // list: có thể không trả content (nhẹ payload)
}

export interface BlogListResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: BlogListItem[];
  lang?: Locale;
  q?: string;
  usedTextSearch?: boolean;
}
