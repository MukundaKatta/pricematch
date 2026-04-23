# PriceMatch

> Stop undercharging. Freelancers, we see you.

Tell us the project, the city, the seniority. We tell you what to charge — backed by real industry rates.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Package manager**: pnpm

## Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (waitlist signup) |
| `/try` | Price estimator — project type, complexity, hours → price band |
| `/api/waitlist` | POST `{ email }` → forwards to external waitlist API |

## Deploy

Deploy to [Vercel](https://vercel.com) with zero config. Push to `main` and Vercel auto-deploys.

```bash
vercel --prod
```

## Status

v0 skeleton. Landing page preserved from original static HTML. `/try` uses a hardcoded rate table; no live data yet.
