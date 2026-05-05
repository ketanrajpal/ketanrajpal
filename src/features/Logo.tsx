"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";

import KetanRajpalLogo from "@/images/logo.svg";

export const Logo = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothScrollY = useSpring(scrollY, {
    damping: 28,
    mass: 0.3,
    stiffness: 110,
  });
  const rotate = useTransform(smoothScrollY, (value) => value * 0.1);

  return (
    <motion.div
      className="flex items-center"
      style={{ rotate: shouldReduceMotion ? 0 : rotate }}
    >
      <Image alt="Ketan Rajpal" className="h-10 w-auto" src={KetanRajpalLogo} />
    </motion.div>
  );
};
