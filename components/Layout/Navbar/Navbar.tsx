"use client";

import './Navbar.scss';
import {DockCustom} from "@/components/magicui/custom/dock-custom";
 
const NavBar = () => {
  return (
    <nav className="navbar flex justify-between w-[1200]">
        <div className="absolute top-0 left-[50%] transform translate-x-[-50%]" suppressHydrationWarning>
          <div className="relative">
            <DockCustom />
          </div>
        </div>
    </nav>
  );
};
 
export default NavBar;