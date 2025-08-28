// app/product/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbCustom } from "@/components/Layout/Breadcrumb/Breadcrum";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldPlus, ShieldMinus, MoveRight, CircleDollarSign } from "lucide-react";
import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";

type PricingTier = { plan: string; priceText: string };
type LegacyPrice = { service: string; price: string };

type Bot = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  affiliateLink?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  features?: string[];
  strengths?: string[];
  weaknesses?: string[];
  pricing?: PricingTier[];
  price?: LegacyPrice[]; // legacy
};

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api").replace(/\/$/, "");

async function fetchBot(slug: string): Promise<Bot | null> {
  try {
    const res = await fetch(`${API_BASE}/bots/slug/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ⬇️ params giờ là Promise — cần await
export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;            // ✅ FIX: await trước khi dùng
  const bot = await fetchBot(slug);
  if (!bot) return notFound();

  const categories = bot.tags ?? [];
  const pricing: PricingTier[] =
    bot.pricing ??
    (Array.isArray(bot.price)
      ? bot.price.map((p) => ({ plan: p.service, priceText: p.price }))
      : []);

  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      <BreadcrumbCustom />
      <div className="flex flex-col gap-6 mt-[40px]">
        <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
          <Image
            src={bot.image || "/placeholder.png"}
            alt={bot.name}
            width={300}
            height={440}
            className="h-72 w-full rounded-md object-cover lg:h-auto"
          />
          <Card className="col-span-2 justify-center p-6">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-col sm:flex-row justify-between pl-0 sm:pl-5 pr-4">
                <p className="text-2xl font-medium lg:text-3xl">{bot.name}</p>
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

              {(bot.features?.length ?? 0) > 0 && (
                <div className="flex flex-col items-start min-h-[200px] justify-center mb-2">
                  <ul className="list-disc pl-5">
                    {bot.features!.map((feature, i) => (
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
          {(bot.strengths?.length ?? 0) > 0 && (
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
                  {bot.strengths!.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {(bot.weaknesses?.length ?? 0) > 0 && (
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
                  {bot.weaknesses!.map((w, i) => (
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

      <GalleryBotSuggest />
    </div>
  );
}
