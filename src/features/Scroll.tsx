"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function Scroll() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    restDelta: 0.001,
    stiffness: 200,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 z-90 h-1 w-full origin-left bg-slate-950"
      style={{ scaleX }}
    />
  );
}
