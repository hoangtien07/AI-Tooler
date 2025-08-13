"use client";

import './Navbar.scss';
import {DockCustom} from "@/components/magicui/custom/dock-custom";
import {MenubarCustom} from "@/components/magicui/custom/menubar-custom";
 
const NavBar = () => {
  return (
    <nav className="navbar w-full h-fit sticky top-0 left-0 z-10">
      <div suppressHydrationWarning className='hidden sm:block'>
        <DockCustom />
      </div>
      <div className="block sm:hidden">
        <MenubarCustom />
      </div>
    </nav>
  );
};
 
export default NavBar;