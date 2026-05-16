"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const letters = "Hello".split("");
const WELCOME_SEEN_AT_KEY = "welcome-seen-at";
const WELCOME_TTL_MS = 5 * 60 * 1000;

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
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;

    const seenAtRaw = window.localStorage.getItem(WELCOME_SEEN_AT_KEY);
    const seenAt = seenAtRaw ? Number(seenAtRaw) : NaN;
    const hasValidSession =
      Number.isFinite(seenAt) && Date.now() - seenAt < WELCOME_TTL_MS;
    const shouldShow = !hasValidSession;

    if (shouldShow) {
      window.localStorage.setItem(WELCOME_SEEN_AT_KEY, String(Date.now()));
    }

    return shouldShow;
  });

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [visible]);

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
