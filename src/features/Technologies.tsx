"use client";

import { motion } from "motion/react";

import { Section } from "@/components/Section";

const rows: {
  bold?: boolean;
  color: string;
  direction: number;
  items: { bold?: boolean; name: string }[];
}[] = [
  {
    color: "text-primary",
    direction: -1,
    items: [
      { bold: true, name: "React" },
      { bold: true, name: "Next.js" },
      { bold: true, name: "TypeScript" },
      { name: "JavaScript" },
      { bold: true, name: "Tailwind CSS" },
      { name: "Vue.js" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "SCSS" },
      { name: "Material UI" },
      { bold: true, name: "Node.js" },
      { name: "Express" },
      { bold: true, name: "Python" },
      { name: "Django" },
      { name: "Flask" },
      { bold: true, name: "REST APIs" },
      { name: "tRPC" },
      { name: "GraphQL" },
    ],
  },
  {
    color: "text-foreground",
    direction: 1,
    items: [
      { bold: true, name: "Google Gemini" },
      { bold: true, name: "LLMs" },
      { bold: true, name: "AI Agents" },
      { name: "Tool Calling" },
      { name: "Agentic Pipelines" },
      { name: "Pydantic" },
      { name: "Celery" },
      { bold: true, name: "PostgreSQL" },
      { name: "MySQL" },
      { bold: true, name: "MongoDB" },
      { name: "SQLite" },
      { bold: true, name: "Prisma" },
      { name: "Redis" },
      { name: "Pandas" },
      { name: "NumPy" },
    ],
  },
  {
    color: "text-primary",
    direction: -1,
    items: [
      { bold: true, name: "AWS" },
      { name: "EC2" },
      { name: "Lambda" },
      { name: "S3" },
      { bold: true, name: "Azure" },
      { bold: true, name: "Google Cloud" },
      { bold: true, name: "Docker" },
      { name: "Nginx" },
      { bold: true, name: "OAuth 2.0" },
      { name: "JWT" },
      { name: "RBAC" },
      { name: "AES Encryption" },
      { bold: true, name: "CI/CD" },
      { bold: true, name: "GitHub Actions" },
      { name: "Sentry" },
      { name: "Adobe XD" },
      { name: "UX Design" },
    ],
  },
];

const duration = 60;

export function Technologies() {
  return (
    <Section className="overflow-hidden flex flex-col gap-6 md:gap-8 lg:gap-10">
      {rows.map((row, i) => {
        const doubled = [...row.items, ...row.items];
        return (
          <div className="flex" key={i}>
            <motion.div
              animate={{ x: row.direction === -1 ? "-50%" : "0%" }}
              className="flex min-w-max gap-6 md:gap-8 lg:gap-10"
              initial={{ x: row.direction === -1 ? "0%" : "-50%" }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {doubled.map((tech, j) => (
                <span
                  className={`text-xl md:text-2xl lg:text-3xl tracking-wide whitespace-nowrap ${row.color} ${tech.bold ? "font-bold" : "font-medium"}`}
                  key={j}
                >
                  {tech.name}
                </span>
              ))}
            </motion.div>
          </div>
        );
      })}
    </Section>
  );
}
