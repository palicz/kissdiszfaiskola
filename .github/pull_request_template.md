## Summary

<!-- What changed and why? Link related issues if applicable. -->

## Pre-merge checklist

- [ ] `pnpm format:check`, `pnpm lint`, and `pnpm exec tsc --noEmit` pass (or CI is green)
- [ ] No unrelated changes included
- [ ] Schema / migration changed? `pnpm generate:types` run, migration committed, verified on dev DB
- [ ] Environment variables changed? `.env.example` updated
