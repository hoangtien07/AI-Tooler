import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {categories} from "@/data/groupsData"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { usePathname } from "next/navigation";

export function RadioGroupCustom() {
  const router = useRouter();
  const handleChange = (value: string) => {
    if (value === "all") {
      router.push("/category/all");
    } else {
      router.push(`/category/${value}`);
    }
  };
  const pathname = usePathname();
  const [selectedValue, setSelectedValue] = useState(pathname.split("/").pop() || "all");

  return (
    <RadioGroup defaultValue={selectedValue} onValueChange={handleChange} className="mb-4">
      <div className="mb-4">
        <Label>Choose a category:</Label>
      </div>
      <div className="flex flex-col gap-4">
          <div key="all" className="flex items-center gap-3"  >
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
        {categories.map((category) => ( 
          <div key={category.key} className="flex items-center gap-3"  >
            <RadioGroupItem value={category.key} id={category.key} />
            <Label htmlFor={category.key}>{category.title}</Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  )
}
