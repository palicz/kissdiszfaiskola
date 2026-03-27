# Integration tests (Vitest + Payload)

These specs boot Payload with your real database adapter. **GitHub Actions** runs them on every push/PR against an empty PostgreSQL service container. On first connect, Payload applies the Drizzle **dev schema push** (because `NODE_ENV` is not `production`), which creates core tables such as `payload_folders` and `pages`. Incremental SQL migrations are **not** run in that job: they assume a database that already matches prior deploys, while CI starts from an empty database. Locally, use a dev database and run `pnpm payload:migrate` when you change schema. The suite runs only when `POSTGRES_URL` is set; otherwise it is skipped.

## Required environment

| Variable         | Purpose                      |
| ---------------- | ---------------------------- |
| `POSTGRES_URL`   | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Required by Payload config   |

Copy from [`.env.example`](../../.env.example) or use `.env.local`.

## Run locally

```bash
pnpm test:int
```

If `POSTGRES_URL` is unset, the API suite is skipped (see `api.int.spec.ts`).
