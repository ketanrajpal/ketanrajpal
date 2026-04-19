"use client";

import { MoonHalfRight5Solid, Sun1Solid } from "@lineiconshq/free-icons";
import { AnimatePresence, motion } from "motion/react";

import { useModeStore } from "@/stores/mode";

import { Icon } from "./Icon";

export const Mode = () => {
  const { isDark, toggle } = useModeStore();

  return (
    <button
      className="cursor-pointer overflow-hidden"
      onClick={toggle}
      style={{ perspective: 200 }}
    >
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            initial={{ opacity: 0, y: -40 }}
            key="moon"
            style={{ display: "block" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Icon color="var(--color-primary)" icon={Sun1Solid} size={35} />
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            initial={{ opacity: 0, y: -40 }}
            key="sun"
            style={{ display: "block" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Icon
              color="var(--color-primary)"
              icon={MoonHalfRight5Solid}
              size={35}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
