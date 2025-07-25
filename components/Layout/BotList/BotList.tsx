import { CardItem } from "@/components/Elements/Card/Card";
import { StaticImageData } from "next/legacy/image";

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
  if (!bots.length) {
    return <p>No results found.</p>
  }
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 pr-0">
      {bots.map(item => (
        <CardItem
          key={item.key}
          keyItem={item.key}
          cardTitle={item.name}
          image={item.logo}
          desc={item.summary || "No description available"}
        />
      ))}
    </div>
  );
}