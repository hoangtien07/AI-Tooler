"use client";

import { useState, useMemo } from "react";
import Fuse from 'fuse.js';
import { categories, botData } from "@/data/groupsData";
// import { BreadcrumbCustom } from "@/components/Layout/Breadcrumb/Breadcrum";
import {CardItem} from "@/components/Elements/Card/Card";

const CategoryPage = () => {
const [query, setQuery] = useState("");

const fuse = useMemo(() => {
  return new Fuse(botData, {
    keys: ["key", "title", "desc"],
    threshold: 0.3, // càng thấp càng chính xác
  });
}, []);

const results = query ? fuse.search(query).map(r => r.item) : botData;

return (
  <>
    <div className="breadcrumb mt-[120px]">
      {/* <BreadcrumbCustom /> */}
    </div>
    <div>
      
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {results.length === 0 && <p>No results found</p>}
        {results.length > 0 && results.map(item => (
          <CardItem 
            key={item.key}
            keyItem={item.key}
            cardTitle={item.name}
            price={Array.isArray(item.price) ? item.price.map(p => p.price).join(", ") : item.price}
            image={item.logo}
          />
        ))}
        </div>
    </div>
  </>
);
};

export default CategoryPage;