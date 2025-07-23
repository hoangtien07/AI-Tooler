"use client";

import Image from "next/legacy/image";
import serviceImg from "@/public/service.png"
import { usePathname } from "next/navigation";

export default function Services() {
  const pathname = usePathname();
  return (
    <div id="services">
      {pathname === "/" && ( 
      <Image src={serviceImg} alt="Service Image" className="w-full h-auto"/>
      )}
    </div>
  );
}
