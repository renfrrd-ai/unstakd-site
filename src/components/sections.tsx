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
import { Brand, Button, Card, DASHBOARD_URL, GITHUB_URL, Section, SectionHead, Wrap } from "./ui";

const Code = ({ children }: { children: ReactNode }) => <code className="font-mono text-[13px] text-soft">{children}</code>;

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([Icon, title, body]) => (
            <Card key={title}>
              <div className="mb-[18px] grid size-9 place-items-center rounded-lg bg-ok-bg text-accent-text">
                <Icon className="size-[18px]" />
              </div>
              <h3 className="mb-2 text-[19px] tracking-[-0.02em]">{title}</h3>
              <p className="text-[14.5px] text-muted">{body}</p>
            </Card>
          ))}
        </div>
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
        <div className="grid overflow-hidden rounded-xl border border-border bg-panel sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map(([title, body], i) => (
            <div
              key={title}
              className="relative border-border px-6 py-7 not-first:border-t before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-accent sm:nth-2:border-t-0 sm:even:border-l lg:not-first:border-t-0 lg:not-first:border-l"
            >
              <span className="font-mono text-xs font-semibold text-dim">0{i + 1}</span>
              <h3 className="mt-2.5 mb-2 text-xl">{title}</h3>
              <p className="text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3.5 rounded-xl border border-dashed border-border-strong px-6 py-5 text-soft">
          <ShieldIcon className="mt-0.5 size-5 flex-none text-accent-text" />
          <p>
            Zero-downtime redeploys: 400 of 400 requests succeeded during a switch in testing. If any step fails, you get an alert and the
            old version keeps serving.
          </p>
        </div>
      </Wrap>
    </Section>
  );
}

const P = ({ children = "$ " }: { children?: ReactNode }) => <span className="select-none text-accent-text">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="text-text">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-dim">{children}</span>;

export function Cli() {
  return (
    <Section id="cli">
      <Wrap className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead eyebrow="CLI" title="Deploy from your terminal." className="mb-0">
            A single-file CLI with no dependencies, talking to the token API. Link a repo once, then deploy, follow logs, roll back and
            manage env vars without opening the dashboard.
          </SectionHead>
          <ul className="mt-7 grid gap-3 text-soft">
            {[
              "Tokens are created in the dashboard and stored as hashes only",
              "Secrets are encrypted with AES-256-GCM at rest",
              "Build logs stream live in your terminal",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="font-mono text-accent-text" aria-hidden>
                  →
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-log-bg">
          <div className="flex gap-1.5 border-b border-border px-4 py-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} className="size-2.5 rounded-full bg-panel-2" />
            ))}
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.85] text-soft">
            <P />
            <C>unstakd init</C>
            {"\n"}
            <D>Linked this repo to</D> blog{"\n"}
            <P />
            <C>unstakd env set RESEND_KEY=re_••••••</C>
            {"\n"}
            <D>Saved 1 variable (secret)</D>
            {"\n"}
            <P />
            <C>unstakd deploy</C>
            {"\n"}
            <D>Queued #43 · main@9c1e07b</D>
            {"\n"}
            {"  Building with Railpack…\n  Health check passed · 200 in 38ms\n"}
            <P>✓ </P>Live at https://blog.unstakd.com{"\n"}
            <P />
            <C>unstakd rollback</C>
            {"\n"}
            <P>✓ </P>#42 is live again (1.9s)
          </pre>
        </div>
      </Wrap>
    </Section>
  );
}

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
        <div className="rounded-[14px] border border-border bg-panel p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Brand name="your-vps" />
            <span className="font-mono text-[13px] text-muted">Ubuntu 24.04 · 4 vCPU · 8 GB</span>
          </div>
          <div className="grid gap-2.5">
            {[
              ...LAYERS,
              [
                "Your apps",
                <div key="apps" className="flex flex-wrap gap-2">
                  {APPS.map(([name, db]) => (
                    <span key={name} className={`rounded-md border border-border bg-panel px-2.5 py-1 font-mono text-xs ${db ? "text-accent-text" : "text-soft"}`}>
                      {name}
                    </span>
                  ))}
                </div>,
              ] as [string, ReactNode],
            ].map(([name, body]) => (
              <div key={name} className="grid items-center gap-2 rounded-[10px] border border-border bg-bg px-[18px] py-3.5 sm:grid-cols-[180px_1fr] sm:gap-4">
                <b className="font-mono text-[13px] font-semibold">{name}</b>
                {typeof body === "string" ? <span className="text-sm text-muted">{body}</span> : body}
              </div>
            ))}
          </div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <Card key={q}>
              <h3 className="mb-2 text-lg tracking-[-0.02em]">{q}</h3>
              <p className="text-muted">{a}</p>
            </Card>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

export function Closing() {
  return (
    <section className="border-t border-border bg-[radial-gradient(500px_240px_at_50%_0%,var(--glow),transparent_70%)] py-20 text-center sm:py-[104px]">
      <Wrap>
        <h2 className="mb-4 text-[32px] sm:text-5xl">Ship it to your own server.</h2>
        <p className="text-[17px] text-muted">Read the code, run the setup script, and push.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 *:flex-1 sm:*:flex-none">
          <Button size="lg" href={GITHUB_URL}>
            View on GitHub
          </Button>
          <Button size="lg" variant="secondary" href={DASHBOARD_URL}>
            Open dashboard
          </Button>
        </div>
      </Wrap>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-7 text-[13px] text-muted">
      <Wrap className="flex flex-wrap items-center gap-5">
        <Brand />
        <span>Built for my own projects, running on my own server.</span>
        <nav aria-label="Footer" className="flex gap-5 sm:ml-auto">
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
