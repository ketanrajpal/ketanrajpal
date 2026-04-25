"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

import GenesisEngine from "../images/featured/genesis-engine.jpg";
import GlobalLegalServicesDataPlatform from "../images/featured/global-legal-services-data-platform.jpg";
import IndianDevelopmentFoundationOfOverseasIndiansWebPortal from "../images/featured/indian-development-foundation-of-overseas-indians-web-portal.jpg";
import LondonSchoolOfCommerceGroupOfCollegesApplication from "../images/featured/london-school-of-commerce-group-of-colleges-application.jpg";
import TheEducationGroupAdmissionsSystem from "../images/featured/the-education-group-admissions-system.jpg";
import UsaAirportsLimoService from "../images/featured/usa-airports-limo-service.jpg";

const projects: {
  category: string;
  description: string;
  href: string;
  image: StaticImageData;
  slug: string;
  title: string;
}[] = [
  {
    category: "AI & Automation",
    description:
      "An autonomous content engine that turns raw signals into publication-ready stories — continuously, without waiting to be told.",
    href: "/projects/genesis-engine",
    image: GenesisEngine,
    slug: "genesis-engine",
    title: "Genesis Engine",
  },
  {
    category: "Legal Technology",
    description:
      "An enterprise legal platform built to hold the full weight of cross-border M&A — so the people navigating it could focus on judgment, not administration.",
    href: "/projects/global-legal-services-data-platform",
    image: GlobalLegalServicesDataPlatform,
    slug: "global-legal-services-data-platform",
    title: "Global Legal Services Tax & Legal Data Platform",
  },
  {
    category: "Government",
    description:
      "A government-grade platform that gave millions of overseas Indians a trusted, transparent way to invest in the country they never stopped caring about.",
    href: "/projects/indian-development-foundation-of-overseas-indians-web-portal",
    image: IndianDevelopmentFoundationOfOverseasIndiansWebPortal,
    slug: "indian-development-foundation-of-overseas-indians-web-portal",
    title: "Indian Development Foundation of Overseas Indians Web Portal",
  },
  {
    category: "Education Technology",
    description:
      "A bespoke admissions platform that replaced the chaos of disconnected tools with one clear, end-to-end view of every person walking through the door.",
    href: "/projects/london-school-of-commerce-group-of-colleges-application",
    image: LondonSchoolOfCommerceGroupOfCollegesApplication,
    slug: "london-school-of-commerce-group-of-colleges-application",
    title: "London School of Commerce Group of Colleges CRM",
  },
  {
    category: "Education Technology",
    description:
      "A purpose-built admissions platform that made the first step into higher education feel as considered and human as everything that follows.",
    href: "/projects/the-education-group-admissions-system",
    image: TheEducationGroupAdmissionsSystem,
    slug: "the-education-group-admissions-system",

    title: "The Education Group Admissions System",
  },
  {
    category: "Multi-Brand Platform",
    description:
      "A single platform that powers multiple businesses simultaneously — each fully branded, each built to be found, each running without friction in the background.",
    href: "/projects/usa-airports-limo-service",
    image: UsaAirportsLimoService,
    slug: "usa-airports-limo-service",
    title: "United States of America Airports Limo Service",
  },
];

const CARD_WIDTH = 1100;
const GAP = 200;

export const Featured = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: containerRef,
  });

  const totalDistance = (projects.length - 1) * (CARD_WIDTH + GAP);
  const x = useTransform(scrollYProgress, (v) => {
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1280;
    const space = (viewportWidth - CARD_WIDTH) / 2;
    return -v * totalDistance + space;
  });

  return (
    <div>
      <div className="mx-auto flex max-w-sm flex-col gap-6 p-6 md:max-w-2xl md:gap-12 md:px-0 md:pt-0 lg:max-w-3xl">
        <div className="flex flex-col gap-8">
          <h2 className="font-serif text-4xl font-medium tracking-wide md:text-7xl">
            Featured Projects
          </h2>
          <p className="text-base font-medium leading-loose text-pretty tracking-wide sm:text-lg md:text-xl lg:text-2xl">
            A handful of the platforms behind the work. Each one built to last.
            Each one still running.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-0 pb-10 mx-5 md:hidden">
        {projects.map((project) => (
          <article className="w-full" key={project.title}>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  alt={project.title}
                  className="h-full w-full object-cover"
                  src={project.image}
                />
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <p className="inline-block rounded-full bg-amber-300 p-1 px-3 font-bold uppercase tracking-wide text-black">
                    {project.category}
                  </p>
                </div>
                <h3 className="font-serif text-2xl font-medium leading-snug tracking-wide text-pretty">
                  {project.title}
                </h3>
                <p className="text-base font-medium leading-relaxed text-pretty tracking-wide text-gray-500">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="hidden md:block"
        ref={containerRef}
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 flex flex-col justify-center gap-16 overflow-visible md:h-screen">
          <motion.div className="mt-10 flex" style={{ gap: GAP, x }}>
            {projects.map((project) => (
              <article
                className="relative flex shrink-0 flex-row items-center"
                key={project.title}
                style={{ width: CARD_WIDTH }}
              >
                <div className="h-125 w-125 shrink-0 overflow-hidden rounded-3xl">
                  <Image
                    alt={project.title}
                    className="h-full w-full object-cover"
                    src={project.image}
                  />
                </div>

                <div className="-ml-10 flex flex-col justify-between rounded-3xl bg-white p-15 shadow-xl">
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="inline-block rounded-full bg-amber-300 p-1 px-3 font-bold uppercase tracking-wide text-black">
                        {project.category}
                      </p>
                    </div>
                    <h3 className="font-serif text-3xl font-medium leading-relaxed tracking-wide text-pretty">
                      {project.title}
                    </h3>

                    <p className="text-lg font-medium leading-loose text-pretty tracking-wide text-gray-500">
                      {project.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
