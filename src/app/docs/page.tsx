import type { Metadata } from "next";
import { Callout, Code, DocSection, H3, Path, Step, Steps, Table, Terminal } from "@/components/docs";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections";
import { DASHBOARD_URL, Eyebrow, Wrap } from "@/components/ui";
import { ogImage } from "../og";

const description =
  "How to use Unstakd: deploy a repo, read logs, roll back, add environment variables, databases, custom domains, previews, alerts and the CLI.";

export const metadata: Metadata = {
  title: "Docs",
  description,
  alternates: { canonical: "/docs" },
  openGraph: { title: "Docs · Unstakd", description, url: "/docs", siteName: "Unstakd", type: "article", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Docs · Unstakd", description, images: [ogImage] },
};

const TOC: [string, string][] = [
  ["start", "Before you start"],
  ["first-deploy", "Deploy your first app"],
  ["builds", "How apps are built"],
  ["deploys", "Deploys and logs"],
  ["rollbacks", "Rolling back"],
  ["env", "Environment variables"],
  ["databases", "Databases"],
  ["domains", "Custom domains"],
  ["previews", "Pull request previews"],
  ["usage", "CPU, memory and standby"],
  ["map", "The map"],
  ["alerts", "Alerts"],
  ["cli", "CLI and API tokens"],
  ["troubleshooting", "Troubleshooting"],
];

export default function DocsPage() {
  return (
    <>
      <Nav current="/docs" />
      <header className="border-b border-border bg-panel">
        <Wrap className="py-12 sm:py-16">
          <Eyebrow>Docs</Eyebrow>
          <h1 className="mt-4 mb-3 text-[36px] sm:text-[48px]">How to use Unstakd</h1>
          <p className="max-w-[640px] text-[17px] text-muted">
            Everything you do in the dashboard, from the first deploy to custom domains, databases and the CLI. Each section names
            the screen and the button, so you can follow along.
          </p>
        </Wrap>
      </header>

      <Wrap className="grid grid-cols-[minmax(0,1fr)] gap-10 py-10 sm:py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <details className="group rounded-[16px] border border-border bg-panel p-4 lg:hidden">
            <summary className="cursor-pointer list-none text-sm font-semibold [&::-webkit-details-marker]:hidden">
              On this page <span className="float-right text-muted transition group-open:rotate-180">▾</span>
            </summary>
            <TocLinks />
          </details>
          <nav aria-label="On this page" className="hidden lg:block">
            <span className="mb-3 block text-xs font-semibold tracking-wide text-dim uppercase">On this page</span>
            <TocLinks />
          </nav>
        </aside>

        <article className="flex max-w-[760px] flex-col gap-12">
          <DocSection id="start" title="Before you start" lead="Unstakd is a personal platform on one server. These docs are for anyone who can already open the dashboard.">
            <ul className="m-0 flex list-disc flex-col gap-2.5 pl-5 marker:text-dim">
              <li>
                <strong>Sign in with GitHub.</strong> Only the GitHub accounts on the server&apos;s allowlist can sign in; everyone else
                is turned away at the login page.
              </li>
              <li>
                <strong>Connect the GitHub App</strong> (<Path>Server › GitHub App</Path>). It lets Unstakd clone private repos, lists
                your repos in New project, and deploys on every push without adding a webhook to each repo. Public repos work without it.
              </li>
              <li>
                <strong>Point your apps domain at the server.</strong> Every app gets <Code>&lt;name&gt;.unstakd.com</Code>; a wildcard DNS
                record sends all of them to the server.
              </li>
            </ul>
            <Callout title="The top bar">
              Dashboard, Projects, Map, Databases, Domains, Activity and Server are the screens you&apos;ll use. Billing is marked
              <b className="mx-1 inline">Soon</b>and isn&apos;t active yet.
            </Callout>
          </DocSection>

          <DocSection id="first-deploy" title="Deploy your first app" lead="From a GitHub repo to a live HTTPS URL in a couple of minutes.">
            <Steps>
              <Step title={<>Press <Path>New project</Path> in the top bar</>}>
                Pick a repo from <strong>Your repositories</strong> (the ones the GitHub App can see, private included), or paste a public
                repo as <Code>owner/name</Code> or a GitHub URL and press Continue.
              </Step>
              <Step title="Check what Unstakd detected">
                It reads the repo and shows how it will build it: your Dockerfile, Railpack for most Node, Python and Go apps, or a static
                site. See <a href="#builds" className="font-medium text-accent-text hover:text-accent-strong">How apps are built</a>.
              </Step>
              <Step title="Configure it">
                <Table
                  head={["Field", "What it does"]}
                  rows={[
                    ["Subdomain", <>The app&apos;s name and its URL, <Code>name.unstakd.com</Code>. Lowercase letters, numbers and dashes.</>],
                    ["Branch", "Pushes to this branch deploy automatically."],
                    ["Port", "The port your app listens on inside the container (detected when possible, 3000 otherwise)."],
                    ["Health check path", <>Unstakd waits for this path to answer before sending traffic, e.g. <Code>/</Code> or <Code>/api/health</Code>.</>],
                    ["Size", "Small · 0.5 CPU · 256 MB, Medium · 1 CPU · 512 MB, or Large · 2 CPU · 1 GB. You can change it later."],
                    ["Environment", <>Paste a <Code>.env</Code> file. Values are stored encrypted as secrets.</>],
                    ["Create a Postgres database", <>Creates one and injects it as <Code>DATABASE_URL</Code>, with nightly backups.</>],
                  ]}
                />
                Static sites ask for a <strong>build command</strong> and <strong>output directory</strong> instead of a port and health check.
              </Step>
              <Step title={<>Press <Path>Deploy</Path></>}>
                You land on the deploy page and can watch the build log live. When the health check passes, the app is live at its URL
                and shows up on the Dashboard as <strong>Live</strong>.
              </Step>
            </Steps>
          </DocSection>

          <DocSection id="builds" title="How apps are built">
            <Table
              head={["Your repo has", "Unstakd uses", "Notes"]}
              rows={[
                ["A Dockerfile", "Your Dockerfile", "Full control. Make sure the app listens on the port you set."],
                ["No Dockerfile", "Railpack", "Detects the language, package manager and start command. Add a Dockerfile any time to override it."],
                [
                  "A static site",
                  "Static build",
                  "Next.js static export, Vite, Astro or plain HTML. Built in a throwaway container and served directly by Caddy, so nothing keeps running.",
                ],
              ]}
            />
            <p>
              You can switch the build type, branch, port, health check and size later in <Path>Project › Settings</Path>. Changes apply on
              the next deploy.
            </p>
          </DocSection>

          <DocSection id="deploys" title="Deploys and logs">
            <p>
              <strong>Every push</strong> to the tracked branch starts a deploy. To deploy without pushing, press <Path>Redeploy</Path> on any
              project page, or <Path>Deploy</Path> on its Dashboard card.
            </p>
            <H3>The pipeline</H3>
            <p>
              Each deploy goes through <strong>Clone → Build → Push image → Start → Health check → Switch traffic</strong>. The deploy page
              and the Projects log panel show each step as it passes. If any step fails, the deploy stops and the version that was already
              live keeps serving. Nothing goes down because of a bad build.
            </p>
            <H3>Reading logs</H3>
            <p>
              Open <Path>Projects</Path> and click a project in the table. The dark panel below shows its logs. Switch between{" "}
              <strong>Build</strong> (the latest deploy&apos;s output, live while it runs) and <strong>Runtime</strong> (what the running
              container prints, kept for 24 hours). The same logs are on <Path>Project › Logs</Path> and on each deploy&apos;s page.
            </p>
            <Callout tone="warn" title="A deploy failed?">
              The Dashboard shows a red banner with the failed step, and says which version is still serving. Click <b className="inline">Open logs</b>{" "}
              to see the error.
            </Callout>
            <p>A deploy that&apos;s still building can be stopped with <Path>Cancel deploy</Path> on its page.</p>
          </DocSection>

          <DocSection id="rollbacks" title="Rolling back">
            <p>
              The last 10 images are kept, so a rollback starts the old image again without rebuilding. It&apos;s live in a few seconds.
            </p>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-5 marker:text-dim">
              <li>
                <Path>Project › Deployments</Path>: press <strong>Roll back</strong> next to any earlier deploy.
              </li>
              <li>
                <Path>Projects</Path>: <strong>Roll back</strong> in the log panel goes to the last good deploy before the live one.
              </li>
              <li>
                CLI: <Code>unstakd rollback</Code> (see <a href="#cli" className="font-medium text-accent-text hover:text-accent-strong">CLI</a>).
              </li>
            </ul>
          </DocSection>

          <DocSection id="env" title="Environment variables" lead="Encrypted at rest. Changes apply on the next deploy.">
            <Steps>
              <Step title={<>Open <Path>Project › Environment</Path></>} />
              <Step title="Add a variable, or paste a .env file">
                Enter a key and value. Leave <strong>Secret</strong> on to hide the value after saving; it&apos;s never shown again and can
                only be replaced. Pasting a <Code>.env</Code> file imports every line as a secret.
              </Step>
              <Step title={<>Press <Path>Redeploy to apply</Path></>}>Running containers keep their old values until the next deploy.</Step>
            </Steps>
            <p>
              Linked databases show up in the list as <strong>linked</strong> variables (for example <Code>DATABASE_URL</Code>). You don&apos;t
              manage those by hand.
            </p>
          </DocSection>

          <DocSection id="databases" title="Databases" lead="Postgres and Redis run on the server's private network. They're never exposed to the internet.">
            <H3>Create one</H3>
            <Steps>
              <Step title={<>Open <Path>Databases › New database</Path></>} />
              <Step title="Pick Postgres or Redis, a name and a version" />
              <Step title="Link it to a project (optional)">
                Postgres is injected as <Code>DATABASE_URL</Code>, Redis as <Code>REDIS_URL</Code>. Redeploy the project to pick it up.
              </Step>
              <Step title="Keep nightly backups on">Backups go to Cloudflare R2 (or local disk if R2 isn&apos;t set up) and are kept for 7 days.</Step>
            </Steps>
            <p>
              You can also link an existing database from <Path>Project › Databases</Path>, with any variable name.
            </p>
            <H3>Use it</H3>
            <p>
              Select a database on the <Path>Databases</Path> page to see its status, storage used, last backup and{" "}
              <strong>connection string</strong>. The password is masked until you press <strong>Show</strong>; <strong>Copy</strong> copies
              the real value.
            </p>
            <H3>Back up and restore</H3>
            <p>
              Press <Path>Back up now</Path> for an extra backup. Each backup in the list has a <strong>Restore</strong> button. Restoring
              replaces the current data, so it asks you to confirm first.
            </p>
            <H3>Connect from your laptop</H3>
            <p>
              Open <strong>Connect from your laptop</strong> on the database&apos;s page. It shows an SSH command to keep running, and the
              settings for TablePlus or DBeaver (&ldquo;over SSH&rdquo;). For example:
            </p>
            <Terminal label="Terminal" lines={["$ ssh -N -L 15432:127.0.0.1:15432 root@203.0.113.10", "# then connect your tool to 127.0.0.1:15432"]} />
            <Callout tone="warn" title="Deleting a database">
              Expand <b className="inline">Delete</b> at the bottom of its page and type its name. Keep <b className="inline">Keep the data volume</b> ticked
              unless you&apos;re sure; that leaves the data on disk.
            </Callout>
          </DocSection>

          <DocSection id="domains" title="Custom domains" lead="Every app has a free subdomain. Add your own domain and Unstakd issues the HTTPS certificate once DNS points here.">
            <Steps>
              <Step title="Add the domain">
                On <Path>Domains</Path> press <strong>Add domain</strong>, choose the project and enter the hostname. Or use{" "}
                <Path>Project › Domains</Path>.
              </Step>
              <Step title="Create the DNS record Unstakd shows you">
                <Table
                  head={["Domain", "Record", "Name", "Value"]}
                  rows={[
                    [<Code key="a">www.example.com</Code>, "CNAME", "www", <Code key="v">edge.unstakd.com</Code>],
                    [<Code key="b">example.com</Code>, "A", "@", "Your server's IP address"],
                  ]}
                />
                Add it at the company you bought the domain from. Changes can take up to an hour to show up.
              </Step>
              <Step title="Wait for Connected">
                Domains are checked every minute. The status moves from <strong>Waiting</strong> to <strong>Connected</strong>, and the SSL
                column to <strong>Valid</strong> once the certificate is issued. Certificates renew on their own.
              </Step>
            </Steps>
            <Callout tone="warn" title="Using Cloudflare?">
              Set the record to <b className="inline">DNS only</b> (grey cloud). With the orange-cloud proxy on, the domain shows{" "}
              <b className="inline">Points elsewhere</b> and the certificate can&apos;t be issued.
            </Callout>
            <p>
              On <Path>Project › Domains</Path>, <strong>Make primary</strong> picks the address the app is known by. A <Code>www</Code> domain
              next to its bare domain redirects to the primary one.
            </p>
          </DocSection>

          <DocSection id="previews" title="Pull request previews">
            <p>
              Turn them on in <Path>Project › Settings › Preview deploys</Path>. Each pull request into the tracked branch then gets its own
              copy at <Code>pr-&lt;number&gt;-&lt;name&gt;.unstakd.com</Code>, rebuilt on every push to the PR and removed when it closes.
              Previews share the project&apos;s environment and databases, and never touch the live version. They&apos;re listed under{" "}
              <Path>Project › Deployments</Path>.
            </p>
          </DocSection>

          <DocSection id="usage" title="CPU, memory and standby">
            <p>
              Each app gets a share of the server&apos;s CPU (its <strong>size</strong>). The Dashboard&apos;s <strong>CPU allocation</strong> card
              shows how the cores are split, and every project card shows <strong>CPU of allocation</strong>: how busy the app is compared to
              what it was given. Bars turn amber at 80%. If an app is often there, give it a bigger size in Settings.
            </p>
            <p>
              <Path>Project › Overview</Path> has 24-hour CPU and memory charts, and counts restarts after crashes. Static sites have no
              container, so they don&apos;t use any allocation.
            </p>
            <H3>Standby</H3>
            <p>
              <Path>Project › Settings › Put on standby</Path> stops the container to free memory and keeps its domains, env vars and images.
              Press <strong>Start</strong> on its Dashboard card (or <strong>Start app</strong> in Settings) to bring it back.
            </p>
          </DocSection>

          <DocSection id="map" title="The map" lead="One picture of everything you host: which domains reach which apps, and which databases they use.">
            <p>
              Open <Path>Map</Path>. Domains are on the left, apps in the middle (inside the box for your server) and databases on the
              right, joined by lines. A dashed line means that domain isn&apos;t serving yet, because DNS is still pending or points
              somewhere else. Each block&apos;s dot shows its status.
            </p>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-5 marker:text-dim">
              <li>Drag a block to move it, drag the background to pan, and scroll or use <strong>+</strong> / <strong>−</strong> to zoom.</li>
              <li>
                Click a block to see its details and what it&apos;s connected to, with buttons to deploy, read logs, check DNS records or
                open the database.
              </li>
              <li>
                <strong>Fit to screen</strong> shows everything; <strong>Tidy layout</strong> puts every block back. Your layout is saved in
                this browser only.
              </li>
              <li>
                <strong>Open map</strong> on the Dashboard, <strong>Show on map</strong> on Projects and <strong>See it on the map</strong> on
                Domains jump straight to that block.
              </li>
            </ul>
          </DocSection>

          <DocSection id="alerts" title="Alerts">
            <p>
              In <Path>Server › Alerts</Path>, add a Discord webhook URL or any webhook that accepts a JSON POST, then press{" "}
              <strong>Send a test alert</strong>. You&apos;ll hear about failed deploys (with the last 40 log lines), failed backups, databases
              that won&apos;t start, and domains that stop pointing at the server.
            </p>
            <p>Everything else that happens is listed on the <Path>Activity</Path> page, newest first.</p>
          </DocSection>

          <DocSection id="cli" title="CLI and API tokens" lead="A single-file CLI with no dependencies (Node 20+). Deploy, follow logs, roll back and manage env vars from your terminal.">
            <Steps>
              <Step title={<>Create a token in <Path>Server › API tokens</Path></>}>It&apos;s shown once; copy it then. Revoking it stops it working immediately.</Step>
              <Step title="Install the CLI from your Unstakd checkout and sign in">
                <Terminal lines={["$ cd Unstakd", "$ pnpm link --global", `$ unstakd login ${DASHBOARD_URL}`, "Paste your token: unst_••••••••"]} />
              </Step>
              <Step title="Link a repo, then use it from there">
                <Terminal lines={["$ unstakd init", "Linked this repo to blog", "$ unstakd deploy", "Queued #43 · main@9c1e07b", "✓ Live at https://blog.unstakd.com"]} />
              </Step>
            </Steps>
            <Table
              head={["Command", "What it does"]}
              rows={[
                [<Code key="1">unstakd projects</Code>, "List projects with their status and URL."],
                [<Code key="2">unstakd status</Code>, "The live version and the last 10 deploys."],
                [<Code key="3">unstakd deploy [--detach]</Code>, "Redeploy the branch head and stream the build log. Exits 1 if it fails."],
                [<Code key="4">unstakd logs [number]</Code>, "Follow a deploy's build log (the latest by default)."],
                [<Code key="5">unstakd rollback [number]</Code>, "Roll back to a deploy, or to the last good one before the live one."],
                [<Code key="6">unstakd env</Code>, "List env vars. Secret values are never returned."],
                [<Code key="7">unstakd env set K=V… [--plain]</Code>, "Set variables (secret unless --plain). Redeploy to apply."],
                [<Code key="8">unstakd env rm K…</Code>, "Remove variables."],
              ]}
            />
            <p>
              Outside a linked repo, add the project name, e.g. <Code>unstakd deploy blog</Code>. In CI, set <Code>UNSTAKD_URL</Code> and{" "}
              <Code>UNSTAKD_TOKEN</Code> instead of logging in.
            </p>
          </DocSection>

          <DocSection id="troubleshooting" title="Troubleshooting">
            <Table
              head={["You see", "Try this"]}
              rows={[
                ["Failed at Build", "Open the deploy's log; the error is near the end. Builds that work locally but not here often need an env var at build time."],
                ["Failed at Health check", "The app didn't answer on its port and health path in time. Check both in Settings, and that the app listens on 0.0.0.0, not localhost."],
                ["Domain stays on Waiting", "The DNS record isn't visible yet. Compare it with the one shown on the Domains page, and give it up to an hour."],
                ["Domain says Points elsewhere", "The record points at another address, or a proxy like Cloudflare's orange cloud is on. Switch to DNS only."],
                ["App can't reach its database", "Check the variable name under Environment, then redeploy: links apply on the next deploy."],
                ["CPU bar is amber", "The app is using 80% or more of its allocation. Give it a bigger size in Settings."],
              ]}
            />
          </DocSection>
        </article>
      </Wrap>
      <Footer />
    </>
  );
}

function TocLinks() {
  return (
    <ol className="m-0 mt-3 flex list-none flex-col gap-0.5 p-0 lg:mt-0">
      {TOC.map(([id, label]) => (
        <li key={id}>
          <a href={`#${id}`} className="block rounded-lg px-2.5 py-1.5 text-sm text-muted hover:bg-panel-2 hover:text-text">
            {label}
          </a>
        </li>
      ))}
    </ol>
  );
}
