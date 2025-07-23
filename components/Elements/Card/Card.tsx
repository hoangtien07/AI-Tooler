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

type CardItemProps = React.ComponentProps<typeof Card> & {
  cardTitle?: React.ReactNode;
  desc?: React.ReactNode;
  className?: string;
  keyItem: string;
  image?: string | StaticImageData;
  price?: string | number;
};

export function CardItem({ cardTitle, desc, price, className = "", keyItem, image, ...props }: CardItemProps) {
  const router = useRouter();

  const handleClick = () => {
    console.log(`Card clicked:`);
    if (keyItem) {
      router.push(`/product/${keyItem}`);
      console.log(`Navigating to product with key: ${keyItem}`);
    }
  };

  return (
    <div>
      <Card className={`overflow-hidden border bg-gradient-to-br from-slate-50 to-slate-100 transition-all dark:from-slate-900 dark:to-slate-800 shadow-none flex-row items-center px-6 py-4 h-full ${className}`} {...props} >
        <div className="w-[25%]">
          <Image src={image ?? "/default-image.png"} objectFit="cover" priority={true} alt={typeof cardTitle === "string" ? cardTitle : "Card image"} />
        </div>
        <div className="flex-col flex-1">
          <CardContent className="flex-col h-fit items-center justify-center p-2">
            <p className="pointer-events-none text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">
              {cardTitle}
            </p>
            <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {desc}
            </CardDescription>      
            {typeof price === "string" || typeof price === "number" ? (
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {price}
              </p>
            ) : null}      
          </CardContent>
          <CardFooter className="flex-col gap-2 px-2">
            <Button className="w-full cursor-pointer py-0" onClick={handleClick}>
              Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}