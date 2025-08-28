"use client";

import { CardItem } from "@/components/Elements/Card/Card";
import { StaticImageData } from "next/legacy/image";
import Image from "next/image";
import DataNotFound from "@/public/nodata-img.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

type Bot = {
  key: string;
  name: string;
  price: string | { service: string; price: string }[];
  logo: string | StaticImageData;
  summary?: string;
  link?: string;
};

interface BotListProps {
  bots: Bot[];
}

export function BotList({ bots }: BotListProps) {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!bots.length) {
    return (
      <div className="flex-1 flex justify-center items-center flex-wrap">
        <Image src={DataNotFound} alt="no-data" />
        <div className="w-full"></div>
        <Button className="cursor-pointer mt-8">
          <Link href="/category/all">{t("botList.backToCategory")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 sm:p-4 sm:mt-0 px-0 mt-8 mb-20">
      {bots.map((item) => (
        <CardItem
          key={item.key}
          keyItem={item.key}
          cardTitle={item.name}
          image={item.logo}
          desc={item.summary || t("botList.noDescription")}
        />
      ))}
    </div>
  );
}
