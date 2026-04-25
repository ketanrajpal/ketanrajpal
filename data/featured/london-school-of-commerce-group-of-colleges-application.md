# London School of Commerce Group of Colleges Application

# Every Student, Seen

# A bespoke admissions platform that replaced the chaos of disconnected tools with one clear, end-to-end view of every person walking through the door.

## The Problem

A student's journey through higher education begins long before their first lecture. It begins with an enquiry, an application, a document uploaded late at night, a question sent and waiting for an answer. For admissions teams at LSC Group of Colleges, managing that journey across spreadsheets, inboxes, and disconnected tools meant that too much time was spent chasing information that should have been findable in seconds.

There was no single view of a student. No reliable way to track where an application stood, who had reviewed it, or what came next. Compliance demands were growing. Reporting was difficult. And the people working hardest to support students were spending their energy on process rather than people.

## The Idea

The belief behind the LSC CRM was straightforward: every person who applies to a college deserves a process that takes them seriously. That means clear stages, honest communication, and a system that keeps nothing hidden — not from the staff managing it, not from the compliance teams auditing it, and not from the students living through it.

Building that meant designing something that could hold the full complexity of an admissions operation without becoming complicated to use. A platform configurable enough to adapt to different colleges, cohorts, and partner groups — but consistent enough that anyone working within it always knew exactly where they stood.

## How It Works

The platform follows a student from their first point of contact to the moment their account is live on the college's learning system. Applications arrive linked to specific cohorts and partner groups, then move through configurable stages — screening, assessment, interview, enrolment — each tracked through a full audit trail so nothing is ever lost or disputed.

Screening questionnaires and online examinations, including proctored assessments with webcam snapshot verification, sit within the same workflow. Interview scheduling, offer letter generation, and enrolment status tracking follow in sequence. Student profiles collect the full picture — demographics, prior education, disability information, Student Finance data, and supporting documents stored securely on AWS S3 — while duplicate detection prevents the kind of quiet errors that create larger problems later.

When a student is enrolled, their Moodle account is provisioned automatically. No manual handover, no delay. Admissions staff communicate through automated transactional email, compliance teams navigate a complete stage audit log, and reporting across every college, cohort, and partner group is available from a single deployment — in Excel, CSV, or ODS, as needed.

## The Outcome

Admissions staff gained something that had been missing: one place where the entire applicant journey lived. Time spent searching across systems became time spent supporting students. Remote applicants could complete proctored assessments without travelling in. Manual account creation on enrolment disappeared. And for the compliance and audit teams, full visibility into every stage of every application was no longer something to chase — it was simply there.

The platform continues to run across multiple colleges simultaneously, handling the quiet, essential work of connecting people to the education they came for.

## Technology

The CRM is built on Django 4.1 with Python 3.9, deployed to AWS Elastic Beanstalk with automated database migrations on every release. PostgreSQL serves as the primary database via `psycopg2`, with file storage — including proctoring snapshots and student documents — handled through AWS S3 using `django-storages` and `boto3`. Transactional email runs through AWS SES via `django-ses`, and JWT-based API endpoints built with Django REST Framework power the companion front-end application. Authentication combines Django's built-in system with a custom email backend and `PyJWT` for token handling, while Moodle integration automates student account provisioning on enrolment. Data import and export across Excel, CSV, and ODS formats is managed through `django-import-export` with Pandas, NumPy, and OpenPyXL handling the underlying processing. The frontend is styled with SASS via `django-sass-processor`, rich text editing is provided by CKEditor, and error tracking and performance monitoring run through the Sentry SDK — with CORS headers, HTTPS-only enforcement, and secure session and CSRF cookies forming the security baseline throughout.
