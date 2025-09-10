"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Fuse from "fuse.js";
import { botData, categories } from "@/data/groupsData";
import { RadioGroupCustom } from "@/components/magicui/custom/radio-group-custom";
import { BotList } from "@/components/Layout/BotList/BotList";
// import { BreadcrumbCustom } from "@/components/Layout/Breadcrumb/Breadcrum";
import {SelectCustom} from "@/components/magicui/custom/select-custom";

function getBotsByCategory(slug: string) {
  if (!slug || slug === "all") return botData;
  const category = categories.find(c => c.key === slug);
  if (!category) return [];
  const toolKeys = (category.tags ?? [])
  .flatMap(tag => tag.tools?.map(tool => tool.key) ?? []);
  return botData.filter(bot => toolKeys.includes(bot.key));
}

const CategoryPage = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [query, setQuery] = useState("");

  const botsInCategory = useMemo(() => getBotsByCategory(slug || "all"), [slug]);

  const fuse = useMemo(
    () =>
      new Fuse(botsInCategory, {
        keys: ["name", "key"],
        threshold: 0.3,
      }),
    [botsInCategory]
  );
  const results = query
    ? fuse.search(query).map(r => r.item)
    : botsInCategory;

  return (
    <>
      <div className="container mb-24 min-h-[100vh]">
        <div className="sm:flex md:flex-row lg:flex-row gap-4 mt-[20px] relative">
          <div className="mt-4 sm:mr-6 mr-0">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="mb-4 border w-full p-2 rounded-md"
            />
            <div className="hidden sm:block">
              <RadioGroupCustom />
            </div>
            <div className="sm:hidden block">
              <SelectCustom />
            </div>
          </div>
          <BotList bots={results} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;