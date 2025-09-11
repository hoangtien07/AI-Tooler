// app/[lang]/search/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/libs/types/blog";

// Nếu bạn đã có Provider ở layout, có thể bỏ import này.
// import { I18nProvider } from "@/app/I18nProvider";

import { SearchApi } from "@/libs/api-client"; // giữ nguyên SDK của bạn

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Search",
  description: "Tìm kiếm Bots & Blogs",
};

type PageSearch = { q?: string; tab?: string; page?: string };

const PAGE_SIZE = 9;

function withQuery(
  base: string,
  current: Record<string, string | number | undefined>,
  patch: Record<string, string | number | undefined>
) {
  const p = new URLSearchParams();
  Object.entries(current).forEach(([k, v]) => {
    if (v !== undefined && v !== "") p.set(k, String(v));
  });
  Object.entries(patch).forEach(([k, v]) => {
    if (v === undefined || v === "") p.delete(k);
    else p.set(k, String(v));
  });
  return `${base}?${p.toString()}`;
}

const toPlain = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function makeSnippet(text: string, q: string, max = 160) {
  if (!text || !q) return "";
  const src = text.trim();
  const rx = new RegExp(`(${esc(q.trim())})`, "i");
  const m = src.match(rx);
  if (!m) return src.slice(0, max) + (src.length > max ? "…" : "");
  const i = m.index ?? 0;
  const start = Math.max(0, i - Math.floor((max - m[0].length) / 2));
  const end = Math.min(src.length, start + max);
  const part = src.slice(start, end).replace(rx, "<mark>$1</mark>");
  return (start > 0 ? "…" : "") + part + (end < src.length ? "…" : "");
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<PageSearch>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const lang: Locale = locale === "en" ? "en" : "vi";

  const q = (sp.q || "").trim();
  const tab = (sp.tab || "blogs").toLowerCase(); // "blogs" | "bots" | "all"
  const pageNum = Math.max(1, parseInt(String(sp.page || "1"), 10));
  const current = { q, tab, page: pageNum };
  
  const base = `/${locale}/search`; 

  // DỮ LIỆU
  let blogs: Array<{
    _id: string; type: "blog"; title: string; slug: string; image?: string; views?: number; snippet?: string;
  }> = [];
  let bots: Array<{
    _id: string; type: "bot"; name: string; slug: string; image?: string; views?: number; snippet?: string;
  }> = [];
  let countBlogs = 0;
  let countBots = 0;

  if (q) {
    // Gọi API theo cấu trúc mới (truyền lang vào query + header)
    const resp = await SearchApi.all(q, {
      lang,
      // phân trang động theo tab
      skipBlogs: tab !== "bots" ? (pageNum - 1) * PAGE_SIZE : 0,
      limitBlogs: tab !== "bots" ? PAGE_SIZE : 0,
      skipBots: tab !== "blogs" ? (pageNum - 1) * PAGE_SIZE : 0,
      limitBots: tab !== "blogs" ? PAGE_SIZE : 0,
      headers: { "Accept-Language": lang }, // giúp BE resolve đúng i18n
    });

    blogs = resp.tabs.blogs;
    bots = resp.tabs.bots;
    countBlogs = resp.counts.blogs;
    countBots = resp.counts.bots;
  }

  const totalPages =
    tab === "blogs"
      ? Math.max(1, Math.ceil(countBlogs / PAGE_SIZE))
      : tab === "bots"
      ? Math.max(1, Math.ceil(countBots / PAGE_SIZE))
      : Math.max(1, Math.ceil(Math.max(countBlogs, countBots) / PAGE_SIZE));

  return (
    // Nếu Provider đã nằm ở layout/[lang]/layout.tsx thì bỏ I18nProvider ở đây
    // <I18nProvider initialLocale={lang}>
    <main className="relative min-h-[80vh]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.22),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-8 pt-28 md:pt-32">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Search
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-700 dark:text-neutral-300">
            Tìm kiếm Bots & Blogs. Kết quả hiển thị theo từ khóa.
          </p>

          {/* Accessible GET form */}
          <form action={base} method="get" className="mt-6 flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <label htmlFor="q" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Từ khóa
              </label>
              <input
                id="q"
                type="search"
                name="q"
                required
                defaultValue={q}
                placeholder="Ví dụ: onboarding, chatbot, automation…"
                className="w-full rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-[15px] text-neutral-800 shadow-sm outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <input type="hidden" name="tab" value={tab} />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 h-[48px] text-sm font-medium text-white hover:opacity-95 dark:bg-white dark:text-neutral-900"
            >
              Tìm kiếm
            </button>
          </form>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { key: "blogs", label: `Blogs${q ? ` (${countBlogs})` : ""}` },
              { key: "bots", label: `Bots${q ? ` (${countBots})` : ""}` },
              { key: "all", label: "All" },
            ].map((t) => {
              const active = tab === t.key;
              return (
                <Link
                  key={t.key}
                  href={withQuery(base, current, { tab: t.key, page: 1 })}
                  className={`rounded-full border px-3 py-1 text-sm shadow-sm ${
                    active
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        {!q ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
            Nhập từ khóa để bắt đầu tìm kiếm.
          </div>
        ) : (
          <>
            {/* ----- Bots tab hoặc All ----- */}
            {(tab === "bots" || tab === "all") && (
              <>
                <div className="mb-3 flex items-end justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Bots {q && `(${countBots})`}
                  </h2>
                  {tab === "all" && (
                    <Link
                      href={withQuery(base, current, { tab: "bots", page: 1 })}
                      className="text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
                    >
                      Xem tất cả bots →
                    </Link>
                  )}
                </div>

                {bots.length === 0 ? (
                  <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                    Không có bot phù hợp.
                  </div>
                ) : (
                  <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {bots.map((b) => {
                      const text = toPlain(b.snippet || "") || b.name || "";
                      const snippet = b.snippet || makeSnippet(text, q);
                      return (
                        <article
                          key={b._id}
                          className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                        >
                          <Link href={`/${lang}/bots/${encodeURIComponent(b.slug)}`}>
                            <figure className="relative aspect-[16/9] overflow-hidden">
                              {b.image ? (
                                <Image
                                  unoptimized
                                  src={b.image}
                                  alt={b.name}
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
                            <h3 className="text-lg font-semibold text-neutral-900 transition group-hover:opacity-90 dark:text-white">
                              <Link href={`/${lang}/bots/${encodeURIComponent(b.slug)}`}>{b.name}</Link>
                            </h3>
                            {!!snippet && (
                              <p
                                className="mt-2 line-clamp-4 text-sm text-neutral-700 dark:text-neutral-300"
                                dangerouslySetInnerHTML={{ __html: snippet }}
                              />
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* ----- Blogs tab hoặc All ----- */}
            {(tab === "blogs" || tab === "all") && (
              <>
                <div className="mb-3 flex items-end justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Blogs {q && `(${countBlogs})`}
                  </h2>
                  {tab === "all" && (
                    <Link
                      href={withQuery(base, current, { tab: "blogs", page: 1 })}
                      className="text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
                    >
                      Xem tất cả blogs →
                    </Link>
                  )}
                </div>

                {blogs.length === 0 ? (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                    Không có blog phù hợp.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((b) => {
                      const href = `/${lang}/blogs/${encodeURIComponent(b.slug)}`;
                      const text = toPlain(b.snippet || "");
                      const snippet = b.snippet || (text ? makeSnippet(text, q) : "");
                      return (
                        <article
                          key={b._id}
                          className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                        >
                          <Link href={href}>
                            <figure className="relative aspect-[16/9] overflow-hidden">
                              {b.image ? (
                                <Image
                                  unoptimized
                                  src={b.image}
                                  alt={b.title}
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
                            <h3 className="text-lg font-semibold text-neutral-900 transition group-hover:opacity-90 dark:text-white">
                              <Link href={href}>{b.title}</Link>
                            </h3>
                            {!!snippet && (
                              <p
                                className="mt-2 line-clamp-4 text-sm text-neutral-700 dark:text-neutral-300"
                                dangerouslySetInnerHTML={{ __html: snippet }}
                              />
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {(tab === "blogs" ? countBlogs : tab === "bots" ? countBots : Math.max(countBlogs, countBots)) >
              PAGE_SIZE && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Link
                  href={withQuery(base, current, { page: Math.max(1, pageNum - 1) })}
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
                  href={withQuery(base, current, { page: pageNum + 1 })}
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
            )}
          </>
        )}
      </section>
    </main>
    // </I18nProvider>
  );
}
