import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  BellIcon,
  ChartIcon,
  DatabaseIcon,
  GitIcon,
  GlobeIcon,
  LayoutIcon,
  PreviewIcon,
  ShieldCheckIcon,
  ShieldIcon,
  UndoIcon,
} from "./icons";
import { Grow, Item, Pop, Reveal, Stagger } from "./motion";
import { Brand, Button, Card, cx, DASHBOARD_URL, GITHUB_URL, Meter, Pill, Section, SectionHead, Wrap } from "./ui";

const Code = ({ children }: { children: ReactNode }) => <code className="rounded-md bg-sunken px-1 font-mono text-[13px] text-soft">{children}</code>;

const FEATURES: [ComponentType<SVGProps<SVGSVGElement>>, string, ReactNode][] = [
  [GitIcon, "Git push deploys", "A signed GitHub webhook queues a build for every push to your branch. Dockerfile if you have one, Railpack if you don't."],
  [ShieldCheckIcon, "Failures never go live", "The new container has to pass a health check before traffic moves. If the build or the check fails, the current version keeps serving."],
  [UndoIcon, "Instant rollbacks", "Every deploy keeps its image. Rolling back skips the rebuild and is live in about two seconds."],
  [DatabaseIcon, "One-click Postgres & Redis", <>Link a database and <Code>DATABASE_URL</Code> is injected for you. Nightly backups go to R2, and you can restore with one click.</>],
  [GlobeIcon, "Domains with HTTPS", "Every app gets a free subdomain. To add your own domain, set the DNS record Unstakd shows you; it checks the record and issues the certificate."],
  [PreviewIcon, "Preview deploys", <>Every pull request gets its own URL at <Code>pr-12-app.unstakd.com</Code>. It&apos;s removed when the PR closes.</>],
  [LayoutIcon, "Static sites", "Next.js static export, Vite, Astro or plain HTML. Static sites are built in a throwaway container and served straight from Caddy, so no app container keeps running."],
  [ChartIcon, "Logs & metrics", "Build logs stream as they happen. Runtime logs come straight from Docker, and each app has 24-hour CPU and memory charts."],
  [BellIcon, "Alerts", "Failed deploys, crash loops and failed backups go to Discord or any webhook."],
];

export function Features() {
  return (
    <Section id="features">
      <Wrap>
        <SectionHead eyebrow="Features" title="What you'd get from a hosted platform, on a server you control.">
          Git push deploys, preview URLs, databases and backups in one dashboard, all running on a single VPS.
        </SectionHead>
        <Stagger step={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([Icon, title, body]) => (
            <Item key={title} lift>
              <Card className="h-full shadow-card">
                <div className="mb-[18px] grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-strong">
                  <Icon className="size-[18px]" />
                </div>
                <h3 className="mb-2 text-lg tracking-[-0.02em]">{title}</h3>
                <p className="text-[14.5px] text-muted">{body}</p>
              </Card>
            </Item>
          ))}
        </Stagger>
      </Wrap>
    </Section>
  );
}

const SCREENS: { title: string; body: string; visual: ReactNode }[] = [
  {
    title: "Dashboard",
    body: "Every project as a card: its domain, app and database in one chain, CPU against what you allocated, and what happened last.",
    visual: (
      <div className="flex flex-col gap-2">
        <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-[5px] bg-track" aria-hidden>
          {([["22%", "bg-accent-strong"], ["22%", "bg-accent"], ["12%", "bg-tint-domain-strong"], ["12%", "bg-border-dashed"]] as const).map(([w, c], i) => (
            <Grow key={c} className={cx("block", c)} width={w} delay={0.3 + i * 0.12} />
          ))}
        </div>
        <span className="text-xs text-muted">2.5 of 4 vCPU allocated</span>
      </div>
    ),
  },
  {
    title: "Projects",
    body: "One table with status, commit, domain and live CPU and memory. Pick a row to read its build or runtime logs right below.",
    visual: (
      <div className="flex flex-col gap-1.5 text-xs">
        {([["blog", "ok", "Live"], ["api", "warn", "Building"], ["docs", "neutral", "Standby"]] as const).map(([n, t, l]) => (
          <div key={n} className="flex items-center justify-between rounded-lg bg-sunken px-2.5 py-1.5">
            <span className="font-medium">{n}</span>
            <Pill tone={t}>{l}</Pill>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Databases",
    body: "Postgres and Redis next to your apps, with storage used, a masked connection string, nightly backups and one-click restore.",
    visual: (
      <div className="flex flex-col gap-2 rounded-xl bg-sunken p-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-tint-data-strong text-[10px] font-semibold">PG</span>
          <span className="font-medium">blog-pg</span>
          <span className="ml-auto text-muted">240 MB of 2 GB</span>
        </div>
        <Meter percent={12} />
      </div>
    ),
  },
  {
    title: "Domains",
    body: "Every domain across every app: whether DNS points here, the exact record to add, and certificates that renew themselves.",
    visual: (
      <div className="flex items-center gap-2 rounded-xl bg-sunken p-3 font-mono text-[11px]">
        <span className="rounded-md bg-panel-2 px-1.5 py-0.5 font-sans font-semibold">A</span>
        <span>@</span>
        <span className="text-muted">→ your server</span>
        <span className="ml-auto font-sans text-xs font-medium text-ok">Verified</span>
      </div>
    ),
  },
];

export function Tour() {
  return (
    <Section id="dashboard" className="border-t border-border bg-panel">
      <Wrap>
        <SectionHead eyebrow="The dashboard" title="See everything you host on one screen.">
          Four screens cover it: what&apos;s running, how it&apos;s built, where the data lives and which domains point at it.
        </SectionHead>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCREENS.map((s) => (
            <Item key={s.title} lift>
              <article className="flex h-full flex-col gap-4 rounded-[18px] border border-border bg-bg p-5">
                <div className="rounded-2xl border border-border bg-panel p-3.5 shadow-soft">{s.visual}</div>
                <div>
                  <h3 className="mb-1.5 text-lg tracking-[-0.02em]">{s.title}</h3>
                  <p className="text-sm text-muted">{s.body}</p>
                </div>
              </article>
            </Item>
          ))}
        </Stagger>
      </Wrap>
    </Section>
  );
}

const STAGES = [
  ["Clone", "The webhook is verified and de-duplicated, then the commit is checked out."],
  ["Build", "The framework and port are detected, and the image is tagged with the commit SHA."],
  ["Check", "The container starts on a private network with CPU and memory limits and must answer its health check."],
  ["Switch", "Caddy moves traffic to the new container. The old one stops 30 seconds later."],
];

export function HowItWorks() {
  return (
    <Section id="how">
      <Wrap>
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              From <code className="font-mono">git push</code> to live in under three minutes.
            </>
          }
        >
          Every deploy follows the same pipeline: a separate worker runs it, so the dashboard stays fast during long builds.
        </SectionHead>
        <Stagger as="ol" step={0.35} className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map(([title, body], i) => (
            <Item as="li" key={title} className="flex flex-col gap-2 rounded-[18px] border border-border bg-panel p-6 shadow-card">
              <span className="flex items-center gap-2 text-xs font-semibold text-ok">
                <Pop className="grid size-6 place-items-center rounded-full bg-ok-bg">{i + 1}</Pop>
                <Pop>{i === STAGES.length - 1 ? "Live" : "Passed"}</Pop>
              </span>
              <h3 className="mt-1 text-xl">{title}</h3>
              <p className="text-sm text-muted">{body}</p>
            </Item>
          ))}
        </Stagger>
        <Reveal delay={0.2} className="mt-4 flex items-start gap-3.5 rounded-[18px] bg-accent-soft px-6 py-5 text-soft">
          <ShieldIcon className="mt-0.5 size-5 flex-none text-accent-strong" />
          <p>
            Zero-downtime redeploys: 400 of 400 requests succeeded during a switch in testing. If any step fails, you get an alert and the
            old version keeps serving.
          </p>
        </Reveal>
      </Wrap>
    </Section>
  );
}

const P = ({ children = "$ " }: { children?: ReactNode }) => <span className="select-none text-log-ok">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-log-text">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-log-dim">{children}</span>;

export function Cli() {
  return (
    <Section id="cli">
      <Wrap className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead eyebrow="CLI" title="Deploy from your terminal." className="mb-0">
            A single-file CLI with no dependencies, talking to the token API. Link a repo once, then deploy, follow logs, roll back and
            manage env vars without opening the dashboard.
          </SectionHead>
          <Stagger as="ul" delay={0.2} className="mt-7 grid gap-3 text-soft">
            {[
              "Tokens are created in the dashboard and stored as hashes only",
              "Secrets are encrypted with AES-256-GCM at rest",
              "Build logs stream live in your terminal",
            ].map((t) => (
              <Item as="li" key={t} className="flex gap-2.5">
                <span className="mt-2 size-1.5 flex-none rounded-full bg-accent" aria-hidden />
                {t}
              </Item>
            ))}
          </Stagger>
        </div>
        <Reveal className="overflow-hidden rounded-[18px] bg-log-bg text-log-text shadow-float">
          <div className="flex items-center gap-1.5 border-b border-log-border px-5 py-3.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} className="size-2.5 rounded-full bg-log-chip-on" />
            ))}
            <span className="ml-3 text-xs text-log-muted">~/code/blog</span>
          </div>
          <Stagger as="pre" delay={0.35} step={0.22} className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.85] text-log-muted">
            {TERMINAL.map((line, i) => (
              <Item as="span" key={i} className="block">
                {line}
              </Item>
            ))}
          </Stagger>
        </Reveal>
      </Wrap>
    </Section>
  );
}

const TERMINAL: ReactNode[] = [
  <><P /><C>unstakd init</C></>,
  <><D>Linked this repo to</D> blog</>,
  <><P /><C>unstakd env set RESEND_KEY=re_••••••</C></>,
  <D key="saved">Saved 1 variable (secret)</D>,
  <><P /><C>unstakd deploy</C></>,
  <D key="queued">Queued #43 · main@9c1e07b</D>,
  "  Building with Railpack…",
  "  Health check passed · 200 in 38ms",
  <><P>✓ </P>Live at https://blog.unstakd.com</>,
  <><P /><C>unstakd rollback</C></>,
  <><P>✓ </P>#42 is live again (1.9s)</>,
];

const LAYERS: [string, ReactNode][] = [
  ["Caddy", "HTTPS for the wildcard subdomain and custom domains, routing, static files"],
  ["Dashboard + API", "Next.js app with GitHub sign-in, an SSE log stream and the CLI token API"],
  ["Worker", "BullMQ jobs: builds, health checks, backups, domain checks, housekeeping"],
];
const APPS: [string, boolean?][] = [["blog"], ["api"], ["pr-12-blog"], ["docs (static)"], ["postgres", true], ["redis", true]];

export function Architecture() {
  return (
    <Section id="server">
      <Wrap>
        <SectionHead eyebrow="Architecture" title="Everything on one server.">
          No Kubernetes, no extra services to manage. One setup script installs everything on a fresh Ubuntu VPS.
        </SectionHead>
        <div className="rounded-[22px] border-[1.5px] border-dashed border-border-dashed bg-panel/60 p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Brand name="your-vps" />
            <span className="text-[13px] text-muted">Ubuntu 24.04 · 4 vCPU · 8 GB</span>
          </div>
          <Stagger step={0.12} className="grid gap-2.5">
            {[
              ...LAYERS,
              [
                "Your apps",
                <div key="apps" className="flex flex-wrap gap-2">
                  {APPS.map(([name, db]) => (
                    <Pop key={name} className={`rounded-full px-3 py-1 text-xs font-medium ${db ? "bg-tint-data-strong" : "bg-tint-app-strong"}`}>
                      {name}
                    </Pop>
                  ))}
                </div>,
              ] as [string, ReactNode],
            ].map(([name, body]) => (
              <Item key={name} className="grid items-center gap-2 rounded-2xl border border-border bg-panel px-5 py-4 shadow-soft sm:grid-cols-[180px_1fr] sm:gap-4">
                <b className="text-sm font-semibold">{name}</b>
                {typeof body === "string" ? <span className="text-sm text-muted">{body}</span> : body}
              </Item>
            ))}
          </Stagger>
        </div>
      </Wrap>
    </Section>
  );
}

const FAQ = [
  ["Can I sign up?", "Not yet. Unstakd currently runs one person's projects on one server, and public accounts come later. The full source is on GitHub if you want to run your own."],
  ["What can it deploy?", "Anything with a Dockerfile, most Node, Python and Go apps through Railpack, and static sites. Each app runs in its own container with CPU and memory limits."],
  ["What happens if the server dies?", "Database backups go to Cloudflare R2 every night, along with a backup of the platform's own database. Secrets stay encrypted with a key that never touches the database."],
  ["Why build another PaaS?", "To have one dashboard and one bill instead of side projects spread across hosts with different limits, cold starts and pricing, and to learn how builds, proxies and TLS work along the way."],
];

export function Faq() {
  return (
    <Section id="faq">
      <Wrap>
        <SectionHead eyebrow="FAQ" title="Questions" />
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <Item key={q}>
              <Card className="h-full shadow-card">
                <h3 className="mb-2 text-lg tracking-[-0.02em]">{q}</h3>
                <p className="text-muted">{a}</p>
              </Card>
            </Item>
          ))}
        </Stagger>
      </Wrap>
    </Section>
  );
}

export function Closing() {
  return (
    <section className="border-t border-border bg-[radial-gradient(500px_240px_at_50%_0%,var(--glow),transparent_70%)] py-20 text-center sm:py-[104px]">
      <Stagger as="div" className="mx-auto max-w-[1280px] px-4 sm:px-12">
        <Item className="mb-4">
          <h2 className="text-[32px] sm:text-5xl">Ship it to your own server.</h2>
        </Item>
        <Item as="p" className="text-[17px] text-muted">Read the code, follow the docs, and push.</Item>
        <Item className="mt-8 flex flex-wrap justify-center gap-3 *:flex-1 sm:*:flex-none">
          <Button size="lg" variant="primary" href={GITHUB_URL}>
            View on GitHub
          </Button>
          <Button size="lg" variant="secondary" href="/docs">
            Read the docs
          </Button>
        </Item>
      </Stagger>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-panel py-7 text-[13px] text-muted">
      <Wrap className="flex flex-wrap items-center gap-5">
        <Brand />
        <span>Built for my own projects, running on my own server.</span>
        <nav aria-label="Footer" className="flex gap-5 sm:ml-auto">
          <a href="/docs" className="hover:text-text">
            Docs
          </a>
          <a href={GITHUB_URL} className="hover:text-text">
            GitHub
          </a>
          <a href={DASHBOARD_URL} className="hover:text-text">
            Dashboard
          </a>
        </nav>
      </Wrap>
    </footer>
  );
}
