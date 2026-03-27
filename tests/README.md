# Test layout

| Path       | Runner               | Purpose                                                                                                                                 |
| ---------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `unit/`    | Vitest (jsdom)       | Fast, isolated tests for utilities, hooks, access, and small components. **Runs in CI.**                                                  |
| `int/`     | Vitest (same config) | Boots Payload against a **real** Postgres URL. Skips when `POSTGRES_URL` is unset. **Runs in CI** when GitHub Secrets are configured.    |
| `e2e/`     | Playwright           | Browser tests; `webServer` runs `pnpm dev`. **Not in CI** by default.                                                                   |
| `helpers/` | Playwright           | `login.ts`; `seedUser.ts` calls **`/api/e2e-test-user`** (requires `E2E_SETUP_SECRET`).                                                  |

## Environments and databases

| Environment      | Where `POSTGRES_URL` / secrets live                                      |
| ---------------- | ------------------------------------------------------------------------- |
| **Development**  | **`.env.local`** on your machine (typical for local `pnpm dev` / tests). |
| **Vercel Preview** | Vercel project → Environment Variables → Preview.                    |
| **Vercel Production** | Vercel → Production.                                                |
| **GitHub Actions** | Repository **Secrets** (`POSTGRES_URL`, `PAYLOAD_SECRET` for Preview DB). |

Vitest loads **`.env`** then **`.env.local`** (overrides). Playwright config does the same so `pnpm test:e2e` sees the same vars as `pnpm dev`.

## Commands

```bash
pnpm test:unit    # unit only (+ coverage thresholds)
pnpm test:int     # integration; skipped when POSTGRES_URL missing locally
pnpm test:e2e     # Playwright (needs DB, .env.local, E2E_SETUP_SECRET)
pnpm test         # unit + int
pnpm test:all     # unit + int + e2e
```

## Integration tests (`int/`)

`api.int.spec.ts` uses `describe.skipIf(!hasDatabase)` when `POSTGRES_URL` is empty. With `POSTGRES_URL` and `PAYLOAD_SECRET` in `.env.local`, tests run against your **development** database.

**CI** uses the same variables from **GitHub Secrets** (usually your **Preview** DB URL + matching `PAYLOAD_SECRET`). That is separate from local `.env.local`; do not commit secrets.

## End-to-end (`e2e/`)

1. Set **`POSTGRES_URL`**, **`PAYLOAD_SECRET`**, and **`E2E_SETUP_SECRET`** (any long random string) in **`.env.local`**. Copy the same `E2E_SETUP_SECRET` value — nothing else — it is checked by `POST /api/e2e-test-user` and `DELETE /api/e2e-test-user`.
2. Run **`pnpm test:e2e`** (or `pnpm test:all`). The dev server must be able to boot Payload (migrations applied, no schema drift).

Admin tests use **`/api/e2e-test-user`** to create/delete the user inside the Next process (avoids loading Payload from Playwright’s Node context). If `E2E_SETUP_SECRET` is unset, the route returns **404** and the app is unchanged.

## Build and migrations (Vercel)

`pnpm build` runs **`payload generate:importmap`**, **`payload migrate`**, then **`next build`**. There is **no** skip-migrations-on-Preview logic in this repo: each Vercel environment should use its own **`POSTGRES_URL`** so Preview and Production apply migrations to the correct database.

## `test.env`

This file is only for tooling that reads it explicitly (e.g. editor `NODE_OPTIONS`). It is **not** the primary place for `POSTGRES_URL` — use **`.env.local`**.
