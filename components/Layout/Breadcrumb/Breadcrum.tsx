import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HomeIcon } from "lucide-react";

export const  BreadcrumbCustom = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    return pathParts.map((part, index) => {
      const href = `/${pathParts.slice(0, index + 1).join("/")}`;
      return { label: part, href };
    });
  }, [pathParts]);

  return (
    <Breadcrumb className="bg-white p-4 rounded-lg shadow-md">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <HomeIcon className="mr-2" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={item.href} className="capitalize">
              {item.label}
            </BreadcrumbLink>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="mx-2">/</BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}