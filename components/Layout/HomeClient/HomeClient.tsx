// components/pages/home/HomeClient.tsx
"use client";

import { useTranslation } from "react-i18next";
import "@/libs/i18n";

import ScrollMotion from "@/components/Elements/ScrollMotion/ScrollMotion";
import { Marquee3D } from "@/components/magicui/custom/marquee-custom";
import { MorphingTextCustom } from "@/components/magicui/custom/morphing-text-custom";
import { BentoCustom } from "@/components/magicui/custom/bento-grid-custom";
import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";
import ServiceHeroParallax from "@/components/Layout/Services/Service-parallax";
import LatestBlogs from "./BlogSection";

type Locale = "vi" | "en";

export default function HomeClient({ locale }: { locale: Locale }) {
  // I18nProvider đã bọc ở layout; chỉ cần dùng hook
  const { t } = useTranslation("common");

  return (
    <div suppressHydrationWarning>
      <ScrollMotion />

      <div>
        <div className="absolute inset-0 -z-10">{/* BG effects (optional) */}</div>

        <div className="container relative flex h-fit w-full items-center pt-10 md:pt-20">
          <div className="sm:mt-[20px] mt-[52px] mb-4">
            <MorphingTextCustom />

            <p className="mt-[80px] max-w-[440px] text-[20px] font-bold sm:text-[32px]">
              <span suppressHydrationWarning>{t("home.hero.titleLine1")}</span>
            </p>

            <p className="mt-[-8px] text-[20px] font-bold sm:text-[32px]">
              <span suppressHydrationWarning>{t("home.hero.titleLine2_prefix")}</span>
              <span className="ml-1 text-[#6938ef]" suppressHydrationWarning>
                {t("home.hero.titleLine2_highlight")}
              </span>
            </p>

            <p className="mt-2 text-[16px] font-semibold text-gray-800 dark:text-gray-300 sm:text-lg">
              <span suppressHydrationWarning>{t("home.hero.subtitle")}</span>
            </p>

            <ul className="mt-6 space-y-3 text-[15px] text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
                <span>
                  <strong className="text-[#6938ef]" suppressHydrationWarning>
                    {t("home.hero.bullets.discover.bold")}
                  </strong>
                  <span className="ml-1" suppressHydrationWarning>
                    {t("home.hero.bullets.discover.text")}
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
                <span>
                  <strong className="text-[#6938ef]" suppressHydrationWarning>
                    {t("home.hero.bullets.jump.bold")}
                  </strong>
                  <span className="ml-1" suppressHydrationWarning>
                    {t("home.hero.bullets.jump.text")}
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
                <span>
                  <strong className="text-[#6938ef]" suppressHydrationWarning>
                    {t("home.hero.bullets.unlock.bold")}
                  </strong>
                  <span className="ml-1" suppressHydrationWarning>
                    {t("home.hero.bullets.unlock.text")}
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
                <span>
                  <strong className="text-[#6938ef]" suppressHydrationWarning>
                    {t("home.hero.bullets.empower.bold")}
                  </strong>
                  <span className="ml-1" suppressHydrationWarning>
                    {t("home.hero.bullets.empower.text")}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="z-[-1] hidden h-fit flex-1 overflow-y-hidden md:block">
            <Marquee3D />
          </div>
        </div>
        <GalleryBotSuggest toolUrl={`/${locale}/bots`} />
      </div>

      <div className="container">
        <BentoCustom />
      </div>

      {/* section bài viết mới */}
      <LatestBlogs locale={locale} />

      <ServiceHeroParallax />
      {/* <Services /> */}
    </div>
  );
}
