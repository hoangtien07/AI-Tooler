import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils/css";
import { ShineBorder } from "@/components/magicui/shine-border";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-4 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) =>(
  <div
    key={props.key}
    className={cn(
      "group relative col-span-2 flex flex-col justify-between overflow-hidden rounded-xl h-full",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <a href={href}>
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="rounded-xl borderWidth-2" />
      <div className="p-4">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Icon className="h-8 w-8 sm:h-12 sm:w-12 origin-left transform-gpu text-neutral-800 dark:text-inherit transition-all duration-300 ease-in-out group-hover:scale-75" />
          <h3 className="text-sm sm:text-xl font-semibold text-neutral-800 dark:text-inherit clamp-1-lines">
            {name}
          </h3>
          <p className="text-xs sm:text-base max-w-lg text-neutral-700 dark:text-inherit clamp-2-lines">{description}</p>
        </div>

        <div
          className={cn(
            "lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <Button
            variant="link"
            asChild
            size="sm"
            className="pointer-events-auto p-0 text-xs sm:text-sm"
          >
            <p>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
            </p>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0"
        >
          <p>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </p>
        </Button>
      </div>
    </a>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
