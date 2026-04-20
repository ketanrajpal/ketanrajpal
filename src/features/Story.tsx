"use client";

import { Rocket5Solid } from "@lineiconshq/free-icons";
import { motion } from "motion/react";
import Image from "next/image";

import { Link } from "@/components/Link";
import { Section } from "@/components/Section";
import Picture from "@/images/ketan-rajpal.jpg";

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

export const Story = () => {
  return (
    <Section className="flex items-center justify-center">
      <motion.div
        animate="visible"
        className="flex max-w-7xl flex-col gap-8 md:flex-row md:gap-20 lg:gap-25"
        initial="hidden"
        variants={container}
      >
        <Image
          alt="Ketan Rajpal"
          className="rounded-lg object-cover w-90"
          loading="eager"
          priority
          src={Picture}
        />
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 py-6">
          <motion.h1
            className="leading-snug tracking-wide text-2xl md:text-3xl lg:text-4xl  font-medium"
            variants={item}
          >
            Turning Ideas into{" "}
            <strong className="text-primary font-medium">Intelligent</strong>,{" "}
            <strong className="text-primary font-medium">Scalable</strong>,{" "}
            <strong className="text-primary font-medium">Human</strong>{" "}
            Solutions
          </motion.h1>
          <motion.h2
            className="leading-relaxed tracking-wide text-lg md:text-xl lg:text-2xl"
            variants={item}
          >
            <strong className="text-primary font-medium">
              Government portals, legal platforms, education infrastructure
            </strong>{" "}
            — the work I&apos;m most proud of runs quietly in the background,
            serving{" "}
            <strong className="text-primary font-medium">
              thousands of people who never know my name.
            </strong>{" "}
            That&apos;s exactly how it should be.
          </motion.h2>

          <div className="flex items-end justify-items-start">
            <Link href="/story" icon={Rocket5Solid} label="Read My Story" />
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
