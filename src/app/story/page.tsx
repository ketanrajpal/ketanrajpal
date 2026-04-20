"use client";

import { motion } from "motion/react";

import { Section } from "@/components/Section";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    transition: { damping: 24, stiffness: 200, type: "spring" as const },
    y: 0,
  },
};

const P = ({ children }: { children: React.ReactNode }) => (
  <motion.p
    className="text-lg md:text-xl leading-relaxed tracking-wide"
    initial="hidden"
    variants={reveal}
    viewport={{ amount: 0.3, once: true }}
    whileInView="visible"
  >
    {children}
  </motion.p>
);

export default function StoryPage() {
  return (
    <Section className="flex flex-col gap-10 md:gap-14">
      <motion.h1
        className="leading-snug tracking-wide text-4xl md:text-5xl lg:text-6xl"
        initial="hidden"
        variants={reveal}
        viewport={{ once: true }}
        whileInView="visible"
      >
        Turning Ideas into{" "}
        <strong className="text-primary font-medium">Intelligent</strong>,{" "}
        <strong className="text-primary font-medium">Scalable</strong>,{" "}
        <strong className="text-primary font-medium">Human</strong> Solutions
      </motion.h1>

      <P>
        Some people step into technology because it offers a career. I stepped
        into it because I could never stop{" "}
        <strong className="text-primary font-medium">building</strong>.
      </P>

      <P>
        There was always a problem worth solving. Always something that could be
        improved, simplified, or reimagined. Long before titles, promotions, or
        recognition, there was simply the instinct to make things work{" "}
        <strong className="text-primary font-medium">
          better than they did before
        </strong>
        .
      </P>

      <P>
        That instinct first showed itself through competition. During my
        Bachelor&apos;s and Master&apos;s years in India, I travelled across
        Delhi and beyond for technical fests — not to participate for the sake
        of it, but to test myself. I learned new technologies not because a
        syllabus demanded it, but because the challenge in front of me required
        it. Over time, that discipline turned into results:{" "}
        <strong className="text-primary font-medium">
          twenty-one first-place awards
        </strong>{" "}
        across some of India&apos;s most respected institutions, including{" "}
        <strong className="text-primary font-medium">
          Jawaharlal Nehru University
        </strong>
        ,{" "}
        <strong className="text-primary font-medium">
          Delhi College of Engineering
        </strong>
        , and{" "}
        <strong className="text-primary font-medium">Amity University</strong>.
      </P>

      <P>
        But the real prize was never the trophy. It was the mindset those years
        built — the hunger to learn deeply, to solve under pressure, and to keep
        going until the answer was right.
      </P>

      <P>
        That mindset carried naturally into freelancing. I went on to work with
        more than{" "}
        <strong className="text-primary font-medium">sixty clients</strong>{" "}
        across industries, from government bodies to major brands. Every client
        brought a different challenge, a different expectation, and a different
        level of trust. That experience taught me something early: technology is
        never just about code. It is about{" "}
        <strong className="text-primary font-medium">responsibility</strong>.
        Real people rely on the systems you build, and when those systems fail,
        the impact is never abstract.
      </P>

      <P>
        Then came the chapter that shaped me most:{" "}
        <strong className="text-primary font-medium">education</strong>. When I
        joined{" "}
        <strong className="text-primary font-medium">
          London School of Commerce
        </strong>{" "}
        in 2013, I stepped into an environment where technology had to do far
        more than function — it had to support ambition, scale, and human
        potential. Over the years, I built and led the systems that powered the
        institution: admissions, attendance, CRM, learning environments, and the
        operational backbone that kept everything moving.
      </P>

      <P>
        It was quiet infrastructure — the kind most people never see, but
        thousands depend on every single day.
      </P>

      <P>
        Then <strong className="text-primary font-medium">Covid</strong>{" "}
        arrived, and suddenly that invisible work became the difference between
        disruption and continuity. At a time when many institutions were
        struggling to stay operational, we moved fast. Working through intense
        uncertainty, I helped lead the shift of critical infrastructure to the{" "}
        <strong className="text-primary font-medium">cloud</strong>, built fully
        online admissions and assessment systems with proctoring capabilities,
        and enabled campuses across{" "}
        <strong className="text-primary font-medium">
          London, Manchester, Birmingham, Colombo, Malta, and Dhaka
        </strong>{" "}
        to remain connected and functional.
      </P>

      <P>What could have taken months was delivered in days.</P>

      <P>
        During that period, I also built the{" "}
        <strong className="text-primary font-medium">
          first mobile-based, auto-refreshing barcode attendance system
        </strong>{" "}
        in the country — a solution designed not just for the moment, but for
        long-term use. Many of the systems built in that era are still used
        daily across the college group.
      </P>

      <P>
        That chapter taught me something bigger than technology itself. It
        taught me that the true value of technology is revealed in{" "}
        <strong className="text-primary font-medium">
          moments of pressure
        </strong>{" "}
        — when people need clarity, stability, and trust. It taught me how to
        lead through uncertainty, how to make decisions when the stakes are
        real, and how to build systems that people can stand on.
      </P>

      <P>
        In 2023, I joined{" "}
        <strong className="text-primary font-medium">KPMG UK</strong> as a
        Manager Developer in{" "}
        <strong className="text-primary font-medium">Legal Technology</strong>{" "}
        and stepped into a new world — one that felt different on the surface,
        yet familiar at its core. Education and law may seem far apart, but both
        deal in access, record, and consequence. Both require technology that
        people can trust.
      </P>

      <P>
        Working with a talented team, I helped reimagine an international
        business organisation system as something far more dynamic: not just a
        fixed application, but a{" "}
        <strong className="text-primary font-medium">
          configurable platform
        </strong>{" "}
        capable of adapting to new clients, new templates, and new use cases.
        The goal was no longer to build for a single workflow, but to create a
        foundation for many. Within a year, that work led to my promotion to{" "}
        <strong className="text-primary font-medium">Senior Manager</strong>.
      </P>

      <P>
        But the title was never the story. The story was the transformation — of
        systems, of teams, of possibilities.
      </P>

      <P>
        Across education and legal technology, one thread has remained constant.
        I have always been drawn to complexity — not to make it more impressive,
        but to make it{" "}
        <strong className="text-primary font-medium">simpler</strong>. To take
        systems that feel heavy, fragmented, or difficult, and turn them into
        something people can actually use, trust, and grow with.
      </P>

      <P>
        Because beneath the projects, the awards, the institutions, and the
        promotions, there has always been a bigger direction forming. A desire
        to build something of my own — not out of impatience, but out of{" "}
        <strong className="text-primary font-medium">preparation</strong>.
        Something that brings together everything I have learned across
        industries, across teams, across years of solving real problems for real
        people. Something built not just for thousands, but for{" "}
        <strong className="text-primary font-medium">millions</strong>.
      </P>

      <P>
        The best builders do not just create products. They create trust. They
        create momentum. They create change that lasts.
      </P>

      <P>
        That is the standard I have always worked toward. And the most important
        chapter is still ahead.
      </P>
    </Section>
  );
}
