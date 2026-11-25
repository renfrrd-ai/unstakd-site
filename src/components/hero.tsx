import { HeroMock } from "./hero-mock";
import { Item, Stagger } from "./motion";
import { Button, Wrap } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-52 h-[760px] bg-[radial-gradient(620px_360px_at_75%_45%,var(--glow),transparent_70%)]"
      />
      <Wrap className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Stagger now delay={0.05} step={0.09}>
          <Item as="span" className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-panel px-3 py-1 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-ok-dot" aria-hidden />
            Personal platform · one VPS
          </Item>
          <Item as="h1" className="mt-5 mb-5 text-[44px] sm:text-[64px]">
            Push a repo.
            <br />
            <span className="text-accent-text">Get a URL.</span>
          </Item>
          <Item as="p" className="max-w-[520px] text-base text-soft sm:text-lg">
            Unstakd is my personal deploy platform, running on a single server. I push to GitHub and the app goes live at{" "}
            <code className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[14px] text-accent-strong">&lt;app&gt;.unstakd.com</code> with HTTPS, instant
            rollbacks and one-click Postgres and Redis.
          </Item>
          <Item className="mt-8 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
            <Button size="lg" variant="primary" href="/docs">
              Read the docs
            </Button>
            <Button size="lg" variant="secondary" href="#how">
              How it works
            </Button>
          </Item>
          <Item as="p" className="mt-5 text-[13px] text-muted">No cold starts, no per-seat pricing. One server, one bill.</Item>
        </Stagger>
        <HeroMock />
      </Wrap>
    </section>
  );
}

export function StackStrip() {
  const items = [
    ["Builds", "Dockerfile · Railpack · static sites"],
    ["Data", "Postgres · Redis"],
    ["Edge", "Caddy · automatic HTTPS"],
    ["Backups", "Cloudflare R2"],
  ];
  return (
    <div className="border-y border-border bg-panel py-5">
      <Wrap>
        <Stagger now delay={0.6} step={0.07} className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[13px] text-muted">
          {items.map(([k, v]) => (
            <Item as="span" key={k}>
              <b className="font-semibold text-text">{k}</b> {v}
            </Item>
          ))}
        </Stagger>
      </Wrap>
    </div>
  );
}
