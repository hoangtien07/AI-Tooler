import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import {categories} from "@/data/groupsData"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePathname } from "next/navigation";

export function SelectCustom() {
  const router = useRouter();
    const handleChange = (value: string) => {
      if (value === "all") {
        router.push("/category/all");
      } else {
        router.push(`/category/${value}`);
      }
    };
    const pathname = usePathname();
    const [selectedValue] = useState(pathname.split("/").pop() || "all");

  return (
    <div className="flex items-center justify-between">
      <p>Choose the category: </p>
      <Select defaultValue={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="flex-1 ml-[20px]">
          <SelectValue placeholder="Choose the Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>   
            <SelectItem value="all">
              <Link href={`/category`}> All </Link>
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.key} value={category.key}>
                <Link href={`/category/${category.key}`}> {category.title} </Link>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
