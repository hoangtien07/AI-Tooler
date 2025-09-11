"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { botData } from "@/data/groupsData";
import { useTranslation } from "react-i18next";
import "@/libs/i18n";
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { SparklesText } from "@/components/magicui/sparkles-text";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}
interface GalleryBotSuggestProps {
  heading?: string;
  toolUrl?: string;
  items?: GalleryItem[];
}

const GalleryBotSuggest = ({ heading, toolUrl = "/category/all" }: GalleryBotSuggestProps) => {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}&tab=all&page=1`);
  };

  return (
    <section className="mt-4 mb-24 md:my-24 ">
      <div className="container">
        <div className="flex flex-col items-center">
          {/* <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl lg:mb-6" suppressHydrationWarning >
            {heading ?? t("botSuggest.heading")}
          </h2> */}
          <SparklesText>
          <a
            href={toolUrl}
            className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-2xl underline"
          >
            {t("botSuggest.exploreAll")}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          </SparklesText>
        </div>
        
        <form onSubmit={handleSearch} className="max-w-[800px] flex m-auto h-[48px] mt-8">
          <Input type="text" placeholder="Search everything you need..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-full rounded-none rounded-l-xl border border-neutral-200 bg-white/90 px-4 py-3 text-[15px] text-neutral-800 shadow-sm outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
          <Button type="submit" className="h-full rounded-none rounded-r-xl">Search</Button>
        </form>

        {/* <div className="mt-8 flex shrink-0 items-center justify-end gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto cursor-pointer"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto cursor-pointer"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div> */}
      </div>

      {/* <div className="w-full max-w-full mt-8">
        <Carousel
          setApi={setCarouselApi}
          opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
          className="relative w-full max-w-full md:left-[-1rem]"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full md:-mr-4 md:ml-8 2xl:ml-0 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {botData.map((item) => (
              <CarouselItem key={item.key} className="rounded-[10px] py-6 ml-8 md:max-w-[360px] sm:max-w-[240px] max-w-[180px] relative dark:bg-slate-900 bg-slate-100">
                <a href={`/product/${item.key}`} className="group flex flex-col justify-between">
                  <div>
                    <div className="aspect-3/2 flex overflow-clip rounded-xl">
                      <div className="flex-1 flex justify-center items-center">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={item.logo}
                            alt={item.key}
                            width={300}
                            height={300}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.name}
                  </div>
                  <div className="text-muted-foreground mb-4 sm:mb-8 md:mb-12 line-clamp-3 text-xs sm:text-sm md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    {t("buttons.readMore")}
                    <ArrowRight className="ml-2 sm:size-5 size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div> */}
    </section>
  );
};

export { GalleryBotSuggest };
