// libs/utils/blog.ts
import type {
  Blog,
  BlogListItem,
  LocalizedRich,
  LocalizedString,
  Locale,
} from "@/libs/types/blog";
import { toLocalizedRich, toLocalizedString } from "@/libs/api-client";

export type TocItem = { id: string; text: string; level: 1 | 2 | 3 };

export function pickString(field: LocalizedString, locale: Locale): string {
  return locale === "en" ? field.en : field.vi;
}
export function pickHtml(field: LocalizedRich, locale: Locale): string {
  return locale === "en" ? field.en.html || "" : field.vi.html || "";
}
export function pickText(field: LocalizedRich, locale: Locale): string {
  return locale === "en" ? field.en.text || "" : field.vi.text || "";
}

export function toPlain(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function short(s: string, max = 160): string {
  return s.length > max ? s.slice(0, max).trimEnd() + "…" : s;
}
export function formatDate(iso?: string): string {
  return iso
    ? new Date(iso).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
}
export function estimateReadingMinFromHtml(html: string): number {
  const words = toPlain(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** An toàn cho item list: nếu không có content → chuỗi rỗng */
export function htmlFromListItem(item: BlogListItem, locale: Locale): string {
  return item.content ? pickHtml(item.content, locale) : "";
}

// export function pickTitle(item: Blog | BlogListItem, locale: Locale): string {
//   return pickString(item.title, locale);
// }

export function pickExcerpt(item: Blog | BlogListItem, locale: Locale): string {
  return pickString(item.excerpt, locale);
}

export function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export function mapListBlogItem(src: unknown): BlogListItem {
  const d = (src ?? {}) as Record<string, unknown>;
  const rawContent = (d as { content?: unknown }).content;
  const content =
    rawContent && typeof rawContent === "object"
      ? toLocalizedRich(rawContent)
      : undefined;

  return {
    _id: String(d._id ?? ""),
    slug: String(d.slug ?? ""),
    title: toLocalizedString(d.title),
    excerpt: toLocalizedString(d.excerpt),
    content,
    image: typeof d.image === "string" ? (d.image as string) : undefined,
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    publishedAt:
      typeof d.publishedAt === "string" ? (d.publishedAt as string) : undefined,
    status:
      typeof d.status === "string"
        ? (d.status as "draft" | "active" | "archived")
        : undefined,
    views: typeof d.views === "number" ? (d.views as number) : undefined,
  };
}

export function mapBlogDetail(src: unknown): Blog {
  const d = (src ?? {}) as Record<string, unknown>;
  return {
    _id: String(d._id ?? ""),
    slug: String(d.slug ?? ""),
    title: toLocalizedString(d.title),
    excerpt: toLocalizedString(d.excerpt),
    content: toLocalizedRich(d.content),
    image: typeof d.image === "string" ? (d.image as string) : undefined,
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
    publishedAt:
      typeof d.publishedAt === "string" ? (d.publishedAt as string) : undefined,
    status:
      typeof d.status === "string"
        ? (d.status as "draft" | "active" | "archived")
        : undefined,
    views: typeof d.views === "number" ? (d.views as number) : undefined,
  };
}

/** Lấy tiêu đề theo locale cho mọi kiểu có field `title` dạng LocalizedString */
export function pickTitle<T extends { title?: LocalizedString }>(
  item: T,
  locale: Locale
): string {
  return item.title?.[locale] ?? "";
}
