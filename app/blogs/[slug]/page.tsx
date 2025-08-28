// app/blogs/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import * as cheerio from "cheerio";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import Link from "next/link";
import { BlogApi } from "@/lib/api-client";

import ScrollMotionClient from "@/components/Elements/ScrollMotion/ScrollMotion.client";

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000/api";

type Blog = {
  _id: string;
  slug: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  publishedAt?: string;
};

const toPlain = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const short = (s: string, max = 160) => (s.length > max ? s.slice(0, max) : s);
const slugifyId = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

function addIdsAndExtractToc(html: string) {
  const $ = cheerio.load(html);
  const toc: { id: string; text: string; level: number }[] = [];
  $("h1, h2, h3").each((_, el) => {
    const level = Number(el.tagName[1]);
    const text = $(el).text().trim();
    const id = $(el).attr("id") || slugifyId(text);
    $(el).attr("id", id);
    toc.push({ id, text, level });
  });
  return { html: $.html(), toc };
}

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

function estimateReadingMin(html: string) {
  const words = toPlain(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// --------- SEO: generateMetadata vẫn chạy trên server ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = (await BlogApi.getBySlug(slug).catch(() => null)) as Blog | null;
  if (!data) return { title: "Blog | Not found", robots: { index: false } };

  const description = short(toPlain(data.content));
  const canonical = `${SITE}/blog/${encodeURIComponent(slug)}`;

  return {
    title: data.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: data.title,
      description,
      url: canonical,
      type: "article",
      images: data.image ? [{ url: data.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description,
      images: data.image ? [data.image] : undefined,
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = (await BlogApi.getBySlug(slug).catch(() => null)) as Blog | null;
  if (!data) return notFound();

  if (data.slug && data.slug !== slug) {
    redirect(`/blog/${encodeURIComponent(data.slug)}`);
  }

  const clean = sanitizeHtml(data.content, {
    allowedTags: [
      "h1","h2","h3","h4","h5","h6","p","blockquote","ul","ol","li","a","img",
      "code","pre","strong","em","b","i","u","hr","br","span","div","table",
      "thead","tbody","tr","th","td","figure","figcaption","iframe"
    ],
    allowedAttributes: {
      a: ["href","name","target","rel"],
      img: ["src","alt","title","loading","decoding","width","height"],
      iframe: ["src","allow","allowfullscreen","frameborder","width","height"],
      "*": ["id","class"],
    },
    transformTags: {
      a: (tag, attr) => ({
        tagName: "a",
        attribs: { ...attr, rel: "nofollow noopener noreferrer", target: "_blank" },
      }),
      img: (tag, attr) => ({ tagName: "img", attribs: { ...attr, loading: "lazy", decoding: "async" } }),
    },
    disallowedTagsMode: "discard",
  });

  const { html, toc } = addIdsAndExtractToc(clean);
  const readingMin = estimateReadingMin(clean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    image: data.image ? [data.image] : undefined,
    datePublished: data.publishedAt,
    dateModified: data.publishedAt,
    author: "AHub",
    mainEntityOfPage: `${SITE}/blog/${encodeURIComponent(data.slug)}`,
    description: short(toPlain(clean)),
    keywords: (data.tags || []).join(", "),
  };

  return (
    <main className="relative">
      {/* ⬇️ Client-only, render sau khi mount nên không xung đột SSR */}
      <ScrollMotionClient />
      
      {/* background grid (sáng/tối) */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-80" aria-hidden>
        <div className="absolute inset-0 [background:radial-gradient(1000px_600px_at_50%_-10%,rgba(59,130,246,0.08),transparent_60%)]
                        dark:[background:radial-gradient(1000px_600px_at_50%_-10%,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
                        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
                        bg-[size:36px_36px]" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.10),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.22),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-8 md:pt-28">
          <nav className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
            <Link href="/" className="hover:underline">Home</Link> /{" "}
            <Link href="/blog" className="hover:underline">Blog</Link> /{" "}
            <span className="text-neutral-800 dark:text-neutral-100">{data.title}</span>
          </nav>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            {data.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            {data.publishedAt && (
              <>
                <time dateTime={data.publishedAt}>{formatDate(data.publishedAt)}</time>
                <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500" />
              </>
            )}
            <span>{readingMin} phút đọc</span>
            {data.tags && data.tags.length > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((t) => (
                    <span key={t} className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                      #{t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {data.image && (
          <div className="mx-auto mb-10 max-w-[1200px] px-4">
            <figure className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-white/10 dark:bg-white/5">
              <img src={data.image} alt={data.title} width={1600} height={900} className="h-auto w-full object-cover" />
            </figure>
          </div>
        )}
      </section>

      {/* Content + TOC */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 pb-24 md:grid-cols-[1fr_260px]">
        <article className="prose prose-neutral max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </article>

        <aside className="top-28 hidden h-fit md:sticky md:block min-w-[300px]">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">On this page</p>
            <nav className="space-y-2 text-sm">
              {toc.length === 0 && <span className="text-neutral-500 dark:text-neutral-400">(No sections)</span>}
              {toc.map((i, index) => (
                <a key={`${i.id}-${index}`} href={`#${i.id}`} className={`block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200 ${i.level === 2 ? "pl-2" : i.level === 3 ? "pl-4" : ""}`}>
                  {i.text}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 font-medium">Chia sẻ</p>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(`${SITE.replace(/\/api$/, "")}/blog/${encodeURIComponent(data.slug)}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 px-3 py-1 hover:bg-neutral-50 dark:border-white/10 dark:hover:bg-white/10"
              >
                X/Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE.replace(/\/api$/, "")}/blog/${encodeURIComponent(data.slug)}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-neutral-200 px-3 py-1 hover:bg-neutral-50 dark:border-white/10 dark:hover:bg-white/10"
              >
                Facebook
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
