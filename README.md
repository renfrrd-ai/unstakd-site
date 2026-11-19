# unstakd.com

Marketing page for [Unstakd](https://github.com/renfrrd-ai/Unstakd). Next.js 16 (App Router),
TypeScript and Tailwind 4, built as a static export (`output: "export"` → `out/`). The colors
are the Terminal Night tokens from Unstakd's `docs/DESIGN.md`, in dark and light.

```bash
pnpm install
pnpm dev     # http://localhost:3100
pnpm check   # typecheck + lint
pnpm build   # writes out/
```

- `src/app/` — layout (fonts, metadata, no-flash theme script), page, `icon.svg`
- `src/components/` — `nav`, `hero` (deploy card + stack strip), `sections` (features, pipeline,
  CLI, architecture, FAQ, closing, footer), `ui` primitives, `icons`, `theme-toggle`

## Deploy (on Unstakd itself)

1. New project from this repo, named e.g. `home` (the name `unstakd` is reserved). Unstakd
   detects a Next.js static export: build `pnpm run build`, output `out`, no container.
2. Domains tab: add `unstakd.com` and `www.unstakd.com`, and set `unstakd.com` as primary
   (www redirects to it).
3. Cloudflare DNS (grey cloud): `A @ → <VPS IP>`. The wildcard `*` record already covers `www`.
