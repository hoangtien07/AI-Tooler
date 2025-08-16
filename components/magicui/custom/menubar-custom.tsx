import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import {useTranslation} from "react-i18next";
import i18n from "@/lib/i18n";

function toggleLanguage() {
  const currentLanguage = i18n.language;
  const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
  i18n.changeLanguage(newLanguage);
}

export function MenubarCustom() {
  const { i18n } = useTranslation();

  return (
    <Menubar className="flex justify-center h-14">
      <MenubarMenu>
        <MenubarTrigger><Link href="/" className="h-full flex items-center">Home</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger><Link href="/#services" className="h-full flex items-center">Service</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger><Link href="/category/all" className="h-full flex items-center">Category</Link></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <div className="ml-2"></div>
        <ModeToggle />
      </MenubarMenu>
      <MenubarMenu>
        <div className="bg-inherit w-[36px] h-[36px] ml-4 rounded-md hover:bg-gray-200 flex justify-center items-center text-gray-800 dark:text-white border border-b-gray-50" onClick={toggleLanguage}>{i18n.language === 'en' ? 'EN' : 'VI'}</div>
      </MenubarMenu>
    </Menubar>
  )
}
