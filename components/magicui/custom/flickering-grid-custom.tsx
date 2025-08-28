"use client";

import { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
interface FlickeringGridCustomProps {
  width?: number;
  height?: number;
}

export function FlickeringGridCustom({
  width,
  height,
}: FlickeringGridCustomProps) {
  const [size, setSize] = useState({
    width: width ?? 800,
    height: height ?? 800,
  });

  useEffect(() => {
    if (width !== undefined && height !== undefined) {
      setSize({ width, height });
      return;
    }

    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={1.2}
        gridGap={8}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0}
        height={size.height}
        width={size.width}
      />
    </div>
  );
}