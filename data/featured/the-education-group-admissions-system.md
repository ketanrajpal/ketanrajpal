# The Education Group Admissions System

# The Door Opens Here

# A purpose-built admissions platform that made the first step into higher education feel as considered and human as everything that follows.

## The Problem

A student's first experience of a university is not the lecture hall. It is the application. The form they fill out late at night, the documents they upload and wonder about, the interview they wait to hear back from. For most institutions, that experience is held together by email inboxes, spreadsheets, and calendar apps that were never designed for the weight they carry.

The cost falls everywhere. Admissions staff spend their time chasing information instead of supporting applicants. Review standards drift across programmes and campuses. Students are left without visibility into where they stand. And institutions built to open doors find themselves slowed by the process of opening them.

## The Idea

The platform was built on a simple conviction: every person in the admissions process deserves a workspace designed for the role they actually play. Not a generic tool adapted to fit, but something purpose-built — where a student knows exactly where they are in their application, an interviewer can manage their availability without a back-and-forth, an administrator has the full pipeline in front of them, and a partner consultant can submit and track applications without needing to pick up the phone.

That meant building one platform that could hold all of those perspectives simultaneously — each role seeing only what they need, each action happening within clearly defined boundaries, and the entire journey from first enquiry to final enrolment running through a single, coherent system.

## How It Works

Students move through structured application sections — personal details, academic history, documents, declarations — with their progress saved and resumable at any point. Documents are uploaded through a configurable pipeline backed by AWS S3, with upload types defined per programme so the right evidence reaches the right place. When it is time for an interview, the platform matches bookings against interviewer availability windows and generates a Zoom meeting link automatically. After each interview, structured review forms capture assessor feedback in a consistent format, and administrators move applications through the pipeline from a centralised dashboard that holds every status, every communication, and every decision in one place.

Referees receive a tokenised link that sits entirely outside the main authentication boundary — a dedicated portal designed for a single purpose, accessible without an account. Templated emails built on Handlebars keep communication consistent and auditable. And across every institution using the platform, a multi-tenant architecture ensures that each organisation's users, roles, and configuration remain entirely their own — sharing infrastructure, but nothing else.

## The Outcome

Admissions teams gained what fragmented tools could never provide: a complete view of every application, at every stage, across every programme and cohort. Processing became faster. Review standards became consistent. Applicants gained visibility into their own journey rather than waiting in silence. And institutions that had been managing complexity manually found that complexity held — quietly, reliably — by the platform beneath them.

The work of opening doors became, finally, a great deal easier.

## Technology

The platform is built on Next.js 16 with the App Router, written in TypeScript 5 across a domain-driven monolith where each business area — enrolment, interview, application, document — owns its own UI components, validation logic, and API procedures in a single co-located feature folder. The entire API surface runs through tRPC 11, with Zod 4 schemas validating inputs server-side and the same types inferred automatically on the client, eliminating manual contract maintenance entirely. Data is stored in PostgreSQL via Prisma 7, with the schema split across eighteen domain model files rather than maintained as a single monolithic structure. Authentication uses Iron Session 8 with encrypted, cookie-based sessions fingerprinted by IP address and user agent, layered with CSRF tokens and session rotation at the middleware level. The frontend is built with React 19, styled through Tailwind CSS 4, and composed from Radix UI and shadcn primitives, with React Hook Form and TanStack React Query 5 handling forms and data fetching respectively. File storage runs through AWS S3 SDK v3, email delivery through Resend with Handlebars-based templates, video meeting links are generated via the Zoom API, and client-side state is managed with Zustand — the whole platform hosted and observed through Vercel Analytics and Speed Insights.
