"use client";

import {
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
		
interface Reason {
  title: string;
  description: string;
}

const icons = [
  <RadioTower key={1} className="size-6" />,
  <SquareKanban key={2} className="size-6" />,
  <GitPullRequest key={3} className="size-6" />,
  <WandSparkles key={4} className="size-6" />,
  <Layers key={5} className="size-6" />,
  <User key={6} className="size-6" />,
];

const Services = () => {
  const { t, i18n } = useTranslation("common");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.on("initialized", () => setReady(true));
    return () => {
      i18n.off("initialized", () => setReady(true));
    };
  }, [i18n]);

  if (!ready) return null; // hoặc loading spinner

  const reasonsRaw = t("services.reasons", { returnObjects: true });
  const reasons = Array.isArray(reasonsRaw) ? reasonsRaw : [];

  return (
    <section className="py-24 sm:py-36 px-8 dark:bg-[#171717] dark:text-white bg-[#f5f5f5] text-inherit" id="services">
      <div className="container">
        <div className="mb-16 md:mb-20">
          <h2 className="text-center text-3xl font-bold lg:text-5xl">
            {t('services.heading')}
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason: Reason , i: number) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {icons[i]}
              </div>
              <h3 className="mb-2 text-xl font-semibold dark:text-white">{reason.title}</h3>
              <p className="text-muted-foreground dark:text-neutral-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services };