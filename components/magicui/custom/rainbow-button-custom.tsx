"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button";
import React from "react";

type RainbowButtonCustomProps = React.ComponentProps<typeof RainbowButton> & {
  className?: string;
  children?: string | React.ReactNode;
};

export function RainbowButtonCustom({ className, ...props }: RainbowButtonCustomProps) {
  return <RainbowButton className={className} onClick={props.onClick}>{props.children}</RainbowButton>;
}
