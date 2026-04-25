"use client";

import { motion } from "motion/react";

const duration = 200;

const technologies = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "Tailwind CSS" },
  { name: "Material UI" },
  { name: "Vue.js" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "SCSS" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "Django" },
  { name: "Express" },
  { name: "Flask" },
  { name: "REST APIs" },
  { name: "tRPC" },
  { name: "GraphQL" },
  { name: "Google Gemini" },
  { name: "Application-embedded LLMs" },
  { name: "AI Agent Design" },
  { name: "Tool-calling Workflows" },
  { name: "Agentic Pipelines" },
  { name: "Automated Content & Data Pipelines" },
  { name: "Pydantic Schema Validation" },
  { name: "Celery-based Async Orchestration" },
  { name: "PostgreSQL" },
  { name: "MySQL" },
  { name: "MongoDB" },
  { name: "SQLite" },
  { name: "Prisma" },
  { name: "Redis" },
  { name: "Pandas" },
  { name: "NumPy" },
  { name: "Schema-driven API Design" },
  { name: "OAuth 2.0" },
  { name: "JWT" },
  { name: "Iron Session" },
  { name: "RBAC" },
  { name: "AES Encryption" },
  { name: "CSRF Protection" },
  { name: "Audit-safe Architectures" },
  { name: "Government-grade Security Standards" },
  { name: "AWS" },
  { name: "EC2" },
  { name: "Lambda" },
  { name: "S3" },
  { name: "Elastic Beanstalk" },
  { name: "SES" },
  { name: "Microsoft Azure" },
  { name: "Application Insights" },
  { name: "Google Cloud" },
  { name: "Docker" },
  { name: "Nginx" },
  { name: "Gunicorn" },
  { name: "CI/CD Pipelines" },
  { name: "GitHub Actions" },
  { name: "Code Review Practices" },
  { name: "Git-based Workflows" },
  { name: "Production Monitoring" },
  { name: "Sentry" },
  { name: "Azure Application Insights" },
  { name: "Reliability-first Engineering" },
  { name: "UX Journeys" },
  { name: "Wireframing" },
  { name: "Prototyping" },
  { name: "Adobe XD" },
  { name: "Adobe Creative Suite" },
  { name: "Legal Technology" },
  { name: "KPMG HighQ" },
  { name: "M&A Platforms" },
  { name: "Enterprise Legal Workflows" },
  { name: "Education Technology" },
  { name: "Admissions Systems" },
  { name: "VLEs" },
  { name: "Assessment & Proctoring Platforms" },
];

export function Technologies() {
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section className="relative flex flex-col overflow-hidden gap-6 bg-slate-950 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-50 bg-linear-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-50 bg-linear-to-l from-slate-950 to-transparent" />
      <motion.div
        animate={{ x: "-50%" }}
        className="flex min-w-max gap-6 items-center whitespace-nowrap"
        initial={{ x: "0%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {marqueeItems.map((tech, index) => (
          <span
            aria-hidden={index >= technologies.length}
            className="text-base uppercase font-bold tracking-wide text-slate-500 leading-loose"
            key={`${tech.name}-${index}`}
          >
            {tech.name}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
