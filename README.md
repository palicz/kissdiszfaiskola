# Kiss Diszfaiskola

Content-managed website for Kiss Diszfaiskola, built with [Next.js](https://nextjs.org) (App Router) and [Payload CMS](https://payloadcms.com) 3. Hosted on [Vercel](https://vercel.com).

**Deployment:** This project is built and deployed on Vercel only. Container images and Docker Compose files are not maintained in this repository.

## Architecture

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | Next.js 15 (App Router)      |
| CMS              | Payload CMS 3                |
| Database         | PostgreSQL (Vercel Postgres) |
| Media storage    | Vercel Blob                  |
| Rich text editor | Lexical                      |
| Styling          | Tailwind CSS v4              |
| Language         | TypeScript (strict)          |
| Hosting          | Vercel                       |

```
src/
├── app/
│   ├── (frontend)/   # Public routes
│   └── (payload)/    # Payload admin panel
├── access/           # Access-control functions
├── blocks/           # Payload block configs + components
├── collections/      # Collection definitions
├── components/       # Shared React components
├── globals/          # Header, Footer globals
├── hooks/            # Reusable Payload hooks
├── migrations/       # Database migrations
├── plugins/          # Payload plugin configuration
└── utilities/        # Shared helpers
```

## Prerequisites

- **Node.js** >= 20.9.0
- **pnpm** >= 9
- A PostgreSQL database (Vercel Postgres or local)
- Vercel Blob token (for media uploads; optional locally)

## Getting started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local` and fill in the required values.

3. **Run database migrations**

   ```bash
   pnpm payload:migrate
   ```

4. **Start the dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The admin panel is at `/admin` — create the first user on first visit.

## Scripts

| Command                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `pnpm dev`                | Start Next.js development server                  |
| `pnpm build`              | Production build (import map + migrate + Next.js) |
| `pnpm start`              | Start production server                           |
| `pnpm lint`               | Run ESLint                                        |
| `pnpm lint:fix`           | Run ESLint with auto-fix                          |
| `pnpm format`             | Format with Prettier                              |
| `pnpm format:check`       | Verify Prettier formatting (CI)                   |
| `pnpm exec tsc --noEmit`  | TypeScript type-check                             |
| `pnpm generate:types`     | Regenerate `payload-types.ts`                     |
| `pnpm generate:importmap` | Regenerate Payload import map                     |
| `pnpm payload:migrate`    | Run database migrations                           |
| `pnpm test`               | Run all tests (Vitest + Playwright)               |
| `pnpm test:int`           | Run integration tests (Vitest)                    |
| `pnpm test:e2e`           | Run end-to-end tests (Playwright)                 |

After `pnpm install`, a **pre-commit** hook runs automatically via [Husky](https://github.com/typicode/husky): it runs [lint-staged](https://github.com/lint-staged/lint-staged) on staged files only — ESLint with `--fix`, then Prettier. Typecheck and tests stay in CI (and `pnpm test` when you want) so commits stay fast.

## Branch model

This project follows a **GitFlow-light** workflow:

| Branch            | Purpose                           | Deploys to        |
| ----------------- | --------------------------------- | ----------------- |
| `main`            | Production-only, protected        | Production        |
| `develop`         | Integration branch                | Preview / Staging |
| `feature/<scope>` | One concern per branch, small PRs | Preview           |
| `release/<scope>` | Hardening before production merge | Preview           |
| `hotfix/<issue>`  | Emergency production fix          | Production        |

**Flow:** `feature/*` → `develop` → `release/*` → `main`. Hotfixes merge to both `main` and `develop`.

## CI / CD

### GitHub Actions (`.github/workflows/ci.yml`)

Runs on every push to `main` / `develop` and on pull requests targeting those branches:

1. **Format** — Prettier (`format:check`)
2. **Lint** — ESLint
3. **Typecheck** — `tsc --noEmit`
4. **Unit tests** — Vitest with coverage thresholds
5. **Integration tests** — separate job with a PostgreSQL service container and `pnpm test:int` (Drizzle schema push on first connect for an empty DB; see [`tests/int/README.md`](tests/int/README.md))

A full production `build` requires database access and runs on Vercel during deployment, not in GitHub Actions.

### Vercel

- Human commits trigger preview and production deploys.
- Dependabot commits are skipped by `vercel.json` `ignoreCommand` to avoid unnecessary preview builds. CI still validates these PRs.

### Dependabot

- **npm**: weekly, grouped PRs (ESLint excluded from the bulk group).
- **GitHub Actions**: monthly, grouped.
- Next.js minor/major bumps are ignored to prevent Payload peer-dependency breakage. Upgrade manually after verifying compatibility.

## Environment configuration

### Where each environment gets its data

| Environment    | Config source                                | Database                       | Typical use                     |
| -------------- | -------------------------------------------- | ------------------------------ | ------------------------------- |
| **Production** | Vercel Production project settings           | Production Vercel Postgres     | Live site                       |
| **Preview**    | Vercel Preview env (per deployment / branch) | Preview / branch Postgres      | PR and `develop` deploys        |
| **Local**      | `.env.local` (gitignored)                    | Dedicated development Postgres | Day-to-day work on your machine |

Preview deployments use Vercel’s Preview environment variables and a preview database — not your local `.env.local`. Local development should always point at a **separate** dev database so you never run migrations or tests against production.

All required variables are documented in `.env.example`. Copy it to `.env.local` for local work and fill in a dev `POSTGRES_URL`, `PAYLOAD_SECRET`, and optional Blob token.

| Variable                 | Required | Description                             |
| ------------------------ | -------- | --------------------------------------- |
| `POSTGRES_URL`           | Yes      | PostgreSQL connection string            |
| `PAYLOAD_SECRET`         | Yes      | JWT / session encryption key            |
| `NEXT_PUBLIC_SERVER_URL` | No       | Public site URL (defaults to localhost) |
| `CRON_SECRET`            | No       | Bearer token for Payload job endpoints  |
| `PREVIEW_SECRET`         | No       | Live preview URL validation             |
| `BLOB_READ_WRITE_TOKEN`  | No       | Vercel Blob upload token                |

## Migration policy

Database schema changes **must** follow this protocol:

1. **Create the migration** in the same feature branch as the schema change:
   ```bash
   pnpm payload migrate:create
   ```
2. **Commit** the migration file alongside the code change.
3. **Verify** the migration runs successfully on the development database before opening a PR.
4. Migrations must be **incremental** — never bundle unrelated schema changes in one migration.
5. The production build command (`pnpm build`) runs `payload migrate` automatically before `next build`.

## Testing

### Unit / Integration (Vitest)

- **Unit tests** (`tests/unit/`): pure function coverage for access control, URL utilities, and other helpers. No database required.
- **Integration tests** (`tests/int/`): Payload API tests that require a running PostgreSQL instance.

### End-to-end (Playwright)

- **Frontend** (`tests/e2e/frontend.e2e.spec.ts`): homepage rendering and 404 behavior.
- **Admin** (`tests/e2e/admin.e2e.spec.ts`): login, dashboard navigation, page creation.
- Requires a running dev server and database. Configure `PLAYWRIGHT_BASE_URL` if not using the default `http://localhost:3000`.

## Resources

- [Payload CMS documentation](https://payloadcms.com/docs)
- [Next.js documentation](https://nextjs.org/docs)
- [Vercel documentation](https://vercel.com/docs)
