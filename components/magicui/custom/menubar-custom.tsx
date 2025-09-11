"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import i18n from "@/libs/i18n";
import { useEffect, useState } from "react";
import Image from "next/image";

type Locale = "vi" | "en";
type Props = { initialLocale: "en" | "vi" };

/** Ghép locale vào path tương đối. Giữ nguyên hash nếu có. */
function withLocale(href: string, locale: Locale): string {
  if (/^https?:\/\//i.test(href)) return href; // external
  const [path, hash] = href.split("#");
  const normPath = path.startsWith("/") ? path : `/${path}`;
  const prefixed = normPath === "/" ? `/${locale}` : `/${locale}${normPath}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}


export function MenubarCustom({ initialLocale }: Props) {
  const [locale, setLocale] = useState<"en" | "vi">(initialLocale);

  useEffect(() => {
    const current = (i18n.language === "vi" ? "vi" : "en") as "en" | "vi";
    if (current !== locale) setLocale(current);
  }, [locale]);

  const toggleLanguage = () => {
    const next = locale === "en" ? "vi" : "en";
    setLocale(next);
    i18n.changeLanguage(next);
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
  };

  return (
    <Menubar className="flex justify-between h-14">
      <MenubarMenu>
        <MenubarTrigger>
                <Link href={withLocale("/", locale)} aria-label="AI Tooler Home" className="w-[36px] h-[36px] rounded-full">
                  <Image unoptimized src="https://i.ibb.co/mFdXcqLt/favicon-8.jpg" alt="AI Tooler" width={34} height={34} className="rounded-full" />
                </Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger><Link href="/" className="h-full flex items-center">Home</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger><Link href="/#services" className="h-full flex items-center">Service</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger><Link href="/bots" className="h-full flex items-center">Bots</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger><Link href="/blogs" className="h-full flex items-center mr-4">Blogs</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu><ModeToggle /></MenubarMenu>
      <MenubarMenu>
        <button
          onClick={toggleLanguage}
          className="bg-inherit w-[36px] h-[36px] ml-4 rounded-md hover:bg-gray-200 flex justify-center items-center text-gray-800 dark:text-white border border-b-gray-50"
        >
          <span suppressHydrationWarning>{locale.toUpperCase()}</span> {/* ✅ */}
        </button>
      </MenubarMenu>
    </Menubar>
  );
}
