"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { RainbowButtonCustom } from "@/components/magicui/custom/rainbow-button-custom";
import Image, { StaticImageData } from "next/image";

type CardItemProps = React.ComponentProps<typeof Card> & {
  cardTitle?: React.ReactNode;
  desc?: React.ReactNode;
  className?: string;
  keyItem: string;
  image?: string | StaticImageData;
  price?: string | number;
};

export function CardItem({ cardTitle, desc, className = "", keyItem, image, ...props }: CardItemProps) {
  const router = useRouter();

  const handleClick = () => {
    console.log(`Card clicked:`);
    if (keyItem) {
      router.push(`/product/${keyItem}`);
      console.log(`Navigating to product with key: ${keyItem}`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
      <Card className={`col-span-2 row-span-1 overflow-hidden border bg-gradient-to-br from-slate-50 to-slate-100 transition-all dark:from-slate-900 dark:to-slate-800 shadow-none ${className}`} {...props}>
        <CardHeader className="relative pb-2">
          <Image src={image ?? "/default-image.png"} layout="fill" sizes="auto" objectFit="cover" alt={typeof cardTitle === "string" ? cardTitle : "Card image"} />
          <CardTitle className="text-xl font-bold">{cardTitle}</CardTitle>
          <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
            {desc}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex h-40 items-center justify-center p-6">
          <span className="pointer-events-none text-center text-xl font-medium text-slate-800 dark:text-slate-200">
            {/* {props.content || "And more..."} */}
            {cardTitle}
          </span>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <RainbowButtonCustom className="w-full" onClick={handleClick}>
            Details
          </RainbowButtonCustom>
        </CardFooter>
      </Card>
    </div>
  );
}