// app/[locale]/bots/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbCustom } from "@/components/Layout/Breadcrumb/Breadcrum";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldPlus, ShieldMinus, MoveRight, CircleDollarSign } from "lucide-react";
// import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";

import { BotApi } from "@/libs/api-client";
import type { Bot, Locale } from "@/libs/types/bot";
import { pickText, pickArray, pickPricing } from "@/libs/utils/bot";

export const revalidate = 300;

export default async function ProductDetailPage(props: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await props.params;

  let bot: Bot | null = null;
  try {
    bot = await BotApi.getBySlug(locale, slug);
  } catch {
    return notFound();
  }
  if (!bot) return notFound();

  const name = pickText(bot, locale, "name");
  const summary = pickText(bot, locale, "summary");
  const categories = bot.tags ?? [];

  const features = pickArray(bot, locale, "features");
  const strengths = pickArray(bot, locale, "strengths");
  const weaknesses = pickArray(bot, locale, "weaknesses");
  const pricing = pickPricing(bot, locale);

  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      <BreadcrumbCustom />

      <div className="flex flex-col gap-6 mt-[40px]">
        <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
          <Image
            unoptimized
            src={bot.image || "/placeholder.png"}
            alt={name}
            width={300}
            height={440}
            className="h-72 w-full rounded-md object-cover lg:h-auto"
          />

          <Card className="col-span-2 justify-center p-6">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-col sm:flex-row justify-between pl-0 sm:pl-5 pr-4">
                <p className="text-2xl font-medium lg:text-3xl">{name}</p>
                <div className="flex mt-4 sm:mt-0 sm:items-center items-start">
                  {categories.length > 0 && (
                    <div className="flex">
                      <p className="mr-[8px]">Category:</p>
                      <div className="flex flex-col sm:flex-row">
                        {categories.map((tag, idx) => (
                          <span key={tag} className="text-blue-600">
                            <Link href={`/category/${encodeURIComponent(tag)}`}>{tag}</Link>
                            {idx < categories.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {summary ? (
                <p className="pl-5 pr-4 text-foreground/80">{summary}</p>
              ) : null}

              {features.length > 0 && (
                <div className="flex flex-col items-start min-h-[200px] justify-center mb-2">
                  <ul className="list-disc pl-5">
                    {features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {bot.affiliateLink ? (
                <Link href={bot.affiliateLink} target="_blank" rel="noopener noreferrer">
                  <Button className="cursor-pointer py-4 text-base">
                    Go to website <MoveRight className="ml-2" />
                  </Button>
                </Link>
              ) : null}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {strengths.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex gap-4 leading-5 justify-center items-center">
                  <Avatar className="size-10 rounded-full ring-1 ring-input flex items-center justify-center">
                    <ShieldPlus />
                  </Avatar>
                  <div className="text-xl">
                    <p className="font-medium">Strengths</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6 leading-7 text-foreground/70">
                <ul className="list-disc pl-5">
                  {strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {weaknesses.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex gap-4 leading-5 justify-center items-center">
                  <Avatar className="size-10 rounded-full ring-1 ring-input flex items-center justify-center">
                    <ShieldMinus />
                  </Avatar>
                  <div className="text-xl">
                    <p className="font-medium">Weaknesses</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6 leading-7 text-foreground/70">
                <ul className="list-disc pl-5">
                  {weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {pricing.length > 0 && (
            <Card className="pb-0 overflow-hidden">
              <CardHeader>
                <div className="flex gap-4 leading-5 justify-center items-center">
                  <Avatar className="size-10 rounded-full ring-1 ring-input flex items-center justify-center">
                    <CircleDollarSign />
                  </Avatar>
                  <div className="text-xl">
                    <p className="font-medium">Pricing</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-0 leading-7 text-foreground/70 flex flex-col text-center h-full">
                {pricing.map((p, idx) => (
                  <div key={idx} className="flex-1 flex h-[33%]">
                    <div className="w-[40%] h-full flex items-center justify-center bg-[#18181b] text-white dark:text-inherit border py-[12px]">
                      {p.plan}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-inherit border">
                      {p.priceText}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* <GalleryBotSuggest /> */}
    </div>
  );
}
