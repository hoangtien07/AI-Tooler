"use client";

import { usePathname } from "next/navigation";
import { botData } from "@/data/groupsData";
import Image from "next/image";

const CategoryPage = () => {
  const pathname = usePathname();

  const currentBot = botData.find((bot) => bot.key === pathname.split("/").pop());

  return (
    <>
      
      <div className="container !mt-[180px] mx-auto p-4">
        {currentBot ? (
          
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{currentBot.name}</h1>
            <Image src={currentBot.logo} alt={currentBot.name} className="w-full max-w-md mx-auto mb-4" />
            <p>{currentBot.features}</p>
          </div>
        ) : (
          <p className="text-center">Bot not found</p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;