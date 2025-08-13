"use client";

import { usePathname } from "next/navigation";
import { botData, categories } from "@/data/groupsData";
import Image from "next/legacy/image";
import { BreadcrumbCustom } from "@/components/Layout/Breadcrumb/Breadcrum";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ShieldPlus, ShieldMinus, MoveRight, CircleDollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";

const CategoryPage = () => {
  const pathname = usePathname();

  const currentBot = botData.find((bot) => bot.key === pathname.split("/").pop());
   const currentCategory = categories.filter((category) =>
    category.tags?.some((tag) =>
      tag.tools?.some((tool) => tool.key === currentBot?.key)
    )
  );

  const goOriginBot = () => {
      window.open(currentBot?.link, "_blank");
  }

  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      <BreadcrumbCustom />
      {currentBot ? (                 
      <div className="flex flex-col gap-6 mt-[40px]">
        <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
          <Image src={currentBot.logo} alt={currentBot.name} width={300} height={440} className="h-72 w-full rounded-md object-cover lg:h-auto" />
          <Card className="col-span-2 justify-center p-6">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-col sm:flex-row justify-between pr-4">
                <p className="text-xl font-medium lg:text-3xl pl-5">{currentBot.name}</p> 
                <div className="flex mt-4 sm:mt-0 sm:items-center items-start">
                  {currentCategory.length > 0
                    ? (<>
                      <span className="ml-[20px] mr-[8px]">Category: </span>
                        <div className="flex flex-col sm:flex-row ">
                          {currentCategory.map((category, index) => (
                            <span key={category.key} className="text-blue-600">
                              <Link href={`/category/${category.key}`}>{category.title}</Link>
                              {index < currentCategory.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </>)
                    : ""}
                </div>
              </div>
              <div className="flex flex-col items-start min-h-[200px] justify-center mb-2">
                <div>{currentBot.features.map((feature, index) => <li key={index}>{feature}</li>)}</div>
              </div>
              <Button className="cursor-pointer py-4 transition-all text-base duration-300 hover:opacity-90" onClick={goOriginBot}>Go to website <MoveRight /></Button>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
              <p>{currentBot.strengths.map((strength, index) => <li key={index}>{strength}</li>)}</p>
            </CardContent>
          </Card>
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
              <p>{currentBot.weaknesses.map((weakness, index) => <li key={index}>{weakness}</li>)}</p>
            </CardContent>
          </Card>
          <Card className="pb-0 overflow-hidden">
            <CardHeader>
              <div className="flex gap-4 leading-5 justify-center items-center">
                <Avatar className="size-10 rounded-full ring-1 ring-input flex items-center justify-center">
                  <CircleDollarSign />
                </Avatar>
                <div className="text-xl">
                  <p className="font-medium">Price</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-0 leading-7 text-foreground/70 flex flex-col text-center h-full">
              {currentBot.price.map((item, index) =>
                <div key={index} className="flex-1 flex h-[33%]">
                  <div className="w-[40%] h-full flex items-center justify-center bg-[#18181b] text-white dark:text-inherit border py-[12px]">{item.service}</div>
                  <div className="flex-1 flex items-center justify-center text-inherit border">{item.price}</div>
                </div>
                )}
            </CardContent>
          </Card>
        </div>
        </div>
      ) : (
        <p className="text-center">Bot not found</p>
      )}
      <GalleryBotSuggest />
    </div>
  );
};

export default CategoryPage;
