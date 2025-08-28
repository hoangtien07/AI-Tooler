"use client";

import { useEffect, useState } from "react";
import "./Navbar.scss";
import { DockCustom } from "@/components/magicui/custom/dock-custom";
import { MenubarCustom } from "@/components/magicui/custom/menubar-custom";

type Props = { initialLocale: "en" | "vi" };

const NavBar = ({ initialLocale }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Chỉ render sau khi client đã mount

  return (
    <nav className="navbar w-full h-fit sticky top-0 left-0 z-10">
      <div className="hidden sm:block">
        <DockCustom initialLocale={initialLocale} />  
      </div>
      <div className="block sm:hidden">
        <MenubarCustom initialLocale={initialLocale} />
      </div>
    </nav>
  );
};

export default NavBar;
