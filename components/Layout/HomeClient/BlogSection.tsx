"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogApi } from "@/libs/api-client";
import { useTheme } from "next-themes";
import { Particles } from "@/components/magicui/particles";
import "@/libs/i18n";
import { useTranslation } from "react-i18next";


type Locale = "vi" | "en";
type LocalizedString = { vi: string; en: string };
type BlogItem = {
  _id: string;
  slug: string;
  image?: string;
  title?: LocalizedString;
  excerpt?: LocalizedString;
  publishedAt?: string;
};

function formatDate(iso?: string, locale: Locale = "vi") {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LatestBlogs({ locale }: { locale: Locale }) {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const { t } = useTranslation("common");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    let cancelled = false;

    BlogApi.list(locale, {
      status: "active",
      sort: "-publishedAt",
      limit: 3,
      page: 1,
    })
      .then((res) => {
        if (!cancelled) {
          const items = Array.isArray(res?.items) ? (res.items as BlogItem[]) : [];
          setPosts(items);
        }
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <section className="relative mt-12 py-24 h-fit">
      <Particles
  className="absolute inset-0 z-0"
  quantity={100}
  ease={80}
  color={color}
  refresh={posts.length > 0}   // false -> true khi data về => re-init canvas
/>

      <div className="container max-w-6xl px-4">

        <h2 className="text-xl md:text-4xl text-center font-bold mt-12 my-4">{t("home.blog.heading")}</h2>
        <p className="text-center text-neutral-600 dark:text-neutral-400 mb-16">{t("home.blog.subheading")}</p>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="h-fit animate-pulse rounded-3xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5"
                />
              ))
            : posts.map((p) => {
                const title = p.title?.[locale] ?? "";
                const excerpt = p.excerpt?.[locale] ?? "";
                const href = `/${locale}/blogs/${encodeURIComponent(p.slug)}`;

                return (
                  <article
                    key={p._id}
                    className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                  >
                    <Link href={href} className="block">
                      <figure className="relative aspect-[16/9] overflow-hidden">
                        {p.image ? (
                          <Image
                            unoptimized
                            src={p.image}
                            alt={title || "Blog thumbnail"}
                            fill
                            sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                            className="object-cover transition duration-300 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.25),transparent_60%)]" />
                        )}
                      </figure>

                      <div className="p-5">
                        <time className="text-xs text-neutral-500 dark:text-neutral-400">
                          {formatDate(p.publishedAt, locale)}
                        </time>
                        <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-neutral-900 transition group-hover:opacity-90 dark:text-white">
                          {title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm text-neutral-700 dark:text-neutral-300">
                          {excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                  );
                })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={`/${locale}/blogs`}
            className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 shadow-sm hover:bg-neutral-50 dark:border-white/10 dark:bg-white/10 dark:text-white hover:dark:bg-white/20"
          >
            {t("home.blog.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
