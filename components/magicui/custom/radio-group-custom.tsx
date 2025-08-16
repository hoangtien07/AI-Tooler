import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {categories} from "@/data/groupsData"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

// const count = categories.length;
// type Tool = { key: string; name: string };
// type Tag = { key: string; name: string; tools: Tool[] };
// type Category = { key: string; title: string; desc: string; tags?: Tag[] };

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
  const [selectedValue] = useState(pathname.split("/").pop() || "all");
//  const getTotalTools = (category: Category) =>
//   (category.tags ?? []).reduce((acc, tag) => acc + (tag.tools?.length || 0), 0);

  const { t } = useTranslation("common");

  return (
    <RadioGroup defaultValue={selectedValue} onValueChange={handleChange} className="mb-4">
      <div className="mb-2 mt-1">
        <Label className="text-lg">Choose Category:</Label>
      </div>
      <div className="flex flex-col gap-4">
          <div key="all" className="flex items-center gap-3">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="flex-1 mb-1">
              {/* {t("filter.all")} */}
              All
               {/* <span className="text-blue-600">({count})</span> */}
               </Label>
          </div>
      {categories.map((category) => (
        <div key={category.key}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value={category.key} id={category.key} />
            <Label htmlFor={category.key} className="flex-1 mb-1">
              {category.title} 
              {/* <span className="text-blue-600">({getTotalTools(category)})</span> */}
            </Label>
          </div>
          {/* <div className="pl-8">
            {(category.tags ?? []).map(tag => (
              <div key={tag.key}>
                {tag.name} <span>({tag.tools.length})</span>
              </div>
            ))}
          </div> */}
        </div>
      ))}

      </div>
    </RadioGroup>
  )
}
