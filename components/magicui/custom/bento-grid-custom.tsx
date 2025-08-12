import {
  FileTextIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {HeartPlus, Dock, Cpu, LineSquiggle, ChartColumnIncreasing, Workflow, School } from "lucide-react";

const features = [
  {
    Icon: ChartColumnIncreasing,
    name: "Growth & Marketing AI",
    description: "Support brand growth, content creation, and digital marketing.",
    href: "/category/growth-marketing",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: LineSquiggle,
    name: "Design & Creative AI",
    description: "For creators producing visuals, videos, music, and digital art.",
    href: "/category/design-creative",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Dock,
    name: "Office AI",
    description: "Boost productivity, manage notes and documents in a professional setting.",
    href: "/category/office-ai",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: FileTextIcon,
    name: "Writing & Editing AI",
    description: "For blogging, copywriting, editing, and document generation.",
    href: "/category/writing-editing",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Cpu,
    name: "Technology & IT",
    description: "For developers, data analysts, and IT teams to build, analyze, and test systems.",
    href: "/category/technology-it",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Workflow,
    name: "Workflow Automation",
    description: "Automate repetitive tasks and streamline operational processes.",
    href: "/category/workflow-automation",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: HeartPlus,
    name: "Customer Service & Support",
    description: "Tools for communicating with customers, handling inquiries, and automating support.",
    href: "/category/customer-support",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: School,
    name: "AI Education",
    description: "Transforming the way students learn and teachers teach, making education more personalized and efficient",
    href: "/category/ai-education",
    cta: "Explore",
    background: <div className="absolute -right-20 -top-20 opacity-60"></div>,
    className: "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3",
  },
];

export function BentoCustom() {
  return (
    <div className="container !mt-[20px]">
     <BentoGrid>
       {features.map((feature) => (
         <BentoCard key={feature.name} {...feature} />
       ))}
      </BentoGrid>
    </div>
  );
}
