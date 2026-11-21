import type { ComponentProps, ReactNode } from "react";
import { Grow, Item, Stagger } from "./motion";

export const GITHUB_URL = "https://github.com/renfrrd-ai/Unstakd";
export const DASHBOARD_URL = "https://dash.unstakd.com";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Wrap({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto max-w-[1280px] px-4 sm:px-12", className)} {...props} />;
}

// Three offset bars, the middle one in the accent: same mark as the dashboard.
export function Glyph({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx("relative block h-[22px] w-[26px] shrink-0", className)}>
      <span className="absolute top-0 left-0 h-[5px] w-4 rounded-[3px] bg-ink" />
      <span className="absolute top-[8.5px] left-[5px] h-[5px] w-4 rounded-[3px] bg-accent" />
      <span className="absolute top-[17px] left-[10px] h-[5px] w-4 rounded-[3px] bg-ink" />
    </span>
  );
}

export function Brand({ name = "unstakd" }: { name?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-lg font-bold tracking-[-0.02em]">
      <Glyph />
      {name}
    </span>
  );
}

const buttonStyles = {
  accent: "bg-accent font-semibold text-accent-ink hover:brightness-110",
  primary: "bg-ink font-semibold text-on-ink hover:opacity-90",
  secondary: "border border-border-strong bg-panel font-medium hover:bg-panel-2",
};

export function Button({
  variant = "accent",
  size = "md",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonStyles; size?: "md" | "lg" }) {
  return (
    <a
      className={cx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap transition active:translate-y-px",
        size === "lg" ? "h-12 rounded-xl px-5 text-[15px]" : "h-[38px] rounded-[10px] px-3.5 text-[13px]",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cx("scroll-mt-20 py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">{children}</span>;
}

export function SectionHead({ eyebrow, title, children, className }: { eyebrow: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <Stagger className={cx("mb-12 max-w-[660px]", className)}>
      <Item>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Item>
      <Item className="mt-4 mb-3.5">
        <h2 className="text-[30px] sm:text-[40px]">{title}</h2>
      </Item>
      {children && (
        <Item as="p" className="text-[17px] text-muted">
          {children}
        </Item>
      )}
    </Stagger>
  );
}

export function Card({ className, ...props }: ComponentProps<"article">) {
  return <article className={cx("rounded-[18px] border border-border bg-panel p-6", className)} {...props} />;
}

type Tone = "ok" | "warn" | "neutral";
const pillTone: Record<Tone, string> = { ok: "bg-ok-bg text-ok", warn: "bg-warn-bg text-warn", neutral: "bg-panel-2 text-muted" };
const dotTone: Record<Tone, string> = { ok: "bg-ok-dot", warn: "bg-warn-dot animate-pulse", neutral: "bg-dim" };

export function Pill({ tone = "ok", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-xs font-medium whitespace-nowrap", pillTone[tone])}>
      <span className={cx("size-1.5 rounded-full", dotTone[tone])} aria-hidden />
      {children}
    </span>
  );
}

export function LivePill() {
  return <Pill>Live</Pill>;
}

// Domain → App → Data, stepped right, as on the dashboard's project cards.
export function RouteChain({ domain, app, data }: { domain: ReactNode; app: ReactNode; data?: ReactNode }) {
  const row = "flex min-w-0 justify-between gap-3 rounded-[10px] px-3 py-2 text-[13px]";
  return (
    <div className="flex flex-col gap-1.5">
      <div className={cx(row, "bg-tint-domain")}>
        <span className="text-muted">Domain</span>
        <span className="truncate font-medium">{domain}</span>
      </div>
      <div className={cx(row, "ml-3.5 bg-tint-app")}>
        <span className="text-muted">App</span>
        <span className="truncate font-medium">{app}</span>
      </div>
      {data && (
        <div className={cx(row, "ml-7 bg-tint-data")}>
          <span className="text-muted">Data</span>
          <span className="truncate font-medium">{data}</span>
        </div>
      )}
    </div>
  );
}

export function Meter({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-track" aria-hidden>
      <Grow className={cx("block h-1.5 rounded-full", percent >= 80 ? "bg-warn-dot" : "bg-accent")} width={`${percent}%`} delay={0.2} />
    </div>
  );
}
