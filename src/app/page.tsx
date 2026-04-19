"use client";

import { ArrowAngularTopRightSolid } from "@lineiconshq/free-icons";
import { motion } from "motion/react";

import { Icon } from "@/components/Icon";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/ketanrajpal/",
    name: "LinkedIn",
  },
  {
    href: "https://github.com/ketanrajpal/",
    name: "GitHub",
  },
  {
    href: "https://dribbble.com/ketanrajpal",
    name: "Dribbble",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    transition: { damping: 24, stiffness: 300, type: "spring" as const },
    y: 0,
  },
};

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <motion.div
        animate="visible"
        className="container flex flex-col gap-12"
        initial="hidden"
        variants={container}
      >
        <motion.h1
          className="text-6xl leading-snug tracking-wide"
          variants={item}
        >
          <strong className="text-primary font-medium">Senior Engineer</strong>{" "}
          with a drive to build things that last. Over a decade of{" "}
          <strong className="text-primary font-medium">full-stack</strong> work
          across{" "}
          <strong className="text-primary font-medium">
            legal technology, education, and AI
          </strong>{" "}
          at the scale where it matters.
        </motion.h1>
        <motion.h2
          className="text-3xl leading-relaxed tracking-wide"
          variants={item}
        >
          I&apos;m{" "}
          <strong className="text-primary font-medium">Ketan Rajpal</strong> —
          based in <strong className="text-primary font-medium">London</strong>,
          currently at{" "}
          <strong className="text-primary font-medium">KPMG</strong>, and
          I&apos;ve spent{" "}
          <strong className="text-primary font-medium">fifteen years</strong>{" "}
          building platforms that hold through complexity, pressure, and the
          moments when everything has to keep working.
        </motion.h2>

        <motion.div
          className="flex flex-row items-center gap-10 text-2xl"
          variants={item}
        >
          {socialLinks.map((link) => (
            <motion.a
              className="flex items-center gap-2 tracking-wide"
              href={link.href}
              key={link.name}
              rel="noopener noreferrer"
              target="_blank"
              whileHover="hovered"
            >
              <motion.span
                transition={{ damping: 20, stiffness: 400, type: "spring" }}
              >
                {link.name}
              </motion.span>
              <motion.span
                style={{ display: "flex" }}
                transition={{ damping: 20, stiffness: 400, type: "spring" }}
                variants={{ hovered: { rotate: 90 } }}
              >
                <Icon
                  color="var(--color-primary)"
                  icon={ArrowAngularTopRightSolid}
                  size={30}
                />
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
