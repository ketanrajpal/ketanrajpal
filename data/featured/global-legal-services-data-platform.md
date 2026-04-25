# Global Legal Services Data Platform

# Clarity at the Heart of Complexity

# An enterprise legal platform built to hold the full weight of cross-border M&A — so the people navigating it could focus on judgment, not administration.

## The Problem

Cross-border mergers and acquisitions are among the most complex operations a legal team can manage. Each transaction spans dozens of jurisdictions, each with its own regulatory requirements, fee structures, approval timelines, and compliance obligations. For KPMG's Global Legal Services team, holding all of that together — across deal teams, client engagements, and internal workflows — meant living inside spreadsheets and disconnected tools that were never designed for work of this scale.

The cost was not just efficiency. It was clarity. When the data is fragmented, so is the confidence of the people relying on it. And in M&A advisory, confidence is not a luxury — it is the foundation of every decision.

## The Idea

The platform was built around a single belief: that complexity should be held by the system, not carried by the people working within it. That means a deal team should be able to see the full shape of a transaction at a glance — every jurisdiction, every legal step, every dependency and deadline — without assembling that picture themselves from scattered sources.

It also means the platform had to be configurable without being complicated. Legal workflows change between clients and between deals. Non-technical administrators needed to be able to build and adapt data templates, permissions, and component layouts through an interface, not a codebase. The product had to be intelligent enough to absorb that flexibility without requiring an engineer every time something needed to change.

## How It Works

The platform sits inside KPMG's existing HighQ legal operations environment, loaded through a browser plugin that embeds the application directly into the portal — invisible in its complexity, but present in everything it enables. Each client organisation operates within its own isolated site, with an encrypted token resolved per request so that all data remains correctly scoped without any manual configuration in the workflow itself.

At the core is a planning engine built to model M&A transactions at both macro and micro level — top-level legal steps across jurisdictions, broken down into sub-steps covering signatories, document preparation, milestones, and responsibilities. Deal teams navigate this through Gantt charts, Kanban boards, process diagrams, and KPI dashboards, all drawing from a live data layer that stays consistent across every view. When a deliverable is ready for a client, the platform generates a fully formatted, branded PowerPoint presentation from live data — eliminating hours of manual slide preparation per engagement.

Behind the interface, administrators configure templates through a visual system of segments, attributes, and triggers — setting up new deal structures without touching code. Every write operation across the platform is tracked through a full audit log, providing a tamper-evident record of every change — a requirement not just for good practice, but for M&A due diligence and regulatory defensibility.

## The Outcome

Deal teams replaced fragmented spreadsheet tracking with a single platform that held the full life of a transaction in one place. Project setup time fell significantly. Non-technical administrators gained the ability to design and deploy new deal templates independently. The PowerPoint export alone recovered hours of manual work per engagement. And across every client site, a single deployment served multiple organisations simultaneously — each with complete data isolation, each with the confidence that what they saw was accurate, current, and theirs alone.

The platform did not just make the work faster. It made the work clearer — for the teams doing it, and for the clients depending on it.

## Technology

The platform is built as a monorepo with three distinct layers: a React 19.2 single-page application written in TypeScript 5.9, an Express 5.2 API server acting as a secure middleware layer, and a browser plugin that embeds the compiled client bundle directly inside HighQ. State management runs through Redux Toolkit 2.11 with RTK Query handling all data fetching, cache invalidation, and optimistic updates across thirty-plus API surface areas. The UI is built on Material UI 7.3 with MUI X Pro components, forms are handled through React Hook Form 7.72 with Zod 4.3 validation enforced at both the client and server boundary, and data visualisations are powered by Apache ECharts 6.0, DHXSCHEDULER Gantt 9.1, and XYFlow 12.10 with Elkjs and Dagre for process diagram layout. On the backend, two independent PostgreSQL databases — one for reusable template structures, one for per-client operational data — are each managed through separate Prisma 7.5 clients with their own connection pools, keeping template governance and client content fully isolated. Authentication runs through OAuth 2.0 against HighQ, with all tokens encrypted using AES-256-CBC before storage, and Helmet 8.1 enforcing security headers throughout. The frontend is bundled with Webpack 5.105 across four environment-specific build profiles, PowerPoint export is handled by PPTXGENJS 4.0, and platform monitoring runs through Azure Application Insights — a system engineered at every layer for the precision that enterprise legal work demands.
