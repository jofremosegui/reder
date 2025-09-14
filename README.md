# Reder

A minimal, local-first real-estate search MVP. Starts with a **Next.js** app and a **mock API** (no external services), and can grow into a multi-service monorepo (web, API, workers, infra).

## Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Repository Structure](#repository-structure)
* [Getting Started](#getting-started)
* [Apps](#apps)

  * [apps/web (Next.js)](#appsweb-nextjs)

    * [Scripts](#scripts)
    * [Folder walkthrough](#folder-walkthrough)
    * [Environment variables](#environment-variables)
    * [Common tasks](#common-tasks)
* [Development Workflow](#development-workflow)
* [Adding New Modules](#adding-new-modules)
* [Conventions](#conventions)
* [Troubleshooting](#troubleshooting)
* [Roadmap](#roadmap)
* [License](#license)

---

## Overview

This repo hosts **Reder**, a student-friendly housing portal prototype. The current MVP is a single Next.js app with a built-in API route that serves mock listings. The design deliberately mirrors a monorepo so more apps (API, workers) can be added without restructuring.

## Tech Stack

* **Frontend**: Next.js 14 (App Router), React 18, TypeScript
* **Styling**: Tailwind CSS v4 (+ `@tailwindcss/postcss`)
* **API (mock)**: Next.js Route Handler at `/api/listings`
* **Node**: Recommended **v20 LTS** (via `nvm`)

---

## Repository Structure

```
reder/
├─ apps/
│  └─ web/                    # Next.js 14 app (UI + mock API)
│     ├─ app/                 # App Router pages, layouts, API routes
│     │  ├─ api/
│     │  │  └─ listings/
│     │  │     └─ route.ts    # Mock listings endpoint (GET /api/listings)
│     │  ├─ layout.tsx        # Root layout (imports Tailwind CSS)
│     │  ├─ page.tsx          # Home page (search UI)
│     │  └─ globals.css       # Tailwind entry + global styles
│     ├─ components/          # Reusable UI components
│     │  ├─ ListingCard.tsx
│     │  └─ SearchBar.tsx
│     ├─ postcss.config.js    # Uses @tailwindcss/postcss + autoprefixer
│     ├─ package.json
│     ├─ next.config.js
│     └─ tsconfig.json
├─ .gitignore                 # Ignores node_modules, .next, envs, etc.
└─ README.md
```

> Planned (not yet in repo):
> `apps/api` (FastAPI), `apps/worker` (ingestion/scrapers), `infra/` (docker-compose, db).

---

## Getting Started

### Prerequisites

* **Node.js 20 LTS** (recommended via `nvm`)
* Git

```bash
# Install nvm (macOS via Homebrew)
brew install nvm
mkdir -p ~/.nvm
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"' >> ~/.zshrc
exec zsh

# Use Node 20
nvm install 20
nvm use 20
```

### Run the web app (local)

```bash
cd apps/web
npm install
npm run dev
# open http://localhost:3000
```

---

## Apps

### apps/web (Next.js)

A single Next.js app that:

* Renders a basic search UI (query, city, min/max price).
* Serves a **mock** listings endpoint at `/api/listings` (in-memory array).

#### Scripts

Run from `apps/web`:

| Script          | What it does                                          |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Starts Next.js dev server at `http://localhost:3000`. |
| `npm run build` | Production build (`.next/`).                          |
| `npm run start` | Runs the built app in production mode.                |

#### Folder walkthrough

* `app/page.tsx`
  Home page. Fetches `/api/listings` and renders cards. Wires up the SearchBar filters.

* `app/layout.tsx`
  Root layout. Imports Tailwind CSS from `app/globals.css` and renders a sticky header + container.

* `app/globals.css`
  Tailwind v4 entry:

  ```css
  @import "tailwindcss";
  ```

  * tiny global tweaks.

* `app/api/listings/route.ts`
  The mock API (`GET /api/listings`). Filters on:

  * `q` → case-insensitive substring match on `title`
  * `city` → case-insensitive exact match
  * `min_price`, `max_price` → numeric filters on `price_eur`

  Example:

  ```
  /api/listings?city=Barcelona&min_price=1000&max_price=1200
  ```

* `components/SearchBar.tsx`
  Controlled inputs for query, city, min/max; calls `onSearch()`.

* `components/ListingCard.tsx`
  Simple card view (title, city, price, image placeholder).

* `postcss.config.js`
  Tailwind v4 PostCSS plugin:

  ```js
  module.exports = {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  };
  ```

* `tsconfig.json`
  Standard Next.js TS config.
  *Optional alias* (if you want `@/components/...`):

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": { "@/*": ["./*"] }
    }
  }
  ```

* `next.config.js`
  Project-wide Next.js options (currently empty).

#### Environment variables

Currently **none required** for local mock data.

Planned vars as we add services:

```
NEXT_PUBLIC_API_URL=http://localhost:8000      # when we split the API out
DATABASE_URL=postgresql+psycopg://app:app@localhost:5432/reder
REDIS_URL=redis://localhost:6379/0
```

#### Common tasks

* **Edit mock data:** in `app/api/listings/route.ts` (array `DB`).
* **Make search accent-insensitive:** use a normalizer:

  ```ts
  const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  // then use norm() in filters
  ```
* **Dark mode:** already supported via Tailwind classes; add a toggle later.

---

## Development Workflow

1. **Branching**

   * `main` is protected.
   * Feature branches: `feat/<topic>`; bugfix: `fix/<topic>`.

2. **Commit style**

   * Conventional commits (suggested): `feat:`, `fix:`, `chore:`, `docs:`, etc.

3. **Pull requests**

   * Keep PRs small and focused.
   * Include a short “What/How to test” in the description.

4. **Code style**

   * (Planned) ESLint/Prettier config shared via `/packages/config`.

---

## Adding New Modules

* **New page (web)**
  Create `apps/web/app/<route>/page.tsx`.

* **New API endpoint (web mock)**
  Create `apps/web/app/api/<name>/route.ts` and export `GET/POST` handlers.

* **New app (future)**
  Create `apps/api` (e.g., FastAPI), `apps/worker`, and wire with Docker under `/infra`. The repo layout already anticipates this.

---

## Conventions

* **File naming**: PascalCase for components (`ListingCard.tsx`), `kebab-case` for routes.
* **Styling**: Tailwind classes in JSX; extract repetitive styles into small components.
* **Env files**: never commit `.env`. Use `.env.example` to document needed keys.
* **Images**: For mock data, we use placeholder images (picsum). Replace with real URLs once scraping/ingestion exists.

---

## Troubleshooting

* **`npm: command not found`**
  `nvm` not loaded. Run:

  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"
  nvm use 20
  ```

* **Next.js config error about `next.config.ts`**
  Use `next.config.js` (JS or MJS). TS config files aren’t supported in this setup.

* **Tailwind v4 PostCSS plugin error**
  Ensure `postcss.config.js` uses `@tailwindcss/postcss` (not `tailwindcss` directly) and that `autoprefixer` is installed.

* **Module not found `@/components/...`**
  Add TS paths in `tsconfig.json` (see above) **or** use relative imports (`../components/...`).

* **Port already in use (3000)**
  Kill the process or run `PORT=3001 npm run dev`.

* **GitHub not showing code**
  Add origin and push:

  ```bash
  git remote add origin https://github.com/<USER>/reder.git
  git push -u origin main
  ```

---

## Roadmap

* **Design system**: extract shared UI components to `packages/ui`.
* **Real backend**: `apps/api` (FastAPI), Postgres (PostGIS), Alembic migrations.
* **Background jobs**: `apps/worker` for ingestion/enrichment.
* **Docker**: `/infra/docker-compose.yml` for one-command local stack.
* **CI**: Lint/build checks on PRs.
* **Auth**: NextAuth (credentials or OAuth) for favorites/saved searches.

---

## License

Choose one and add a `LICENSE` file (MIT recommended for open projects).
