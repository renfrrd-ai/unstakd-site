# unstakd.com

Marketing page for [Unstakd](https://github.com/renfrrd-ai/Unstakd). Plain HTML and CSS in
`public/`, with no build step or dependencies. The colors are the Terminal Night tokens from Unstakd's
`docs/DESIGN.md`, in dark and light.

## Preview locally

```bash
python3 -m http.server 4321 -d public   # http://localhost:4321
```

## Deploy (on Unstakd itself)

1. New project from this repo, named e.g. `home` (the name `unstakd` is reserved).
   With no `package.json`, Unstakd detects a static site with output directory `public`.
2. Domains tab: add `unstakd.com` and `www.unstakd.com`, and set `unstakd.com` as primary
   (www redirects to it).
3. Cloudflare DNS (grey cloud): `A @ → <VPS IP>`. The wildcard `*` record already covers `www`.
