"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const baseNavigation = [
  { hash: "home", href: "/", label: "Home" },
  { hash: "experience", href: "/#experience", label: "Experience" },
  { hash: "projects", href: "/#projects", label: "Projects" },
  { hash: null, href: "/blog", label: "Blog" },
];

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
const SCROLL_DURATION_MS = 1400;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const primaryNavigation = baseNavigation.map((item) => ({
    ...item,
    href: isHome && item.hash ? `/#${item.hash}` : item.href,
  }));

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);

    // Smooth-scroll only for section links when already on home.
    if (pathname !== "/" || !href.startsWith("/#")) return;

    event.preventDefault();

    const targetId = href.replace("/#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const delta = targetY - startY;
    let startTime: null | number = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

    const step = (time: number) => {
      if (startTime === null) startTime = time;

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo({
        top: startY + delta * easedProgress,
      });

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    window.history.replaceState(null, "", href);
  };

  return (
    <header className="fixed top-0 flex w-full justify-between p-10 z-50">
      <div></div>
      <div className="relative">
        <button
          aria-controls="site-nav"
          aria-expanded={isOpen}
          aria-label={`Navigation menu — click to ${isOpen ? "close" : "open"}`}
          className={`z-100 relative flex h-12 w-12 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-3xl p-2 ${isOpen ? "bg-white " : "border-0"}`}
          onClick={() => setIsOpen((v) => !v)}
          type="button"
        >
          <motion.div
            animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-8 origin-center bg-zinc-900"
            transition={{ duration: 0.35, ease }}
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-8 origin-center bg-zinc-900"
            transition={{ duration: 0.35, ease }}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{
                clipPath: "inset(0% 0% 0% 0% round 24px)",
                opacity: 1,
              }}
              className="-right-3 -top-4 absolute z-50 flex w-xs flex-col gap-1 rounded-3xl p-5 pt-18 bg-orange-200 backdrop-blur-sm shadow-xl"
              exit={{
                clipPath: "inset(0% 0% 100% 0% round 24px)",
                opacity: 0,
                transition: { duration: 0.35, ease },
              }}
              id="site-nav"
              initial={{
                clipPath: "inset(0% 0% 100% 0% round 24px)",
                opacity: 0,
              }}
              transition={{ duration: 0.45, ease }}
            >
              {primaryNavigation.map((item) => (
                <Link
                  className="group relative flex items-center rounded-xl px-4 py-3 text-xl font-serif"
                  href={item.href}
                  key={item.href}
                  onClick={(event) => handleLinkClick(event, item.href)}
                >
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    {item.label}
                  </span>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    fill="none"
                    height="30"
                    stroke="var(--color-zinc-900)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="30"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
