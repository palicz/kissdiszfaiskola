# Kiss Díszfaiskola

A honlap [Next.js](https://nextjs.org) App Routerrel és [Payload CMS](https://payloadcms.com) 3-mal épül: tartalomkezelés, média (Vercel Blob), Postgres (Neon / Vercel Postgres adapter).

## Fejlesztés

1. Függőségek: `pnpm install`
2. Környezet: másold `.env.example` → `.env` vagy `.env.local`.
3. Indítás: `pnpm dev` → [http://localhost:3000](http://localhost:3000)

Admin: `/admin` — első felhasználó létrehozása után érhető el.

## Scriptek

| Parancs                | Leírás                               |
| ---------------------- | ------------------------------------ |
| `pnpm dev`             | Next dev szerver                     |
| `pnpm build`           | Production build                     |
| `pnpm lint`            | ESLint                               |
| `pnpm generate:types`  | Payload típusok (`payload-types.ts`) |
| `pnpm payload:migrate` | DB migrációk (Postgres)              |
| `pnpm test`            | Vitest + Playwright                  |

## Folyamat (branch → éles)

1. **Lokálisan:** `pnpm dev`, változtatás, `pnpm lint` + `pnpm exec tsc --noEmit` (és ha kell séma: `pnpm generate:types`, migráció: `pnpm payload:migrate`).
2. **Commit → push → PR:** a GitHubon **CI** lefut (lint + TypeScript).
3. **Vercel:** a saját branchjeid / feature PR-jeidhez **Preview** URL; `main` merge után **Production**. A **Dependabot** commitokra nem fut Vercel build ([`vercel.json`](vercel.json) — sorban állás / felesleges preview elkerülése); a GitHub **CI** továbbra is lefut a PR-en.
4. **Séma változásnál** a migrációkat commitold; élesen a build előtt/után fusson a `payload migrate` (Vercel **Build Command** / **Deploy Hook** / külön job — ezt érdemes külön beállítani).

## CI

A [`.github/workflows/ci.yml`](.github/workflows/ci.yml) minden `main`/`master` pushra és PR-re fut: `pnpm lint`, `tsc --noEmit`. Manuálisan: **Actions → CI → Run workflow**. A teljes `pnpm build` és a DB-t igénylő `pnpm test:int` nincs a CI-ban alapból (env / Postgres kellene); helyben futtasd őket merge előtt.

[Dependabot](.github/dependabot.yml): heti **egy** összevont npm PR (csoportosítva), havi GitHub Actions — kevesebb PR, kevesebb zaj. A **`next`** automatikus **minor/major** Dependabot bumpja ki van zárva (a `@payloadcms/next` peer deklarációja hivatalosan még `<15.5.0` vagy a 16.2 canary ág); a repóban **`pnpm.peerDependencyRules.allowedVersions`** engedi a **Next 15.5.x** + Payload 3.79 együttállást. Ha a Payload frissül és a peer range bővül, ez a szabály eltávolítható.

### `main` branch védelem (ajánlott)

A GitHub figyelmeztetése („Your main branch isn't protected”) — érdemes bekapcsolni:

1. Repo **Settings → Rules → Rulesets** (vagy **Branches → Branch protection rule**).
2. **Add rule** / **Add branch ruleset** — cél: `main`.
3. Kapcsold be: **Require a pull request before merging** (opcionálisan review), **Require status checks to pass** — a listában a **zöld CI** után megjelenő nevet add meg (tipikusan **`CI / lint-and-typecheck`** vagy **`lint-and-typecheck`**). Ne olyan nevet várj, ami sosem jelenik meg („Expected — Waiting…”) — a GitHub a **job azonosító** (`lint-and-typecheck`) alapján is listázhat, nem a `name: Lint & TypeScript` felirat alapján.
4. Opcionális: **Do not allow bypassing the above settings** (admin kivétel nélkül).

Így nem lehet véletlenül zöld CI nélkül merge-elni a `main`-re.

Payload dokumentáció: [payloadcms.com/docs](https://payloadcms.com/docs)
