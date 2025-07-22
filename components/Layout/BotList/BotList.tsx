import { CardItem } from "@/components/Elements/Card/Card";
import { StaticImageData } from "next/image";

type Bot = {
  key: string;
  name: string;
  price: string | { service: string; price: string }[];
  logo: string | StaticImageData;
  summary?: string;
  link?: string;
};

interface BotListProps {
  bots: Bot[];
}

export function BotList({ bots }: BotListProps) {
  if (!bots.length) return <p>No results found</p>;
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
      {bots.map(item => (
        <CardItem
          key={item.key}
          keyItem={item.key}
          cardTitle={item.name}
          price={
            Array.isArray(item.price)
              ? item.price.map(p => p.price).join(", ")
              : item.price
          }
          image={item.logo}
          desc={item.summary || "No description available"}
        />
      ))}
    </div>
  );
}