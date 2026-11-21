import { GitHubIcon } from "./icons";
import { Button, cx, Glyph, GITHUB_URL, Meter, Pill, RouteChain, Wrap } from "./ui";

type Tone = "cmd" | "ok" | "warn" | undefined;
const LOG: [string, string, Tone?][] = [
  ["12:04:01", "› clone blog @ 4f2a91c", "cmd"],
  ["12:04:03", "› detected Next.js 16 · building with Railpack", "cmd"],
  ["12:05:11", "  image built in 68s (cache hit: deps)"],
  ["12:05:13", "  starting container · 1 vCPU · 512 MB"],
  ["12:05:17", "  waiting for port 3000…", "warn"],
  ["12:05:19", "  ✓ health check passed · 200 in 41ms", "ok"],
  ["12:05:19", "› switched blog.unstakd.com → #42", "ok"],
  ["12:05:49", "  retired #41 (kept for rollback)"],
];
const tone = { cmd: "text-log-cmd", ok: "text-log-ok", warn: "text-log-warn" };
const STEPS = ["Clone", "Build", "Start", "Health", "Switch"];

// A small, static picture of the dashboard: one project card and its live build log.
function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-bg shadow-float" aria-label="The Unstakd dashboard" role="img">
      <div className="flex items-center gap-4 border-b border-border bg-panel px-4 py-3">
        <Glyph className="scale-75" />
        <div className="flex gap-1 text-xs" aria-hidden>
          {["Dashboard", "Projects", "Databases", "Domains"].map((l, i) => (
            <span key={l} className={cx("rounded-full px-2.5 py-1 font-medium", i === 1 ? "bg-panel-2 text-text" : "text-muted max-sm:hidden")}>
              {l}
            </span>
          ))}
        </div>
        <span className="ml-auto rounded-lg bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-ink">New project</span>
      </div>
      <div className="grid gap-3 p-3 sm:grid-cols-[0.85fr_1.15fr] sm:p-4">
        <div className="flex flex-col gap-3.5 rounded-[16px] border border-border bg-panel p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold">blog</span>
            <Pill>Live</Pill>
          </div>
          <RouteChain domain="blog.unstakd.com" app="Next.js 16 · 2m ago" data="blog-pg · Postgres 17" />
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] text-muted">
              <span>CPU · 1 vCPU allocated</span>
              <span className="font-semibold text-text">38%</span>
            </div>
            <Meter percent={38} />
          </div>
          <div className="mt-auto flex justify-end gap-1.5 text-xs">
            <span className="rounded-lg bg-panel-2 px-2.5 py-1.5 font-medium">Logs</span>
            <span className="rounded-lg bg-ink px-2.5 py-1.5 font-semibold text-on-ink">Deploy</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-log-bg text-log-text">
          <div className="flex items-center justify-between gap-2 border-b border-log-border px-4 py-3">
            <div className="flex min-w-0 flex-col">
              <span className="text-[13px] font-semibold">blog · build #42</span>
              <span className="truncate text-[11px] text-log-muted">Add RSS feed</span>
            </div>
            <span className="flex gap-0.5 rounded-lg bg-log-chip p-0.5 text-[11px]">
              <span className="rounded-md bg-log-chip-on px-2 py-0.5">Build</span>
              <span className="px-2 py-0.5 text-log-muted">Runtime</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 px-4 pt-3">
            {STEPS.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--log-ok)_14%,transparent)] px-2 py-0.5 text-[10.5px] text-log-ok">
                <span className="size-1 rounded-full bg-current" />
                {s}
              </span>
            ))}
          </div>
          <div className="overflow-x-auto px-4 pt-3 pb-4 font-mono text-[11px] leading-[1.75]">
            {LOG.map(([time, text, t], i) => (
              <div key={i} className="log-line flex gap-3 whitespace-pre" style={{ animationDelay: `${0.15 + i * 0.28}s` }}>
                <span className="text-log-dim">{time}</span>
                <span className={t ? tone[t] : "text-log-text"}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-52 h-[760px] bg-[radial-gradient(620px_360px_at_75%_45%,var(--glow),transparent_70%)]"
      />
      <Wrap className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-panel px-3 py-1 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-ok-dot" aria-hidden />
            Self-hosted · one VPS · open source
          </span>
          <h1 className="mt-5 mb-5 text-[44px] sm:text-[64px]">
            Push a repo.
            <br />
            <span className="text-accent-text">Get a URL.</span>
          </h1>
          <p className="max-w-[520px] text-base text-soft sm:text-lg">
            Unstakd is a deploy platform you run on your own server. Push to GitHub and your app goes live at{" "}
            <code className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[14px] text-accent-strong">&lt;app&gt;.unstakd.com</code> with HTTPS, instant
            rollbacks and one-click Postgres and Redis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
            <Button size="lg" variant="primary" href={GITHUB_URL}>
              <GitHubIcon className="size-[18px]" />
              View on GitHub
            </Button>
            <Button size="lg" variant="secondary" href="/docs">
              Read the docs
            </Button>
          </div>
          <p className="mt-5 text-[13px] text-muted">No cold starts, no per-seat pricing. Your server, your bill.</p>
        </div>
        <DashboardMock />
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
      <Wrap className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[13px] text-muted">
        {items.map(([k, v]) => (
          <span key={k}>
            <b className="font-semibold text-text">{k}</b> {v}
          </span>
        ))}
      </Wrap>
    </div>
  );
}
