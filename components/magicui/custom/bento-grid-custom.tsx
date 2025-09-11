"use client";

import { useEffect, useState } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { HeartPlus, Dock, Cpu, LineSquiggle, ChartColumnIncreasing, Workflow, School } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/libs/i18n";

export function BentoCustom() {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Chỉ render sau khi client đã mount để tránh mismatch
  if (!mounted) return null;

  const features = [
    {
      Icon: ChartColumnIncreasing,
      name: t("bento.features.growth.name"),
      description: t("bento.features.growth.desc"),
      href: "/bots?category=growth-marketing",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: LineSquiggle,
      name: t("bento.features.design.name"),
      description: t("bento.features.design.desc"),
      href: "/bots?category=design-creative",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Dock,
      name: t("bento.features.office.name"),
      description: t("bento.features.office.desc"),
      href: "/bots?category=office-ai",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: FileTextIcon,
      name: t("bento.features.writing.name"),
      description: t("bento.features.writing.desc"),
      href: "/bots?category=writing-editing",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Cpu,
      name: t("bento.features.tech.name"),
      description: t("bento.features.tech.desc"),
      href: "/bots?category=technology-it",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: Workflow,
      name: t("bento.features.workflow.name"),
      description: t("bento.features.workflow.desc"),
      href: "/bots?category=workflow-automation",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: HeartPlus,
      name: t("bento.features.support.name"),
      description: t("bento.features.support.desc"),
      href: "/bots?category=customer-support",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: School,
      name: t("bento.features.education.name"),
      description: t("bento.features.education.desc"),
      href: "/bots?category=ai-education",
      cta: t("bento.cta"),
      background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
      className: "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3",
    },
  ];

  return (
    <div className="container !px-0 !mt-[20px]">
      <BentoGrid>
        {features.map((f) => (
          <BentoCard key={f.name as string} {...f} />
        ))}
      </BentoGrid>
    </div>
  );
}
