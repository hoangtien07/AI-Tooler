"use client";

import './Navbar.scss';
import {DockCustom} from "@/components/magicui/custom/dock-custom";
import {MenubarCustom} from "@/components/magicui/custom/menubar-custom";
 
const NavBar = () => {
  return (
    <nav className="navbar w-full h-fit sticky top-0 left-0 z-10">
      <div suppressHydrationWarning>
        <DockCustom />
      </div>
      {/* <div className='block sticky top-0 left-0 p-[8px] w-full h-[40px] bg-neutral-800 border border-b-neutral-900'>
          <MenubarCustom />
      </div> */}
    </nav>
  );
};
 
export default NavBar;