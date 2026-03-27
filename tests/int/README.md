# Integration tests (Vitest + Payload)

These specs boot Payload with your real database adapter. **GitHub Actions** runs them on every push/PR using a PostgreSQL service container (after `pnpm payload:migrate`). Locally they run only when `POSTGRES_URL` is set; otherwise the suite is skipped.

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
