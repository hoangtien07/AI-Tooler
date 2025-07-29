import {
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
  User,
} from "lucide-react";

interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicesProps {
  heading?: string;
  reasons?: Reason[];
}

const Services = ({
  heading = "OUR SERVICES",
  reasons = [
    {
      title: "AI Tool Explorer",
      description:
        "Discover and access the most powerful AI tools tailored to your industry and needs. We test, review, and recommend the best tools so you don’t have to.",
      icon: <RadioTower className="size-6" />,
    },
    {
      title: "Custom AI Integration",
      description:
        "We help you embed AI into your workflow — from data analysis to content creation and automation. No coding needed, just results.",
      icon: <SquareKanban className="size-6" />,
    },
    {
      title: "AI Agent Development",
      description:
        "Build your own intelligent AI Agent that works like a real assistant: automating tasks, answering messages, generating reports, and more.",
      icon: <GitPullRequest className="size-6" />,
    },
    {
      title: "Business Automation Strategy",
      description:
        "Let us analyze your current workflow and show you how to automate repetitive tasks using AI – saving time, reducing costs, increasing speed.",
      icon: <WandSparkles className="size-6" />,
    },
    {
      title: "Personal AI Assistant Setup",
      description:
        "Want a virtual assistant that books meetings, writes emails, or manages your documents? We set it up – fully personalized for you.",
      icon: <Layers className="size-6" />,
    },
    {
      title: "1‑on‑1 AI Onboarding & Training",
      description:
        "New to AI? Our experts walk you through how to use AI tools, step‑by‑step – for teams or individuals, in English or your native language.",
      icon: <User className="size-6" />,
    },
  ],
}: ServicesProps) => {
  return (
    <section className="py-48 bg-[#f5f5f5]">
      <div className="container">
        <div className="mb-10 md:mb-20">
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl dark:text-gray-900">
            {heading}
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold dark:text-gray-700">{reason.title}</h3>
              <p className="text-muted-foreground dark:text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services };
