"use client";

import { HomeIcon, Rows3, VectorSquare, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/libs/utils/css";
import { Dock, DockIcon } from "@/components/magicui/dock";
import i18n from "@/libs/i18n";
import Image from "next/image";

type Locale = "vi" | "en";

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#services", icon: VectorSquare, label: "Service" },
  ],
  aiTool: {
    social: { "AI Tools": { name: "AI Tools", url: "/bots", icon: Rows3 } },
    blogs: { Blogs: { name: "Blogs", url: "/blogs", icon: BookOpen } },
  },
} as const;

/** Ghép locale vào path tương đối. Giữ nguyên hash nếu có. */
function withLocale(href: string, locale: Locale): string {
  if (/^https?:\/\//i.test(href)) return href; // external
  const [path, hash] = href.split("#");
  const normPath = path.startsWith("/") ? path : `/${path}`;
  const prefixed = normPath === "/" ? `/${locale}` : `/${locale}${normPath}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** Thay locale của pathname hiện tại, giữ nguyên path còn lại + query + hash. */
function replaceLocaleInPath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean); // ["en","blogs","..."]
  const hasLocale = parts[0] === "vi" || parts[0] === "en";
  const rest = hasLocale ? parts.slice(1).join("/") : parts.join("/");
  return `/${next}${rest ? `/${rest}` : ""}`;
}

type Props = { initialLocale: Locale };

export function DockCustom({ initialLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // trạng thái locale để hiển thị nút; khởi tạo từ props
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Đồng bộ khi URL đổi (ví dụ user bấm link /en/..., /vi/...)
  useEffect(() => {
    const seg = (pathname.split("/")[1] as Locale) || "vi";
    const current = seg === "en" ? "en" : "vi";
    if (current !== locale) {
      setLocale(current);
      if (i18n.language !== current) i18n.changeLanguage(current);
      document.cookie = `locale=${current}; path=/; max-age=31536000`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleLanguage = () => {
    const next: Locale = locale === "en" ? "vi" : "en";
    setLocale(next);
    i18n.changeLanguage(next);
    document.cookie = `locale=${next}; path=/; max-age=31536000`;

    // build URL mới: /<next>/<rest>?<query>#<hash>
    const base = replaceLocaleInPath(pathname, next);
    const query = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const url = `${base}${query ? `?${query}` : ""}${hash}`;
    router.replace(url); // điều hướng client-side để render lại theo ngôn ngữ mới
  };

  return (
    <div className="flex-col items-center justify-center border-b">
      <TooltipProvider>
        <Dock direction="middle" className="w-full rounded-none max-w-[1400px] border-none">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={withLocale("/", locale)} aria-label="AI Tooler Home" className="size-16 rounded-full">
                  <Image unoptimized src="https://i.ibb.co/mFdXcqLt/favicon-8.jpg" alt="AI Tooler" width={40} height={40} className="rounded-full m-3" />
                </Link>
              </TooltipTrigger>
            </Tooltip>
          </DockIcon>

          <div className="flex-1"></div>

          {DATA.navbar.map((item) => (
            <DockIcon key={item.label} className="mr-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={withLocale(item.href, locale)}
                    aria-label={item.label}
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-16 rounded-full")}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent><p>{item.label}</p></TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {Object.entries(DATA.aiTool.social).map(([name, social]) => (
            <DockIcon key={name} className="mr-4 ml-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={withLocale(social.url, locale)}
                    aria-label={social.name}
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-16 rounded-full")}
                  >
                    <social.icon className="size-4" />
                    <span>{social.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent><p>{name}</p></TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {/* <Separator orientation="vertical" className="h-full" /> */}

          {Object.entries(DATA.aiTool.blogs).map(([name, blogs]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={withLocale(blogs.url, locale)}
                    aria-label={blogs.name}
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-16 rounded-full")}
                  >
                    <blogs.icon className="size-4" />
                    <span>{blogs.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent><p>{name}</p></TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <div className="flex-1"></div>

          <DockIcon className="!p-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <AnimatedThemeToggler className="p-3 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent><p>Theme</p></TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon className="!p-2 !w-[54px] !h-[54px]">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleLanguage}
                  className="bg-inherit w-[36px] h-[36px] rounded-md hover:bg-gray-200 flex justify-center items-center text-gray-800 dark:text-white border border-b-gray-50"
                >
                  <span suppressHydrationWarning>{locale.toUpperCase()}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent><p>Language</p></TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
