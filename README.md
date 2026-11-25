# unstakd.com

Marketing page for Unstakd. Next.js 16 (App Router),
TypeScript and Tailwind 4, built as a static export (`output: "export"` → `out/`). The look and
tokens match the Unstakd dashboard (`Unstakd.html` / `src/app/globals.css` there), in light and dark.

```bash
pnpm install
pnpm dev     # http://localhost:3100
pnpm check   # typecheck + lint
pnpm build   # writes out/
```

- `src/app/` — layout (fonts, metadata, no-flash theme script), the home page, `docs/` (how to use
  Unstakd), `icon.svg`
- `src/components/` — `nav`, `hero` (dashboard mock + stack strip), `sections` (features, dashboard
  tour, pipeline, CLI, architecture, FAQ, closing, footer), `docs` (doc page parts), `ui` primitives,
  `icons`, `theme-toggle`

## Deploy (on Unstakd itself)

1. New project from this repo, named e.g. `home` (the name `unstakd` is reserved). Unstakd
   detects a Next.js static export: build `pnpm run build`, output `out`, no container.
2. Domains tab: add `unstakd.com` and `www.unstakd.com`, and set `unstakd.com` as primary
   (www redirects to it).
3. Cloudflare DNS (grey cloud): `A @ → <VPS IP>`. The wildcard `*` record already covers `www`.
