# Developer Portfolio

A modern, single-page developer portfolio built with **Next.js 16**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4**. The design language is a dark terminal/hacker aesthetic — slate-950 backgrounds, blue and emerald accents, monospace typography, and smooth Framer Motion animations.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Components](#components)
  - [TerminalHero](#terminalherotsx)
  - [ProfileSkillsExperience](#profileskillsexperiencetsx)
  - [BentoGrid](#bentogridtsx)
  - [ProjectCard](#projectcardtsx)
- [API Routes](#api-routes)
- [Styling System](#styling-system)
- [Configuration](#configuration)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)

---

## Features

- **Animated terminal hero** — macOS-style terminal window with a multi-phase typewriter animation that simulates loading a developer profile.
- **Live health-check monitoring** — Three featured projects display real-time `online`/`offline` status and latency by polling internal Next.js API routes every 30 seconds.
- **Bento-grid project showcase** — Responsive 3-column grid with variable card spans, tech-stack badges, and optional architecture flow diagrams.
- **Scroll-triggered animations** — Profile, skills, and experience cards animate into view with staggered Framer Motion transitions (fires once per session).
- **Dark terminal theme** — Fully custom design system with CSS custom properties mapped to Tailwind v4 theme tokens.
- **Zero client-side data fetching overhead** — Page assembly is a Server Component; only leaf interactive components carry `'use client'`.
- **Optimised fonts** — Geist Sans and Geist Mono loaded via `next/font/google` (self-hosted, zero layout shift).

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| UI Library | React 19.2.3 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 11 |
| Font | Geist Sans + Geist Mono (via `next/font`) |
| Package Manager | pnpm (workspaces) |
| Linting | ESLint 9 (flat config) + `eslint-config-next` |
| Build | Next.js / SWC |

---

## Project Structure

```
portfolio-main/
├── app/
│   ├── globals.css                  # Tailwind v4 import, design tokens, keyframes
│   ├── layout.tsx                   # Root layout — fonts, <html>, metadata
│   ├── page.tsx                     # Single-page assembly (Server Component)
│   └── api/
│       └── health/
│           ├── auth/route.ts        # Health endpoint → identity-service
│           ├── ecommerce/route.ts   # Health endpoint → e-commerce-platform
│           └── gateway/route.ts     # Health endpoint → api-gateway
├── components/
│   ├── terminal-hero.tsx            # Client — fullscreen terminal animation hero
│   ├── profile-skills-experience.tsx # Client — bio, work history, tech stack
│   ├── bento-grid.tsx               # Server — project grid data + layout
│   └── project-card.tsx             # Client — card UI with live health polling
├── public/                          # Static assets
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mjs                # ESLint flat config
├── postcss.config.mjs               # PostCSS + Tailwind v4 plugin
├── pnpm-workspace.yaml              # pnpm workspace config
└── package.json                     # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **pnpm** 9 or later

```bash
# Install pnpm if you don't have it
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-main

# Install dependencies
pnpm install
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads on file changes.

### Building for Production

```bash
# Type-check, lint, and build
pnpm build

# Start the production server
pnpm start
```

### Linting

```bash
pnpm lint
```

---

## Components

### `terminal-hero.tsx`

**Type:** Client Component (`'use client'`)

Fullscreen hero section that simulates a macOS-style terminal running a developer-profile command. The animation runs through three sequential phases on mount:

| Phase | Description | Timing |
|---|---|---|
| `command` | Types `$ npx execute-developer` character by character | 50 ms/char |
| `executing` | Displays a pulsing `Executing...` status | 1 200 ms hold |
| `output` | Types multi-line output text character by character | 20 ms/char |

A blinking `_` cursor runs on an independent 500 ms interval throughout all phases.

Below the terminal window, a responsive `<h1>Full Stack Developer</h1>` heading and subtitle paragraph are rendered.

---

### `profile-skills-experience.tsx`

**Type:** Client Component (`'use client'`)

Three-card bento section that introduces the developer. Cards animate in via `framer-motion`'s `whileInView` with staggered children — each card fires once when it first enters the viewport.

| Card | Width | Content |
|---|---|---|
| Professional Summary | 2 columns | `> whoami` terminal prompt, bio paragraph, online status badge |
| Work Experience | 1 column (2 rows tall) | Role, employer, period, and bullet-point achievements |
| Tech Stack | 3 columns (full width) | Four skill-category columns with pill badges |

**Tech stack categories:**

- **Backend:** Spring Boot · Laravel · Symfony · Express.js
- **Frontend:** Next.js 15 · React · Tailwind CSS · Inertia.js
- **Database & Infra:** MySQL · MongoDB · Docker · Hetzner VPS
- **Concepts:** RESTful APIs · System Design · AI Orchestration

---

### `bento-grid.tsx`

**Type:** Server Component

Renders the "Featured Projects" section. Holds a static `projects` array and maps each entry to a `<ProjectCard />`. The grid is `grid-cols-1 md:grid-cols-3` with cards spanning 1 or 2 columns.

**Projects:**

| Project | Tech Stack | Health Check | Grid Span |
|---|---|---|---|
| E-Commerce Platform | Spring Boot, PostgreSQL, Redis, RabbitMQ | `/api/health/ecommerce` | 2 col |
| Analytics Engine | Kafka, Apache Spark, Python | — | 1 col |
| Identity Service | Node.js, MongoDB, JWT | `/api/health/auth` | 1 col |
| API Gateway | Go, etcd, gRPC | `/api/health/gateway` | 2 col |
| Web Dashboard | Next.js, TailwindCSS, TypeScript | — | 1 col |

To add or modify a project, edit the `projects` array in [`components/bento-grid.tsx`](components/bento-grid.tsx).

---

### `project-card.tsx`

**Type:** Client Component (`'use client'`)

Reusable card with optional live health-check polling.

**Props:**

```ts
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  architecture?: string;   // Optional single-line flow string, e.g. "A → B → C"
  healthEndpoint?: string; // Optional internal API path to poll
  className?: string;
}
```

**Health polling behaviour:**
- On mount, immediately sends a `HEAD` request to `healthEndpoint`.
- Records `performance.now()` delta as latency in milliseconds.
- Displays a coloured status dot: green (`online`), red (`offline`), grey (`loading`).
- Repeats every **30 seconds** via `setInterval`; the interval is cleared on unmount.
- Cards without a `healthEndpoint` prop render no status panel.

**Hover effect:** Card border transitions from `border-slate-700` to `border-blue-500`.

---

## API Routes

Three internal Next.js Route Handlers that simulate live service health checks. They always return `200 online` and are consumed only by `ProjectCard` components.

### `GET /api/health/auth`

```json
{
  "status": "online",
  "service": "identity-service",
  "timestamp": "2026-03-11T12:00:00.000Z"
}
```

### `GET /api/health/ecommerce`

```json
{
  "status": "online",
  "service": "e-commerce-platform",
  "timestamp": "2026-03-11T12:00:00.000Z"
}
```

### `GET /api/health/gateway`

```json
{
  "status": "online",
  "service": "api-gateway",
  "timestamp": "2026-03-11T12:00:00.000Z"
}
```

All three routes also handle `HEAD` requests (returns `200` with no body) — this is what the 30-second polling loop actually uses to minimise bandwidth.

---

## Styling System

Tailwind CSS v4 is configured CSS-first — there is no `tailwind.config.js`. All design tokens are defined in [`app/globals.css`](app/globals.css) using CSS custom properties inside an `@theme inline` block, which exposes them as Tailwind utility classes.

**Design tokens:**

| Token | CSS Variable | Value | Tailwind class example |
|---|---|---|---|
| Background | `--background` | `#0f172a` (slate-950) | `bg-background` |
| Foreground | `--foreground` | `#e2e8f0` (slate-200) | `text-foreground` |
| Primary | `--primary` | `#3b82f6` (blue-500) | `text-primary` |
| Primary Light | `--primary-light` | `#60a5fa` (blue-400) | `border-primary-light` |
| Accent | `--accent` | `#10b981` (emerald-500) | `text-accent` |
| Accent Light | `--accent-light` | `#34d399` (emerald-400) | `bg-accent-light` |
| Muted | `--muted` | `#64748b` (slate-500) | `text-muted` |
| Border | `--border` | `#1e293b` (slate-800) | `border-border` |

**Global animation classes:**

| Class | Keyframe | Usage |
|---|---|---|
| `.cursor` | `blink` — 1 s, toggles visibility | Blinking `_` in terminal hero |
| `.pulse-dot` | `pulse-dot` — 2 s, opacity 1→0.5→1 | Status indicator dot in profile card |

---

## Configuration

### `next.config.ts`

Currently default (no custom configuration). Add image domains, redirects, headers, or experimental flags here as needed.

### `tsconfig.json`

Key settings:
- `strict: true` — all TypeScript strict checks enabled.
- `paths: { "@/*": ["./*"] }` — absolute import alias. Use `@/components/...` or `@/app/...` anywhere in the project.
- `moduleResolution: "bundler"` — optimised for Next.js / SWC bundler resolution.

### `eslint.config.mjs`

ESLint 9 flat config extending:
- `eslint-config-next/core-web-vitals` — performance and accessibility rules.
- `eslint-config-next/typescript` — TypeScript-aware rules.

---

## Customization Guide

### Update personal information

| What to change | Where |
|---|---|
| Site title and meta description | [`app/layout.tsx`](app/layout.tsx) — `export const metadata` |
| Hero subtitle text | [`components/terminal-hero.tsx`](components/terminal-hero.tsx) — `outputText` constant and `<p>` subtitle |
| Bio / `> whoami` text | [`components/profile-skills-experience.tsx`](components/profile-skills-experience.tsx) — Card 1 paragraph |
| Work experience | [`components/profile-skills-experience.tsx`](components/profile-skills-experience.tsx) — Card 2 |
| Tech stack skills | [`components/profile-skills-experience.tsx`](components/profile-skills-experience.tsx) — Card 3 `skillCategories` array |
| Footer social links | [`app/page.tsx`](app/page.tsx) — replace `href="#"` with your actual URLs |
| Footer contact email | [`app/page.tsx`](app/page.tsx) — replace `hello@example.com` |

### Add or modify a project

Edit the `projects` array in [`components/bento-grid.tsx`](components/bento-grid.tsx):

```ts
{
  id: 6,
  title: "My New Project",
  description: "Short description of what it does.",
  techStack: ["Rust", "WebAssembly"],
  architecture: "Client → WASM Module → Rust Core",
  healthEndpoint: "/api/health/my-service",  // optional
  colSpan: 1,
},
```

If you add a `healthEndpoint`, create a matching route handler at `app/api/health/my-service/route.ts` following the pattern of the existing health routes.

### Change the colour scheme

Update the CSS custom properties in the `:root` block inside [`app/globals.css`](app/globals.css). The `@theme inline` block below it automatically maps them to Tailwind utility classes.

---

## Deployment

### Vercel (recommended)

The fastest way to deploy is [Vercel](https://vercel.com/new):

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import the project in the Vercel dashboard.
3. Vercel auto-detects Next.js — click **Deploy**.

No environment variables are required; the health API routes are self-contained.

### Other Node.js hosts

```bash
pnpm build
pnpm start          # starts on port 3000 by default
```

Set the `PORT` environment variable to override the port.

### Self-hosted with Docker

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

> **Note:** Add `output: 'standalone'` to `next.config.ts` to enable the standalone build used by the Dockerfile above.

---

## License

This project is open source. Feel free to use it as a starting point for your own portfolio.

