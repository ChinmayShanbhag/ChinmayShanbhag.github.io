## Data Analyst Portfolio

Stack: Next.js App Router + TypeScript, Tailwind CSS, anime.js, Recharts, MDX, ESLint + Prettier

### Setup

- pnpm install
- pnpm dev

### Scripts

- dev: start dev server
- build: build + export static site
- start: run production server
- lint: run ESLint
- format: run Prettier
- typecheck: run TypeScript

### Content

- `content/config.ts`: site name, description, social, analytics ID
- `content/profile.json`: `[Your Name]`, `[Tagline]`, `[Short Bio]`, `[City]`, `[Email]`
- `content/projects.json`: mock projects with fields: slug, title, summary, problem, approach, impact, tech, metrics, images, links
- `content/posts/*.mdx`: MDX posts. Example included

Place `public/resume.pdf` to link Resume in the header and Contact page.

### Pages

- Home: hero, counters, highlight cards
- Work: project cards from JSON and detail page per `slug`
- Dashboards: sample interactive charts
- About: bio, skills, timeline
- Blog: MDX listing and post renderer with inline charts
- Contact: email and links

### Theming

- Light/dark themes with system preference via `next-themes`
- Toggle in navigation

### GitHub Pages

This project is configured for static export. Use GitHub Actions workflow in `.github/workflows/pages.yml` to deploy on push to `main`.

Custom domain: add `CNAME` file in `public/` with your domain and configure in repo settings.
