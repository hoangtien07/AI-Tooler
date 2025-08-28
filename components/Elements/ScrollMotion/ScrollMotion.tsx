
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollMotion() {
  return (
    <>
      <TopProgress />
    </>
  );
}

/** ---------- Top scroll progress bar ---------- */
function TopProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400"
    />
  );
}