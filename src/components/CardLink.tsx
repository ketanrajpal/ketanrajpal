"use client";

import { motion } from "motion/react";
import Link from "next/link";

const MotionLink = motion.create(Link);

export const CardLink = ({
  ariaLabel,
  label = "Read More",
  link,
  type = "internal",
}: {
  ariaLabel: string;
  label?: string;
  link: string;
  type?: "external" | "internal";
}) => (
  <MotionLink
    aria-label={ariaLabel}
    className="inline-flex w-fit cursor-pointer items-center gap-2 font-bold text-sm tracking-wide bg-zinc-600 text-white rounded-xl p-2 px-6 uppercase mt-5"
    href={link}
    rel={type === "external" ? "noopener noreferrer" : undefined}
    target={type === "external" ? "_blank" : undefined}
    transition={{ damping: 20, stiffness: 400, type: "spring" }}
    whileHover="hover"
    whileTap={{ scale: 0.95 }}
  >
    <span>{label}</span>
    <span className="sr-only"> about {ariaLabel}</span>
    <motion.svg
      fill="none"
      height="30"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ damping: 20, stiffness: 400, type: "spring" }}
      variants={{ hover: { x: 5 } }}
      viewBox="0 0 24 24"
      width="30"
    >
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </motion.svg>
  </MotionLink>
);
