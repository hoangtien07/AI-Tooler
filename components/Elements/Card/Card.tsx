"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/legacy/image";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

type CardItemProps = React.ComponentProps<typeof Card> & {
  cardTitle?: React.ReactNode;
  desc?: React.ReactNode;
  className?: string;
  keyItem: string;
  image?: string | StaticImageData;
  price?: string | number;
};

export function CardItem({
  cardTitle, desc, price, className = "", keyItem, image, ...props
}: CardItemProps) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleClick = () => {
    if (keyItem) router.push(`/bots/${keyItem}`);
  };

  return (
    <div>
      <Card
        className={`relative min-w-[150px] overflow-hidden border bg-gradient-to-br from-slate-50 to-slate-100 transition-all dark:from-slate-900 dark:to-slate-800 shadow-none flex-row items-center sm:px-6 px-2 sm:py-4 py-2 h-full ${className}`}
        onClick={handleClick}
        {...props}
      >
        <div className="w-[25%] min-w-[60px]">
          <Image unoptimized 
            src={image ?? "/default-image.png"}
            width={300}
            height={300}
            objectFit="cover"
            priority={true}
            alt={typeof cardTitle === "string" ? (cardTitle as string) : t("card.alt")}
          />
        </div>
        <div className="flex-col flex-1 min-w-[60px]">
          <CardContent className="flex-col h-fit items-center justify-center p-2">
            <p className="pointer-events-none text-sm sm:text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">
              {cardTitle}
            </p>
            <CardDescription className="text-xs sm:text-sm min-w-[60px] text-slate-600 dark:text-slate-400 mb-2">
              {desc}
            </CardDescription>
            {(typeof price === "string" || typeof price === "number") && (
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {price}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 px-2">
            <Button className="hidden sm:block w-full h-8 cursor-pointer p-0 text-xs sm:text-base" onClick={handleClick}>
              {t("buttons.details")}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
