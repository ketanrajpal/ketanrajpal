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
    lenisRef.current?.scrollTo(0, { immediate: true });
    setTimeout(() => lenisRef.current?.resize(), 50);
  }, [pathname]);

  return <>{children}</>;
};
