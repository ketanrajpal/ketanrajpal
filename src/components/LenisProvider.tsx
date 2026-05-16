"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const resizeLenis = () => lenis.resize();

    const ro = new ResizeObserver(resizeLenis);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    window.addEventListener("lenis:resize", resizeLenis);

    return () => {
      window.removeEventListener("lenis:resize", resizeLenis);
      ro.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timeouts: number[] = [];

    const alignToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top });
      lenisRef.current?.scrollTo(top, { immediate: true });
    };

    const scrollToHashTarget = (attempt = 0) => {
      const pendingTarget = sessionStorage.getItem("pending-scroll-target");
      const hash = window.location.hash;
      const hashTarget = hash ? decodeURIComponent(hash.slice(1)) : undefined;
      const id = pendingTarget ?? hashTarget;

      if (!id) return false;

      const target = document.getElementById(id);

      if (target) {
        alignToId(id);

        // Re-align after late layout shifts (fonts/images/animations) settle.
        timeouts.push(window.setTimeout(() => alignToId(id), 180));
        timeouts.push(window.setTimeout(() => alignToId(id), 600));

        sessionStorage.removeItem("pending-scroll-target");
        return true;
      }

      if (attempt >= 40) return false;

      timeouts.push(
        window.setTimeout(() => scrollToHashTarget(attempt + 1), 100),
      );
      return true;
    };

    const didStartHashScroll = scrollToHashTarget();

    if (!didStartHashScroll) {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }

    timeouts.push(window.setTimeout(() => lenisRef.current?.resize(), 50));

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [pathname]);

  return <>{children}</>;
};
