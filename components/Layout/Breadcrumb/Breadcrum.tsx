"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HomeIcon } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import "@/lib/i18n";

export const BreadcrumbCustom = () => {
  // const { t } = useTranslation("common");
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    return pathParts.map((part, index) => {
      const href = `/${pathParts.slice(0, index + 1).join("/")}`;
      return { label: part, href };
    });
  }, [pathParts]);

  return (
    <Breadcrumb className="bg-inherit p-4 rounded-lg shadow-md ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <HomeIcon className="mr-2" />
            Home
          </BreadcrumbLink>
          <span className="mx-2">/</span>
        </BreadcrumbItem>

        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === 0 ? (
              <BreadcrumbLink href="#" className="capitalize">
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink href={item.href} className="capitalize">
                {item.label}
              </BreadcrumbLink>
            )}
            {index < breadcrumbItems.length - 1 && <span className="mx-2">/</span>}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
