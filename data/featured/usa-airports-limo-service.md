# USA Airports Limo Service

# One Engine. Every Road.

# A single platform that powers multiple businesses simultaneously — each fully branded, each built to be found, each running without friction in the background.

## The Problem

Limousine service businesses often operate across multiple cities, multiple brand names, and multiple markets at once. For a long time, that meant building and maintaining a separate website for each — different codebases, different deployments, different developers needed every time something changed. The overhead was significant, and it compounded with every new brand added.

At the same time, local search is where these businesses live or struggle. Ranking organically for the right city, the right service, the right keyword is not a minor advantage — it is the difference between a phone that rings and one that doesn't. A platform that couldn't be optimised precisely, at scale, and without constant developer involvement was a platform that would always fall short.

## The Idea

The platform was built around a straightforward premise: one codebase should be able to power any number of distinct businesses, each feeling entirely its own. Different domains, different branding, different content — but a single system behind all of it, managed from one place, deployed once.

That freed the people running these businesses from the operational weight of maintaining separate sites and gave them something more valuable in return: a platform designed from the ground up to perform in local search, capture leads reliably, and scale without friction every time a new client or city came on board.

## How It Works

Each incoming request is resolved to the correct client through Django's Sites Framework — domain maps to site, site maps to a full configuration record holding that client's logo, keywords, contact details, analytics tags, and content. From that single resolution, the platform serves a fully branded website with nothing shared that shouldn't be.

Every page is built for search from the start. Configurable titles, meta descriptions, Open Graph and Twitter Card tags, Schema.org microdata, XML sitemaps with last-modified timestamps, and keyword-based URL routing — all managed through a centralised Django admin without touching code. A full blog engine supports content marketing per site, and a built-in lead capture form stores inquiries per domain, accessible directly in the admin. Google Analytics 4 tags are injected per domain, also managed from the same interface. When a new client needs onboarding, there is no deployment, no code change — it is entirely a data operation.

## The Outcome

A single deployment powers as many client websites as the business requires, each fully branded, each independently optimised for local search, each capturing and storing its own leads. What once demanded separate codebases and separate maintenance for every brand became one system that grows without friction — adding a new client the same way you would update a record, not rebuild a product.

For the businesses it serves, the result is simpler: more visibility, more leads, and far less time spent on the infrastructure behind them.

## Technology

The platform is built on Django 5.1 with Python, served through Gunicorn and deployed on Google Cloud App Engine Flexible with automatic scaling and no server infrastructure to manage directly. PostgreSQL runs on Google Cloud SQL with secure connections handled through the Cloud SQL Auth Proxy, and all static and media assets are stored on Google Cloud Storage via `django-storages` and served globally through CDN — removing the need for Nginx or a dedicated static file server entirely. Secrets including database credentials and storage keys are injected at runtime from Google Cloud Secret Manager, keeping production configuration clean and auditable. Multi-tenancy is handled through Django's Sites Framework, SEO infrastructure is built on Django Sitemaps alongside Schema.org microdata, Open Graph, and Twitter Card tag support, and content is managed through CKEditor within the Django admin. The frontend is built in HTML5, CSS3, and JavaScript with jQuery and Ionicons, environment configuration is managed through `django-environ`, and deployments are automated through GitHub Actions — a platform where every layer was chosen to run quietly, scale effortlessly, and need as little intervention as possible.
