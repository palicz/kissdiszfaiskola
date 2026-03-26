# Integration tests (Vitest + Payload)

These specs boot Payload with your real database adapter. They are **optional in CI** unless `POSTGRES_URL` is configured.

## Required environment

| Variable        | Purpose                          |
|-----------------|----------------------------------|
| `POSTGRES_URL`  | PostgreSQL connection string     |
| `PAYLOAD_SECRET`| Required by Payload config       |

Copy from [`.env.example`](../../.env.example) or use `.env.local`.

## Run locally

```bash
pnpm test:int
```

If `POSTGRES_URL` is unset, the API suite is skipped (see `api.int.spec.ts`).
