// app/blogs/page.tsx — Blog listing (Server Component)
// - SSR + ISR (revalidate)
// - Search, tag filter, pagination qua URL search params
// - UI đồng bộ với trang chi tiết, hỗ trợ dark/light
// - Parallax top progress: dùng client wrapper ScrollMotionClient
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BlogApi, SearchApi, type Blog, type SearchBlogItem } from "@/lib/api-client";

// Revalidate mỗi 5 phút
export const revalidate = 300;

// ===== Types =====
type BlogListItem = {
  // shape thống nhất cho UI card
  slug: string;
  title: string;
  image?: string;
  tags?: string[];
  publishedAt?: string;
  excerpt?: string;   // từ list thường
  content?: string;   // từ list thường (nếu bạn đang dùng để tính phút đọc)
  snippet?: string;   // từ search (có <mark>)
  views?: number;
  isSearch?: boolean; // biết là kết quả từ search để đổi cách hiển thị
};

type BlogListResult = { items: BlogListItem[]; page: number; pageSize: number; total: number; query?: string };

type ListParams = { page: number; pageSize: number; q?: string; tag?: string; status?: string };

// ===== Helpers =====
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000/api";

const toPlain = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const excerpt = (html: string, max = 140) => {
  const s = toPlain(html);
  return s.length > max ? s.slice(0, max).trimEnd() + "…" : s;
};

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const readMins = (html: string) => {
  const words = toPlain(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

// Chuẩn hóa gọi API theo client cũ của bạn (getList/list/search)

async function fetchBlogs({ page, pageSize, q, tag, status }: ListParams): Promise<BlogListResult> {
  const skip = (page - 1) * pageSize;

  if (q && q.trim()) {
    // ----- Full-text search path (tab=blogs) -----
    const resp = await SearchApi.blogs({ q: q.trim(), skipBlogs: skip, limitBlogs: pageSize });
    // Map SearchBlogItem -> BlogListItem
    const items: BlogListItem[] = resp.tabs.blogs.map((b: SearchBlogItem) => ({
      slug: b.slug,
      title: b.title,
      image: b.image,
      views: b.views,
      snippet: b.snippet, // có <mark>
      isSearch: true,
    }));
    // total blogs có thể lấy từ resp.counts.blogs
    return { items, page, pageSize, total: resp.counts.blogs, query: resp.query };
  }

  // ----- Normal list path -----
  const res = await BlogApi.list({ q, tag, status, skip, limit: pageSize, sort: "-publishedAt" });
  const items: BlogListItem[] = res.items.map((b: Blog) => ({
    slug: b.slug,
    title: b.title,
    image: b.image,
    tags: b.tags,
    publishedAt: b.publishedAt,
    excerpt: b.excerpt,
    content: b.content, // nếu cần tính phút đọc
    views: b.views,
    isSearch: false,
  }));
  return { items, page, pageSize, total: res.total };
}

// ===== SEO =====
export const metadata: Metadata = {
  title: "Blogs",
  description: "Bài viết mới nhất từ AHub",
  alternates: { canonical: `${SITE}/blogs` },
};

// ===== Page =====
export default async function BlogsPage({
  searchParams,
}: {
  // App Router: có thể await searchParams để đọc query (Next 13.4+)
  // Docs: searchParams được dùng cho filter/pagination. 
  // https://nextjs.org/docs/app/api-reference/file-conventions/page
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", q = "", tag = "" } = await searchParams;

  const pageNum = Math.max(1, parseInt(String(page) || "1", 10));
  const pageSize = 9;

  const { items, total, page: cur, pageSize: size } = await fetchBlogs({
    page: pageNum,
    pageSize,
    q: String(q || "").trim() || undefined,
    tag: String(tag || "").trim() || undefined,
  });

  const totalPages = Math.max(1, Math.ceil((total || 0) / (size || pageSize)));

  // Gom tag từ danh sách hiện có (để gợi ý nhanh)
  const tagSet = new Set<string>();
  items.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));

  // Helper tạo URL với query mới
  const withQuery = (patch: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    if (q) params.set("q", String(q));
    if (tag) params.set("tag", String(tag));
    params.set("page", String(cur || pageNum));
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "") params.delete(k);
      else params.set(k, String(v));
    });
    return `/blogs?${params.toString()}`;
  };

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* gradient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.22),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-10 pt-28 md:pt-32">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Blogs
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-neutral-300">
            Tổng hợp bài viết mới nhất. Tìm kiếm, lọc theo chủ đề, và khám phá
            nội dung bạn quan tâm.
          </p>

          {/* Search + Tags (form GET — không cần JS client) */}
          <form
            action="/blogs"
            method="get"
            className="mt-6 flex flex-col gap-3 md:flex-row md:items-center"
          >
            <input
              type="text"
              name="q"
              defaultValue={String(q || "")}
              placeholder="Tìm kiếm bài viết..."
              className="w-full rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-[15px] text-neutral-800 shadow-sm outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <input type="hidden" name="tag" value={String(tag || "")} />
            <button
              type="submit"
              className="inline-flex items-center justify-center w-fit min-w-[100px] h-[48px] rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:opacity-95 dark:bg-white dark:text-neutral-900"
            >
              Tìm kiếm
            </button>
          </form>

          {/* Tag quick filter từ kết quả hiện tại */}
          {tagSet.size > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              <Link
                href={withQuery({ tag: undefined, page: 1 })}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm shadow-sm ${
                  !tag
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                    : "border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                }`}
              >
                Tất cả
              </Link>
              {[...tagSet].map((t) => (
                <Link
                  key={t}
                  href={withQuery({ tag: t, page: 1 })}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm shadow-sm ${
                    tag === t
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : "border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                  }`}
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            Không có bài viết nào phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <Link href={`/blogs/${encodeURIComponent(post.slug)}`}>
                  <figure className="relative aspect-[16/9] overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]" />
                    )}
                  </figure>
                </Link>

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                    <span className="h-1 w-1 rounded-full bg-neutral-400/70 dark:bg-neutral-500/70" />
                    <span>{readMins(post.content ?? "")} phút đọc</span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 transition group-hover:opacity-90 dark:text-white">
                    <Link href={`/blogs/${encodeURIComponent(post.slug)}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-neutral-700 dark:text-neutral-300">
                    {excerpt(post.content ?? "")}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((t) => (
                        <Link
                          key={t}
                          href={withQuery({ tag: t, page: 1 })}
                          className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                        >
                          #{t}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <Link
            href={withQuery({ page: Math.max(1, (cur || pageNum) - 1) })}
            aria-disabled={(cur || pageNum) <= 1}
            className={`rounded-xl border px-4 py-2 text-sm ${
              (cur || pageNum) <= 1
                ? "pointer-events-none border-neutral-200 text-neutral-400 dark:border-white/10 dark:text-neutral-600"
                : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10"
            }`}
          >
            ← Trước
          </Link>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Trang {(cur || pageNum)} / {totalPages}
          </span>
          <Link
            href={withQuery({ page: (cur || pageNum) + 1 })}
            aria-disabled={(cur || pageNum) >= totalPages}
            className={`rounded-xl border px-4 py-2 text-sm ${
              (cur || pageNum) >= totalPages
                ? "pointer-events-none border-neutral-200 text-neutral-400 dark:border-white/10 dark:text-neutral-600"
                : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10"
            }`}
          >
            Sau →
          </Link>
        </div>
      </section>
    </main>
  );
}
