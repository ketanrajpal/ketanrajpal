import { Rocket5Solid } from "@lineiconshq/free-icons";
import { motion } from "motion/react";
import Image from "next/image";

import Picture from "@/images/ketan-rajpal.jpg";

import { Link } from "./Link";

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
    <main className="flex items-center justify-center py-25">
      <motion.div
        animate="visible"
        className="flex max-w-7xl flex-col gap-8 md:flex-row md:gap-12 lg:gap-16"
        initial="hidden"
        variants={container}
      >
        <Image
          alt="Ketan Rajpal"
          className=" rounded-lg object-cover w-100"
          src={Picture}
        />
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 py-6">
          <motion.h1
            className="leading-snug tracking-wide text-3xl md:text-4xl lg:text-5xl text-primary font-medium"
            variants={item}
          >
            Turning Ideas into Intelligent, Scalable, Human Solutions
          </motion.h1>
          <motion.h2
            className="leading-relaxed tracking-wide text-lg md:text-xl lg:text-2xl"
            variants={item}
          >
            Government portals, legal platforms, education infrastructure — the
            work I&apos;m most proud of runs quietly in the background, serving
            thousands of people who never know my name. That&apos;s exactly how
            it should be.
          </motion.h2>

          <div className="flex items-end justify-items-start">
            <Link href="/story" icon={Rocket5Solid} label="Read My Story" />
          </div>
        </div>
      </motion.div>
    </main>
  );
};
