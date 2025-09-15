// app/[locale]/blogs/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import * as cheerio from "cheerio";
import sanitizeHtml from "sanitize-html";
import Link from "next/link";

import { BlogApi } from "@/libs/api-client";
import type { Blog, Locale } from "@/libs/types/blog";
import {
  pickTitle,
  pickHtml,
  toPlain,
  short,
  formatDate,
  estimateReadingMinFromHtml,
  slugifyId,
  type TocItem,
} from "@/libs/utils/blog";
import Image from "next/image";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";
export const revalidate = 300;

/** ✅ params là Promise -> cần await */
export async function generateMetadata(
  props: { params: Promise<{ locale: Locale; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await props.params;   // <-- fix

  let blog: Blog | null = null;
  try {
    blog = await BlogApi.getBySlug(locale, slug);
  } catch {
    return { title: "Blog | Not found", robots: { index: false } };
  }
  if (!blog) return { title: "Blog | Not found", robots: { index: false } };

  const title = pickTitle(blog, locale);
  const description = short(toPlain(pickHtml(blog.content, locale)));
  const canonical = `${SITE_ORIGIN}/${locale}/blogs/${encodeURIComponent(blog.slug || slug)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        vi: `${SITE_ORIGIN}/vi/blogs/${encodeURIComponent(blog.slug || slug)}`,
        en: `${SITE_ORIGIN}/en/blogs/${encodeURIComponent(blog.slug || slug)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: blog.image ? [{ url: blog.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.image ? [blog.image] : undefined,
    },
  };
}

// ----- helper: thêm id & TOC
function addIdsAndExtractToc(html: string): { html: string; toc: TocItem[] } {
  const $ = cheerio.load(html);
  const toc: TocItem[] = [];
  $("h1, h2, h3").each((_, el) => {
    const level = Number(el.tagName[1]) as 1 | 2 | 3;
    const text = $(el).text().trim();
    const id = $(el).attr("id") || slugifyId(text);
    $(el).attr("id", id);
    toc.push({ id, text, level });
  });
  return {
    html: $("body").length ? $("body").html() || "" : $.html(),
    toc,
  };
}

export default async function BlogDetail(
  props: { params: Promise<{ locale: Locale; slug: string }> }
) {
  const { locale, slug } = await props.params;

  let blog: Blog;
  try {
    blog = await BlogApi.getBySlug(locale, slug);
  } catch {
    return notFound();
  }

  if (blog.slug && blog.slug !== slug) {
    redirect(`/${locale}/blogs/${encodeURIComponent(blog.slug)}`);
  }

  const title = pickTitle(blog, locale);
  const contentHtml = pickHtml(blog.content, locale);

  const cleaned = sanitizeHtml(contentHtml, {
    allowedTags: [
      "h1","h2","h3","h4","h5","h6","p","blockquote","ul","ol","li",
      "a","img","code","pre","strong","em","b","i","u","hr","br",
      "span","div","table","thead","tbody","tr","th","td","figure",
      "figcaption","iframe"
    ],
    allowedAttributes: {
      a: ["href","name","target","rel"],
      img: ["src","alt","title","loading","decoding","width","height"],
      iframe: ["src","allow","allowfullscreen","frameborder","width","height"],
      "*": ["id","class"],
    },
    transformTags: {
      a: (_tag, attr) => ({ tagName: "a", attribs: { ...attr, rel: "nofollow noopener noreferrer", target: "_blank" } }),
      img: (_tag, attr) => ({ tagName: "img", attribs: { ...attr, loading: "lazy", decoding: "async" } }),
    },
    disallowedTagsMode: "discard",
  });

  const { html, toc } = addIdsAndExtractToc(cleaned);
  const readingMin = estimateReadingMinFromHtml(cleaned);
  const shareUrl = `${SITE_ORIGIN}/${locale}/blogs/${encodeURIComponent(blog.slug || slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    image: blog.image ? [blog.image] : undefined,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    author: "AI Tooler",
    mainEntityOfPage: shareUrl,
    description: short(toPlain(cleaned)),
    keywords: (blog.tags ?? []).join(", "),
  };

  const latestRes = await BlogApi.list(locale, {
    status: "active",
    sort: "-publishedAt",
    limit: 5,
    page: 1,
  });
  const latest = latestRes.items
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 4);

  return (
    <main className="relative flex md:flex-row flex-col px-0 sm:px-4">
      <aside className="top-28 hidden h-fit max-w-[360px] md:sticky md:block md:mr-[40px]">
        <div className="rounded-2xl border p-4">
          <p className="mb-2 text-xs font-medium uppercase">On this page</p>
          <nav className="space-y-2 text-sm flex  flex-col">
            {toc.length === 0 ? (
              <span className="opacity-60">(No sections)</span>
            ) : (
              toc.map((i) => (
                <a key={i.id} href={`#${i.id}`} className={i.level === 3 ? "pl-4" : i.level === 2 ? "pl-2" : ""}>
                  {i.text}
                </a>
              ))
            )}
          </nav>
        </div>
      </aside>
      <div>
        
      </div>
      <div className="px-4 md:mr-[40px]">
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-8 md:pt-28">
            <nav className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
              <Link href={`/${locale}`} className="hover:underline">Home</Link> /{" "}
              <Link href={`/${locale}/blogs`} className="hover:underline">Blogs</Link> /{" "}
              <span className="text-neutral-800 dark:text-neutral-100">{title}</span>
            </nav>

            <h1 className="text-balance text-4xl font-extrabold">{title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {blog.publishedAt && (
                <>
                  <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                  <span>•</span>
                </>
              )}
              <span>{readingMin} {locale === "vi" ? "phút đọc" : "min read"}</span>
              {blog.tags?.length ? (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((t) => <span key={t}>#{t}</span>)}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {blog.image && (
            <div className="mx-auto mb-10 max-w-[1200px] px-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={title}
                width={1600}
                height={900}
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>
          )}
        </section>

        <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 pb-24 md:grid-cols-[1fr_260px]">
          <article className="prose prose-neutral max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          </article>
        </section>
      </div>
      <aside className="md:sticky md:top-28 h-fit md:max-w-[360px] w-full mb-28">
        <div className="rounded-2xl border border-neutral-200 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-5 text-base font-semibold">Bài viết mới</h3>
          <ul className="space-y-4">
            {latest.map((it) => {
              const t = pickTitle(it, locale); // pickTitle chấp nhận kiểu Blog/BlogItem
              return (
                <li key={it._id} className="flex gap-3">
                  {it.image ? (
                    <Image
                      unoptimized
                      src={it.image}
                      alt={t}
                      width={96}
                      height={64}
                      loading="lazy"
                      className="h-16 w-24 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-16 w-24 rounded-md bg-neutral-100 dark:bg-white/10" />
                  )}

                  <div className="min-w-0">
                    <Link
                      href={`/${locale}/blogs/${encodeURIComponent(it.slug)}`}
                      className="line-clamp-2 text-sm font-medium text-neutral-900 hover:underline dark:text-white"
                    >
                      {t}
                    </Link>
                    {it.publishedAt && (
                      <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(it.publishedAt)}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </main>
  );
}
