import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function MenubarCustom() {
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
        <ModeToggle />
      </MenubarMenu>
    </Menubar>
  )
}
