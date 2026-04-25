"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const letters = "Hello".split("");

const containerVariants = {
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export function Welcome() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950"
          exit={{
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            y: "-100%",
          }}
        >
          <motion.div
            animate="visible"
            className="flex"
            exit="exit"
            initial="hidden"
            variants={containerVariants}
          >
            {letters.map((letter, index) => (
              <motion.span
                className="font-serif text-[clamp(5rem,18vw,14rem)] font-medium leading-none tracking-wide text-white"
                key={index}
                variants={{
                  exit: {
                    opacity: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    y: -100,
                  },
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    y: 0,
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
