# Genesis Engine

# When the Work Runs Itself

# An autonomous content engine that turns raw signals into publication-ready stories — continuously, without waiting to be told.

## The Problem

Content teams are not short of ideas. They are short of time.

For digital publishers managing multiple topic verticals at once — monitoring sources, filtering what matters, drafting, editing, optimising, and repeating — the work never stops. Each piece of content requires attention. Each new brief pulls someone away from the last one. Over time, the volume demanded by modern publishing simply outpaces the capacity of the people doing the work.

Genesis Engine began as a response to that reality. Not to replace the human judgement behind great content, but to take on everything that exhausts it — the constant watching, sifting, and drafting that fills the hours before the real thinking can begin.

## The Idea

The core belief behind Genesis Engine was simple: a well-designed system should be able to do the repetitive work so people can focus on the meaningful work.

That meant building a pipeline that could watch the web, understand what was relevant, form original ideas, and write — all without waiting to be told. Not a tool that assists when prompted, but one that works continuously in the background, turning raw signals into publication-ready content while the team focuses elsewhere.

The challenge was not just automation. It was intelligence. Any system can collect and repeat. The harder task was building something that could read context, assign meaning, generate ideas with genuine variety, and produce writing worth publishing — all through a structured, reliable process that holds its shape at scale.

## How It Works

Genesis Engine runs as a four-stage pipeline, each stage feeding naturally into the next.

It begins with feed ingestion — RSS and Atom sources polled every two minutes, articles extracted and stored as the raw material for everything that follows. Every ten minutes, each new article is passed through AI analysis: scored for relevance, summarised, dated, and routed to the right content vertical based on meaning, not just keywords. Only the strongest pieces — those scoring above 0.6 — move forward.

From there, the system shifts from analysis to imagination. Every hour, the most recent high-scoring articles within each vertical are reviewed and used to generate original content ideas: how-to guides, trend pieces, opinion angles — diverse in form, scored by audience impact, and checked against what has already been approved. The ideas that earn their place then become full articles: structured, SEO-ready, over fifteen hundred words, complete with social copy, a video transcript, and a two-speaker podcast script — all generated in a single pass and validated before they ever reach a human editor.

The people in that process are not removed. They are repositioned. Approval gates sit between ideation and publication, keeping human judgement at the centre of what goes out — while removing the hours of groundwork that came before.

## The Outcome

A publisher can configure their verticals once. From that point, Genesis Engine runs — ingesting, analysing, ideating, and writing — continuously, without prompting, without pause.

What changes is not just efficiency. It is what becomes possible. Teams that once spent most of their time sourcing and drafting can spend it editing, deciding, and building relationships with their readers. The system handles the volume. The people handle the quality.

That is the work Genesis Engine was built to do — not to produce content for its own sake, but to give the people behind a publication the space to do their best work.

## Technology

Genesis Engine is built on Django 5.2, running a Python backend that forms the operational core of the entire pipeline. All AI analysis, ideation, and article generation runs through Google Gemini 2.5 Flash via the google-genai SDK — with every response schema-validated using Pydantic v2 to ensure structured, predictable output at each stage. Asynchronous workloads are handled by Celery 5.5 workers scheduled through Celery Beat, with Redis serving as both the message broker and cache layer. Article content is extracted from RSS and Atom feeds using feedparser, feedfinder2, newspaper3k, and BeautifulSoup4, while the application is served through Gunicorn and Uvicorn behind an Nginx reverse proxy with SSL termination. Data is stored in PostgreSQL, static and media assets are managed through AWS S3 via django-storages, and the entire system is containerised with Docker Compose — running the Django app, Celery worker, Celery Beat scheduler, and Nginx as separate, independently scalable services.
