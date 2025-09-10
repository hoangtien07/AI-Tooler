// app/[locale]/blogs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { BlogApi } from "@/libs/api-client";
import type { Locale } from "@/libs/types/blog";
import { htmlFromListItem, pickString, toPlain, formatDate } from "@/libs/utils/blog";

export const revalidate = 300;

type SearchParams = Record<string, string | string[] | undefined>;

const SITE = process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";

const excerptFromHtml = (html: string, max = 140): string => {
  const s = toPlain(html);
  return s.length > max ? s.slice(0, max).trimEnd() + "…" : s;
};

const readMins = (src: string): number =>
  Math.max(1, Math.round(toPlain(src).split(/\s+/).filter(Boolean).length / 200));

export const metadata: Metadata = {
  title: "Blogs",
  description: "Bài viết mới nhất",
  alternates: { canonical: `${SITE}/blogs` },
};

export default async function BlogsPage(props: {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<SearchParams>;
}) {
  const { locale } = await props.params;
  const sp = (await props.searchParams) ?? {};

  const q = typeof sp.q === "string" ? sp.q : "";
  const tag = typeof sp.tag === "string" ? sp.tag : "";
  const pageNum = Math.max(1, parseInt(typeof sp.page === "string" ? sp.page : "1", 10));
  const pageSize = 9;

  const res =
    (await BlogApi.list(locale, {
      q: q || undefined,
      tag: tag || undefined,
      page: pageNum,
      limit: pageSize,
      status: "active",
      sort: "-publishedAt",
    }).catch(() => null)) ||
    { page: pageNum, limit: pageSize, total: 0, pages: 1, items: [], lang: locale };

  const items = res.items.map((b) => {
    const title = pickString(b.title, locale);
    const html = htmlFromListItem(b, locale);
    const text = toPlain(html);
    const minutes = readMins(text);
    const excerpt = pickString(b.excerpt, locale) || excerptFromHtml(html);
    return { slug: b.slug, title, image: b.image, tags: b.tags || [], publishedAt: b.publishedAt, excerpt, minutes };
  });

  const totalPages = Math.max(1, Math.ceil((res.total || 0) / (res.limit || pageSize)));

  const withQuery = (patch: Record<string, string | number | undefined>): string => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (tag) p.set("tag", tag);
    p.set("page", String(pageNum));
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "") p.delete(k);
      else p.set(k, String(v));
    });
    const qs = p.toString();
    return `/${locale}/blogs${qs ? `?${qs}` : ""}`;
  };

  const tagSet = new Set<string>();
  res.items.forEach((it) => (it.tags || []).forEach((t) => tagSet.add(t)));

  return (
    <main className="relative">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-28 md:pt-32">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Blogs
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-neutral-300">
            Tổng hợp bài viết mới nhất. Tìm kiếm (full-text), lọc theo chủ đề.
          </p>

          <form action={`/${locale}/blogs`} method="get" className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Tìm kiếm bài viết…"
              className="w-full rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-[15px] text-neutral-800 shadow-sm outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <input type="hidden" name="tag" value={tag} />
            <button
              type="submit"
              className="inline-flex h-[48px] min-w-[100px] items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:opacity-95 dark:bg-white dark:text-neutral-900"
            >
              Tìm kiếm
            </button>
          </form>

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

      <section className="mx-auto max-w-6xl px-4 pb-20">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            Không có bài viết nào phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <article key={post.slug} className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                <Link href={`/${locale}/blogs/${encodeURIComponent(post.slug)}`}>
                  <figure className="relative aspect-[16/9] overflow-hidden">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]" />
                    )}
                  </figure>
                </Link>

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
                    <span className="h-1 w-1 rounded-full bg-neutral-400/70 dark:bg-neutral-500/70" />
                    <span>{post.minutes} phút đọc</span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 transition group-hover:opacity-90 dark:text-white">
                    <Link href={`/${locale}/blogs/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-neutral-700 dark:text-neutral-300">
                    {post.excerpt}
                  </p>

                  {post.tags?.length ? (
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
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <Link
            href={withQuery({ page: Math.max(1, pageNum - 1) })}
            aria-disabled={pageNum <= 1}
            className={`rounded-xl border px-4 py-2 text-sm ${
              pageNum <= 1
                ? "pointer-events-none border-neutral-200 text-neutral-400 dark:border-white/10 dark:text-neutral-600"
                : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10"
            }`}
          >
            ← Trước
          </Link>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Trang {pageNum} / {totalPages}
          </span>
          <Link
            href={withQuery({ page: pageNum + 1 })}
            aria-disabled={pageNum >= totalPages}
            className={`rounded-xl border px-4 py-2 text-sm ${
              pageNum >= totalPages
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
