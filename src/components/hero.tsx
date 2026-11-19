import { GitHubIcon } from "./icons";
import { Button, GITHUB_URL, LivePill, Wrap } from "./ui";

type Tone = "cmd" | "ok" | "warn" | undefined;
const LOG: [string, string, Tone?][] = [
  ["12:04:01", 'push main@4f2a91c · "Add RSS feed"', "cmd"],
  ["12:04:02", "Cloning blog @ 4f2a91c"],
  ["12:04:03", "Detected Next.js 16 · building with Railpack"],
  ["12:05:11", "Image built in 68s (cache hit: deps)"],
  ["12:05:13", "Starting container · 1 CPU · 512 MB"],
  ["12:05:17", "Waiting for port 3000…", "warn"],
  ["12:05:19", "Health check passed · 200 in 41ms", "ok"],
  ["12:05:19", "Switched blog.unstakd.com → #42", "ok"],
  ["12:05:49", "Retired #41 (kept for rollback)"],
  ["12:05:49", "Deploy finished", "ok"],
];
const tone = { cmd: "text-text", ok: "text-accent-text", warn: "text-warn" };
const STEPS = ["clone", "build", "start", "health", "switch", "retire"];

function DeployCard() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-panel shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)]">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <LivePill />
        <span className="font-mono text-[13px] font-medium text-accent-text">blog.unstakd.com</span>
        <span className="ml-auto hidden font-mono text-xs text-dim sm:inline">#42 · main@4f2a91c · 1m 18s</span>
      </div>
      <div className="grid grid-cols-3 gap-x-1.5 gap-y-2.5 px-5 pt-3.5 pb-1 sm:grid-cols-6" aria-hidden>
        {STEPS.map((s) => (
          <span key={s} className="border-t-[3px] border-accent pt-2 font-mono text-[11px] text-muted">
            {s}
          </span>
        ))}
      </div>
      <div role="log" aria-label="Example deploy log" className="m-3.5 overflow-x-auto rounded-[10px] bg-log-bg px-[18px] py-4 font-mono text-[12.5px] leading-[1.8] text-soft">
        {LOG.map(([time, text, t], i) => (
          <div key={i} className="log-line whitespace-pre" style={{ animationDelay: `${0.1 + i * 0.25}s` }}>
            <span className="mr-3 text-dim">{time}</span>
            <span className={t ? tone[t] : undefined}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-14 sm:pt-[88px] sm:pb-[72px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-52 h-[700px] bg-[radial-gradient(600px_340px_at_72%_40%,var(--glow),transparent_70%)]"
      />
      <Wrap className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <span className="inline-flex rounded-full border border-border-strong px-2.5 py-[3px] font-mono text-xs font-semibold text-muted">
            self-hosted · one VPS · open source
          </span>
          <h1 className="mt-5 mb-[22px] text-[42px] sm:text-[64px]">
            Push a repo.
            <br />
            <em className="not-italic text-accent-text">Get a URL.</em>
          </h1>
          <p className="max-w-[520px] text-base text-soft sm:text-lg">
            Unstakd is a deploy platform you run on your own server. Push to GitHub and your app goes live at{" "}
            <code className="font-mono text-[15px] text-accent-text">https://&lt;app&gt;.unstakd.com</code> with HTTPS, instant rollbacks and
            one-click Postgres and Redis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
            <Button size="lg" href={GITHUB_URL}>
              <GitHubIcon className="size-[18px]" />
              View on GitHub
            </Button>
            <Button size="lg" variant="secondary" href="#how">
              How it works
            </Button>
          </div>
          <p className="mt-5 text-[13px] text-muted">No cold starts, no per-seat pricing. Your server, your bill.</p>
        </div>
        <DeployCard />
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
    <div className="border-y border-border py-[22px]">
      <Wrap className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[13px] text-muted">
        {items.map(([k, v]) => (
          <span key={k}>
            <b className="font-medium text-soft">{k}</b> {v}
          </span>
        ))}
      </Wrap>
    </div>
  );
}
