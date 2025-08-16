"use client";

import { Marquee3D } from "@/components/magicui/custom/marquee-custom";
import { MorphingTextCustom } from "@/components/magicui/custom/morphing-text-custom";
import { BentoCustom } from "@/components/magicui/custom/bento-grid-custom";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";
import { FlickeringGridCustom } from "@/components/magicui/custom/flickering-grid-custom";
import { Services } from "@/components/Layout/Services/Services";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
// import { useState, useEffect } from 'react'

export default function Home() {
  const { t } = useTranslation("common");
  // const [isClient, setIsClient] = useState(false)
  
  //   useEffect(() => {
  //     setIsClient(true)
  //   }, [])

  return (
    <div suppressHydrationWarning >
      <div>
        <div className="absolute inset-0 -z-10">
          <FlickeringGridCustom />
        </div>
        <div className="container flex items-center h-fit w-full relative">
          <div className="sm:mt-[20px] mt-[80px] mb-2">
            <MorphingTextCustom />
            <p className="text-[28px] sm:text-[32px] mt-[80px] max-w-[440px] font-bold">
              {t("home.hero.titleLine1")}
            </p>
            <p className="text-[28px] sm:text-[32px] font-bold mt-[-8px]">
              {t("home.hero.titleLine2_prefix")}{" "}
              <span className="text-[#6938ef]">
                {t("home.hero.titleLine2_highlight")}
              </span>
            </p>

            <p className="mt-2 font-semibold text-lg text-gray-800 dark:text-gray-300">
              {t("home.hero.subtitle")}
            </p>

            <ul className="mt-4 space-y-2 text-left text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 min-w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">
                    {t("home.hero.bullets.discover.bold")}
                  </strong>{" "}
                  {t("home.hero.bullets.discover.text")}
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 min-w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">
                    {t("home.hero.bullets.jump.bold")}
                  </strong>{" "}
                  {t("home.hero.bullets.jump.text")}
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 min-w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">
                    {t("home.hero.bullets.unlock.bold")}
                  </strong>{" "}
                  {t("home.hero.bullets.unlock.text")}
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 min-w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">
                    {t("home.hero.bullets.empower.bold")}
                  </strong>{" "}
                  {t("home.hero.bullets.empower.text")}
                </span>
              </li>
            </ul>
          </div>

          <div className="flex-1 h-fit overflow-y-hidden z-[-1] md:block hidden">
            <Marquee3D />
          </div>
        </div>

        <BentoCustom />
      </div>

      <div className="container">
        <GalleryBotSuggest />
      </div>

      <Services />
    </div>
  );
}
