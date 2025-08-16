"use client";

import { HomeIcon, Rows3, VectorSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import i18n from "@/lib/i18n";


const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#services", icon: VectorSquare, label: "Service" },
  ],
  aiTool: {
    social: {
      Category: {
        name: "Category",
        url: "/category/all",
        icon: Rows3,
      },
    },
  },
};

function toggleLanguage() {
  const currentLanguage = i18n.language;
  const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
  i18n.changeLanguage(newLanguage);
}

export function DockCustom() {
  return (
    <div className="flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-16 rounded-full",
                    )}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full mr-4" />
          {Object.entries(DATA.aiTool.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-16 rounded-full",
                    )}
                  >
                    <social.icon className="size-4" />
                    <span>{social.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full ml-2" />
          <DockIcon className="!p-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator orientation="vertical" className="h-full" />
          <DockIcon className="!p-2 !w-[54px] !h-[54px]">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-inherit w-[36px] h-[36px] rounded-md hover:bg-gray-200 flex justify-center items-center text-gray-800 dark:text-white border border-b-gray-50" onClick={toggleLanguage}>{i18n.language === 'en' ? 'EN' : 'VI'}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Language</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
