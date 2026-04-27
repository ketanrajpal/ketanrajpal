"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { CardHeading, CardParagraph, CardTag } from "@/components/Card";
import { Heading } from "@/components/Heading";

import FreelanceLogo from "../images/logos/freelance.svg";
import KpmgUkLogo from "../images/logos/kpmg-uk.svg";
import LscGroupLogo from "../images/logos/lsc-group.svg";
import StudySmartLogo from "../images/logos/study-smart.svg";
import TorusLabsLogo from "../images/logos/torus-labs.svg";

const experiences = [
  {
    color: "#00338d",
    company: "KPMG UK",
    description:
      "Led transformation of an international legal platform into a configurable product on HighQ, TypeScript, and React, while driving AI and automation delivery across complex client programs.",
    logo: KpmgUkLogo,
    role: "Senior Manager, Legal Technology",
    year: "2023 - Present",
  },
  {
    color: "#ed1a25",
    company: "London School of Commerce",
    description:
      "Architected and maintained multi-country admissions, student, and learning systems, and led critical cloud migrations and remote operations delivery during Covid across six campuses.",
    logo: LscGroupLogo,
    role: "Full Stack Developer, Education Technology",
    year: "2013 - 2023",
  },
  {
    color: "#f12f16",
    company: "Freelance",
    description:
      "Delivered 100+ projects for 60+ clients across government, education, and commercial sectors, covering full-stack engineering, product design, and infrastructure guidance.",
    logo: FreelanceLogo,
    role: "Designer and Developer",
    year: "2011 - Present",
  },
  {
    color: "#7d16f2",
    company: "Torus Labs",
    description:
      "Designed and delivered a front-end prototype from user journeys and wireframes through to working code — refining layouts and interaction flows through direct feedback until the experience felt exactly right.",
    logo: TorusLabsLogo,
    role: "Contract Front End Designer",
    year: "2019",
  },
  {
    color: "#0a5a4f",
    company: "Study Smart Overseas Education",
    description:
      "Built and maintained a Student Management System and IELTS portal end to end, alongside landing pages and social media across four platforms to support recruitment and digital marketing.",
    logo: StudySmartLogo,
    role: "Web Developer",
    year: "2014 - 2016",
  },
];

const CARD_WIDTH = 768;
const GAP = 200;

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: containerRef,
  });

  const totalDistance = (experiences.length - 1) * (CARD_WIDTH + GAP);
  const x = useTransform(scrollYProgress, (v) => {
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1280;
    const space = (viewportWidth - CARD_WIDTH) / 2;
    return -v * totalDistance + space;
  });

  return (
    <section className="bg-amber-100 scroll-mt-28" id="experience">
      <div className="flex flex-col gap-8 px-0 pb-10 mx-5 md:hidden">
        <ExperienceHeading />
        {experiences.map((experience) => (
          <article
            className="w-full"
            key={`${experience.company}-${experience.year}`}
          >
              <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl">
              <div
                className="absolute right-4 top-4 inline-block rounded-2xl p-3"
                style={{ backgroundColor: experience.color }}
              >
                <Image
                  alt={`${experience.company} logo`}
                  className="h-12 w-12"
                  src={experience.logo}
                />
              </div>
              <CardTag tag={experience.year} />
              <CardHeading title={experience.company} />
              <h4 className="text-base font-semibold uppercase tracking-wide">
                {experience.role}
              </h4>
              <CardParagraph description={experience.description} />
            </div>
          </article>
        ))}
      </div>

      <div
        className="hidden md:block"
        ref={containerRef}
        style={{ height: `${experiences.length * 100}vh` }}
      >
        <div className="sticky top-0 flex flex-col justify-center gap-16 overflow-visible md:h-screen">
          <ExperienceHeading />
          <motion.div className="flex md:mt-20" style={{ gap: GAP, x }}>
            {experiences.map((experience) => (
              <article
                className="shrink-0"
                key={`${experience.company}-${experience.year}`}
                style={{ width: CARD_WIDTH }}
              >
                <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-12 shadow-xl">
                  <div
                    className="absolute -right-12.5 -top-12.5 inline-block rounded-2xl p-5"
                    style={{ backgroundColor: experience.color }}
                  >
                    <Image
                      alt={`${experience.company} logo`}
                      className="h-20 w-20"
                      src={experience.logo}
                    />
                  </div>
                  <CardTag tag={experience.year} />
                  <CardHeading title={experience.company} />
                  <h4 className="text-xl font-semibold uppercase tracking-wide">
                    {experience.role}
                  </h4>
                  <CardParagraph description={experience.description} />
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ExperienceHeading = () => (
  <Heading
    description="The systems most people never see are often the ones they depend on most. I have spent fifteen years building exactly those - the quiet infrastructure that keeps things working when it matters."
    title="Experience"
  />
);
